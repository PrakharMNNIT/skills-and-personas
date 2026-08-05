# Teach, canonical Prax Teach, Prax Tech Eval, and Prax Teach v2

_Complete current-candidate comparison and blueprint audit. Snapshot: 2026-08-05._

## Executive answer

The three teaching systems are `teach`, canonical `prax-teach`, and the candidate `prax-teach-v2`. The fourth requested skill is an evaluator, not a tutor: the installed local name is **`prax-tech-eval`** (not `prax-teach-eval`).

```text
teach
  course-first workspace, mission, trusted resources, retrieval, HTML lessons
    +
prax-teach
  visual routing, editable sources, provenance, accessibility fallbacks,
  a 38-tool registry, query helper, tests, and router assets
    ->
prax-teach-v2
  quick | lesson | course routing, an operational teaching loop,
  consent-first executable state, real FSRS scheduling, deterministic
  Markdown/HTML, evaluator and study machinery, ecosystem exports,
  all 12 inventoried legacy assets, and guarded Flint/SkillOpt adapters

prax-tech-eval
  reusable skill-on versus skill-off ablation harness
    -> evaluates teach, prax-teach, or prax-teach-v2; does not teach learners
```

The previous “contracts only / adapters unrun / legacy assets missing” description is stale. The current candidate is an **engineering candidate**: every locally reachable mechanism in its frozen implementation contract is present and testable at an explicit evidence level. All **12** inventoried legacy assets are restored with provenance.

The engineering candidate is now frozen at commit `8c26440a0402c88c366d68d680aef2b3fe20fc7c`. Three independent exact-payload reviews, a unanimous three-person architecture council, trusted zero-skip full verification, and the immutable Git-blob package gate passed. Two independently built archives are byte-for-byte identical at SHA-256 `c25625c1112d33c125df8c7866c0b00e16ed799dd849d71f96f353a74ec9e992`. This completes the local release lifecycle; it does not complete the external scientific gates.

That engineering closure does not answer the scientific question. Every external gate EG-01 through EG-06 remains individually parked where applicable. There is no basis to call v2 the best tutor, claim learner gain, claim held-out quality, certify field accessibility, or describe the system as scientifically supported.

The exact North Star answer is:

- encoded in the tutoring and evidence design: **yes**;
- local machinery to collect and analyze the evidence implemented: **yes**;
- demonstrated by real delayed learner evidence: **no**.

See the candidate's [release status](./prax-teach-v2/STATUS.md) and machine-readable [status record](./prax-teach-v2/STATUS.json).

The complete final evidence summary is in [implementation and release status](./07-prax-teach-v2-implementation-status.md). The reviewed archive is [prax-teach-v2-8c26440a0402.zip](./prax-teach-v2-8c26440a0402.zip), with a non-circular [release receipt](./prax-teach-v2-8c26440a0402.release.json).

## Sources compared

| Skill | Role in this comparison | Current source |
|---|---|---|
| `teach` | Original course-workspace foundation | [teach/SKILL.md](../../../../../.agents/skills/teach/SKILL.md) |
| `prax-teach` | Canonical custom skill: `teach` plus the visual-production subsystem | [prax-teach/SKILL.md](../../../../../Developer/agent-stack/skills/prax-teach/SKILL.md) |
| `prax-tech-eval` | Separate controlled skill-ablation evaluator; the user referred to it as `prax-teach-eval` | [prax-tech-eval/SKILL.md](../../../../../Developer/agent-stack/skills/prax-tech-eval/SKILL.md) |
| `prax-teach-v2` | Uninstalled, reviewed, reproducibly packaged second-generation engineering candidate | [candidate SKILL.md](./prax-teach-v2/SKILL.md) and [release ZIP](./prax-teach-v2-8c26440a0402.zip) |

`techtutor` remains out of scope because it was not one of the requested skills.

### Where `prax-tech-eval` fits

