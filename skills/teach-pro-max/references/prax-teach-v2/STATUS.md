# Prax Teach v2 release status

## Short answer

`prax-teach-v2` declares itself **pre-release** inside the reviewed tree. An
engineering-candidate claim is established only when the predeclared immutable
review and full-verification receipts recompute against those exact bytes and a
clean-HEAD packaging event produces its sibling release receipt. This is not a
scientifically supported claim that the system teaches better, it is not field-
accessibility evidence, and it is not the canonical installed replacement.

The machine-readable source for this page is [STATUS.json](./STATUS.json).

## North Star

> The learner can later retrieve, explain, apply, discriminate, and transfer the
> idea without the tutor—and the system can show honest evidence for that claim.

| Question | Answer |
|---|---|
| Is the North Star encoded in tutoring, state, scheduling, evaluation, and study machinery? | Yes |
| Is the locally executable machinery needed to collect and analyze that evidence implemented? | Yes |
| Has real delayed learner evidence demonstrated the North Star? | **No** |

No public fixture, synthetic study, agent output review, scheduler smoke, Flint
render, or SkillOpt import may be promoted into a human-learning claim.

## Blueprint phase closure

| Phase | Phase-wide evidence floor | What exists now | What remains external or conditional |
|---|---|---|---|
| 0 — Freeze and measure | Specified | Frozen source fingerprints and inventory; executable evaluator; forbidden-behavior gates | Matched real-provider trigger, latency, token, and behavior baselines (EG-01) |
| 1 — Minimum lovable tutor | Implemented | Three-mode and **Answer now** routing; attempt-before-explanation; strict post-error hint turn; deterministic renderer with automated accessibility-structure checks; public forward behavior is tracked separately at its higher capability level | Representative browser, assistive-technology, and learner evidence (EG-03) |
| 2 — Durable learner loop | Implemented | Consent-first JSON/JSONL evidence; deterministic concept/misconception projections; causally bound review scheduling; exact correction/invalidation/item deletion; crash-recoverable deletion journal; descriptor-contained export; generation-safe locking; real pinned FSRS with strict replay | Calibration with real learner scheduling outcomes |
| 3 — Evidence and adaptation | Machinery evaluated on public or synthetic inputs | Isolated agent evaluator; randomized blinded study preparation/analysis; hard-gate and uncertainty receipts | Real matched ablations; human immediate/delayed outcomes; calibration; knowledge tracing only if justified |
| 4 — Optional ecosystem adapters | Implemented | Real pinned Flint and SkillOpt boundaries; content-bound measured macOS isolation; Anki, QTI, LiaScript, and H5P exports | Flint learner comparison; measured SkillOpt lift; voice, animation, or classroom modules only for a concrete learning job |

Each phase-wide label is mechanically capped at the weakest declared capability
in that phase. A higher capability-level result remains visible in the table
below but cannot promote the aggregate phase. “Evaluated” in Phase 3 means that
machinery produced reproducible public or synthetic receipts; it does not mean
a learner-outcome study was run.

## Capability evidence levels

| Capability | Evidence level | Claim limit |
|---|---|---|
| Legacy templates and 38-tool visual registry | Implemented | 8 assets are byte-identical or renamed-byte-identical; 4 registry/helper assets are explicitly portability-adapted; 9 registry tests pass; no learner-benefit claim |
| Mode, teaching, and visual behavior | Evaluated | Frozen public rubric passed 8/8 on fresh all-case attempt 10; not held-out quality, provider ablation, field accessibility, or learner outcomes |
| Learner state, correction, deletion, and export | Implemented | Synthetic workspace, crash-recovery, and containment tests; not representative field use |
| FSRS review scheduling | Dependency-exercised | Real `fsrs==6.3.1`, performance-bound ratings, replay validation, and golden vectors; not outcome calibration |
| Markdown-to-HTML artifacts | Implemented | Automated parity, security, and accessibility-structure checks; not browser, WCAG-conformance, or field-accessibility certification |
| Evaluation harness | Evaluated | Public fixture and isolation mechanics; not a completed matched provider ablation |
| Study machinery | Evaluated | Synthetic machinery only; not human evidence |
| Flint adapter | Dependency-exercised | Real compile path; not chart correctness or learning value |
| SkillOpt adapter | Dependency-exercised | Real adapter and measured isolation boundary; not measured optimization gain |
| Anki, QTI, LiaScript, and H5P exports | Implemented | Deterministic validated packages; not universal downstream-host certification |
| Package validation and truthful documentation | Implemented | Fail-closed schema-v2 criterion ledger and artifact checks; final immutable receipts still govern release |
| Full verification | Implemented | Trusted verification orchestration exists; a missing, running outside its bound verifier, or stale receipt cannot support release |
| Independent review | Specified | Exact-payload code, frozen-spec, and architecture-council review contract exists; receipts count only when they recompute against the current payload |
| Immutable package release | Implemented | Clean-HEAD archive gate and sibling-receipt protocol exist; the actual AC-25 event remains pending |
| Delayed independent learning | Scientifically unproven | Requires EG-04 through EG-06 |

