#!/usr/bin/env bun
// Non-rendering Mermaid validation gate.
//
// Parses every ```mermaid fenced block in the given Markdown files through
// mermaid.parse() under a jsdom DOM shim. This validates syntax WITHOUT
// rendering to SVG/PNG (no Chromium, no mermaid-cli), which is fast, headless,
// and reproducible in CI. Exits non-zero if any block fails to parse.
//
// Usage:
//   bun scripts/validate-mermaid.mjs specs/**/spec.md
//   bun scripts/validate-mermaid.mjs path/to/doc.md ...
// With no arguments it validates every specs/*/spec.md file.

import { $ } from "bun";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { Glob } from "bun";

// Pinned so the gate is reproducible; bump as a reviewed change.
const MERMAID = "mermaid@12.0.0";
const JSDOM = "jsdom@30.0.1";
// jsdom requires tough-cookie via CJS require; bun does not always place it where
// jsdom resolves it, so install it explicitly and pinned.
const TOUGH = "tough-cookie@6.0.2";
const CACHE = path.join(os.tmpdir(), "mermaid-validate-cache");

async function ensureDeps() {
  const sentinel = path.join(CACHE, ".deps-ok");
  if (await Bun.file(sentinel).exists()) return;
  await fs.mkdir(CACHE, { recursive: true });
  await Bun.write(path.join(CACHE, "package.json"), '{"name":"mermaid-validate","private":true}\n');
  await $`bun add ${MERMAID} ${JSDOM} ${TOUGH}`.cwd(CACHE).quiet();
  // Write the sentinel only after a successful install so a partial or interrupted
  // install does not short-circuit the next run into a missing-module failure.
  await Bun.write(sentinel, "ok\n");
}

async function loadMermaid() {
  const { JSDOM: JD } = await import(path.join(CACHE, "node_modules/jsdom/lib/api.js"));
  const dom = new JD("<!DOCTYPE html><body></body>", { pretendToBeVisual: true });
  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.navigator = dom.window.navigator;
  const mermaid = (await import(path.join(CACHE, "node_modules/mermaid/dist/mermaid.core.mjs"))).default;
  mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
  return mermaid;
}

// Extract fenced mermaid blocks with 1-based start line of the block body.
function extractBlocks(text) {
  const lines = text.split("\n");
  const blocks = [];
  let inBlock = false, start = 0, buf = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!inBlock && l.startsWith("```mermaid")) { inBlock = true; start = i + 2; buf = []; continue; }
    if (inBlock && l.startsWith("```")) { inBlock = false; blocks.push({ start, code: buf.join("\n") }); continue; }
    if (inBlock) buf.push(l);
  }
  if (inBlock) blocks.push({ start, code: buf.join("\n"), unterminated: true });
  return blocks;
}

async function resolveFiles(args) {
  let candidates;
  if (args.length === 0) {
    // Default: every tracked Markdown file, so diagrams outside specs/ are covered too.
    const tracked = (await $`git ls-files "*.md"`.text()).split("\n").map((s) => s.trim()).filter(Boolean);
    candidates = tracked;
  } else {
    const set = new Set();
    for (const a of args) {
      if (a.includes("*")) { for await (const f of new Glob(a).scan(".")) set.add(f); }
      else set.add(a);
    }
    candidates = [...set];
  }
  // Keep only files that actually contain a fenced mermaid block.
  const withBlocks = [];
  for (const f of candidates) {
    try {
      if (extractBlocks(await Bun.file(f).text()).length > 0) withBlocks.push(f);
    } catch {}
  }
  return withBlocks.sort();
}

const files = await resolveFiles(Bun.argv.slice(2));
if (files.length === 0) {
  console.error("no files matched");
  process.exit(2);
}
await ensureDeps();
const mermaid = await loadMermaid();

let total = 0, failed = 0;
for (const file of files) {
  const text = await Bun.file(file).text();
  const blocks = extractBlocks(text);
  for (const b of blocks) {
    total++;
    const where = `${file}:${b.start}`;
    if (b.unterminated) { failed++; console.log(`FAIL  ${where} :: unterminated mermaid fence`); continue; }
    if (/%%\{\s*init/.test(b.code)) {
      failed++;
      console.log(`FAIL  ${where} :: %%{init}%% directive is banned; use classDef colors only`);
      continue;
    }
    try {
      await mermaid.parse(b.code);
      console.log(`  ok  ${where}`);
    } catch (e) {
      failed++;
      const msg = String(e?.message || e).split("\n").slice(0, 5).join("  ");
      console.log(`FAIL  ${where} :: ${msg}`);
    }
  }
}
console.log(`\n${failed === 0 ? "PASS" : "FAIL"} ${total - failed}/${total} mermaid blocks across ${files.length} file(s)`);
process.exit(failed === 0 ? 0 : 1);
