# Prax Teach v2 blueprint

_A small teaching kernel that scales from a five-minute explanation to a durable course._

## North star

`prax-teach-v2` should optimize for this outcome:

> The learner can later retrieve, explain, apply, discriminate, and transfer the idea without the tutor—and the system can show honest evidence for that claim.

That definition changes the product. A beautiful lesson is useful only when it helps create durable independent performance. Personalization is useful only when it is based on inspectable evidence. A visual is useful only when it serves a cognitive job.

## Design principles

1. **Answer every scale of request.** Multi-session learning is an optimization, not a prerequisite.
2. **Use the lightest mode that can achieve the requested outcome.** The learner can override the route at any time.
3. **Attempt before reveal.** Preserve productive effort, with an explicit **Answer now** escape hatch.
4. **Treat feedback as instruction.** Identify what was correct, the specific gap, the relevant principle, and the next attempt.
5. **Store evidence, not personality judgments.** Every inferred concept state must link to observations and remain correctable.
6. **Separate mastery from scheduling.** Concept evidence says what the learner can do; FSRS-like scheduling says when to revisit an item.
7. **Use visuals semantically.** Choose none, static, interactive, or motion from the learning task—not from a media quota.
8. **Keep Markdown canonical.** Generate accessible HTML with a source hash; never edit both as independent truth.
9. **Make uncertainty visible.** “Not enough evidence” is better than false mastery.
10. **Measure delayed independence.** Immediate satisfaction and polish are secondary outcomes.

## The three modes

| Property | `quick` | `lesson` | `course` |
|---|---|---|---|
| Default trigger | Bounded explanation or one question | One focused competency or artifact | Sustained goal, sequence, or return across sessions |
| Persistence | None by default | Ask once; minimal if accepted | Explicit consent; full workspace |
| Intake | At most one high-value question; infer the rest | Goal, prior knowledge, constraint | Mission, target performance, horizon, constraints, source policy |
| Teaching depth | Explain + example + one check | Full teaching loop + transfer | Diagnostic path + lessons + review queue + cumulative transfer |
| Visual router | Always available | Always available | Always available |
| Output | Chat, optional inline visual | Canonical `.md` plus generated `.html` when an artifact helps | Versioned lessons, references, state, reviews, and HTML companions |
| State | Ephemeral in-turn adaptation | Optional session summary | Evidence-backed concept and session state |
| Exit | “Want the answer, a check, or a deeper lesson?” | Summary + next retrieval | Updated evidence + scheduled review + next branch |

### Mode selection rule

Select the lightest mode that satisfies the user’s stated outcome.

Choose `quick` unless one of these is true:

- the user explicitly requests a lesson artifact;
- success requires several activities or a transfer task;
- the user wants to resume later;
- the topic depends on a durable source library or cumulative concept graph.

Choose `lesson` for a bounded competency. Escalate to `course` only with explicit multi-session intent or when the learner accepts persistence after the need is explained. Demote immediately when the learner asks for a concise answer.

## The teaching kernel

Every mode uses a compressed or expanded version of the same loop:

| Phase | Tutor action | Learner evidence | Failure-safe behavior |
|---|---|---|---|
| 1. Orient | Confirm the outcome and useful context | Goal, constraints, current attempt | Do not interview when the request is already clear |
| 2. Diagnose | Ask one discriminating question or inspect work | Prior knowledge, misconception, “I don’t know” | Never punish uncertainty; skip when urgency demands direct instruction |
| 3. Retrieve / predict | Ask for an effortful response before reveal | Recall, prediction, chosen strategy | Offer a smaller entry point or accessibility alternative |
| 4. Model | Give the minimum explanation and an aligned worked example | Learner can identify the principle and why it applies | For experts, remove redundant scaffolding |
| 5. Guide | Use a progressive hint ladder | Increasingly independent attempts | Do not dump all hints or repeat the same explanation |
| 6. Feedback | Name correctness, gap, principle, and next move | Revision quality and confidence | Avoid generic praise and person-level judgments |
| 7. Transfer | Change the surface form, context, or competing case | Novel application or discrimination | Do not certify mastery from a copied pattern |
| 8. Reflect | Ask for teach-back or a concise learner summary | Learner-authored mental model | Store agent inference separately |
| 9. Schedule | Select the next retrieval from performance and horizon | Due item with reason | Quick mode only offers; it does not persist silently |

Retrieval practice, spacing, formative feedback, and evaluated intelligent tutoring systems support this structure, with important implementation and domain limits. See the [research landscape](./02-teaching-systems-landscape.md).

## Hint ladder

Use the smallest hint that lets the learner make the next meaningful move:

