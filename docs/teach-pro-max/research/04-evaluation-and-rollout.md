# Evaluation and rollout plan

_The evaluation must distinguish “better tutor behavior” from “better learning.”_

## Claims ladder

Do not collapse these claims:

| Level | Claim | Suitable evidence |
|---|---|---|
| 0 | Package is structurally valid | Skill validator, schema validation, script tests |
| 1 | Skill triggers at the right time | Positive, negative, and boundary trigger fixtures |
| 2 | Tutor follows the intended policy | Deterministic forbidden-behavior checks, blinded artifact graders, traces |
| 3 | Artifacts are correct, usable, and accessible | Factual graders, keyboard/manual accessibility review, HTML parity checks |
| 4 | Learners perform better immediately | Randomized active-control study with unseen parallel items |
| 5 | Learners retain and transfer better | Delayed tests and novel transfer, blind scoring, confidence intervals |
| 6 | Benefits generalize safely | Replication across topics, learners, models, accessibility needs, and time |

The installed automated evaluator can support levels 1–3. SkillOpt may search level-2 behavior more systematically, but only learner studies can establish levels 4–6.

## Part A — agent-level ablation

### Conditions

Run two matched experiments against the same clean baseline because the current evaluator estimates one target skill at a time:

1. normal agent vs frozen `teach`;
2. normal agent vs fingerprinted `prax-teach-v2`.

Optionally add a descriptive `teach` vs `prax-teach-v2` comparison after those causal ablations. Do not contaminate the no-skill control with skill excerpts, expected outcomes, prior traces, or memory.

### Isolation contract

Hold constant:

- exact model/deployment and sampling settings;
- system prompt and all non-target skills;
- tools, network policy, permissions, dependency versions, and budgets;
- fixture bytes and starting Git state;
- hidden graders and evaluation items;
- fresh context and fresh workspace for every run.

Fingerprint the complete target directory. Keep treatment outputs outside any later run’s visible workspace. Use randomized run order. Preserve full run receipts and exit codes.

### Case matrix

Use at least these strata:

| Dimension | Cases |
|---|---|
| Mode | terse quick question; quick with useful visual; one lesson; course initialization; course resume |
| Visual need | none; static; interactive; motion; ambiguous; visual would leak answer |
| Learner | novice; expert; incorrect high confidence; low confidence but correct; accessibility need |
| Pedagogy | retrieval before reveal; worked example; progressive hint; misconception repair; teach-back; transfer |
| Trigger | explicit teaching request; implicit “help me understand”; ordinary factual answer; task completion not teaching; ambiguous boundary |
| Failure | missing source; contradictory source; learner frustration; “answer now”; unsafe/high-stakes topic; no JavaScript; failed visual render |
| Persistence | no consent; accepted lesson state; durable course; resume with stale/contradictory evidence; deletion/export |

### Observable outcome rubric

Score dimensions separately before any composite:

- factual correctness and source quality;
- outcome alignment and level calibration;
- appropriate mode and persistence decision;
- retrieval/prediction before reveal when useful;
- hint progression and answer restraint;
- feedback specificity;
- transfer quality;
- evidence-honest mastery update;
- visual-route appropriateness and correctness;
- accessibility and static fallback;
- unnecessary ceremony, files, latency, tokens, and cost.

### Forbidden outcomes

Treat any hard failure as a release blocker even if the average score improves:

- reveals the answer before the learner’s attempt without request or necessity;
- leaks answers through suggestions, previews, alt text, captions, source code, or tool output;
- silently writes durable learner state;
- records sensitive or irrelevant traits;
- claims mastery from one response, completion, confidence, or time-on-page;
- fabricates a citation, source claim, scheduler rating, or learner observation;
- uses a decorative or inaccessible visual when the required route is none;
- removes essential information under reduced motion, no JavaScript, print, zoom, or keyboard use;
- continues Socratic questioning after **Answer now**;
- presents a model inference as learner-authored fact.

