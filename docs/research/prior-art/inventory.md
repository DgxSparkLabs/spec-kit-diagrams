# Inventory: Spec Kit extensions (visualization / diagrams / process transparency)

Catalog date: community `catalog.community.json` updated_at 2026-09-11.
Official community listing: https://github.github.com/spec-kit/community/extensions.html
Catalog JSON: https://github.com/github/spec-kit/blob/main/extensions/catalog.community.json
Discussion (not an extension): https://github.com/github/spec-kit/discussions/694
Local unpublished: https://github.com/DgxSparkLabs/spec-kit-diagrams (v1.1.0 on main)

Inclusion rule: visualization/diagrams (Mermaid, ASCII, architecture views, wireframes, storybooks, maps) OR process transparency (visibility of SDD state, progress, traceability, evidence, honest gates). Exclude generic Jira/Linear sync, language stacks, and worktrees unless they also visualize or evidence the process.

## A. Visualization and diagrams

| # | Catalog id | Name | Repo | Category / effect | Why included |
|---|---|---|---|---|---|
| 1 | *(not in community catalog)* | Spec Kit Diagrams | https://github.com/DgxSparkLabs/spec-kit-diagrams | docs / agent-authored | In-section Mermaid + tables after specify/plan/tasks; parse gate |
| 2 | diagram | Spec Diagram | https://github.com/Quratulain-bilal/spec-kit-diagram- | visibility / read-only | Auto Mermaid of SDD workflow, feature Gantt, task DAG |
| 3 | ascii-diagram | ASCII Diagram Renderer | https://github.com/MRZHUH/spec-kit-ascii-diagram | docs / read-write | ASCII/Unicode diagrams of spec/plan/tasks; no Mermaid |
| 4 | data-model-diagram | Data Model Diagram | https://github.com/benizzio/spec-kit-data-model-diagram | docs / read-write | Mermaid ER from data models after planning |
| 5 | arch | Architecture Workflow | https://github.com/bigsmartben/spec-kit-arch | docs / read-write | 4+1 architecture views |
| 6 | atlas | Atlas | https://github.com/ashbrener/spec-kit-atlas | docs / read-only | Interactive architecture storybooks |
| 7 | blueprint-index | Blueprint Index | https://github.com/ogil109/spec-kit-blueprint | process / read-write | Living architecture map + CI gate |
| 8 | preview | Spec Kit Preview | https://github.com/bigsmartben/spec-kit-preview | docs / read-write | Evidence-backed HTML/Markdown previews |
| 9 | tldr | Spec Kit TLDR | https://github.com/qurore/speckit-tldr | visibility / read-write | HTML dashboard + PR Markdown risk TLDR |
| 10 | wireframe | Wireframe Visual Feedback Loop | https://github.com/TortoiseWolfe/spec-kit-extension-wireframe | visibility / read-write | SVG wireframes become spec constraints |
| 11 | axi | Axi | https://github.com/d0whc3r/spec-kit-axi | docs / read-write | Browser review surface for feature markdown |

## B. Process transparency (status, evidence, gates)

