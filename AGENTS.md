# Repository Guidelines

## Project Structure & Module Organization
This repo is a small collection of skills and persona specs.
- `claude-skill/<skill-name>/SKILL.md` holds Claude Skill definitions (YAML front matter with `name` and `description` only).
- `claude-skill/<skill-name>/references/` stores detailed guidance for progressive disclosure.
- `claude-skill/*.skill` are packaged Claude Skills (zip archives), for example `claude-skill/kingmode.skill`.
- `md-personas/*.md` are portable docs for other LLMs or persona notes (for example, `md-personas/KINGMODE.md`).
- `team-personas/` contains shared team persona material.
Keep skill folders named after the skill (`skill-name/`) and prefer descriptive filenames like `persona-brief.md`.

## Build, Test, and Development Commands
There is no build or runtime step; edits are plain Markdown.
Helpful local commands:
- `rg --files` to list tracked files.
- `rg "keyword"` to search content (for example, `rg "description"`).
- `git diff` to review edits before committing.

## Coding Style & Naming Conventions
- Markdown is the source of truth; keep paragraphs short and use clear headings and bullet lists.
- For skills, keep YAML front matter at the top and include only the required fields (`name`, `description`) unless a specific optional field is needed.
- For personas, follow the existing pattern: an H1 title, numbered sections, and bolded labels.
- Indent nested list items with two spaces.
- No formatter or linter is configured in the repo today.

## Testing Guidelines
No automated tests are present. Validate changes by reading for clarity, consistency, and broken Markdown structure. If you run a Markdown linter locally, ensure it passes before opening a PR.

## Commit & Pull Request Guidelines
- Commit messages in history use an emoji prefix plus a type and short description (example: `:tada: feat : add new persona`).
- Keep commits focused on a single skill or persona update.
- PRs should include a short summary, the rationale for the change, and a list of updated files (for example, `SKILL.md`).

## AI Agent Instructions
- For cross-functional planning, use the Constellation Team workflow and role-labeled output (`md-personas/CONSTELLATION-TEAM.md`).
- For UI/UX tasks, apply frontend-design guidance (`md-personas/FRONTEND-DESIGN.md`).
- For architecture, security, reliability, or deep reasoning, apply kingmode or super-mode (`md-personas/KINGMODE.md`, `md-personas/SUPER-MODE.md`).
- Ask for missing requirements, state assumptions explicitly, and do not claim to run tests or commands unless they were executed.