`prax-tech-eval` does not compete with the three tutors. It asks a different question: **what marginal value does a target skill add when the task, model, tools, fixtures, harness, and graders are held fixed?**

| Dimension | `prax-tech-eval` | `prax-teach-v2` evaluator |
|---|---|---|
| Product role | Reusable evaluator for any agent skill | Candidate-specific evaluation subsystem shipped inside the tutor package |
| Learner-facing tutoring | None | Quick, lesson, and course tutoring are the main product |
| Comparison | True skill-off control versus skill-on treatment | No-skill, frozen-`teach`, and candidate arms are supported by the local plan/run/report machinery |
| Isolation contract | Fresh contexts/workspaces, treatment-only read-only skill mount, matched harness, paired randomized order | Fresh package/workspace clones, external hidden banks, content-bound inputs, default-deny macOS runner, forbidden-behavior hard gates |
| Statistics | Paired repeated trials, hierarchical case/trial bootstrap, wins/ties/losses, trigger and regression metrics | Hard-gate-first reports, paired matrices, learner-level or case-level uncertainty according to the evaluation surface |
| Current evidence | The skill defines a reusable A/B method and scripts | The candidate-specific machinery and containment path have been exercised on public/synthetic fixtures |
| What remains | A real target-skill ablation in the chosen provider/harness | EG-01: matched real-provider comparison against external held-out graders |

The clean future use is complementary: run `prax-tech-eval` as the external comparison discipline around frozen `teach`, canonical `prax-teach`, and immutable `prax-teach-v2` packages. Neither evaluator can manufacture learner-outcome evidence; EG-04 through EG-06 still require real learners and delayed blind-scored outcomes.

## Complete capability comparison

### Product shape and teaching behavior

| Capability | `teach` | Canonical `prax-teach` | `prax-teach-v2` candidate |
|---|---|---|---|
| Primary purpose | Persistent multi-session teaching workspace | Persistent multi-session teaching workspace with content-driven visual production | Adaptive tutoring across one answer, one focused lesson, or a persistent course |
| Invocation posture | Explicit-only metadata (`disable-model-invocation: true`) | Discoverable for deep, multi-session learning, lessons, courses, and intuition | Broad teaching triggers plus a negative rule for ordinary task completion |
| Route selection | One stateful course shape | One stateful course shape | Executable least-cost `quick`, `lesson`, or `course` router |
| Default persistence | Assumed | Assumed | None in quick; opt-in and minimal in lesson; explicit consent for course state |
| Intake | Establish the mission before meaningful teaching when unclear | Same | At most one high-value question when the request is otherwise clear |
| Mission | Central to every lesson | Central to every lesson | Required and persisted for course; proportionate in quick/lesson |
| Lesson unit | Short, authored HTML tied to the mission | Same, enriched by visual planning and assets | Mode-scaled chat or canonical Markdown with a generated HTML companion |
| Teaching loop | Knowledge first, then practice with a tight feedback loop; retrieval, spacing, and interleaving | Same core loop plus orientation, worked visual state, progressive state, retrieval, and transfer guidance | Nine explicit phases: outcome, diagnosis, effort before reveal, minimal model/example, progressive hints, specific feedback, unseen transfer/discrimination, teach-back, next retrieval |
| Attempt before reveal | Encouraged through retrieval practice | Encouraged; visual answer leakage is discussed | Explicit policy and executable/public behavior evidence; retrieval surfaces and fallbacks are checked |
| Direct-answer override | Not explicit | Not explicit | **Answer now** immediately selects direct quick response and stops forced Socratic questioning |
| Feedback | Tight and ideally automatic | Same | Must identify what was correct, the precise gap, the governing principle, and the next action |
| Transfer | Flexibility is a goal | Visual sequence ends with transfer | Unseen application, discrimination, debugging, or transfer is an explicit teaching phase |
| Learner agency | Mission changes require confirmation | Same | Mode overrides, consent, inspect, correct, retest, export, delete, review controls, and no forced dialogue |

