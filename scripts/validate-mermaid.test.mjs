// Contract tests for scripts/validate-mermaid.mjs (run with `bun test`).
//
// Pins the two behaviours the gate exists to guarantee:
//   1. A syntactically invalid block fails with a non-zero exit code.
//   2. Every extracted block is parsed and reported (count is exact), so a
//      dropped block can never masquerade as a clean pass.
import { test, expect, beforeAll } from "bun:test";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const SCRIPT = path.join(import.meta.dir, "validate-mermaid.mjs");
let tmp;

const GOOD = "```mermaid\nflowchart TB\n  A[Start] --> B[End]\n```";
const BAD = "```mermaid\nflowchart TB\n  A[Unclosed bracket --> B\n```";
const INIT = "```mermaid\n%%{init: {'theme':'base'}}%%\nflowchart TB\n  A[X] --> B[Y]\n```";

beforeAll(async () => {
  tmp = await fs.mkdtemp(path.join(os.tmpdir(), "mmd-test-"));
});

async function run(name, contents) {
  const file = path.join(tmp, name);
  await fs.writeFile(file, contents);
  const proc = Bun.spawn(["bun", SCRIPT, file], { stdout: "pipe", stderr: "pipe" });
  const stdout = await new Response(proc.stdout).text();
  const code = await proc.exited;
  return { code, stdout };
}

// The first run may install the pinned toolchain into the temp cache.
const TIMEOUT = 180_000;

test("invalid block fails with non-zero exit and is named", async () => {
  const { code, stdout } = await run("bad.md", `# doc\n\n${GOOD}\n\ntext\n\n${BAD}\n`);
  expect(code).toBe(1);
  expect(stdout).toContain("FAIL");
  // Both blocks were seen; exactly one failed.
  expect(stdout).toContain("1/2 mermaid blocks");
}, TIMEOUT);

test("clean file passes with zero exit", async () => {
  const { code, stdout } = await run("good.md", `# doc\n\n${GOOD}\n\n${GOOD}\n`);
  expect(code).toBe(0);
  expect(stdout).toContain("PASS 2/2 mermaid blocks");
}, TIMEOUT);

test("every extracted block is reported (no silent drop)", async () => {
  const { stdout } = await run("three.md", `${GOOD}\n\n${GOOD}\n\n${GOOD}\n`);
  const okLines = stdout.split("\n").filter((l) => l.trimStart().startsWith("ok"));
  expect(okLines.length).toBe(3);
  expect(stdout).toContain("3/3 mermaid blocks");
}, TIMEOUT);

test("a block with an init directive is rejected", async () => {
  const { code, stdout } = await run("init.md", `# doc\n\n${INIT}\n`);
  expect(code).toBe(1);
  expect(stdout).toContain("%%{init}%% directive is banned");
}, TIMEOUT);
