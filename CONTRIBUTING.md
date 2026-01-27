# Contributing

Thanks for contributing to this repository. Please follow the conventions
below to keep skills consistent and easy to discover.

## What to add
- Skills go in `skills/<skill-name>/`.
- Portable Markdown personas go in `md-personas/`.
- Team-specific persona docs go in `team-personas/`.

## Skill structure
- Each skill must include `SKILL.md` with YAML front matter.
- Required fields: `name`, `description`.
- Keep `SKILL.md` under 500 lines; move details into `references/`.
- Use ASCII and keep instructions in imperative form.
- Avoid placeholders in final content.

## Packaging
To publish a `.skill` archive:

```bash
zip -r skills/<skill-name>.skill skills/<skill-name>
```

To package all skills and regenerate portable docs:

```bash
scripts/build_skills.sh --force-md
```

## Commit messages
Use the repo style: emoji + type + short description.
Example: `:sparkles: feat : add new skill`.

## Review checklist
- Paths are correct and references resolve.
- Skills have clear trigger phrases in `description`.
- Portable docs do not reference missing paths.