Primary teaching evidence: [teach entrypoint](../../../../../.agents/skills/teach/SKILL.md), [canonical Prax Teach entrypoint](../../../../../Developer/agent-stack/skills/prax-teach/SKILL.md), [v2 entrypoint](./prax-teach-v2/SKILL.md), and [v2 teaching protocol](./prax-teach-v2/references/TEACHING-PROTOCOL.md).

### State, scheduling, artifacts, and ecosystem

| Capability | `teach` | Canonical `prax-teach` | `prax-teach-v2` candidate |
|---|---|---|---|
| Workspace state | `MISSION.md`, `RESOURCES.md`, prose learning records, lessons, assets, references, `NOTES.md` | Same, with visual/video/component/data asset folders | Course initializer creates mission/resources, lessons/reference/assets, and private `state/`; JSON/JSONL is the primary evidence layer |
| Evidence model | Informal prose records used to infer the zone of proximal development | Same | Observable append-only events plus deterministic concept and misconception projections across recognition, recall, explanation, application, discrimination/debugging, and transfer |
| Mastery caution | Distinguishes fluency from storage strength; record learning after demonstrated understanding | Same | Rejects mastery from completion, confidence, time, one response, or heavy scaffolding; preserves uncertainty, hint level, contradictions, and versions |
| Correction and deletion | Manual document editing | Manual document editing | Executable correction, misconception rejection, version invalidation, scoped physical deletion, deterministic rebuild, and portable learner export |
| FSRS | Conceptual spacing only | Conceptual spacing only | Real pinned FSRS adapter with replayable review log, horizon-derived policy, due queue, snooze/reschedule, and enable/disable controls |
| FSRS evidence limit | No scheduler | No scheduler | Dependency-exercised with real library and golden vectors; scheduling quality for real learners is uncalibrated |
| Visual route | General beautiful HTML/components | Explicit `none` / static / interactive / motion router | Executable `none` / static / interactive / motion router with least-cost and retrieval-safety outputs |
| Visual tools | No registry | 38-tool progressively disclosed registry, query helper, registry tests, router SVG/PNG | All 12 inventoried legacy assets are restored, including the registry/helper/tests/router assets, plus the v2 router and optional Flint path |
| Visual provenance | Minimal | Editable source, render command, data/source, attribution/license, fallbacks, and inspection | Retains the legacy subsystem and adds artifact hashes, warning policy, retrieval safety, renderer validation, and optional Flint manifests |
| Authored format | HTML lessons and references | HTML lessons and references | Markdown is canonical; same-basename HTML is generated |
| Renderer | No bundled canonical renderer | No bundled canonical renderer | Pinned Marked plus allowlist sanitization, atomic writes, source hash, full-byte freshness check, landmarks, local/offline delivery, responsive tables, focus, print, and reduced-motion CSS |
| Artifact validation | Manual | Render-and-inspect visual rules | Executable link, metadata, schema, security, accessibility-structure, parity, provenance, and package checks |
| Accessibility evidence | Mostly implicit | Explicit visual-specific keyboard/text/static/caption/transcript/reduced-motion rules | Automated structural/security checks and public forward cases; representative assistive-technology and learner evidence remains EG-03 |
| Evaluator | None | Visual-registry tests, not a tutoring evaluator | Executable isolated paired evaluator with fresh package/workspace clones, hard-gate-first scoring, fingerprints, and measured macOS containment path |
| Study machinery | None | None | Executable protocol validation, seeded user-level allocation, external-key blinding, intention-to-treat analysis, attrition/fidelity reporting, and learner-level bootstrap intervals |
| Study evidence limit | No study | No study | Machinery evaluated on synthetic inputs only; no human outcome evidence |
| Ecosystem exports | None | None | Deterministic validated Anki text import, QTI 2.2, LiaScript, and thin H5P packages |
| Flint | None | General chart tools through the registry | Real pinned compile/render adapter dependency-exercised on a synthetic fixture; no chart-correctness or learner-benefit claim |
| SkillOpt | None | None | Real pinned upstream adapter and sandbox dependency-exercised; five-bank binding tested with synthetic documents, only synthetic `test` recorded as exercised; no optimization run or gain claim |
| Migration / backward compatibility | Original workspace format | Additive visual extension; core templates retain the `teach` shape | All 12 inventoried assets restored, but structured state and generated artifacts make v2 a migration rather than a drop-in replacement; no canonical migration has run |
| Runtime / platform surface | Instruction and workspace files | Adds a standard-library registry query helper | Standard-library teaching kernel; pinned Python environment for FSRS; Node for rendering/Flint; separate SkillOpt environment; claim-eligible built-in sandbox path is macOS-specific |
| Cost / latency evidence | Not measured here | Not measured here | Quick mode avoids persistence and optional integrations by design, but matched provider latency, token, and cost measurements remain EG-01 |
| Current full-package verification | No package-wide harness | Registry-focused checks | Durable receipts bind earlier recorded executions; fresh verification of the current package byte set is not claimed in this report |
| Current status | Canonical legacy source | Canonical custom source | Engineering candidate; not the canonical installed replacement and not scientifically supported |