| # | Catalog id | Name | Repo | Category / effect | Why included |
|---|---|---|---|---|---|
| 12 | status | Project Status | https://github.com/KhawarHabibKhan/spec-kit-status | visibility / read-only | SDD phase/progress summary |
| 13 | status-report | Status Report | https://github.com/Open-Agent-Tools/spec-kit-status | visibility / read-only | Status + next actions |
| 14 | doctor | Project Health Check | https://github.com/KhawarHabibKhan/spec-kit-doctor | visibility / read-only | Diagnose structure/agents/features |
| 15 | analytics | Analytics | https://github.com/Fyloss/spec-kit-analytics | visibility / read-write | Measure what AI builds / time saved |
| 16 | cost | Cost Tracker | https://github.com/Quratulain-bilal/spec-kit-cost | visibility / read-write | LLM dollar cost |
| 17 | companion | SpecKit Companion | https://github.com/alfredoperez/speckit-companion | process / read-write | Live progress, resume, living specs |
| 18 | speckit-inventory | Spec Inventory | https://github.com/Yash-Chindam/spec-kit-inventory-alignment | visibility / read-only | Live requirement/task IDs |
| 19 | trace | Spec Trace | https://github.com/Quratulain-bilal/spec-kit-trace | code / read-write | Requirement → test matrix |
| 20 | specassay-check | SpecAssay Check | https://github.com/rdryfoos/specassay | visibility / read-write | Refuses silent gaps; trace-manifest.json |
| 21 | architect-preview | Architect Impact Previewer | https://github.com/UmmeHabiba1312/spec-kit-architect-preview | visibility / read-only | Impact/complexity before implement |
| 22 | whatif | What-if Analysis | https://github.com/DevAbdullah90/spec-kit-whatif | visibility / read-only | Downstream impact of requirement changes |
| 23 | blueprint | Blueprint | https://github.com/chordpli/spec-kit-blueprint | docs / read-write | Code blueprint before implement |
| 24 | onboard | Onboard | https://github.com/dmux/spec-kit-onboard | process / read-write | Explains specs, maps dependencies |
| 25 | adrkit | adrkit | https://github.com/mbeacom/adrkit | process / read-write | Decision memory vs plans |
| 26 | memorylint | MemoryLint | https://github.com/RbBtSn0w/spec-kit-extensions | process / read-write | Instruction drift evidence |
| 27 | superb | Superpowers Bridge | https://github.com/RbBtSn0w/spec-kit-extensions | process / read-write | Evidence-first trust gates |
| 28 | gates | Quality Gates | https://github.com/schwichtgit/spec-gates | process / read-write | One policy, identical verify at every boundary |
| 29 | docguard | DocGuard | https://github.com/raccioly/docguard | docs / read-write | Deterministic doc-vs-code trace |
| 30 | ci-guard | CI Guard | https://github.com/Quratulain-bilal/spec-kit-ci-guard | process / read-only | Spec exist/drift merge gate |
| 31 | plan-review-gate | Plan Review Gate | https://github.com/luno/spec-kit-plan-review-gate | process / read-only | spec+plan merged before tasks |
| 32 | v-model | V-Model Extension Pack | https://github.com/leocamello/spec-kit-v-model | docs / read-write | Paired dev/test specs, full traceability |
| 33 | evaluator | Evaluator Contract | https://github.com/electrohire/spec-kit-evaluator | process / read-write | Evidence, provenance, uncertainty |
| 34 | patchwarden-evidence | PatchWarden Evidence Pack | https://github.com/jiezeng2004-design/spec-kit-patchwarden | process / read-write | Traceable evidence pack |
| 35 | pdac | Product Definition as Code | https://github.com/juangcarmona/productshape | process / read-write | Cited product definition, verify citations |
| 36 | verify-tasks | Verify Tasks | https://github.com/datastone-inc/spec-kit-verify-tasks | code / read-only | Phantom `[X]` detections |
| 37 | vurnix | Vurnix Honest Gate | https://github.com/shiersa/vurnix-spec-kit | process / read-only | PASS/BLOCK/UNPROVEN as code |
| 38 | red-team | Red Team | https://github.com/ashbrener/spec-kit-red-team | docs / read-write | Adversarial spec review, no auto-edits |
| 39 | retro | Retro Extension | https://github.com/arunt14/spec-kit-retro | process / read-write | Sprint retro + spec accuracy |

## Locked constraints (this work)

- Spec Kit extension; do not fork core templates (`speckit.manifest.json` hash-clean).
- Agent authors in-section Mermaid + lookup tables; not a Python Mermaid generator.
- HTML markers `<!-- SPECKIT DIAGRAM:<id> START/END -->`.
- Mermaid parse gate (`mermaid.parse`, ban `%%{init}%%`).
- Hooks `after_specify` / `after_plan` / `after_tasks` now `optional: false`.
- Palette: Paul Tol Bright `classDef` only.
- GitHub-native Mermaid; banned experimental types including `gantt`.

## Books already cited in visual-conventions.md (public URLs only)

Patton User Story Mapping; Adzic Impact Mapping + Specification by Example; Wynne Example Mapping; Martraire Living Documentation; Brandolini EventStorming; Cockburn Walking Skeleton; Nygard ADR; Gawande Checklist Manifesto; ISO/IEC/IEEE 29148 and 42010; Bertin; Cleveland/McGill; Heer/Bostock; Tufte; Ware; Wilke; Paul Tol; Simon Brown C4; arc42; Kruchten 4+1; GitHub creating-diagrams docs; Mermaid docs; Spec Kit discussion 694.
