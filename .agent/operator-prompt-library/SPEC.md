# SPEC — operator-prompt-library run (2026-08-21)

## Objective
Land the pending teach-pro-max + operator-prompt-library work cleanly per the
operator's directive: merge feature work to main, set up ALL skill suites in
this fork (gstack / pstack / matt-pocock / gbrain — "no exception"), categorize
the work, then run the spec-driven loop (tickets → implement → reviews → QA →
validator) and raise a PR.

## Category verdict (operator ask #3)
This repo is **agent-skill portfolio curation + agent tooling** (docs/content +
dev-tooling). Three workstreams:
1. Education-skill authoring — teach-pro-max upgrade (merged to main).
2. Prompt-library content — prompts/high-end-operator + project-alignment.
3. Skill-fleet integration — gbrain resolver conformance, skillpack sync,
   setup scaffolds. No application code, no server, no UI.

## Non-goals
- No production QA logs/images: nothing here runs in production; fabricating
  them would violate §4.6. QA evidence = validation logs instead.
- No push to main; PR only (operator: "only raise PR").
- design-qa N/A (no UI).

## Assumptions (recorded, not stalled on)
- A1: "merge commits to main" = local merge of feat/teach-pro-max-practical-learning; no push of main.
- A2: autonomous mode ⇒ recommended defaults chosen for all interactive gates.
- A3: untracked WIP belongs to this workstream and should be committed in groups.
- A4: vendored prax-teach-v2 .agent/.agents/openspec state is evidence, commit it.

## EARS acceptance criteria
- AC1 WHEN `git log main` runs, main SHALL contain 3459563 (merge done, local).
- AC2 WHEN a fresh agent reads AGENTS.md, it SHALL find issue-tracker/triage/domain config pointing at docs/agents/*.md.
- AC3 WHEN pstack runs, ~/.config/pstack/models.md SHALL exist with valid role map (all inherit-parent).
- AC4 WHEN `gbrain check-resolvable --json` runs in repo root, it SHALL report 0 unreachable and 0 mece_gap issues.
- AC5 WHEN an agent opens skills/RESOLVER.md, every skills/<slug>/SKILL.md SHALL have a trigger row; frontmatter triggers: authoritative.
- AC6 WHEN commits land, they SHALL be grouped: (a) prompts family+README, (b) packaged zips, (c) vendored prax-teach-v2 state, (d) skill fleet setup (skillpacks+resolver+setup docs), (e) run audit trail.
- AC7 WHEN QA runs, evidence logs SHALL exist under .agent/operator-prompt-library/qa/ (markdown structure scan, broken-ref scan, zip integrity) and pass or list defects.
- AC8 WHEN review gates run, code-review findings SHALL be addressed or deferred with rationale in session log.
- AC9 WHEN all above pass, branch feat/operator-prompt-library SHALL be pushed and a PR opened against main; validator pass (fresh-context subagent vs THIS spec) SHALL precede it.

## Constraints
- Secrets ritual: none touched. gh token stays in keyring.
- Rollback: branch-level; baseline main=930c112→3459563 recorded in progress.txt.