Implementation evidence: [operations guide](./prax-teach-v2/references/OPERATIONS.md), [state engine](./prax-teach-v2/scripts/praxteach/state.py), [scheduler](./prax-teach-v2/scripts/praxteach/scheduler.py), [renderer](./prax-teach-v2/scripts/render_markdown.mjs), [validator](./prax-teach-v2/scripts/validate_workspace.py), [evaluator](./prax-teach-v2/scripts/evaluate.py), [study machinery](./prax-teach-v2/scripts/study.py), and [ecosystem exporter](./prax-teach-v2/scripts/export_learning.py).

## Purpose and routing in practical terms

### `teach`

`teach` assumes the learner is beginning or continuing a stateful course. Its compact strengths are mission grounding, trusted sources, short lessons, retrieval practice, spacing, interleaving, and a tight feedback loop. Its product shape is the limitation: the smallest request still enters a persistent-workspace model, with authored HTML as the main lesson unit and prose records as state.

### Canonical `prax-teach`

Canonical `prax-teach` preserves that course-first pedagogy and adds a detailed visual-production system. It asks what the learner must see, compare, predict, manipulate, or watch change; selects the smallest useful medium; preserves editable sources; and requires accessibility, provenance, fallback, and render inspection. Its [visual router](../../../../../Developer/agent-stack/skills/prax-teach/references/VISUALIZATION-ROUTER.md) and [tool registry](../../../../../Developer/agent-stack/skills/prax-teach/references/VISUALIZATION-TOOL-REGISTRY.md) are documented additions, but they do not create calibrated learner state or learning-outcome evidence.

### `prax-teach-v2`

V2 changes the product boundary. [routing.py](./prax-teach-v2/scripts/praxteach/routing.py) operationalizes the lightest sufficient mode, ordinary-task exclusion, explicit **Answer now**, consent-required courses, and the semantic visual route. The entrypoint then invokes one teaching kernel at different depths instead of treating every request as course administration.

The forward outputs in [evidence/forward](./prax-teach-v2/evidence/forward/run.json) are fresh-context public behavior evidence. They cover representative mode, consent, attempt-before-reveal, resume, visual-restraint, and fallback cases. They are not held-out quality evidence, provider ablation evidence, accessibility field evidence, or learner outcomes.

## State and FSRS: implemented, not merely specified

V2's [state engine](./prax-teach-v2/scripts/praxteach/state.py) creates no persistent byte before explicit consent. A consented course initializes private mission/resource files and stable lesson/reference/asset/state directories. Practice observations are appended to `sessions.jsonl`; concept and misconception documents are deterministic projections rather than an untraceable mutable score.

The engine also implements:

