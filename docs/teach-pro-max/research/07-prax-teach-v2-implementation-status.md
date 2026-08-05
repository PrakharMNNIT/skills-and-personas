# Prax Teach v2 — final implementation and release status

_Engineering release snapshot: 2026-08-05._

## Outcome

`prax-teach-v2` is complete as a **reviewed, reproducibly packaged engineering candidate** for every locally reachable requirement in the frozen blueprint and rollout contract.

It is not installed and has not replaced canonical `prax-teach`. It is also not scientifically proven to improve real learners. Those are separate decisions and evidence stages.

| Release fact | Verified value |
|---|---|
| Candidate commit | `8c26440a0402c88c366d68d680aef2b3fe20fc7c` |
| Reviewed payload | 337 files; payload SHA-256 `23ea646a9e92c2d11f6fd8c17b8c42b467392d16ed5b23a7e57e515cac8e9439` |
| Payload manifest | SHA-256 `0891015a8444d1dbee389191cff2e5913fc77e9e808afb057e108d887db740d9` |
| Release archive | [prax-teach-v2-8c26440a0402.zip](./prax-teach-v2-8c26440a0402.zip) |
| Archive SHA-256 | `c25625c1112d33c125df8c7866c0b00e16ed799dd849d71f96f353a74ec9e992` |
| Reproducibility | A second independent build is byte-for-byte identical |
| Archive inventory | 343 entries, immutable Git blobs plus `PACKAGE-MANIFEST.json`; no `.git` |
| Installation / replacement | Not performed |

The non-circular [release receipt](./prax-teach-v2-8c26440a0402.release.json) records the commit and archive digest outside the committed candidate. The committed `STATUS.json` intentionally leaves AC-25 pending because writing an archive digest back into the reviewed tree would invalidate the exact-payload and full-verification bindings; the sibling receipt closes the actual packaging event.

## Blueprint phases

The local engineering portion of every phase is implemented or exercised at its declared evidence level. Parked external outcomes are not silently promoted.

| Blueprint phase | Final local state | What is present | What remains external |
|---|---|---|---|
| Phase 0 — freeze and measure | **Implemented** | Complete baseline/provenance inventory, behavior rubric, evaluator, forbidden-behavior gates | Matched real-provider ablation, EG-01 |
| Phase 1 — minimum lovable tutor | **Evaluated on public forward cases** | Quick/lesson/course and **Answer now** routing, teaching kernel, progressive hints, deterministic Markdown/HTML, public fresh-context behavior evaluation | Representative learner and assistive-technology evidence, EG-03 |
| Phase 2 — durable learner loop | **Dependency-exercised** | Consent-first event state, causal correction/invalidation/deletion, deterministic projections, learner export, real FSRS 6.3.1 scheduling and controls | Real-learner scheduling calibration |
| Phase 3 — evidence and adaptation | **Machinery evaluated on public or synthetic inputs** | Isolated agent evaluator, randomized/blinded study preparation and analysis, hard gates, uncertainty and integrity receipts | Provider ablation and human immediate/delayed outcomes, EG-01 and EG-04–05 |
| Phase 4 — ecosystem adapters | **Dependency-exercised** | Real guarded SkillOpt and Flint paths; deterministic Anki, QTI, LiaScript, and H5P exports | Measured SkillOpt lift, Flint learning comparison, and only job-justified future modules, EG-02 |

## What was actually added

- An executable mode and visual router with ordinary-task exclusion and an explicit direct-answer override.
- A nine-step teaching loop that uses attempt, progressive hints, precise feedback, retrieval, discrimination, unseen transfer, and cautious mastery language.
- Consent-first learner state with append-only observations, provenance, deterministic concept/misconception projections, correction, invalidation, scoped physical deletion, and inspectable export.
- A pinned real FSRS scheduler with deterministic replay and learner-controlled snooze, reschedule, disable, and enable operations.
- A deterministic, sanitized Markdown-to-HTML pipeline with 94 exact companions, atomic publication, link and asset containment, accessibility-structure checks, and reduced-motion support.
- Isolated agent evaluation and blinded learner-study machinery with hard-gate-first scoring and honest synthetic/public evidence labels.
- Guarded real-dependency SkillOpt and Flint adapters plus deterministic Anki text, QTI 2.2, LiaScript, and H5P exports.
- All 12 inventoried legacy `prax-teach` assets: four workspace templates, visualization research/router/registry documentation, the 38-tool registry, query helper, registry tests, and SVG/PNG router illustrations, each with provenance.
- Exact-payload review receipts, a schema-v3 full-verification receipt, and immutable Git-blob packaging with a non-circular sibling release receipt.

