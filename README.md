# Skills and Personas

This repository collects Claude Skills and portable Markdown personas for use with other LLMs.

## Structure
- `clade-skill/` holds Claude Skills:
  - `clade-skill/<skill-name>/SKILL.md` is the source skill definition.
  - `clade-skill/<skill-name>/references/` stores detailed guidance.
  - `clade-skill/*.skill` are packaged skill archives.
  - `clade-skill/legacy/` keeps older drafts for reference.
- `md-personas/` contains portable Markdown personas.
- `team-personas/` contains team-specific persona documents.

## Using a skill in Claude Code
1. Copy the skill folder to `~/.claude/skills/<skill-name>/` or `.claude/skills/<skill-name>/`.
2. Restart Claude Code to load the skill.
3. Ask "What Skills are available?" to confirm it is loaded.
4. Trigger the skill by using terms from its `description`.

## Packaging a skill
To package a skill into a `.skill` archive:

```bash
zip -r clade-skill/<skill-name>.skill clade-skill/<skill-name>
```

## Contributing
See `CONTRIBUTING.md` for conventions and structure rules.

## License
MIT. See `LICENSE`.