- evidence validation and cautious mastery projection;
- learner-reported versus tutor-inferred misconception provenance;
- compensating correction and misconception rejection;
- source/item-version invalidation;
- dry-run and confirmed scoped physical deletion;
- deterministic rebuild and inspectable learner export;
- path containment, private permissions, locking, and fail-closed validation.

The [scheduler](./prax-teach-v2/scripts/praxteach/scheduler.py) loads the exact pinned FSRS dependency with no heuristic fallback. Review events remain separate from concept mastery, replay into a learner-visible due queue, record the scheduler policy and transition, and expose snooze, reschedule, disable, and enable controls. This supports the evidence label **dependency-exercised**. It does not show that the chosen retention targets or intervals are optimal for real learners.

## Visuals and assets: the 12-asset correction

The candidate no longer has a legacy migration gap. The [legacy provenance manifest](./prax-teach-v2/evidence/provenance/legacy-assets.json) inventories all **12** restored assets against canonical `prax-teach`:

- the four workspace templates: glossary, learning record, mission, and resources;
- visualization research, the legacy visualization router, the registry guide, and the 38-tool registry JSON;
- the visualization query helper and its canonical registry tests, changed only by formatting where recorded;
- the reusable router SVG and PNG.

Most restored files are byte-identical; the original router is preserved under `LEGACY-VISUALIZATION-ROUTER.md` so v2 can also ship its new retrieval-aware router. Every relation, source path, target path, and content digest is recorded in the manifest.

Therefore these stale statements are false:

- “the four workspace templates do not ship”;
- “the 38-tool registry and query helper are not bundled”;
- “the reusable router assets were not migrated.”

V2 now combines those legacy assets with an executable least-cost visual route and the optional [Flint adapter](./prax-teach-v2/integrations/flint/render_flint.mjs). The Flint smoke proves the real package compile/render API ran through a Vega-Lite fixture; it does not prove that an MCP server or transport session ran. Its [manifest](./prax-teach-v2/evidence/integrations/flint-smoke/manifest.json) explicitly declines chart-correctness, network-isolation, and learner-benefit claims.

## Renderer and HTML delivery

`teach` and canonical `prax-teach` ask the agent to author HTML directly. V2 makes Markdown the source of truth and generates a same-basename companion.

The current [renderer](./prax-teach-v2/scripts/render_markdown.mjs) is executable engineering, not a template sketch. It:

- parses GFM through a pinned renderer and sanitizes reviewed HTML through an allowlist;
- rejects unsupported tags, attributes, executable URL schemes, remote image assets, and silent sanitizer-only rewrites;
- writes atomically and records source path, source hash, renderer/template versions, and generation time;
- checks the entire expected HTML byte stream for drift;
- supplies semantic landmarks, a skip link, focus styles, responsive tables, print behavior, and reduced-motion behavior without required CDN/runtime fetching.

The [workspace validator](./prax-teach-v2/scripts/validate_workspace.py) checks companions, links, anchors, metadata, schemas, security properties, accessibility structure, legacy provenance, optional-integration artifacts, and the candidate evidence contract. This supports implemented structural/parity/security claims. It is not a field accessibility certification; EG-03 remains parked.

## Evaluator, study machinery, exports, and optional adapters

### Agent evaluator

The [evaluator](./prax-teach-v2/scripts/evaluate.py) runs arms in fresh workspaces with read-only package clones, separates public machinery fixtures from candidate-quality scopes, applies forbidden-behavior hard gates before soft scores, fingerprints inputs and outputs, and has a measured default-deny macOS sandbox path. The durable [containment receipt](./prax-teach-v2/evidence/integrations/evaluator-sandbox/report.json) supports containment-mechanism engineering only. This is the candidate's specialized executable counterpart to the reusable `prax-tech-eval` method; it does not make that separate skill obsolete. A matched real-provider ablation with external held-out graders has not run; EG-01 remains parked.

### Learner-study machinery

The [study CLI](./prax-teach-v2/scripts/study.py) validates a frozen parallel protocol, creates seeded user-level assignments, generates HMAC-blinded assessment identifiers from an external key, enforces delayed assessment windows, retains assigned learners under a predeclared intention-to-treat missing-outcome policy, and bootstraps learners rather than correlated outcome rows.

