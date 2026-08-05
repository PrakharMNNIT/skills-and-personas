# SkillOpt and Flint integration decision

_Current-candidate audit: 2026-08-05. Upstream product facts use the candidate's verified 2026-08-04 snapshot. “Dependency-exercised” below means real pinned dependency code ran through the local adapter; it does not mean the integration improved tutoring or human learning._

## Decision

Keep both integrations, at different optional boundaries:

| Project | Boundary | Current local evidence | What is still unproved |
|---|---|---|---|
| [Microsoft Flint](https://github.com/microsoft/flint-chart) | Build-time static chart compiler behind the visual router | **Dependency-exercised:** the real compiler and renderer produced a synthetic SVG smoke bundle through the package adapter | Chart correctness, representation benefit, field accessibility, and learner benefit |
| [Microsoft SkillOpt](https://github.com/microsoft/SkillOpt) | Offline `SKILL.md` proposal generator outside the live tutor | **Dependency-exercised:** the real `EnvAdapter`, upstream train/eval registration, and measured macOS sandbox path ran; the five-bank contract was bound to synthetic documents and only synthetic `test` is recorded as exercised | Any optimization gain, cross-model improvement, safe adoption, or learner benefit |
| Score staging helper | Quarantine boundary after a future SkillOpt run | **Implemented and test-covered:** exact schema and byte-binding checks can produce a quarantined proposal receipt | No real proposal has been staged; the supplied score would remain self-attested and ineligible for evidence or adoption |

Neither integration participates in ordinary quick-mode tutoring. Neither may be promoted into “better tutor,” learner-gain, retention, transfer, accessibility-field, or scientific-support language. The candidate's authoritative evidence boundary is in [release status](./prax-teach-v2/STATUS.md).

The integration code is now part of the immutable reviewed release candidate at commit `8c26440a0402c88c366d68d680aef2b3fe20fc7c`. Trusted full verification exercised the exact SkillOpt 0.2.0 source at commit `e4ea6a6771e797ef820cdd8bfea64c57e0481065`, including the mandatory macOS isolation cases. The reproducible package gate passed; this strengthens the engineering evidence, but it does not change any learner-outcome claim.

## The important correction

The integrations are no longer documentation-only, and they are not completed outcome experiments.

```text
specified -> implemented -> dependency-exercised -> evaluated -> scientifically supported
                              ^
                         Flint and SkillOpt
```

For Flint, a real compile/render path ran. For SkillOpt, a real upstream adapter and isolation boundary ran. The candidate has **not** run a budgeted SkillOpt optimization, established repeated hidden lift, compared Flint with a table for learners, or collected human outcomes. Those are different evidence stages.

## Flint: the dependency-exercised chart boundary

Flint lets an author express source rows, semantic field types, chart type, and encodings, then compile that intent to a backend specification. The verified 0.4.1 JavaScript packages expose Vega-Lite, ECharts, Chart.js, Plotly, and Excel compilation surfaces; the MCP package adds validation, compilation, preview, and supported static rendering. See the upstream [README](https://github.com/microsoft/flint-chart/blob/main/README.md), [API reference](https://github.com/microsoft/flint-chart/blob/main/docs/api-reference.md), [core manifest](https://github.com/microsoft/flint-chart/blob/main/packages/flint-js/package.json), and [MCP manifest](https://github.com/microsoft/flint-chart/blob/main/packages/flint-mcp/package.json).

Prax Teach still decides whether a visual is warranted. Flint becomes eligible only after the router chooses `static` for an exact quantitative job and a semantic table is insufficient. Availability never turns a `none` decision into a chart. The policy is in [Flint charts](./prax-teach-v2/references/FLINT-CHARTS.md) and the executable route is in [routing.py](./prax-teach-v2/scripts/praxteach/routing.py).

### What the adapter actually does

The [Flint adapter](./prax-teach-v2/integrations/flint/render_flint.mjs):

- imports and calls the real `flint-chart-mcp` validation, assembly, and SVG-rendering path;
- accepts reviewed inline rows only and rejects remote or file references;
- bounds input size, rows, columns, text, dimensions, values, and scale fields;
- requires semantic types, display names, reviewed title, summary, and table caption;
- rejects every unresolved compiler or renderer warning;
- publishes atomically and preserves the reviewed Flint input, prepared data, semantic spec, backend spec, SVG, semantic HTML table, hashes, versions, and limitations.

The local adapter called the real `flint-chart-mcp/render` package API, which invokes the Flint compiler. That is dependency execution, not evidence that an MCP server or transport session ran. The durable [smoke manifest](./prax-teach-v2/evidence/integrations/flint-smoke/manifest.json) records a Vega-Lite compiler/renderer execution over a synthetic fixture, an SVG result, editable inputs, a complete table alternative, and no unresolved warnings. It also says, explicitly:

- `chart_correctness_claimed: false`;
- `network_isolation_verified: false`;
- `synthetic_fixture: true`.

Rejecting network references is an input-policy control, not proof that the process was network-isolated. Producing an SVG is compiler evidence, not evidence that its chart is correct, accessible in representative use, or better for learning.

### Flint promotion boundary

Before a Flint artifact can support a real lesson, it still needs factual mark/axis/domain review, browser inspection, keyboard and assistive-technology checks where applicable, and a table/text fallback. Before anyone claims a learner benefit, it needs a predeclared table-versus-chart comparison. The smoke bundle does not satisfy either claim.

## SkillOpt: the dependency-exercised optimizer boundary

SkillOpt trains a single natural-language skill document through scored rollouts, reflection, bounded edits, and selection gating. Its authors report favorable results across their tested agent benchmarks, but that is the preprint's benchmark evidence—not Prax Teach learner evidence and not an independent replication. See the [paper](https://arxiv.org/abs/2605.23904), [installation guide](https://microsoft.github.io/SkillOpt/docs/guide/installation.html), [configuration guide](https://microsoft.github.io/SkillOpt/docs/guide/configuration.html), and [custom benchmark contract](https://microsoft.github.io/SkillOpt/docs/guide/new-benchmark.html).

The candidate pins the reviewed 0.2.0 source boundary. [prepare_source.py](./prax-teach-v2/integrations/skillopt/prepare_source.py) verifies the expected clean tracked source, copies tracked Git blobs into a new isolated tree, adds the Prax Teach adapter, and registers it in both upstream training and evaluation entrypoints without mutating the source checkout. [prax_teach_adapter.py](./prax-teach-v2/integrations/skillopt/prax_teach_adapter.py) is a real SkillOpt `EnvAdapter`, not a mock interface.

### The five banks

| Bank | Optimizer visibility | Role | Claim rule |
|---|---:|---|---|
| Public `train` | Visible | Rollouts, reflection, and iteration | Development evidence only |
| Public `valid_seen` | Visible | Upstream-compatible selection during optimization | Repeatedly queried; never call it held out |
| External hidden `valid_unseen` | Hidden | Repeated pre-test hard gating through trusted isolation | Must remain outside every target workspace |
| External hidden `test` | Hidden | One final evaluation after the proposal is frozen | Do not open during tuning |
| External hidden `ood` | Hidden | Transfer across model, harness, topic, or surface form | Required before a broad generalization claim |

Only public `train` and `valid_seen` fixtures are bundled. The adapter requires five distinct external files and keeps private answers controller-side; the hidden banks used by tests were generated synthetic inputs, not real private evaluation banks. Unconfined execution is explicitly public-fixture-only and claim-ineligible, and caller-authored wrapper receipts are rejected. The trusted path is the package-owned macOS `sandbox-exec` policy with per-invocation adversarial probes. The [adapter smoke receipt](./prax-teach-v2/evidence/integrations/skillopt-smoke/adapter-receipt.json) binds all five smoke documents, records measured default-deny controls for candidate/hidden-bank/host reads, outside writes, and network access, and reports only the synthetic `test` split as exercised. It is boundary evidence rather than held-out performance. The receipt therefore sets `optimization_gain_claimed` to false and keeps staging blocked.

The sandbox result is meaningful engineering evidence: the real adapter, dependency, bank plumbing, package cloning, integrity checks, and isolation probes executed. It is not evidence that the current `SKILL.md` improved, that the banks represent real learner needs, or that an optimized proposal generalizes.

### Non-compensatory evaluation

Future optimization uses hard gates before any scalar score:

1. reject answer leakage, silent persistence, fabricated source/state, false mastery, accessibility loss, hidden-grader exposure, or destructive action;
2. require repeated paired improvement above measured rollout and judge noise;
3. require non-inferiority for quick, no-visual, **Answer now**, no-persistence, and accessibility strata;
4. only then compare efficiency such as latency, tokens, cost, or instruction length.

A higher average cannot compensate for a critical tutoring failure. The complete contract is in [SkillOpt optimization](./prax-teach-v2/references/SKILLOPT-OPTIMIZATION.md).

## Quarantine-only score staging

The [proposal staging helper](./prax-teach-v2/integrations/skillopt/stage_proposal.py) is intentionally weaker than an evaluation authority. It can verify that a caller-supplied score JSON:

- has the exact expected fields and no duplicates;
- binds the base skill, proposal, runner, condition, train bank, and selection bank by hash;
- reports hard, hidden, cross-model, repeated-trial, and positive-delta fields in the required shape.

It cannot authenticate who produced those fields or whether the trials occurred. Even when the structure passes, the helper can write a separate quarantine directory whose receipt says:

- `adopted: false`;
- `eligible_for_adoption: false`;
- `eligible_for_evidence_claims: false`;
- `optimization_gain_claimed: false`;
- `score_receipt_trust: self-attested-structure-only`.

The next step is not adoption. A trusted isolated evaluator must independently rerun the proposal, after which a human may inspect the diff and make a separate release decision. This is why “quarantined for human review” is not human evidence and is not approval.

No real optimized proposal or quarantined proposal artifact exists in the package today. The helper's successful path is implementation/test evidence only.

## Combined architecture

```text
RUNTIME TEACHING
learner -> quick | lesson | course -> teaching loop -> visual router
                                                        |
                                           exact static chart job?
                                              |                |
                                             no               yes
                                              |                |
                                      native prose/table   table sufficient?
                                                               |       |
                                                              yes     no
                                                               |       |
                                                             table   Flint adapter
                                                                       |
                                                     SVG + table + provenance

OFFLINE IMPROVEMENT — FUTURE PIPELINE; NOT YET RUN END TO END
public train + valid_seen -> SkillOpt proposal generation
                                 |
                  external valid_unseen hard gates
                                 |
                         freeze proposal
                                 |
                    untouched test + OOD checks
                                 |
                   trusted rerun and human diff review
                                 |
                       new candidate release only
```

Flint changes a chosen representation. SkillOpt may propose a change to the teaching entrypoint. Neither integration writes learner mastery, modifies the canonical installed skill, or establishes a learning outcome.

The durable smoke receipts are byte-bound evidence that real dependency paths executed for their recorded synthetic snapshots. They do not prove that later candidate bytes execute identically and do not substitute for fresh full-package release verification.

## Parked evidence gates

| Gate | Status | Why it remains parked |
|---|---|---|
| EG-01 — provider ablation | Parked | No matched real-provider no-skill, frozen-`teach`, and candidate trial with external held-out graders |
| EG-02 — SkillOpt gain | Parked | No budgeted optimization with repeatable hidden lift beyond noise and cross-model hard gates |
| EG-03 — accessibility field evidence | Parked | No representative assistive-technology, disabled-learner, and neurodivergent-learner evidence |
| EG-04 — immediate learner benefit | Parked | No consented randomized active-control human posttest |
| EG-05 — delayed North Star | Parked | No blind-scored delayed retention and novel-transfer result |
| EG-06 — generalization | Parked | No replication across topics, models, learners, access needs, and time |

## Recommended next evidence

1. **Flint:** manually inspect the synthetic smoke chart and its semantic table, then run one predeclared table-versus-chart lesson pilot without treating preference as learning.
2. **SkillOpt:** assemble genuinely external banks and a trusted provider/evaluator boundary, measure noise first, then run a small budgeted optimization. Keep any result quarantined until independent rerun and human diff review.
3. **Learning:** use the existing study machinery only to prepare a consented active-control study. Claims about immediate benefit, delayed retention, transfer, and generalization remain blocked until real data exist.

The correct current label for both integrations is **real dependency exercised at a guarded engineering boundary**—not “unimplemented,” and not “proven beneficial.”
