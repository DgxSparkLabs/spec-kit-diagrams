---
description: "Author or refresh in-section diagrams and tables in the current feature's spec, plan, or tasks file"
---

# Spec Kit Diagrams Render

Hook dispatch is best-effort agent compliance (core command markdown emits
`EXECUTE_COMMAND`; emitting the block alone does not run the hook). The mermaid
parse gate is the deterministic backstop.

This command asks you to author in-section diagrams and lookup tables. It is not a
generator script. Fill marker-delimited blocks from the visual conventions guide.
Do not replace core Spec Kit templates.

## 1. Load Config and Guide

Load config from `.specify/extensions/diagrams/diagrams-config.yml`. If that file
is missing, treat this as the default:

```yaml
artifacts:
  spec: true
  plan: true
  tasks: true
  constitution: false
  checklist: false
run_validator: true
```

Load the guide from `.specify/extensions/diagrams/visual-conventions.md` (after
install) or, when running inside this extension repo itself,
`visual-conventions.md` at repo root.

## 2. Resolve the Target File

- If `$ARGUMENTS` is a path to a `spec.md` / `plan.md` / `tasks.md` /
  `constitution.md` / `checklist.md`, use it.
- Else pick the most recently modified matching file under `specs/` (recursive,
  including nested scoped layouts), filtered by which `artifacts.*` flags are
  true. If the hook event is known (`after_specify` → `spec.md`, `after_plan` →
  `plan.md`, `after_tasks` → `tasks.md`), prefer that basename.
- If none found, report nothing to do and stop successfully.

## 3. Read the Target and Upsert Visuals

Read the target. For each visual listed below that the **filled content actually
earns** (guide rule 5: omit when a list/tree/existing table is already clearer;
rule 6: delete spare nodes, never leave `US3` dangling), upsert between HTML
comment markers. If a marker pair already exists, replace only the interior. If
the section is empty or not present in the file, skip that visual.

Place each pair **inside** the matching template section, immediately after the
section heading. Do not append an annex at the document edge.

## 4. Marker Contract

Exact HTML comment pair:

`<!-- SPECKIT DIAGRAM:<id> START -->` … content … `<!-- SPECKIT DIAGRAM:<id> END -->`

| Artifact | Marker id | Form | Named question (title line above the fence or table) |
|---|---|---|---|
| spec.md | `story-map` | Patton story-map **table** (not a US1→US2 chain) | Which slice is a viable end-to-end MVP? |
| spec.md | `example-map` | Example Mapping **table** | Which rules still lack an example, and which questions block this story? |
| spec.md | `edge-cases` | Decision **table** | Which boundaries have defined behavior and a test? |
| spec.md | `traceability` | Traceability **table**; missing links as `GAP` | Which requirements have no story or no success measure? |
| spec.md | `key-entities` | `erDiagram` if 2+ related data entities; else EventStorming-style `flowchart LR` (at most three kinds) for a process feature; omit if neither | Which entities relate, and with what cardinality? |
| spec.md | `scorecard` | Scorecard **table** | How does each success criterion move from baseline to target? |
| spec.md | `assumptions` | Typed register **table** | Which assumptions, if false, break this spec? |
| spec.md | `impact-map` | Optional `flowchart TD` four-rank impact map; skip unless the goal→deliverable link is unclear | Which deliverables actually move SC-001? |
| plan.md | `constitution-matrix` | Compliance **table** (not a principle-chain flowchart) | Does this plan pass the constitution, and where is the proof? |
| plan.md | `boundary-map` | `flowchart` with `subgraph` boundaries only if 2+ runtime units; keep the existing fenced `text` tree; never a folder flowchart | Which runtime units does this feature touch, and how? |
| tasks.md | `phase-dag` | `flowchart TD` from **actual** task IDs and dependencies | Which phase blocks every story, and which stories can then run in parallel? |
| constitution.md | `enforcement-matrix` | Enforcement **table** | Which principle is enforced by which gate? |
| constitution.md | `governance-gate` | Small `flowchart TD` | What happens when a change violates a principle? |
| checklist.md | `marker-lifecycle` | `stateDiagram-v2` | What does checking a box mean, and when may implement start? |

## 5. Mermaid Block Rules

Every Mermaid block MUST:

- Have a Markdown title line above the fence phrased as the named question (not a
  `%%` comment).
- Include `accTitle:` inside the fence with the same question.
- Use `classDef` / `class` only. Never `%%{init}%%`, never per-node `style`.
- Reuse this vocabulary (Tol Bright): `fork` `#EE6677`/`#000`; `pass`
  `#228833`/`#fff`; `base` `#4477AA`/`#fff`; `gate` `#CCBB44`/`#000`; `later`
  `#BBBBBB`/`#000`; `event` `#66CCEE`/`#000`. White text only on blue/green/purple;
  dark text on red/yellow/cyan.
- Every `class` / `:::` needs a matching `classDef` and an existing node id.
- Prefer `flowchart` over legacy `graph`. Banned types: `C4Context`,
  `C4Container`, `C4Component`, `mindmap`, `sankey`, `timeline`, `quadrantChart`,
  `journey`, `pie`, `gitGraph`, `block-beta`, `architecture-beta`, `kanban`,
  `xychart-beta`, `gantt`.

## 6. Parse Gate

If `run_validator` is true and `bun` is on PATH, run
`bun .specify/extensions/diagrams/scripts/validate-mermaid.mjs <target>` from the
consuming project root. If bun is missing, report that the parse gate was skipped.
Do not invent a Python mermaid generator.

When running inside this extension repo itself, run
`bun scripts/validate-mermaid.mjs <target>` instead.

## 7. Report

Report which marker ids were written, skipped, or refreshed, and the validator
exit.
