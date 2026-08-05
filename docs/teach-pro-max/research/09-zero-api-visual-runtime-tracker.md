# Prax Teach v2 — Zero-API Visual Runtime Upgrade Tracker

> **Human-readable tracker view · initialized 2026-08-05**  
> Machine source of truth: [`09-zero-api-visual-runtime-tracker.json`](./09-zero-api-visual-runtime-tracker.json)  
> Plan: [`08-zero-api-visual-runtime-upgrade-plan.md`](./08-zero-api-visual-runtime-upgrade-plan.md) · Autonomous goal: [`10-zero-api-autonomous-goal.md`](./10-zero-api-autonomous-goal.md)

## Current state

| Track | Verified | Total | Progress | Claim |
|---|---:|---:|---:|---|
| Engineering | 0 | 36 | 0% | Not started |
| External learner evidence | 0 | 4 | 0% | Waiting for real observations |
| Overall | — | — | — | **NOT_STARTED** |

> A green engineering track supports `ENGINEERING_COMPLETE / SCIENTIFIC_EVIDENCE_PENDING`. Only engineering plus all four genuine external gates supports `UPGRADE_100_PERCENT_VERIFIED`.

## Status key

| Status | Meaning |
|---|---|
| `pending` | Not started or not yet evidenced |
| `in_progress` | One owner is actively working on the atom |
| `blocked` | A concrete engineering dependency or repeated failure prevents progress |
| `waiting_external` | Requires real people, elapsed time, authorization, or another external event |
| `verified` | Acceptance recomputed against the recorded exact bytes |
| `rejected` | Optional experiment failed its keep threshold and was safely removed/deferred |

## Update protocol

The JSON file is canonical. After every acceptance atom:

1. attach evidence paths, commands, exit codes, hashes, HEAD, dirty state, and limitations;
2. change only the completed atom and newly unblocked dependencies;
3. append an audit-log event with timestamp, actor class, old/new status, and reason;
4. recompute counts from criteria—never type percentages by hand;
5. regenerate this Markdown and its HTML companion;
6. validate that the rendered views match the JSON and do not overstate the claim.

No item becomes `verified` from a plan, partial test, stale receipt, reviewer opinion, or another item’s evidence.

## Phase 0 — freeze and no-API foundation

| ID | Criterion | Status | Depends on | Evidence |
|---|---|---|---|---|
| ZV-00 | Freeze and inventory current candidate | `pending` | — | — |
| ZV-01 | Approve runtime-boundary ADR | `pending` | ZV-00 | — |
| ZV-02 | Enforce no-API and no-network architecture | `pending` | ZV-01 | — |
| ZV-03 | Add capability-adaptive execution policy | `pending` | ZV-00 | — |
| ZV-04 | Define lesson and learning-receipt schemas | `pending` | ZV-01 | — |
| ZV-05 | Freeze static baseline and comparison protocol | `pending` | ZV-00 | — |

### Phase 0 exit

- Exact current state and hashes recorded.
- Runtime boundary and rollback approved.
- Any attempted network request fails verification.
- No API, telemetry, remote asset, CDN, or API-key path exists.
- Static behavior and no-script content remain intact.

## Phase 1 — bounded floating-point pilot

| ID | Criterion | Status | Depends on | Evidence |
|---|---|---|---|---|
| ZV-06 | Scaffold independently versioned runtime | `pending` | ZV-01, ZV-02, ZV-04 | — |
| ZV-07 | Implement accessible state-stepper | `pending` | ZV-06 | — |
| ZV-08 | Implement local receipt panel | `pending` | ZV-04, ZV-06 | — |
| ZV-09 | Implement ordered hint state | `pending` | ZV-06 | — |
| ZV-10 | Build Python floating-point pilot | `pending` | ZV-07, ZV-08, ZV-09 | — |
| ZV-11 | Preserve static, no-script, print, and reduced-motion routes | `pending` | ZV-10 | — |
| ZV-12 | Pass pilot browser, accessibility, privacy, and security gates | `pending` | ZV-02, ZV-10, ZV-11 | — |
| ZV-13 | Pilot independent review and stop/go decision | `pending` | ZV-12 | — |

### Phase 1 stop rule

Do not start reusable-MVP work until the complete pilot loop, accessibility engineering gates, receipt round-trip, deterministic build, and exact-byte independent review pass.

## Phase 2 — reusable runtime MVP

| ID | Criterion | Status | Depends on | Evidence |
|---|---|---|---|---|
| ZV-14 | Implement parameter-lab | `pending` | ZV-13 | — |
| ZV-15 | Implement compare-views | `pending` | ZV-13 | — |
| ZV-16 | Harden shared hint engine and deterministic graders | `pending` | ZV-09, ZV-13 | — |
| ZV-17 | Add deterministic lesson builder and manifest | `pending` | ZV-14, ZV-15, ZV-16 | — |
| ZV-18 | Build Rubik’s move laboratory | `pending` | ZV-17 | — |
| ZV-19 | Build lost-update laboratory | `pending` | ZV-17 | — |
| ZV-20 | Prove runtime reuse across three domains | `pending` | ZV-18, ZV-19 | — |
| ZV-21 | Pass full MVP verification | `pending` | ZV-20 | — |

