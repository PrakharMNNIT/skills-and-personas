# Skills and Personas

This repository collects Skills and portable Markdown personas for use with other LLMs.

## Structure
- `skills/` holds Skills:
  - `skills/<skill-name>/SKILL.md` is the source skill definition.
  - `skills/<skill-name>/references/` stores detailed guidance.
  - `skills/*.skill` are packaged skill archives.
  - `skills/legacy/` keeps older drafts for reference.
- `md-personas/` contains portable Markdown personas.
- `team-personas/` contains team-specific persona documents.
- `assets/` stores images and supporting documents.
- `archive/` stores legacy or “to review” material.

## Index
Skills:
- `skills/constellation-team/`
- `skills/backend-pe/`
- `skills/frontend-pe/`
- `skills/frontend-design/`
- `skills/kingmode/`
- `skills/super-mode/`
- `skills/ultrathink-frontend/`

Portable docs:
- `md-personas/CONSTELLATION-TEAM.md`
- `md-personas/FRONTEND-DESIGN.md`
- `md-personas/KINGMODE.md`
- `md-personas/SUPER-MODE.md`
- `md-personas/ULTRATHINK-FRONTEND.md`
- `md-personas/GEMINI-KING-MODE.md`

Team personas:
- `team-personas/constellation-team/`

## Using a skill in Claude Code
1. Copy the skill folder to `~/.claude/skills/<skill-name>/` or `.claude/skills/<skill-name>/`.
2. Restart Claude Code to load the skill.
3. Ask "What Skills are available?" to confirm it is loaded.
4. Trigger the skill by using terms from its `description`.

## LLM configuration files
- `.claude/agents/` contains Claude Code subagents for the star-team workflow.
- `GEMINI.md` provides Gemini CLI context instructions.
- `.clinerules/` and `.clinerules/workflows/` define Cline rules and workflows.
- `AGENTS.md` provides Codex CLI guidance.

## Packaging a skill
To package a skill into a `.skill` archive:

```bash
zip -r skills/<skill-name>.skill skills/<skill-name>
```

Or package all skills and generate portable docs:

```bash
scripts/build_skills.sh --force-md
```

## Contributing
See `CONTRIBUTING.md` for conventions and structure rules.

## License
MIT. See `LICENSE`.