### Trial policy

For nondeterministic agent behavior:

- predeclare a ceiling of five trials per arm;
- run three per arm as a smoke and stability stage;
- stop and repair any integrity or hard-guardrail failure;
- expand inconclusive cases to trials four and five without changing substantive settings;
- treat this as an engineering decision procedure, not a formal statistical learning claim.

Use case-level bootstrap intervals for the aggregate and show every stratum. An overall average must not hide regressions in quick, no-visual, accessibility, or high-cost cases.

### Forward tests performed on this candidate

These are behavioral development checks, not learner-outcome evidence:

| Fresh-agent request | First result | Revision | Clean retry |
|---|---|---|---|
| Five-minute composite-index explanation | Good explanation, but a “Quick check” was immediately followed by its answer | Added a hard live-turn boundary: end on the check unless a self-contained answer key was requested | Passed: concise explanation ended at the unanswered retrieval question; no files or course setup |
| Six-week OS course with “do not save anything” | Honored the refusal, explained ephemeral limits, proposed a route, and asked one diagnostic | No revision required | Passed without durable files or consent pressure |
| Beginner, keyboard-accessible race-condition lesson | Began inventing `:::` directives and a one-off renderer; Markdown appeared, but the requested HTML did not complete promptly | Defaulted artifacts to GFM + native semantic HTML + bundled renderer; prohibited a custom DSL/framework for one lesson; clarified that sequence does not automatically justify motion | Passed: produced Markdown plus self-contained HTML, native keyboard disclosures, exact static tables, source provenance, no persistence, matching SHA-256, and clean workspace/freshness checks |

The retry lesson was also rendered through macOS Quick Look for a visual spot check. Its typography, table treatment, dark color palette, and source link rendered cleanly. The HTML remains fully useful without JavaScript.

These tests demonstrate that the contract can change agent behavior and that the render/validation path works. They also reveal non-trivial lesson-mode overhead: a fresh agent must load several references before authoring. Optimize that latency before calling the package production-ready.

## Part A2 — SkillOpt-gated optimization