## Evaluation history

Forward behavior was not declared green from a partial rerun. The current attempt is a complete post-fix rerun across eight distinct fresh child tasks:

- 8/8 cases passed;
- all 34 required checks passed;
- all 24 forbidden behaviors were absent;
- 18 rubric, run, source, context, and output hash bindings validated;
- run SHA-256: `4333267f7bd83f3ddac3c6615236024979838d1771521deddb0bb881959091d5`.

Earlier failures and disqualified composites remain archived rather than erased. Attempt 9 is retained as passed and then explicitly invalidated by later code changes; attempt 10 is the current forward receipt.

## Independent review

All reviews bind the same exact 337-file payload:

| Review | Result |
|---|---|
| Code quality and standards | Passed; a high-severity ancestor-swap pathname race was found, fixed with descriptor-anchored I/O, reproduced as closed, and rechecked after the verifier lifecycle repair |
| Frozen blueprint/specification | Passed; phases, deliverables, assets, acceptance criteria, claim floors, and EG-01–EG-06 boundaries were covered |
| Architecture council | Aristotle, Ada, and Feynman independently passed; anti-conformity rounds found no remaining actionable defect; a separate non-deliberating chair synthesized the unanimous result |
| Receipt/process separation | Passed; reviewer, three panelists, chair, code reviewer, and spec reviewer have distinct recorded task identities; the receipt explicitly does not claim cryptographic authorship |

## Trusted verification

The final verifier ran outside the nested sandbox so its mandatory macOS isolation tests could execute rather than skip.

| Gate | Result |
|---|---:|
| Python suite | **210 passed, 0 skipped** |
| Node suite | **19 passed, 0 skipped** |
| Legacy visualization registry tests | **9 passed** |
| Registry inventory | **38 tools** |
| Markdown/HTML exact parity | **94/94 pairs** |
| Full workspace validator | **Passed, 0 errors** |
| Artifact security counts | **0** dangerous tags, event handlers, unsafe URLs, external assets, missing alt text, and duplicate IDs |
| Ruff lint | **Passed** |
| Ruff format | **51 files formatted** |
| SkillOpt source | Exact clean commit `e4ea6a6771e797ef820cdd8bfea64c57e0481065` exercised |
| Verifier final postflight | **Passed** |

The verifier itself initially exposed a lifecycle-ordering defect: it published `passed` before the required postflight field existed. That state was rejected. The verifier now keeps a run-bound `running` receipt through postflight and publishes `passed` only after successful validation. The replacement payload was re-reviewed before the final green run.

## North Star — exact answer

The North Star remains:

> The learner can later retrieve, explain, apply, discriminate, and transfer the idea without the tutor—and the system can show honest evidence for that claim.

| Question | Answer |
|---|---|
| Is that outcome encoded in the tutoring design? | **Yes** |
| Is machinery present to collect, schedule, analyze, export, and audit relevant evidence? | **Yes** |
| Has a real delayed learner study demonstrated it? | **No** |
| May this package be called the best tutor or scientifically supported? | **No** |

EG-01 through EG-06 remain parked: provider ablation, measured SkillOpt gain, representative accessibility evidence, immediate human benefit, delayed retention/novel transfer, and generalization. The package is designed to produce honest evidence for those questions; it cannot manufacture that evidence from tests, synthetic fixtures, scheduler transitions, or agent judgments.

## Final disposition

The engineering candidate is ready for a deliberate installation/replacement decision or for the next external evidence program. No install, canonical-skill replacement, push, deployment, provider optimization campaign, or human study was performed as part of this release.