### Phase 2 exit

- Python, Rubik’s, and concurrency use the same public components.
- No lesson-specific core forks disguise an overfit runtime.
- Browser, accessibility, security, privacy, property, deterministic-build, and full tests pass on the same bytes.

## Phase 3 — one Lean build-time experiment

| ID | Criterion | Status | Depends on | Evidence |
|---|---|---|---|---|
| ZV-22 | Approve one-experiment Lean ADR | `pending` | ZV-21 | — |
| ZV-23 | Implement pinned build-time Lean adapter | `pending` | ZV-22 | — |
| ZV-24 | Build proof-state lesson with static equivalent | `pending` | ZV-23 | — |
| ZV-25 | Make evidence-based Lean keep-or-revert decision | `pending` | ZV-24 | — |

### Phase 3 rule

`rejected` is a successful experimental outcome when the adapter fails the declared value threshold and is cleanly removed while the generic formal-receipt boundary remains valid. Do not keep Lean merely because it was expensive to build.

## Phase 4 — evaluation machinery and real evidence

### Engineering preparation

| ID | Criterion | Status | Depends on | Evidence |
|---|---|---|---|---|
| ZV-26 | Predeclare evaluation protocol | `pending` | ZV-05, ZV-21 | — |
| ZV-27 | Implement evaluation capture and analysis | `pending` | ZV-26 | — |
| ZV-28 | Prepare representative accessibility field protocol | `pending` | ZV-12, ZV-21, ZV-26 | — |
| ZV-29 | Prepare immediate, delayed, and transfer study operations | `pending` | ZV-26, ZV-27 | — |

### External observations

| ID | Criterion | Status | Depends on | Evidence |
|---|---|---|---|---|
| EG-ZV-01 | Representative accessibility field evidence | `waiting_external` | ZV-28 | — |
| EG-ZV-02 | Immediate learner-outcome evidence | `waiting_external` | ZV-29 | — |
| EG-ZV-03 | Delayed 7–14 day retention evidence | `waiting_external` | EG-ZV-02 | — |
| EG-ZV-04 | Novel-transfer and generalization evidence | `waiting_external` | EG-ZV-03 | — |

These four rows can be satisfied only by genuine observations under the frozen protocol. Fixtures may test the machinery but may never update these rows to `verified`.

## Phase 5 — optional integrations, final verification, and packaging

| ID | Criterion | Status | Depends on | Evidence |
|---|---|---|---|---|
| ZV-30 | Gate optional SkillOpt, Flint, and future adapters | `pending` | ZV-27 | — |
| ZV-31 | Synchronize canonical documentation and HTML | `pending` | ZV-25, ZV-29, ZV-30 | — |
| ZV-32 | Run independent code and architecture review | `pending` | ZV-21, ZV-25, ZV-31 | — |
| ZV-33 | Run clean-room full verification | `pending` | ZV-32 | — |
| ZV-34 | Create immutable candidate package and rollback receipt | `pending` | ZV-33 | — |
| ZV-35 | Issue truthful completion and promotion handoff | `pending` | ZV-34 | — |

## Completion decision table

| State | Engineering | External gates | Allowed statement |
|---|---|---|---|
| Not started | Incomplete | Incomplete | “The upgrade is planned and tracked.” |
| Candidate in progress | Incomplete | Any | “Implementation is in progress; listed evidence only.” |
| Engineering complete | 36/36 verified | Fewer than 4/4 | “Engineering complete; scientific evidence pending.” |
| Experiment rejected | All mandatory criteria verified; optional adapter rejected by rule | Any | “Core complete; optional experiment did not earn inclusion.” |
| 100% verified | 36/36 verified on exact clean HEAD | 4/4 genuine gates verified | “Upgrade 100% verified within the predeclared scope.” |

## Human authorization gates

The autonomous loop must stop and request approval before:

- merging or pushing;
- deploying or publishing;
- installing/replacing the canonical skill;
- changing global configuration;
- spending API credits or enabling metered services;
- recruiting or contacting external participants;
- deleting material data or touching unrelated dirty work.

Local branch/worktree edits, project-scoped open-source dependencies, local tests, local browser binaries, documentation, local commits, and candidate packaging are within the implementation scope when current policy permits them.

## Next executable atom

`ZV-00 — Freeze and inventory current candidate`

The paste-ready command in [`10-zero-api-autonomous-goal.md`](./10-zero-api-autonomous-goal.md) starts there, re-checks current state rather than trusting this snapshot, and advances only through dependency-unblocked criteria.