## Criterion ledger contract

`STATUS.json` schema version 2 contains exactly one ordered entry for each
`AC-00` through `AC-25`. A criterion state is accepted only when every typed
evidence binding recomputes:

- `path` binds a package-contained regular file to its current SHA-256;
- `receipt` names an allowlisted receipt whose own payload, manifests, and
  current package bytes are independently revalidated; and
- `gate` is valid only for a parked criterion and must resolve to a parked
  `EG-01` through `EG-06` entry with an exact unblock.

Omitted, duplicate, or unknown criteria; undeclared capabilities; missing or
stale evidence; and unbound parked criteria fail the package validator. The
final `AC-22` and `AC-24` receipt paths are predeclared so those receipts can be
generated after the reviewed payload is frozen without editing this ledger and
invalidating the review cycle. `AC-25` remains pending in the committed tree:
the non-circular sibling release JSON is the durable record that closes the
clean-HEAD commit/archive event.

## Forward behavior history

The public AC-23 gate is green only because a complete post-fix rerun passed;
earlier failures were not erased:

| Attempt | Result | Evidence treatment |
|---|---:|---|
| 1 | 5/8 | Failed run and receipt retained |
| 2 | Unscored | Disqualified driver-contaminated draft retained |
| 3 | Reported 8/8 | Ineligible because the complete output corpus was not archived |
| 4 | 6/8 | Failed progressive-hint and resume-fidelity cases retained |
| 5 | Composite 8/8 | Release-ineligible because only two failed cases were rerun |
| 6 | Stopped after 5 cases | Accessibility claim-boundary failure retained; source fixed |
| 7 | 8/8, later invalidated | Passed, then `SKILL.md` and the artifact contract changed; the exact stale-source run is retained |
| 8 | Unscored after 7 cases | Runner prompt confused the read-only package with the learner workspace; retained and rejected |
| 9 | 8/8, later invalidated | Passed, then final visual, isolation, scheduler, and routing remediation changed the exact source bytes; retained and rejected |
| 10 | **8/8** | All eight cases regenerated against the remediated source; all 18 bindings independently verified |

The current lesson transcript contains unassisted diagnosis and discrimination,
an unseen whole-document transfer, a learner-authored teach-back, a later learner
error, exactly one next-needed hint followed by a turn boundary, and scaffolded
repair. Its closing judgment separates unassisted from scaffolded evidence and
explicitly leaves delayed recall untested.
See [forward evidence](./evidence/forward/README.md).

## Accessibility inspection boundary

The in-app browser rejected local-file navigation. The blocked receipt records
zero observed runtime pages and no keyboard, focus, responsive, accessibility
tree, or assistive-technology checks. Automated structure gates passed, but
browser and representative field accessibility remain unverified; EG-03 stays
parked.

## External gates

| Gate | Status | Exact unblock |
|---|---|---|
| EG-01 — Provider ablation | Parked | Run matched no-skill, frozen-`teach`, and candidate trials with external held-out graders |
| EG-02 — SkillOpt gain | Parked | Run a budgeted optimization with repeatable hidden lift above noise and cross-model hard gates |
| EG-03 — Accessibility field evidence | Parked | Manual browser/assistive-technology checks plus representative disabled and neurodivergent learner sessions |
| EG-04 — Immediate learner benefit | Parked | Consented randomized active-control human posttest |
| EG-05 — Delayed North Star | Parked | Blind-scored 7–14-day retention and novel-transfer outcomes |
| EG-06 — Generalization | Parked | Replication across topics, models, learners, accessibility needs, and time |

## What “ready” means

Ready means the package passes the frozen engineering contract, immutable
payload reviews, trusted full verification, and scoped packaging gate. It may
then be explicitly installed as a candidate to run the next evidence stages. It
does **not** mean “best tutor,” “proven to teach better,” “field accessible,” or
“automatic replacement for `prax-teach`.” Those labels remain blocked until the
corresponding evidence gates pass.

See [Operations and evidence guide](./references/OPERATIONS.md) for exact
commands and [Evaluation](./references/EVALUATION.md) for the rollout protocol.
