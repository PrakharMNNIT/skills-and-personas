# Sidechat response audit

_Research snapshot: 2026-08-03_

## Bottom line

Sidechat’s response is directionally strong and materially better than treating `prax-teach` as course-only. Its best contribution is the `quick` / `lesson` / `course` split with visualization available in every mode. I would keep that.

I would not ship its rollout unchanged. It specifies formats more clearly than it specifies learning. The missing center is an evidence-bearing learner model and a teaching policy that prevents the model from becoming an answer machine. Its proposed crossover study is also unsuitable as the primary causal design because learning carries over permanently between conditions.

**Verdict: 7.5/10 as a product direction; 5/10 as an implementation and validation plan.**

## Claim-by-claim decision

| Sidechat proposal | Decision | Why |
|---|---|---|
| Add `quick`, `lesson`, and `course` modes | **Keep** | It removes needless setup from one-off questions while preserving multi-session depth. OpenAI Study Mode similarly supports guided learning without requiring a persistent course workspace. [OpenAI Study Mode](https://help.openai.com/en/articles/11780217-study-mode) |
| Infer the lightest suitable mode and allow override | **Keep, specify precisely** | Routing needs an explicit contract, a visible override, and permission before durable persistence. Quick mode may adapt within the current conversation without writing learner records. |
| Run the visual router in all modes | **Keep** | Visual need is independent of persistence. The existing `prax-teach` router’s `none` / `static` / `interactive` / `motion` choice is stronger than “always add a diagram.” |
| Choose the smallest sufficient representation | **Keep as a hard rule** | Decorative or split-attention visuals can add cognitive load. Worked examples and integrated explanations help novices when they are instructionally aligned, not merely attractive. [Lange et al., 2021](https://pubmed.ncbi.nlm.nih.gov/34458621/) |
| Separate artifact quality from learning outcomes | **Keep** | Expert preference can evaluate pedagogical behavior, but it is not retention or transfer. LearnLM reports expert-preference gains; that is a different claim from learner outcome. [LearnLM](https://arxiv.org/abs/2412.16429) |
| Compare no skill vs `teach`, then no skill vs `prax-teach` | **Keep for agent-level ablation** | The installed evaluator estimates one target skill’s marginal effect and requires a genuinely skill-absent control. Two matched experiments are compatible with that contract. |
| Use a small crossover human study | **Replace as the primary design** | Exposure in the first condition changes the learner for later conditions. Use parallel-group randomization for the main claim; use N-of-1 alternating topics only as exploratory personal evidence with counterbalancing and non-overlapping concepts. |
| Test delayed recall at 48–72 hours | **Replace with horizon-based timing** | There is no universal correct delay. Spacing depends on the intended retention interval. Use a predeclared 7–14 day primary delay and, for important learning, a 30-day check. [Cepeda et al., 2006](https://pubmed.ncbi.nlm.nih.gov/16719566/) |
| Begin with three trials per arm and expand to five | **Keep for harness debugging, not learning claims** | This is a reasonable staged engineering decision for nondeterministic agent runs. It is not a powered human-learning study. |
| Start with 10% lift and 5% regression limits | **Keep only as provisional engineering gates** | These thresholds are author-chosen, not validated educational effect thresholds. Preregister and calibrate them before observing results. |
| Rename `prax-tech-eval` to `prax-skill-eval` now | **Defer** | The current package is a generic skill evaluator, so the name is imperfect. Renaming adds migration work but does not improve teaching and is not a prerequisite for evaluation. |
| Eventually freeze `teach` as a fixture | **Keep conditionally** | Freeze its content fingerprint now for comparison; retire it as a production tutor only after `prax-teach` passes both non-inferiority and learning-outcome gates. |

## What Sidechat got especially right

### One-off teaching is still teaching

The original `teach` and current `prax-teach` both assume a stateful learning workspace. That is appropriate for sustained learning but excessive for “explain database indexes in five minutes.” The proposed `quick` mode fixes this without weakening the course path.

The key distinction is **persistence**, not pedagogical quality:

- `quick`: no disk state by default; still diagnoses lightly, adapts in-turn, checks understanding, and may use a visual.
- `lesson`: one bounded outcome; persistence is opt-in or confined to a user-selected workspace.
- `course`: durable learner state, concept graph, review queue, sources, and session history.

### Visual restraint is better than visual quotas

Sidechat correctly preserves “no visual” as a valid route. This matters because visual production has latency, accessibility, factual-verification, and maintenance costs. A representation should earn its place by improving a specific cognitive job: orient, compare, predict, manipulate, or watch state change.

That is also where some otherwise impressive course generators are weaker. [`codebase-to-course`](https://github.com/zarazhangrui/codebase-to-course) produces polished interactive HTML, but its module requirements can mandate visuals and interactions even when prose plus practice would be clearer. `prax-teach` should borrow its modular course assembly, not its visual quota.

### Artifact evaluation and learning evaluation are different claims

Sidechat’s two-level framing is essential. The installed `prax-tech-eval` can test triggering, outputs, cost, and regressions under a clean skill-on/skill-off design. It cannot prove durable learning.

This distinction is supported by the research landscape:

- LearnLM’s expert-preference evaluation measures pedagogical instruction following, not retention. [LearnLM](https://arxiv.org/abs/2412.16429)
- CodeAid’s 12-week deployment with 700 programming students established feasibility and design lessons, but not causal learning gains. [CodeAid](https://arxiv.org/abs/2401.11314)
- Tutor CoPilot’s preregistered live-tutoring RCT did measure mastery and found a 4 percentage-point overall lift, with larger gains for lower-rated tutors. Its intervention helped human tutors ask guiding questions and give away answers less often. [Tutor CoPilot](https://arxiv.org/abs/2410.03017)

## The important omissions

### 1. No learner-state contract

“Read prior records and adapt” is not enough. A tutor needs explicit, correctable state at the concept level:

- the learning objective and prerequisites;
- evidence for recall, explanation, application, discrimination/debugging, and transfer;
- misconceptions and the observation that supports each one;
- hint dependence and confidence calibration;
- uncertainty and contradictory evidence;
- due review items and why they are due;
- learner-authored notes kept separate from agent inference.

DeepTutor’s current platform has inspectable multi-layer memory, but its own learner-model RFC candidly proposes moving beyond profile/chat summaries toward evidence-backed concept state. [DeepTutor](https://github.com/HKUDS/DeepTutor) and [learner-model RFC #397](https://github.com/HKUDS/DeepTutor/issues/397)

### 2. No anti-crutch contract

Unrestricted assistance can improve supported practice performance while harming later unassisted performance. In a large high-school mathematics experiment, guardrailed tutoring mitigated much of the harm seen with unrestricted GPT assistance. [Generative AI without guardrails can harm learning](https://doi.org/10.1073/pnas.2422633122)

The skill therefore needs forbidden behaviors, not just aspirations:

- do not reveal the complete solution before a meaningful attempt unless the learner explicitly asks for it;
- do not let suggestions, previews, tool output, or hidden UI affordances leak the answer;
- do not ask five questions at once;
- do not repeat the same explanation after an error;
- do not infer mastery from fluency, confidence, completion, or one correct item;
- do not force Socratic questioning when the learner chooses **Answer now**.

The `learn-codebase` project has a concrete report of answer leakage through client prompt suggestions, showing that this must be tested at the whole-interface level. [Issue #4](https://github.com/ktaletsk/learn-codebase/issues/4)

### 3. No real review scheduler

“Use spacing” is a principle, not an implementation. Fixed schedules are easy but poorly matched to different retention horizons and learner performance. Use a scheduler such as [FSRS](https://github.com/open-spaced-repetition/free-spaced-repetition-scheduler) for review timing, while keeping conceptual mastery separate and explainable. A model must never invent an FSRS rating from a vague impression.

### 4. The human experiment has carryover bias

A crossover design assumes the effects of one condition can wash out. Learning does not. Once a learner acquires the concept, the next condition inherits that change.

For a real comparative claim, use three parallel groups:

1. normal agent without a teaching skill;
2. `teach`;
3. `prax-teach-v2`.

Pretest, balance or stratify by prior knowledge, use unseen parallel items, measure delayed retention and transfer, blind graders, and report attrition and confidence intervals. Personal N-of-1 trials remain useful for product feedback, but they should use matched non-overlapping topics and make no population claim.

### 5. Generated HTML needs a canonical-source rule

Hand-maintaining Markdown and HTML creates two truths. The correct contract is:

1. Markdown is canonical.
2. HTML is generated deterministically.
3. Each HTML page records the source path and SHA-256.
4. The build fails when a Markdown file lacks a companion or the recorded hash is stale.
5. Keyboard, focus, reflow, reduced motion, print, no-script fallback, and semantic structure are release gates under [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## Corrected rollout

1. Freeze fingerprints of the current `teach` and `prax-teach` packages.
2. Add explicit `quick`, `lesson`, and `course` routing with a user override and persistence consent.
3. Add the anti-crutch teaching loop: diagnose → predict/retrieve → minimal scaffold → explain/apply → transfer → schedule review.
4. Add inspectable concept state and learner correction before adding a complex knowledge-tracing model.
5. Generate HTML from canonical Markdown with a source hash and automated parity checks.
6. Run deterministic behavioral and trigger tests, including forbidden outcomes and answer-leakage cases.
7. Run clean skill-on/skill-off agent ablations for `teach` and `prax-teach-v2` against the same baseline.
8. Require non-inferiority for quick/no-visual tasks and superiority for selected sustained-learning tasks.
9. Pilot a parallel-group human study with delayed retention and novel transfer as primary outcomes.
10. Decide production replacement only after the evidence; treat the evaluator rename as separate maintenance.

## Final judgment

Sidechat found the right product shape. The next version should keep its three modes and visual router, but shift the center of gravity from **artifact generation** to **evidence of learning**. The decisive feature is not “more HTML” or “more personalization.” It is a disciplined loop that turns explanation into effortful retrieval, targeted feedback, spaced return, and transfer—while letting the learner inspect and correct what the system believes about them.

## 2026-08-04 integration addendum

[Microsoft SkillOpt](https://github.com/microsoft/SkillOpt) and [Microsoft Flint](https://github.com/microsoft/flint-chart) strengthen two missing implementation layers without changing this judgment.

- SkillOpt supplies a disciplined offline proposal/validation loop for agent instructions. It should optimize a cloned `SKILL.md` against hidden gates and stage a human-reviewed diff, not rewrite the live tutor or stand in for learner outcomes.
- Flint supplies a compact semantic chart language after the visual router chooses a chart-worthy quantitative job. It should produce a pinned static asset with source data, warnings, provenance, and an accessible table/text equivalent—not make visuals mandatory.

Both tools make the system more testable. Neither repairs missing learner-state semantics, consent, delayed retention, or transfer evidence by itself.