1. **Orienting prompt:** point to the goal or relevant representation.
2. **Principle cue:** name the rule, relationship, or diagnostic question.
3. **Partial step:** supply one subgoal or intermediate representation.
4. **Worked step:** demonstrate the blocked step and ask the learner to continue.
5. **Complete solution:** provide when explicitly requested, necessary for safety/access, or further struggle has no learning value.

Record the highest hint level used. A correct response after a worked step is weaker mastery evidence than an unassisted transfer response.

## Evidence-dimensional mastery

Do not compress learner state to `beginner`, `intermediate`, `advanced`, or one confidence score. For each concept, track dimensions separately:

| Dimension | Observable evidence | Example |
|---|---|---|
| Recognition | Identifies the applicable concept among alternatives | Chooses an index problem rather than a caching problem |
| Recall | Produces the idea without cues | Defines a B-tree property from memory |
| Explanation | Gives a causal or mechanistic account | Explains why range scans benefit |
| Application | Uses the concept in a familiar task | Selects an index for a known query pattern |
| Discrimination / debugging | Distinguishes confusable cases or repairs an error | Rejects an index that cannot support the predicate order |
| Transfer | Applies it in a novel surface context | Designs indexing for a previously unseen workload |

Each observation records item, response or rubric, hint level, confidence, timestamp, content version, and source. Store uncertainty and contradictory evidence. The learner can correct or delete inferred state and request a retest.

### Mastery rule

Use a conservative default:

- never mark mastered from one item;
- require evidence across at least two dimensions;
- require at least one unassisted application, discrimination, or transfer item;
- require later-session retrieval for **durable** mastery;
- degrade confidence when evidence is old, contradicted, or heavily scaffolded;
- never hard-lock the learner from a topic based on an uncertain estimate.

These are product defaults to evaluate, not universal psychometric thresholds.

## Scheduler contract

