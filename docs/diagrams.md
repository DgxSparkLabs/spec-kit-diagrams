# Diagram Rules

This rule governs where a committed Mermaid diagram lives and how it is validated.
Style and palette live in `visual-conventions.md` at this repository root (installed
copy: `.specify/extensions/diagrams/visual-conventions.md`). This rule does not restate
them.

## Placement

- A diagram that is part of a specification MUST be inlined as a fenced ` ```mermaid `
  block in the specification file, next to the story or requirement it depicts.
- A diagram whose only purpose is to explain something to a reader in conversation, and
  which is not part of a committed artifact, MUST live in a scratch directory and MUST NOT
  be committed.
- The repository MUST NOT carry standalone `.mmd` files as the source of a committed
  diagram; the fenced block in the Markdown file is the single source.

## Style

- A diagram MUST NOT carry a `%%{init}%%` directive; use Mermaid's default theme and set
  colors through `classDef` and `class` only.

## Non-Rendering Validation Gate

Diagrams are validated by parsing, not by rendering. `scripts/validate-mermaid.mjs` parses
every fenced Mermaid block through `mermaid.parse()` under a headless DOM shim; it needs no
browser and produces no image. The toolchain is pinned inside the script and installs once
into a temporary cache.

- Run the gate before committing a change that adds or edits a diagram. With no arguments
  it validates every tracked Markdown file; pass explicit paths to narrow it:

```
bun scripts/validate-mermaid.mjs
```

  The gate also fails any block carrying a `%%{init}%%` directive, so the Style ban above
  is enforced, not advisory.

- The gate MUST report every extracted block and MUST exit non-zero if any block fails to
  parse. A partial count, for example twenty-six blocks reported when twenty-seven exist,
  is a gate defect, not a pass.
- Every `class` or `:::` reference in a diagram MUST have a matching `classDef`, and every
  classed node id MUST exist; an undefined reference silently creates a stray empty node
  that a parse alone will not catch, so review the class assignments as well.
- The gate's contract tests live in `scripts/validate-mermaid.test.mjs` and run under
  `bun test`.
- Changing a pinned tool version in the script is a reviewed change, like any other pin.
