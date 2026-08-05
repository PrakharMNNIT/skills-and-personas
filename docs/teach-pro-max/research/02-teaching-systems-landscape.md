# Teaching skills and systems landscape

_Snapshot: 2026-08-04. Repository activity, releases, and popularity are time-sensitive; pedagogy claims were ranked by source quality, not stars._

## Executive finding

There is no single repository that should replace `prax-teach`. The best design is a small, composable teaching contract built from several proven or inspectable ideas:

- **pedagogical behavior:** Education Agent Skills, Tutor CoPilot, CodeAid;
- **concept state and adaptation:** OATutor, DeepTutor’s learner-model RFC, Oppia;
- **multi-session lifecycle:** Fluent, Learn FASTER, `learn-codebase`;
- **review timing:** FSRS;
- **canonical Markdown and interactive delivery:** LiaScript, `paper-to-course`, `codebase-to-course`;
- **instruction optimization:** SkillOpt as a staged, hidden-benchmark proposal generator;
- **quantitative visuals:** Flint as an optional semantic chart compiler behind the visual router;
- **evaluation:** `prax-tech-eval` for agent ablation plus a separate learner-outcome study.

The central architectural choice is to keep those capabilities replaceable. Copying an entire AI classroom platform would add complexity faster than learning value.

## Research method

The search covered GitHub repositories and issues, arXiv and peer-reviewed studies, standards bodies, official product documentation, X, Reddit, Hacker News, skill registries, and project sites. Sources were screened with this evidence ladder:

1. **Outcome evidence:** randomized or controlled learner outcomes, systematic reviews, meta-analyses.
2. **Deployment evidence:** real learners, duration, usage data, and documented limitations.
3. **Inspectable implementation:** source, tests, state schemas, and issue history.
4. **Maintainer claims:** useful for features, not effectiveness.
5. **Social signal:** useful only for discovery, failure reports, and ecosystem attention.

No star count, marketplace install count, testimonial, or polished demo was treated as proof of learning.

## The three local packages

| Package | What it actually is | Strengths | Main limitation | Recommended role |
|---|---|---|---|---|
| `teach` | Explicit-only, persistent teaching-workspace skill | Strong mission grounding, trusted sources, retrieval/spacing/interleaving, short interactive HTML lessons, learning records | Assumes multi-session intent; weak operational accessibility, learner-state, review-scheduling, and evaluation contracts | Freeze as a lean behavioral baseline |
| `prax-teach` | `teach` plus a researched visual-production router and tool registry | Keeps the pedagogical core and adds semantic `none` / `static` / `interactive` / `motion` routing, provenance, editable sources, accessibility fallbacks | Still begins from “stateful request”; visual system is more mature than learner modeling | Evolve into the production tutor |
| `prax-tech-eval` | Generic skill-on/skill-off ablation framework despite its name | Fingerprinted target, clean control requirements, paired randomized matrix, trigger and regression gates, provenance checks | No harness runner and no learner-outcome measurement | Retain as the agent-level evaluator; rename later if worthwhile |

The earlier name `prax-teach-eval` is not the installed package name. The inspected package is `prax-tech-eval`.

### Verified local snapshot

| Check | Result on 2026-08-03 | What it proves |
|---|---:|---|
| `teach/SKILL.md` | 140 lines; 6 package files | A compact but course-first instruction package; no executable validation suite found |
| `prax-teach/SKILL.md` | 188 lines; 14 package files | The core remains concise while visual guidance is progressively disclosed |
| Visualization registry | 38 tool entries; **8/8 tests passed** | Registry schema, routing, installed-path checks, and technology coverage work—not that lessons improve learning |
| `prax-tech-eval/SKILL.md` | 167 lines; 8 package files | A compact runner-neutral experiment contract |
| Evaluator suite | **29/29 tests passed** | Fingerprints, matrix/provenance validation, guardrails, and reporting logic work—not that a real harness or learner study has run |

The test distinction matters: the local packages are operationally healthier than the Sidechat prose alone suggests, but their passing tests validate machinery, not teaching effectiveness.

