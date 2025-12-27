# Skills and Personas

This repository collects Claude Skills and portable Markdown personas for use with other LLMs.

## Structure
- `claude-skill/` holds Claude Skills:
  - `claude-skill/<skill-name>/SKILL.md` is the source skill definition.
  - `claude-skill/<skill-name>/references/` stores detailed guidance.
  - `claude-skill/*.skill` are packaged skill archives.
  - `claude-skill/legacy/` keeps older drafts for reference.
- `md-personas/` contains portable Markdown personas.
- `team-personas/` contains team-specific persona documents.

## Index
Claude Skills:
- `claude-skill/frontend-design/`
- `claude-skill/kingmode/`
- `claude-skill/super-mode/`
- `claude-skill/ultrathink-frontend/`

Portable docs:
- `md-personas/FRONTEND-DESIGN.md`
- `md-personas/KINGMODE.md`
- `md-personas/SUPER-MODE.md`
- `md-personas/ULTRATHINK-FRONTEND.md`
- `md-personas/gemini-king-mode.md`

## Using a skill in Claude Code
1. Copy the skill folder to `~/.claude/skills/<skill-name>/` or `.claude/skills/<skill-name>/`.
2. Restart Claude Code to load the skill.
3. Ask "What Skills are available?" to confirm it is loaded.
4. Trigger the skill by using terms from its `description`.

## Packaging a skill
To package a skill into a `.skill` archive:

```bash
zip -r claude-skill/<skill-name>.skill claude-skill/<skill-name>
```

Or package all skills and generate portable docs:

```bash
scripts/build_skills.sh --force-md
```

## Contributing
See `CONTRIBUTING.md` for conventions and structure rules.

## License
MIT. See `LICENSE`.
