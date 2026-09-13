# Continue Here

This file is the handoff from the org-factory session that published this
extension. Open this repository as the workspace. Do not put further diagram
research, prior-art reports, or session notes back into org-factory.

## Where things are

| What | Path |
|---|---|
| Prior-art inventory (39 extensions) | `docs/research/prior-art/inventory.md` |
| Prior-art consensus report | `docs/research/prior-art/report.md` |
| This publish + Q&A + prior-art session | `docs/research/sessions/2026-09-12-publish-and-prior-art/session.jsonl` |
| PriorArtReviewer subagent transcript | `docs/research/sessions/2026-09-12-publish-and-prior-art/PriorArtReviewer.jsonl` |
| Earlier extension-design session | `docs/research/sessions/2026-09-12-extension-design/session.jsonl` |

Session JSONL files are local only (gitignored). They are not on GitHub.

## State of the extension

- Public repo: https://github.com/DgxSparkLabs/spec-kit-diagrams
- `main` at the automatic-hook change: `optional: false` on
  `after_specify` / `after_plan` / `after_tasks` (version 1.1.0 in
  `extension.yml`). Tag `v1.0.0` still has `optional: true`.
- `--dev` CLI (specify 1.0.5): `specify extension add --dev <path>`
  not `specify extension add diagrams --dev <path>`.
- `--force` reinstall in org-factory failed: the `--dev` copy under
  `.specify/extensions/diagrams` includes a nested `.git` and Windows
  locked objects.

## What stayed in org-factory (do not move)

- `.specify/templates/visual-conventions.md` (stub pointing here)
- `.agents/rules/diagrams.md` (org-factory parse gate)
- `scripts/validate-mermaid.mjs` and its tests (org-factory CI)
- `--dev` install under `.specify/extensions/` (local, uncommitted)

## Consensus locks (from the report)

1. Keep in-section agent fill + parse gate. No catalog extension ships that layout.
2. Keep `<!-- SPECKIT DIAGRAM:<id> START/END -->`.
3. `gantt` stays banned.
4. Parse skipped is not passed.
5. `optional: false` stays. Co-install YAML order is not locked.
6. Do not co-install `ascii-diagram` on the same hooks.

## Original session ids

- Publish / Q&A / prior art: `01a0979b-db29-7429-b0fd-6a4e09d75d03`
  (cwd was `C:\Users\devic\source\org-factory`)
- Extension design: `01a096fc-c44a-7690-bc84-76abe5d1ec4c`