Use a real review scheduler such as [FSRS](https://github.com/open-spaced-repetition/free-spaced-repetition-scheduler) for item timing. Keep these rules:

- derive the review rating from observable learner performance, not model sentiment;
- keep item scheduling separate from concept mastery;
- tie the desired retention probability to the learner’s horizon;
- shorten after failure or high hint dependence;
- lengthen after successful unassisted retrieval;
- let the learner snooze, reschedule, export, or disable reviews;
- log the scheduler input and decision so it is explainable.

Quick mode may recommend a review prompt but must not create reminders or files without permission.

## Visual router

Ask one question first: **What must the learner see, compare, predict, manipulate, or watch change?**

| Route | Use when | Default medium | Required fallback |
|---|---|---|---|
| None | Prose plus an example is already clearer | Text and code | Not applicable |
| Static | Structure, hierarchy, spatial relation, comparison, exact worked state | Semantic HTML table, exact SVG, diagram-as-code; optional Flint-compiled SVG for quantitative charts | Text reading order; data table for quantitative figures |
| Interactive | Manipulation, prediction, filtering, testing, traversal | Native HTML controls, SVG/Canvas simulation | Equivalent static state and explanation; no-script path |
| Motion | Sequence, causality, synchronization, transformation, state over time | Seekable deterministic animation or video | Captions, transcript, poster/static sequence, reduced-motion mode |

Visuals must not expose an answer before the learner attempts retrieval. Exact labels, equations, charts, and relationships must use deterministic media, not image generation.

Flint is an optional compiler after routing, not a new route. Use it only when a quantitative chart is more useful than a table; pin the version, transform and verify data upstream, inspect warnings, preserve the semantic spec and render hashes, and ship a complete table/text equivalent. The live chart editor is an authoring aid, not the durable lesson runtime.

## Persistence and privacy

### Consent boundary

Before creating durable learner state, explain in one sentence:

- what will be stored;
- where it will be stored;
- how it improves later sessions;
- how to inspect, correct, export, or delete it.

Do not persist sensitive traits, inferred ability labels, health information, or irrelevant conversation. Use a learner pseudonym or local identifier. For minors, require an explicit deployment-specific privacy policy rather than relying on prompt prose.

### Workspace structure

```text
learning-workspace/
├── MISSION.md                 # learner-approved goal and horizon
├── RESOURCES.md               # source provenance and versions
├── lessons/
│   ├── 0001-topic.md          # canonical lesson
│   └── 0001-topic.html        # generated companion with source hash
├── reference/
│   ├── concept-map.md
│   └── concept-map.html
├── state/
│   ├── learner.json           # preferences and consent, not mastery claims
│   ├── concepts.json          # current evidence-derived state
│   ├── misconceptions.json    # specific, evidenced, correctable
│   ├── reviews.jsonl          # scheduler events and decisions
│   └── sessions.jsonl         # append-only activity/provenance log
└── assets/                    # editable visual/interaction sources; optional data/spec/render manifests
```

Keep raw observations append-only. Derive current concept state from them so a bad inference can be corrected without rewriting history.

## Markdown-to-HTML contract

Every instructional Markdown file must have a generated HTML companion with the same basename. The Markdown remains canonical.

Each HTML page must include:

- semantic landmarks and a skip link;
- synchronized headings and stable anchors;
- a visible source path, generation time, and SHA-256;
- responsive tables and readable line lengths;
- strong focus styles and full keyboard operation;
- progressive hints before solutions;
- explanations for correct and incorrect answers;
- reduced-motion, print, zoom/reflow, and no-script fallbacks;
- nearby citations and media provenance;
- no mandatory CDN or tracking;
- a link back to the Markdown source.

The build must fail when:

- a Markdown file lacks HTML;
- the HTML source hash is stale;
- heading order is invalid;
- a required landmark, skip link, language, title, or viewport is missing;
- an interaction is pointer-only;
- essential information disappears with JavaScript or reduced motion.

Automated checks are necessary but insufficient; perform keyboard, screen-reader spot checks, print review, narrow-viewport review, and testing with target learners, including disabled and neurodivergent learners. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [W3C COGA](https://www.w3.org/TR/coga-usable/)

## Source and provenance policy

For factual teaching:

1. prefer the learner’s selected authoritative source;
2. otherwise prefer primary and official sources;
3. record URL, title, retrieval date, applicable version, and license/attribution where relevant;
4. distinguish source-backed fact, inference, example, and uncertainty;
5. never teach from parametric memory alone when the fact is unstable, niche, high-stakes, or disputed;
6. version source-grounded items so changed source material invalidates or flags dependent assessments.

## System layers

| Layer | Interface | Replaceable implementation |
|---|---|---|
| Mode router | request → mode, reason, persistence decision | deterministic rules plus agent judgment |
| Teaching policy | learner turn + context → next pedagogical move | core skill plus subject strategy |
| Learner-state store | observations ↔ evidence-derived concept state | local JSON/JSONL first; database later |
| Scheduler | item performance + horizon → next due time | FSRS-compatible adapter |
| Source library | concept/item → versioned evidence | files, RAG, or linked vault |
| Artifact renderer | canonical Markdown → self-contained HTML | verified GFM renderer and templates |
| Quantitative visual compiler | reviewed rows + semantic spec → verified chart asset | optional pinned Flint-to-SVG adapter |
| Evaluator | fixtures + conditions → artifact and outcome reports | `prax-tech-eval` plus human-study pipeline |
| Offline optimizer | scored isolated trajectories → staged `SKILL.md` proposal | optional SkillOpt experiment harness |

This boundary keeps quick mode fast: it can invoke only the router and teaching policy. A course can add all layers without rewriting the teaching loop.

## Implementation sequence

### Phase 0 — freeze and measure

- Fingerprint `teach` and current `prax-teach`.
- Capture trigger, latency, token, artifact, and forbidden-behavior baselines.
- Do not rename the evaluator yet.

### Phase 1 — minimum lovable tutor

- Implement three-mode routing and **Answer now**.
- Implement the teaching kernel and hint ladder.
- Add explicit forbidden behaviors and deterministic tests.
- Generate accessible HTML from canonical Markdown.

### Phase 2 — durable learner loop

- Add consented JSON/JSONL state.
- Add concept evidence, misconceptions, learner corrections, and versioned items.
- Add scheduler adapter and due-review policy.

### Phase 3 — evidence and adaptation

- Run clean agent ablations.
- Pilot learner-outcome evaluation.
- Calibrate concept-state rules and scheduler inputs.
- Add an interpretable knowledge-tracing model only if it outperforms the transparent baseline and its adaptations improve learning.

### Phase 4 — optional ecosystem adapters

- Pin Flint and validate one table-vs-chart lesson before broader chart use.
- Build a SkillOpt `prax_teach` adapter with hidden split banks, non-compensatory hard gates, and no auto-adopt.
- Anki export.
- QTI assessment export.
- Richer LiaScript/H5P authoring.
- Voice, animation, or multi-agent classroom modules when a specific learning job justifies them.

## What ships in this deliverable

The companion `prax-teach-v2` candidate package contains:

- a concise installable `SKILL.md`;
- mode, teaching, learner-state, artifact, source/privacy, evaluation, SkillOpt, and Flint references;
- a dependency-light workspace validator;
- public behavioral evaluation fixtures, explicitly excluded from held-out claims;
- generated HTML companions for every Markdown instruction file.

It is deliberately a candidate, not an automatic replacement for the installed `prax-teach`. That preserves a clean evaluation and approval boundary.