## Ranked adoption shortlist

### Tier A — adopt the ideas now

| Source | What is inspectable or evidenced | What `prax-teach-v2` should borrow | Do not copy blindly |
|---|---|---|---|
| [Education Agent Skills](https://github.com/GarethManning/education-agent-skills) | Large library of typed pedagogical primitives across many domains; includes retrieval-first, progressive hints, teach-back, transfer, productive failure, evidence-strength, and exclusion fields | A vocabulary of semantic lesson blocks and explicit “use / do not use” conditions | The repository says its prompts are not themselves empirically validated; CC BY-SA obligations matter if copying text |
| [OATutor](https://github.com/CAHLR/OATutor) | Open intelligent tutoring system with explicit knowledge components, Bayesian Knowledge Tracing, weakest-skill selection, structured hints, logging, and accessibility; connected to CHI 2023 and later learning-gain research | Concept IDs, prerequisite mapping, item-to-skill links, hint ladders, and evidence-aware adaptation | It is strongest for step-based mathematics; its parameters do not transfer automatically to arbitrary topics |
| [Tutor CoPilot](https://github.com/rosewang2008/tutor-copilot) and [paper](https://arxiv.org/abs/2410.03017) | Preregistered live-tutoring RCT with roughly 900 tutors and 1,800 K–12 students; reported 4 percentage-point overall mastery lift and 9 points for learners of lower-rated tutors | Guiding questions, timely intervention, and “avoid giving away the answer” as measurable policy | The demo repository is small and the outcomes are context-specific |
| [CodeAid](https://arxiv.org/abs/2401.11314) | 12-week deployment with 700 programming students and about 8,000 uses; conceptual responses, pseudocode, annotated student code, follow-up steering | Distinct response modes, authoritative technical sources, transparent uncertainty, learner steering | It did not establish causal test-score gains; novices may be unable to detect factual errors |
| [FSRS](https://github.com/open-spaced-repetition/free-spaced-repetition-scheduler) | Open scheduling algorithm and implementations based on difficulty, stability, and retrievability | A real review queue with serializable state and performance-derived ratings | Scheduling is not mastery; the model must not fabricate ratings |
| [LiaScript](https://github.com/LiaScript/LiaScript) | Mature Markdown-first interactive course system with quizzes, cloze tasks, live code, TTS, offline/PWA and LMS-oriented features | Canonical Markdown, semantic interactive blocks, portable course rendering | Its extended syntax/runtime is a dependency; generated accessibility still requires verification |
| [learn-codebase](https://github.com/ktaletsk/learn-codebase) | Narrow Socratic codebase tutor with prediction before reveal, active recall, mastery colors, review queue, and persistent journal | Compact multi-session journal, learner-authored mental models, open questions, “aha” moments, and predict-before-reveal | Small project with anecdotal outcome claims; prompt adherence and client UI can leak answers |
| [Think Before Code](https://github.com/Far-200/think-before-code) | Ten stage-specific Socratic DSA skills with positive/negative activation cases, forbidden behaviors, validators, and CI | Test negative behavior: premature answers, excessive hints, answer leakage, skipped reasoning, and missing transfer | Early project; behavioral specs are not learner-outcome graders |
| [Microsoft SkillOpt](https://github.com/microsoft/SkillOpt) and [paper](https://arxiv.org/abs/2605.23904) | Text-space optimizer with scored rollouts, bounded edits, selection gating, rejected-edit history, and a deployable `best_skill.md`; authors report best/tied results in 52 tested settings | A reproducible offline instruction-improvement loop with hidden train/selection/test banks and staged diffs | It optimizes one document, is alpha and costly, can overfit a repeatedly queried selection set, and provides agent-task—not learner—evidence |
| [Microsoft Flint](https://github.com/microsoft/flint-chart) and [paper](https://arxiv.org/abs/2607.20775) | Semantics-driven chart compiler with human-editable specs and Vega-Lite, ECharts, Chart.js, Plotly, Excel, and MCP paths | Optional pinned build-time chart compilation after the router chooses a quantitative visual | It is not a data-wrangling or accessibility system; warnings, provenance, table/text alternatives, and backend coverage remain our responsibility |

### Tier B — borrow selectively

| Source | Valuable pattern | Limitation / risk |
|---|---|---|
| [DeepTutor](https://github.com/HKUDS/DeepTutor) | Connected learning context, versioned knowledge bases, quizzes, question banks, living books, skill registry, inspectable three-layer memory, source provenance, and a universal **Answer now** path | Large, fast-moving platform; product breadth is not outcome evidence. Its strongest concept-level learner model is still proposed in [RFC #397](https://github.com/HKUDS/DeepTutor/issues/397) |
| [EduHub](https://eduhub.deeptutor.info/) | Inspectable education-skill registry and an ecosystem model for composable teaching capabilities | Registry presence is not pedagogical validation; imported skills require provenance and security checks |
| [Bloom](https://github.com/Li-Evan/Bloom) | Syllabus → lesson → annotation/questions → adaptive next lesson; supports source, topic, and project modes | “2-sigma” positioning is aspirational without equivalent repository evidence |
| [Fluent](https://github.com/m98/fluent) | Local learner profile, mistakes, mastery, session log, spaced review, and backups | Language-learning-specific; several science/performance claims are not independently validated |
| [Learn FASTER](https://github.com/hluaguo/learn-faster-kit) | Portable `.learning/` workspace, executable scheduler, resume/fork semantics, balanced/exam/theory/practical modes | Runtime requirements and heuristic claims; more machinery than quick mode needs |
| [OpenTutor](https://github.com/zijinz456/OpenTutor) | Local-first block workspace, concept graph, FSRS review, quizzes, notes, and analytics | Public beta; autonomous and graph features remain experimental |
| [Tov-learn](https://github.com/TovTechOrg/Tov-learn) | Canonical learner records plus HTML progress and architecture dashboards | Fixed review intervals are less defensible than a performance-based scheduler |
| [`teach-me`](https://github.com/claude-code-best/claude-code/blob/main/.claude/skills/teach-me/SKILL.md) | Diagnose-first concept map, misconception lifecycle, mastery requiring explain/apply/distinguish/debug, retest on resume | Multiple-choice-heavy checks can cue answers; parent-repository popularity is not skill evidence |
| [`feynman-tutor`](https://github.com/koukekoukej-glitch/feynman-tutor) | Learner-explains-first loop, concept graph, error severity | Small project and little outcome evaluation |
| [`claude-teacher-plugin`](https://github.com/yarikleto/claude-teacher-plugin) | Project opt-in, misconception-first quizzes, reasoning checks, session hooks, animated HTML diagrams | CDN-dependent HTML, simple scheduling, and unsupported learning-style assumptions |

### Tier C — use as an export target or design reference

| Source | Useful reference | Why it should not become the core |
|---|---|---|
| [`codebase-to-course`](https://github.com/zarazhangrui/codebase-to-course) | Polished modular HTML courses, code-to-English explanations, transfer-oriented quizzes, keyboard navigation | Narrow persona and an over-eager requirement for visuals/interactions in every module |
| [`paper-to-course`](https://github.com/KaguraTart/paper-to-course) | Source verification before authoring and coordinated Markdown, HTML, and slide outputs | Research-paper-specific; multi-format parity still needs a canonical source/build contract |
| [OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | Multi-agent classroom, slides, simulations, quizzes, whiteboard, speech, HTML/PPTX export | Spectacle, latency, and operational footprint exceed what a core teaching skill needs |
| [Oppia](https://github.com/oppia/oppia) | Branching exploration state machine and response-specific feedback | Full learning platform, far too heavy for a skill dependency |
| [H5P](https://github.com/h5p/h5p-php-library) | Reusable HTML5 interaction ecosystem and LMS interoperability | GPL/integration complexity; better as an export adapter |
| [QTI](https://www.1edtech.org/standards/qti/index) | Portable assessment items, tests, and results; QTI 3 supports web-component patterns | Premature for a local v1; use later for assessment export |
| [Caliper Analytics](https://www.1edtech.org/standards/caliper) and [xAPI](https://github.com/adlnet/xAPI-Spec) | Event vocabulary and interoperability | Activity telemetry is not evidence of learning; full standards add overhead |
| [Anki MCP Server](https://github.com/ankimcp/anki-mcp-server) | Optional bridge to an established review application | Do not make an external flashcard system mandatory |
| [OLI Torus](https://github.com/Simon-Initiative/oli-torus) | Versioned course publication, instrumentation, and analytics | Institution-scale course platform |

## Systems that are influential but not sufficient evidence

### Mr. Ranedeer

[Mr. Ranedeer](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor) is an influential configurable tutor prompt with depth, style, tone, and course commands. Its popularity demonstrates demand and prompt portability. GitHub issues about prompt forgetting and context limits also show why one large prompt is not a durable learner system. Treat it as interaction inspiration, not a state or evaluation architecture.

### Study Buddy

[Study Buddy](https://github.com/michaelborck/study-buddy) deliberately stays local/private and single-session, grounds answers in user-selected or web sources, and does not build a persistent knowledge base. It is an excellent counterexample to course-first design: privacy-conscious quick tutoring is a legitimate complete product mode.

### Open Tutor AI Community Edition

[Open Tutor AI CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) offers local RAG, many providers, a PWA, and voice/video/avatar interfaces. It shows delivery options, but the interfaces should remain optional adapters rather than define the teaching core.

## What GitHub issues reveal that README files do not

Public failure reports were unusually valuable:

- `learn-codebase` users reported answer leakage from client prompt suggestions, not the skill prompt itself. [Issue #4](https://github.com/ktaletsk/learn-codebase/issues/4)
- Rewind/clean operations can erase a repository-local journal. [Issue #2](https://github.com/ktaletsk/learn-codebase/issues/2)
- Different agents can create state silos; a proposed repo-keyed global vault separates timeline, mental model, and durable gotchas. [Issue #3](https://github.com/ktaletsk/learn-codebase/issues/3)
- DeepTutor’s learner-model RFC says profile/chat-summary memory is not enough for recognition, recall, application, transfer, explanation, misconceptions, and evidence IDs. [RFC #397](https://github.com/HKUDS/DeepTutor/issues/397)

These point to two operational requirements: put durable state outside disposable client context, and test the entire answer surface—not just the tutor’s final prose.

## X and community signals

X was useful for discovering what attracts attention, not for ranking effectiveness.

- A widely circulated [DeepTutor post on X](https://x.com/lucas_flatwhite/status/2041894141643440626/photo/1) emphasizes uploaded-source grounding, generated practice, guided learning, visualization, and persistent tutor personas. Those feature claims were checked against the repository before inclusion.
- Brilliant’s Koji launch pattern—also discussed in an [X post](https://x.com/suekhim/status/2060378988606878147)—shows a compelling interaction: the tutor observes work in the same surface, points or annotates in context, and asks before telling. This is vendor/product evidence, not an independent learning study.
- Reddit and skill-marketplace posts surfaced `grill-me`, IELTS-tutor, Beginner Tutor, and other narrow prompts. Their useful patterns were already represented by stronger inspectable sources; numeric thresholds and “science-backed” labels without citations were not adopted.

Social attention is best treated as a lead generator. The research ranking came from primary repositories, papers, issues, and standards.

## Evidence from learning science

| Principle | Evidence summary | Design consequence |
|---|---|---|
| Retrieval practice | Classroom meta-analysis across 48,478 students and 222 studies found a medium benefit, with implementation moderators. [Yang et al., 2021](https://pubmed.ncbi.nlm.nih.gov/33683913/) | Require production before reveal; repeat important knowledge; give corrective explanation; include transfer forms |
| Spacing | Large syntheses show benefits and that the useful interval depends on the target retention interval. [Cepeda et al., 2006](https://pubmed.ncbi.nlm.nih.gov/16719566/) and [Dunlosky et al., 2013](https://pubmed.ncbi.nlm.nih.gov/26173288/) | Schedule every important concept; no universal fixed cadence |
| Interleaving | Meta-analysis found a moderate overall effect but domain-sensitive results, including ambiguous or negative categories. [Brunmair & Richter, 2019](https://pubmed.ncbi.nlm.nih.gov/31556629/) | Interleave confusable cases to train discrimination; do not shuffle unrelated content |
| Feedback | Meta-analysis of 435 studies found a positive average with substantial heterogeneity. [Wisniewski et al., 2020](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.03087/full) | State the goal, specific gap, applicable strategy, and next action; avoid generic praise |
| Intelligent tutoring systems | Reviews report sizable effects for evaluated ITS packages, often larger on locally aligned tests. [Kulik & Fletcher, 2016](https://eric.ed.gov/?id=EJ1090502) | Borrow step-level diagnosis and hints; do not generalize the effect to any conversational LLM |
| Mastery learning | Promising average impact, but evidence security is rated low and thresholds vary. [EEF mastery review](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/mastery-learning) | Require multiple demonstrations and delayed evidence; avoid hard lockouts from uncertain estimates |
| Knowledge tracing | BKT is interpretable and deep models can predict responses, but predictive accuracy does not prove beneficial adaptation. [Corbett & Anderson](https://act-r.psy.cmu.edu/?p=14344&post_type=publications), [DKT](https://papers.nips.cc/paper_files/paper/2015/hash/bac9162b47c56fc8a4d2a519803d51b3-Abstract.html) | Start interpretable; calibrate and hold out learners/time; separately test whether adaptation improves delayed learning |

## Standards and governance worth adopting

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) AA as a web release gate, supplemented by [W3C cognitive-accessibility guidance](https://www.w3.org/TR/coga-usable/).
- [CAST UDL 3.0](https://udlguidelines.cast.org/) as design guidance for equivalent ways to engage, perceive, and respond—without claiming the entire framework has one uniform causal effect.
- [Jisc’s learning analytics code](https://www.jisc.ac.uk/guides/code-of-practice-for-learning-analytics) for transparency, review, correction, and data minimization.
- [UNESCO guidance on generative AI in education](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?hub=195885) for human-centered use, privacy, and age-appropriate governance.

## Recommended synthesis

Build `prax-teach-v2` as seven replaceable layers:

| Layer | Core responsibility | Strongest reference |
|---|---|---|
| Teaching policy | diagnose, retrieve, scaffold, explain, transfer, reflect | Tutor CoPilot, CodeAid, Education Agent Skills |
| Learner state | evidence-backed concept state, misconceptions, uncertainty, correction | OATutor, DeepTutor RFC, `learn-codebase` |
| Scheduler | choose review timing from actual performance and retention goal | FSRS and spacing research |
| Artifact renderer | generate accessible HTML from canonical Markdown | LiaScript, `paper-to-course`, WCAG |
| Quantitative visual compiler | semantic chart spec → verified static asset + accessible equivalent | Flint behind the existing visual router |
| Evaluator | behavioral ablation plus separate learner outcomes | `prax-tech-eval`, evidence-centered design, testing standards |
| Offline optimizer | scored trajectories → staged instruction proposal | SkillOpt with hidden gates and human approval |

Keep quick mode able to operate with only the teaching-policy layer. Add state, scheduling, and richer artifacts as the learner’s requested commitment grows.

## What not to build yet

- A multi-agent classroom by default.
- A proprietary knowledge-tracing model before an interpretable baseline is calibrated.
- A new flashcard app instead of an optional Anki export.
- Full QTI, Caliper, or xAPI conformance in the first release.
- Mandatory animation, avatar, voice, or gamification.
- A dashboard that treats clicks, time-on-page, or file count as learning.
- A hand-maintained HTML copy of every Markdown file.
- Automatic adoption of optimizer edits or transcript harvesting without explicit review and consent.
- A mandatory chart runtime when a table or prose is clearer.

The best near-term system is intentionally smaller: a precise teaching loop, correctable state, real review scheduling, deterministic accessible artifacts, and evaluation that measures durable learning rather than presentation quality alone.