Those mechanisms have been exercised on synthetic inputs. They make a real study possible; they are not themselves immediate, delayed, transfer, or generalization evidence. EG-04, EG-05, and EG-06 remain parked.

### Exports

The [export layer](./prax-teach-v2/scripts/praxexports/core.py) validates one reviewed learning-item model and emits deterministic:

- Anki text-import files—not falsely labeled `.apkg` files;
- QTI 2.2 content packages;
- LiaScript Markdown;
- a thin H5P package that still requires a compatible host runtime.

The evidence level is implemented format compatibility, not universal interoperability across every downstream host.

### SkillOpt and Flint

The [SkillOpt adapter](./prax-teach-v2/integrations/skillopt/prax_teach_adapter.py) and [source preparer](./prax-teach-v2/integrations/skillopt/prepare_source.py) exercise the real pinned upstream `EnvAdapter` boundary, five-bank interface, full-package cloning, integrity checks, and measured sandbox controls. Only public train/selection fixtures ship; the hidden smoke banks are synthetic/generated and remain controller-side. No optimization campaign or measurable lift exists. The [staging helper](./prax-teach-v2/integrations/skillopt/stage_proposal.py) treats caller-supplied score JSON as self-attested and can write only a quarantine receipt that is ineligible for evidence or adoption. No real optimized or quarantined proposal artifact ships.

The Flint adapter exercises the real pinned compile/render dependency and emits durable editable/provenance artifacts from a synthetic fixture. It does not establish chart correctness, field accessibility, or learning value. See the full [SkillOpt/Flint decision](./05-skillopt-and-flint-integration.md).

The integration receipts are byte-bound historical execution evidence for their recorded synthetic snapshots, not a substitute for fresh full-package verification of later candidate bytes.

## What v2 adds

Compared with `teach` and canonical `prax-teach`, v2 adds:

1. executable quick/lesson/course and visual routing;
2. immediate **Answer now** and ordinary-task exclusion;
3. a nine-phase teaching loop with progressive hints, precise feedback, unseen transfer, and cautious mastery;
4. consent-first JSON/JSONL state, deterministic projections, correction, invalidation, deletion, and learner export;
5. a real pinned FSRS adapter and learner-controlled review queue;
6. canonical Markdown, sanitized deterministic HTML, security/parity/accessibility-structure validation, and reproducibility metadata;
7. isolated agent-evaluation and blinded learner-study machinery;
8. deterministic Anki, QTI, LiaScript, and H5P exports;
9. real-dependency Flint and SkillOpt adapter boundaries;
10. a machine-readable claim ladder and individually parked external gates;
11. restoration and provenance for all 12 assets in the legacy migration inventory.

## What v2 removes or replaces

No inventoried legacy package asset remains missing. The meaningful removals are operating-policy changes:

| Previous behavior | V2 replacement | Consequence |
|---|---|---|
| Every teaching request begins as persistent multi-session work | Quick is ephemeral; lesson is bounded; course requires consent | Less ceremony and no silent state |
| Mission interview precedes useful teaching | Mission depth is proportional to mode; at most one high-value intake question | Faster bounded help while retaining a course mission |
| HTML is independently authored | Markdown is canonical and HTML is generated | Reviewable source and enforceable parity |
| Prose learning records are primary state | Append-only observations plus deterministic JSON projections | More inspectable and machine-checkable, but a larger implementation surface |
| Reusable component construction is the default | Native GFM/semantic HTML first; custom code only for a concrete learner action | Lower one-off framework cost |
| Multiple-choice options should match length | Cross-surface answer-leakage checks | Covers labels, alternatives, previews, source, and default state rather than one brittle heuristic |
| Never trust parametric knowledge as a universal instruction | Risk-based source hierarchy and live verification triggers | Matches verification effort to instability and stakes |
| Community interaction is a core pillar/default delegation | Community and lived-experience sources are optional, lower-tier inputs | Preserves agency without treating social participation as mandatory |
| `NOTES.md` is a named default workspace file | The initializer omits an ad-hoc scratchpad; reviewed evidence uses consented structured state | Removes unscoped working notes from the default durable learner record |