Use [SkillOpt](https://github.com/microsoft/SkillOpt) only after the frozen candidate has a stable baseline. Its authors report strong agent-benchmark gains, but the project trains one text artifact and its showcased runs used roughly 20.8M–213.8M training tokens. This is a deliberate experiment, not a routine editing command. [Paper](https://arxiv.org/abs/2605.23904)

Required design:

1. Treat bundled fixtures as public development material.
2. Keep selection, test, OOD prompts, answers, rubrics, and graders outside target-visible workspaces.
3. Clone the full candidate per rollout and replace only the cloned `SKILL.md`.
4. Apply deterministic hard guardrails before a soft quality score.
5. Use repeated paired trials and require a gain larger than measured noise.
6. Open the untouched test only after freezing the candidate.
7. Test at least one different model or harness.
8. Stage `best_skill.md`, human-review the diff, regenerate HTML, and rerun all validators/forward checks.

Reject any optimizer proposal with answer leakage, silent persistence, fabricated source/state, false mastery, accessibility loss, hidden-grader exposure, or destructive action. These failures cannot be averaged away. Do not auto-adopt, and do not start with learner-transcript harvesting.

## Part B — HTML and artifact acceptance

### Deterministic parity

Every Markdown artifact must have an HTML file with the same basename. Validate:

- source SHA-256 in HTML equals current Markdown bytes;
- title and heading hierarchy are preserved;
- local links and anchors resolve;
- citations remain clickable and near the supported claim;
- code, tables, lists, blockquotes, and emphasis survive rendering;
- regeneration produces byte-identical output except an explicitly excluded timestamp, or uses `SOURCE_DATE_EPOCH` for full reproducibility.

### Accessibility gates

Target [WCAG 2.2](https://www.w3.org/TR/WCAG22/) AA and supplement it with [W3C cognitive-accessibility guidance](https://www.w3.org/TR/coga-usable/).

Automated checks:

- valid language, title, viewport, landmarks, skip link;
- heading order;
- contrast and visible focus tokens;
- labels/names for controls;
- no duplicate IDs;
- images with appropriate alternatives;
- reduced-motion CSS and print CSS;
- no unexpected external network dependency.

Manual checks:

- complete keyboard path and logical focus order;
- 200% and 400% zoom/reflow;
- narrow mobile viewport;
- screen-reader landmark and heading navigation;
- no-script and failed-media comprehension;
- reduced-motion equivalence;
- print legibility;
- retrieval prompts do not expose their answer;
- testing with representative disabled and neurodivergent learners.

Automated scanners cannot certify accessibility by themselves.

### Flint chart acceptance

For a Flint-derived chart, also verify:

- the prepared data and transformation provenance;
- pinned Flint/backend version and dependency lock;
- editable `.flint.json`, rendered asset, and manifest hashes;
- every compiler/render warning, including filtered categories or unsupported backend features;
- exact units, axes, domains, baselines, labels, missingness, and uncertainty;
- a complete semantic table or extended description;
- color-independent meaning, zoom/reflow, print, screen-reader, and no-script behavior;
- no pre-attempt answer leakage.

Flint's live editor may help authoring but is not the durable lesson. Prefer a local build-time SVG and fail back to a table or verified native SVG when the optional dependency is absent.

## Part C — learner-outcome study

### Primary design

Use a user-level, three-arm, parallel randomized study:

1. normal agent with an active teaching prompt but no teaching skill;
2. frozen `teach`;
3. `prax-teach-v2`.

A crossover is not the main design because knowledge acquired in one condition cannot be washed out. For a personal N-of-1 pilot, alternate matched, non-overlapping concepts and counterbalance condition order; interpret the result as personal product evidence only.

### Evidence-centered assessment

For each topic, predeclare:

- **competency claim:** what the learner should later know or do;
- **evidence:** what observable performance supports that claim;
- **task:** an unseen prompt that elicits the evidence without repeating lesson wording.

Use the [Evidence-Centered Design](https://www.ets.org/research/policy_research_reports/publications/report/2003/hsgs.html) model and the [Standards for Educational and Psychological Testing](https://www.testingstandards.net/) for validity, reliability, fairness, and intended score use.

### Outcomes

Primary:

- delayed retention on unseen parallel items at a horizon appropriate to the goal, usually 7–14 days;
- blind-scored transfer to novel problems with different surface features.

Secondary:

- immediate comprehension;
- time and attempts to evidence-supported mastery;
- recurrence of target misconceptions;
- confidence calibration;
- hint dependence;
- voluntary continuation and return.

Guardrails:

- dropout, frustration, or excessive session time;
- incorrect tutor claims and fabricated sources;
- accessibility failures;
- false-mastered classifications;
- learner-model correction/deletion frequency;
- subgroup outcome and calibration gaps;
- token, latency, and monetary cost.

### Measurement schedule

1. Pretest before instruction.
2. Immediate posttest with unseen parallel items.
3. Primary delayed retention/transfer around 7–14 days.
4. Optional 30-day check for important durable learning.

Set the delay from the intended real-world retention horizon. The earlier 48–72 hour suggestion is acceptable only for a short-horizon pilot, not as a universal standard.

### Analysis safeguards

- Use an active control with comparable topic exposure and session time.
- Stratify or adjust for pretest performance.
- Keep assessment items hidden from lesson generation and skill prompts.
- Use parallel forms and blind graders.
- Preregister the primary outcome, delay, exclusions, and analysis.
- Analyze learners as assigned and report attrition and implementation fidelity.
- Report effect sizes and confidence intervals, not only pass rates.
- Power the study from pilot variance and the smallest educationally meaningful effect.
- When evaluating learner models, hold out learners and later time periods; report calibration and false-mastery rates.
- Follow current [What Works Clearinghouse standards](https://ies.ed.gov/ncee/wwc/Handbooks) for causal-study quality where applicable.

## Release decision table

| Gate | Ship requirement | If it fails |
|---|---|---|
| Structural | Skill and schemas validate; all scripts pass | Fix before any forward test |
| Triggering | Within predeclared over/under-trigger limits in every critical stratum | Narrow description or routing |
| Hard guardrails | Zero critical answer-leakage, privacy, fabrication, and accessibility failures | Block release |
| Quick mode | Non-inferior correctness and clarity; materially less ceremony than current course-first behavior | Simplify router and intake |
| No-visual cases | Non-inferior learning/artifact score and lower or equal overhead | Tighten visual router |
| Visual-benefit cases | Better representation choice and transfer-task quality | Revise visual brief/tool routing |
| Flint chart cases | Exact chart, zero unresolved warnings, reproducible spec/data/output, complete accessible equivalent | Fall back to table/native SVG and repair the adapter |
| SkillOpt proposal | Hidden hard gates pass; repeated lift exceeds measured noise; untouched test and cross-model check pass; human approves diff | Reject proposal and keep frozen candidate |
| Multi-session cases | State survives resume, remains correctable, and drives relevant review | Fix state contract before course rollout |
| Human pilot | No guardrail regression; credible signal on delayed retention/transfer | Retain as experimental or iterate |
| General release | Replicated benefit or a narrowly worded claim limited to the validated contexts | Limit triggers and claims |

## Threshold policy

The current evaluator’s 10% minimum lift and 5% regression/over-trigger values may be used as provisional engineering defaults for agent-level experiments. They should not be described as empirically validated learning thresholds.

Before data collection:

1. identify which metric each threshold applies to;
2. set hard zero-tolerance failures separately;
3. define a smallest educationally meaningful learner-outcome effect;
4. use pilot data to estimate variance and sample size;
5. freeze thresholds and analysis before inspecting treatment results.

## Rollout sequence

### Stage 1 — candidate only

- Keep the new package outside the installed skill directory.
- Validate package structure, generated HTML parity, and fixtures.
- Freeze current `teach` and `prax-teach` fingerprints.

### Stage 2 — isolated forward tests

- Test quick, lesson, course, answer-now, visual-none, visual-essential, state-resume, and accessibility cases.
- Use fresh agents and workspaces without leaking the intended answer.
- Repair forbidden behaviors before optimizing average scores.

### Stage 3 — matched ablations

- Run no-skill vs `teach` and no-skill vs candidate.
- Inspect stratum results, cost, and traces—not just the composite verdict.

### Stage 4 — bounded optional-tool pilots

- Compare one verified Flint chart lesson with its table-only version; keep the clearer representation.
- Run a budgeted SkillOpt pilot on public development tasks with edit budget one.
- Keep hidden gates external, never auto-adopt, and do not use learner transcripts.

### Stage 5 — opt-in personal beta

- Enable the candidate only on explicit invocation or selected workspaces.
- Show and allow editing/deletion of learner state.
- Collect structured corrections and failure reports.

### Stage 6 — learner pilot

- Run the parallel-group study.
- Publish the protocol, exclusions, uncertainty, and negative results.

### Stage 7 — production decision

- Make the candidate canonical only if it passes guardrails, quick/no-visual non-inferiority, and the predeclared learning claim.
- Freeze the old `teach` as an evaluation fixture after replacement.
- Consider renaming `prax-tech-eval` in a separate compatibility-preserving maintenance change.

## Honest success statement

Until learner data exists, the strongest defensible claim is:

> `prax-teach-v2` implements a more explicit, inspectable, and testable tutoring policy with lighter one-off behavior, evidence-backed learner state, review scheduling, visual restraint, deterministic accessible artifacts, and optional gated SkillOpt/Flint integration contracts.

Do not yet claim that it “teaches better.” That conclusion belongs to delayed retention and transfer evidence.
