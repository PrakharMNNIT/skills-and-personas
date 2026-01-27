# Commit Message Guide

This repo uses **emoji-prefixed Conventional Commits** to keep history readable and searchable. The goal is clarity, scope, and intent, with minimal noise.

---

## TL;DR

**Format**
```
<emoji> <type>(<scope>): <subject>

<body>

<footer>
```

**Example**
```
:sparkles: feat(skills): add ultra-mode directives to super-mode

- add always-on maximal depth mandate
- add modern exclusivity posture
- regenerate .skill archives

Refs: #123
```

---

## 1) Required Header Format

**Header line** (mandatory):
```
<emoji> <type>(<scope>): <subject>
```

- **emoji**: Use one emoji that matches intent (see mapping below).
- **type**: Conventional commit type.
- **scope**: Optional but strongly recommended; keep short (e.g., `skills`, `docs`, `scripts`).
- **subject**: Imperative, present tense, <= 72 chars.

**Good subjects**
- “add role-based skill packaging”
- “update kingmode references”
- “fix constellation-team bullet formatting”

**Bad subjects**
- “added a bunch of stuff”
- “fixing things”
- “update”

---

## 2) Emoji + Type Map

Choose **one emoji** + **one type** that best matches the change.

| Intent | Emoji | Type | Use when |
|---|---|---|---|
| New feature | :sparkles: | feat | New skill, new workflow, new capability |
| Bug fix | :bug: | fix | Correct incorrect behavior or output |
| Docs | :memo: | docs | README, guides, or non-skill docs |
| Refactor | :recycle: | refactor | Code/structure changes without behavior change |
| Formatting | :art: | style | Whitespace, formatting, no behavior change |
| Tests | :white_check_mark: | test | Add or update tests |
| Build/CI | :construction_worker: | ci | CI or build pipeline changes |
| Chore | :wrench: | chore | Repo maintenance, tooling, config |
| Revert | :rewind: | revert | Revert a prior commit |
| Security | :lock: | security | Security policy, guardrails |
| Perf | :zap: | perf | Performance improvements |
| Packaging | :package: | build | Packaging, archives, release artifacts |

**Notes**
- If a change touches multiple areas, pick the **dominant** intent.
- Packaging updates (.skill rebuilds) usually map to `:package: build`.

---

## 3) Scope Rules (Optional but Recommended)

Use short, stable scopes:

- `skills` (skill content or structure)
- `personas` (md-personas or team-personas)
- `docs` (README, CONTRIBUTING, AGENTS, SECURITY)
- `scripts` (tooling or automation)
- `archive` (legacy or cleanup work)
- `repo` (top-level structure)

Examples:
```
:memo: docs: update skill packaging instructions
:sparkles: feat(skills): add new ultrathink protocol
:wrench: chore(repo): align paths to skills/ layout
```

---

## 4) Body (Optional but Preferred for Non‑Trivial Changes)

Use the body to explain **what changed and why**.

- Bullet lists are preferred.
- Mention important constraints or trade-offs.
- Keep lines ~72–100 chars.

Example:
```
- move skill sources to skills/ to unify layout
- update packaging script to target skills/
- fix internal references in related-skills.md
```

---

## 5) Footer (Optional)

Use footers for references or breaking changes.

- `Refs: #123`
- `Closes: #123`
- `Breaking Change: <description>`

Example:
```
Breaking Change: skills/ replaces claude-skill/ as canonical path
```

---

## 6) Examples by Scenario

### A) New skill
```
:sparkles: feat(skills): add constellation-team orchestrator

- add role-based workflow structure
- document checkpoints and output format
```

### B) Update to a skill
```
:recycle: refactor(skills): tighten kingmode output format

- reduce ambiguity in ULTRATHINK section
- add explicit architecture checkpoints
```

### C) Fix a typo / formatting
```
:art: style(docs): fix bullet indentation in constellation-team
```

### D) Packaging
```
:package: build(skills): rebuild .skill archives
```

### E) Docs-only update
```
:memo: docs: update README paths to skills/
```

---

## 7) Validation Checklist (Pre‑commit)

- [ ] Message has emoji + type + (scope) + subject
- [ ] Subject is imperative and specific
- [ ] Body explains the “why” for non‑trivial changes
- [ ] Breaking changes clearly labeled
- [ ] No sensitive data in message

---

## 8) Common Mistakes to Avoid

- Using vague subjects like “update” or “changes”
- Stuffing multiple unrelated changes into one commit
- Using multiple emojis or multiple types
- Forgetting to mention breaking changes

---

## 9) Suggested One‑Liners for This Repo

- `:memo: docs: align paths to skills/ layout`
- `:wrench: chore(scripts): update build_skills to use skills/`
- `:sparkles: feat(skills): add ultra-mode activation block`
- `:package: build(skills): regenerate skill archives`

---

## 10) Minimal Template (Copy/Paste)

```
:emoji: type(scope): subject

- change 1
- change 2

Refs: #123
```