The restored legacy learning-record template remains available for compatibility and migration, but it is no longer the primary evidence engine.

## Pros and cons

### `teach`

**Pros**

- Small, legible, and easy to invoke deliberately.
- Explicit mission grounding and durable-learning fundamentals.
- Clear course workspace, trusted-resource posture, and short lesson unit.

**Cons**

- Forces a multi-session course shape onto bounded teaching requests.
- No explicit direct-answer escape or ordinary-task exclusion.
- Prose state is not a calibrated, executable evidence model.
- No explicit consent/deletion/export boundary, real scheduler, evaluator, study machinery, or canonical renderer.

### Canonical `prax-teach`

**Pros**

- Preserves the compact `teach` foundation.
- Explicit semantic visual routing, editable-source discipline, provenance, fallbacks, and inspection rules.
- Progressive tool discovery across spatial, quantitative, interactive, and temporal learning jobs.

**Cons**

- Inherits the course-first and prose-state model.
- Visual-production quality can be mistaken for teaching quality if claims are not separated.
- The tool registry is a dated capability snapshot that requires maintenance.
- No executable learner consent/state/scheduler/evaluator/study or learner-outcome evidence.

### `prax-tech-eval`

**Pros**

- Enforces a genuine skill-off control instead of merely telling an agent not to use a skill.
- Predeclares outcomes, guardrails, budgets, paired randomization, repeated trials, trigger behavior, cost, latency, and regression reporting.
- Reusable across teaching and non-teaching skills without coupling evaluation logic to the target package.

**Cons**

- It is not a tutor, learner-state system, renderer, scheduler, or course workspace.
- It still needs a real harness that can mount the treatment skill and remove it completely from control runs.
- Three-to-six trials are an engineering screen, not universal statistical or learner-outcome proof.
- It evaluates marginal skill value but does not itself fix a weak skill or authorize adoption.

### `prax-teach-v2`

**Pros**

- Covers bounded answers, lessons, and persistent courses without forcing one product shape.
- Operationalizes routing, attempt-before-reveal, learner agency, feedback, transfer, state, scheduling, and claim boundaries.
- Restores all 12 inventoried legacy visual/template assets with provenance.
- Ships executable state, FSRS, deterministic artifacts, evaluation/study machinery, exports, and guarded real-dependency adapters.
- Makes evidence limits machine-readable and fail-closed at important boundaries.

**Cons**

- Considerably larger implementation and dependency surface than either canonical skill.
- Candidate rather than canonical installed replacement.
- Deterministic routing and public/synthetic evaluations do not establish universal behavior quality.
- Real FSRS use does not establish scheduling calibration.
- Automated accessibility structure does not establish representative field accessibility.
- Flint and SkillOpt dependency exercises do not establish chart value or optimization lift.
- No real human study supports immediate benefit, delayed retention, transfer, generalization, or “best tutor” language.

## Blueprint phase-by-phase status

The phase label reports the maturity of locally reachable machinery, not completion of every phase outcome. It never upgrades a parked subclaim.

