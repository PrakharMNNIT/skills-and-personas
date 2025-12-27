# Repository Guidelines

## Project Structure & Module Organization
This repo is a small, flat collection of Markdown-based skills and persona specs.
- `SKILL.md` holds the main skill definition with YAML front matter (`name`, `description`, `license`).
- `gemini-king-mode.md` is a persona and behavior protocol document.
Keep new skills or personas at the repo root unless a new folder is introduced, and prefer descriptive filenames like `new-skill.md` or `persona-brief.md`.

## Build, Test, and Development Commands
There is no build or runtime step; edits are plain Markdown.
Helpful local commands:
- `rg --files` to list tracked files.
- `rg "keyword"` to search content (for example, `rg "description"`).
- `git diff` to review edits before committing.

## Coding Style & Naming Conventions
- Markdown is the source of truth; keep paragraphs short and use clear headings and bullet lists.
- For skills, keep the YAML front matter at the top and update only the needed fields.
- For personas, follow the existing pattern: an H1 title, numbered sections, and bolded labels.
- Indent nested list items with two spaces.
- No formatter or linter is configured in the repo today.

## Testing Guidelines
No automated tests are present. Validate changes by reading for clarity, consistency, and broken Markdown structure. If you run a Markdown linter locally, ensure it passes before opening a PR.

## Commit & Pull Request Guidelines
- Commit messages in history use an emoji prefix plus a type and short description (example: `:tada: feat : add new persona`).
- Keep commits focused on a single skill or persona update.
- PRs should include a short summary, the rationale for the change, and a list of updated files (for example, `SKILL.md`).
