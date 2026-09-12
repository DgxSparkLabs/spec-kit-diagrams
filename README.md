# Spec Kit Diagrams

Adds in-section Mermaid diagrams and lookup tables after each Spec Kit phase.

Published under
[https://github.com/DgxSparkLabs/spec-kit-diagrams](https://github.com/DgxSparkLabs/spec-kit-diagrams).

## Why It Exists

Spec Kit's spec, plan, and tasks files describe structures the reader otherwise
rebuilds in their head: a release map, a dependency graph, an entity model, a
governance gate. This extension does not fork those templates. After
`/speckit.specify`, `/speckit.plan`, and `/speckit.tasks`, Spec Kit instructs
the agent to run `/speckit.diagrams.render`. The agent fills marker-delimited
blocks from `visual-conventions.md`.

Hook dispatch is best-effort agent compliance. Core command markdown emits
`EXECUTE_COMMAND`; emitting that block alone does not run the hook. Pair the
automatic hooks with the mermaid parse gate described below.

## Prerequisites

- A project already initialized with `specify init`.
- Spec Kit `>=1.0.0`.
- Optional: [bun](https://bun.sh) for the parse gate.

## Install

Opt-in is per project. Three commands, in this order of simplicity:

```bash
# 1. From a tagged GitHub source archive (no extra packaging)
specify extension add diagrams --from https://github.com/DgxSparkLabs/spec-kit-diagrams/archive/refs/tags/v1.0.0.tar.gz

# 2. Local clone while developing the extension
specify extension add diagrams --dev /path/to/spec-kit-diagrams

# 3. After adding a catalog you own (search-by-name). Not required for v1.
specify extension catalog add <catalog-url> --name dgxsparklabs --install-allowed
specify extension add diagrams
```

There is no git-clone install source. `--from` accepts ZIP or tar.gz. GitHub
tag and branch archives work because the installer finds `extension.yml` under
the single top-level `<repo>-<ref>/` directory.

### What Install Does

- Records `diagrams` in `.specify/extensions.yml` (hooks) and
  `.specify/extensions/.registry` (`enabled: true`).
- Copies the command into the active agent's command or skill directory.
- Copies `diagrams-config.template.yml` toward `diagrams-config.yml`.

### Disable Without Removing

```bash
specify extension disable diagrams
specify extension enable diagrams
```

Disabled: hooks are not loaded. Leftover `<!-- SPECKIT DIAGRAM:… -->` blocks in
specs stay as-is.

## Two Ways to Use It

### After a Spec Kit Phase

Run `/speckit.specify`, `/speckit.plan`, or `/speckit.tasks`. Spec Kit then
instructs the agent to run `/speckit.diagrams.render` (`optional: false`). The
agent authors the visuals for that artifact. To skip, disable the extension.

### Manual Run

`/speckit.diagrams.render` (or the integration's skill form). Pass a path to a
`spec.md`, `plan.md`, or `tasks.md` as the argument, or let the command pick the
most recently modified matching file under `specs/`.

## Confidence

Hooks are automatic (`optional: false`). They are not a guarantee. Pair with CI:

```bash
# Consuming project after install
bun .specify/extensions/diagrams/scripts/validate-mermaid.mjs

# This repository
bun scripts/validate-mermaid.mjs
```

The gate parses every fenced mermaid block and fails `%%{init}%%`. It is the
deterministic backstop.

## Marker Contract

Each visual lives inside the matching template section, immediately after the
section heading, between this pair:

```html
<!-- SPECKIT DIAGRAM:<id> START -->
… content …
<!-- SPECKIT DIAGRAM:<id> END -->
```

If a marker pair already exists, the command replaces only the interior.

| Artifact | Marker id | Form | Named question |
|---|---|---|---|
| spec.md | `story-map` | Patton story-map table | Which slice is a viable end-to-end MVP? |
| spec.md | `example-map` | Example Mapping table | Which rules still lack an example, and which questions block this story? |
| spec.md | `edge-cases` | Decision table | Which boundaries have defined behavior and a test? |
| spec.md | `traceability` | Traceability table; missing links as `GAP` | Which requirements have no story or no success measure? |
| spec.md | `key-entities` | `erDiagram` or EventStorming `flowchart LR` | Which entities relate, and with what cardinality? |
| spec.md | `scorecard` | Scorecard table | How does each success criterion move from baseline to target? |
| spec.md | `assumptions` | Typed register table | Which assumptions, if false, break this spec? |
| spec.md | `impact-map` | Optional four-rank `flowchart TD` | Which deliverables actually move SC-001? |
| plan.md | `constitution-matrix` | Compliance table | Does this plan pass the constitution, and where is the proof? |
| plan.md | `boundary-map` | `flowchart` with `subgraph` boundaries | Which runtime units does this feature touch, and how? |
| tasks.md | `phase-dag` | `flowchart TD` from actual task IDs | Which phase blocks every story, and which stories can then run in parallel? |
| constitution.md | `enforcement-matrix` | Enforcement table | Which principle is enforced by which gate? |
| constitution.md | `governance-gate` | Small `flowchart TD` | What happens when a change violates a principle? |
| checklist.md | `marker-lifecycle` | `stateDiagram-v2` | What does checking a box mean, and when may implement start? |

## Palette and classDef

Reuse the Tol Bright `classDef` vocabulary in
[visual-conventions.md](visual-conventions.md). Placement, the `%%{init}%%` ban,
and the parse gate live in [docs/diagrams.md](docs/diagrams.md).

## License

MIT. See [LICENSE](LICENSE).