| Blueprint phase | Current local machinery state | Implemented or exercised now | Still external or conditional |
|---|---|---|---|
| Phase 0 — freeze and measure | **Implemented** | Frozen source fingerprints and original inventory; executable evaluator and forbidden-behavior gates | Matched real-provider trigger, latency, token, and behavior baselines (EG-01) |
| Phase 1 — minimum lovable tutor | **Evaluated on public forward cases** | Three-mode and **Answer now** routing; teaching/hint policy; deterministic renderer with automated accessibility-structure checks; fresh-context behavior outputs | Representative assistive-technology and learner evidence (EG-03) |
| Phase 2 — durable learner loop | **Dependency-exercised** | Consent-first JSON/JSONL evidence; deterministic concept/misconception projections; correction, invalidation, export, deletion; real pinned FSRS | Calibration against real learner scheduling outcomes |
| Phase 3 — evidence and adaptation | **Machinery evaluated on public or synthetic inputs** | Isolated agent evaluator; randomized blinded study preparation/analysis; uncertainty receipts | Matched agent ablations (EG-01); immediate/delayed human evidence (EG-04/05); calibration; knowledge tracing only if justified |
| Phase 4 — optional ecosystem adapters | **Dependency-exercised** | Real pinned Flint and SkillOpt boundaries; Anki, QTI, LiaScript, and H5P exports | Flint learner comparison; measured SkillOpt lift (EG-02); voice/animation/classroom modules only for a concrete learning job |

Phase 3's “evaluated” means public or synthetic machinery receipts exist. It does not mean the candidate passed a human learner-outcome study. Phase 4's “dependency-exercised” means real dependencies ran through guarded adapters. It does not mean those dependencies improved learning.

## External gates: all individually parked

| Gate | Status | Exact unblock |
|---|---|---|
| EG-01 — provider ablation | **Parked** | Matched real-provider no-skill, frozen-`teach`, and candidate trials against external held-out graders |
| EG-02 — SkillOpt gain | **Parked** | Budgeted optimization whose repeated hidden lift exceeds measured noise and passes cross-model hard gates |
| EG-03 — accessibility field evidence | **Parked** | Manual assistive-technology checks and representative disabled and neurodivergent learner sessions |
| EG-04 — immediate learner benefit | **Parked** | Consented randomized active-control human posttest |
| EG-05 — delayed North Star | **Parked** | Blind-scored delayed retention and novel-transfer outcomes from real learners |
| EG-06 — generalization | **Parked** | Replication across topics, models, learners, accessibility needs, and time |

These gates are individually applicable even though the phase-level engineering work exists. A local verification receipt cannot pass an external evidence gate by substitution.

## Exact North Star audit

The North Star is:

> The learner can later retrieve, explain, apply, discriminate, and transfer the idea without the tutor—and the system can show honest evidence for that claim.

| Question | Exact current answer | Why |
|---|---|---|
| Is the North Star encoded in the tutoring and evidence design? | **Yes** | The teaching loop and state model explicitly represent later retrieval, explanation, application, discrimination, transfer, scaffolding, uncertainty, and contradictions |
| Is the local machinery needed to collect and analyze the evidence implemented? | **Yes** | State, scheduler, evaluator, study preparation/analysis, artifact validation, and exports are executable at their stated evidence levels |
| Has real delayed learner evidence demonstrated the North Star? | **No** | EG-04 through EG-06 remain parked; no real delayed retention/novel-transfer study or replication exists |

No public fixture, synthetic study, agent output review, scheduler smoke, Flint render, SkillOpt import, or self-attested score receipt may be promoted into a human-learning claim.

## Final judgment

`teach` is the compact course-workspace foundation. Canonical `prax-teach` is that foundation plus a visual-production subsystem. `prax-tech-eval` is the separate reusable skill-ablation evaluator. `prax-teach-v2` is a much broader engineering candidate that now implements and exercises the locally reachable mechanisms described by its blueprint, including restoration of all 12 inventoried legacy assets and a candidate-specific evaluator that complements rather than replaces `prax-tech-eval`.

The accurate current label is:

> An engineering candidate with implemented, evaluated, and dependency-exercised mechanisms at explicit evidence levels.

The inaccurate labels are:

> Best tutor; proven learner gain; held-out winner; field-accessibility certified; scientifically supported; or automatic replacement for canonical `prax-teach`.

The candidate has completed local engineering review and reproducible packaging and is ready for explicit installation review or the next external evidence stages. It is not installed, has not replaced canonical `prax-teach`, and is not ready for claims those external stages have not earned.
