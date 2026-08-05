# Forward behavior evidence

This directory preserves the public fresh-context behavior checks required by
AC-23. These checks show whether representative outputs follow the frozen
behavior and artifact-policy rubric. They do **not** establish held-out quality,
candidate superiority, field accessibility, or human learning outcomes.

## Attempt history

| Attempt | Result | Disposition |
|---|---:|---|
| 1 | 5/8 passed | Retained under `attempts/attempt-1/`; the lesson, course-consent, and resume cases failed. |
| 2 | Unscored | Retained under `attempts/attempt-2-driver-draft/`; disqualified because the driver named desired closing behavior. |
| 3 | Reported 8/8, now ineligible | The complete output corpus was not archived; `attempts/attempt-3/MISSING-EVIDENCE.md` forbids using it as current release evidence. |
| 4 | 6/8 passed | Retained under `attempts/attempt-4/`; progressive post-error hinting and resume-state fidelity failed. |
| 5 | Composite 8/8, release-ineligible | Retained under `attempts/attempt-5-composite/`; only the two attempt-4 failures were rerun, so it did not satisfy the all-case fix-and-rerun gate. |
| 6 | Stopped after 5 cases | Retained under `attempts/attempt-6/`; the accessibility response omitted the explicit host-UI limitation and no-custom-control boundary. |
| 7 | 8/8, later invalidated | Retained under `attempts/attempt-7/`; it passed, then source changes made its exact bindings stale. |
| 8 | Unscored | Retained under `attempts/attempt-8-driver-context/`; stopped after seven cases because the runner prompt confused the read-only package with the learner workspace. |
| 9 | 8/8, later invalidated | Retained under `attempts/attempt-9/`; it passed, then final visual, isolation, scheduler, and routing remediation changed its bound source bytes. |
| 10 | **8/8 passed** | Current `run.json`, eight fresh outputs, and independent `receipt.json`; all cases were regenerated against the remediated source. |

The frozen rubric is `../../evals/forward-behavior.json`. The current run binds
the rubric, its own byte-final run manifest, seven teaching sources, the supplied
synthetic resume context, eight distinct fresh task identities, and every output
byte. The independent reviewer recomputed all 18 declared bindings and recorded
item-level judgments for every required and forbidden behavior.

## Multi-turn lesson integrity

The lesson case used one fresh `fork_turns:none` tutor. It received the candidate
skill, the learner request, and only natural learner replies; it did not receive
the rubric, prior outputs, or desired closing instructions. The exact transcript
contains eight tutor and seven learner turns: unassisted initial diagnosis and
discrimination, an unseen whole-document transfer, a learner-authored
teach-back, a later CAS/retry error, one next-needed hint followed by a turn
boundary, and a scaffolded repair. The transfer answer first appears in the
learner attempt. The closing evidence statement separates unassisted from
scaffolded performance, leaves delayed recall untested, and requests fresh
no-notes retrieval in one to two days and again after one week.

## Accessibility claim boundary

The accessibility case uses host chat with no custom artifact controls or
scripts. It supplies complete static instructions/data and explicit typed-action
labels in reading order. It also states that host-UI keyboard, focus,
reduced-motion, and assistive-technology behavior remains unverified. Automated
artifact structure checks and this agent-behavior case do not satisfy EG-03.

## Claim boundary

Attempt 10 is reproducible public engineering evidence about this package
snapshot. It cannot satisfy EG-01 provider ablation, EG-02 measured SkillOpt
gain, EG-03 representative accessibility field evidence, EG-04 immediate human
benefit, EG-05 delayed retention and transfer, or EG-06 generalization.
