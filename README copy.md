# Prompts and Bookmarks Library

A curated, extensible library of prompts, knowledge packs, bookmarks, and supporting reference material.
This repo is designed to stay clean, searchable, and easy to grow as new prompts are created or existing ones are refined.

## Contents at a Glance
- **Prompt builders and agents**: ready-to-use system prompts and agent scaffolds.
- **Knowledge packs**: structured learning resources and supporting docs.
- **Bookmarks**: exported browser bookmarks and cleaned variants.
- **Reference assets**: PDFs, DOCX, XLSX, images, and packaged resources.

## Directory Structure
Top-level layout is grouped by intent:

- `prompts/` - agents, builders, rules, and templates
- `personas/` - identity/system-persona prompts and profiles
- `bookmarks/` - raw exports and cleaned variants
- `knowledge-packs/` - packaged learning/knowledge collections (unpacked + archives)
- `references/` - standalone PDFs, docs, and images
- `skills/` - packaged `.skill` artifacts + notes
- `notes/` - working notes and generated snapshots

## How to Add New Prompts (Recommended Flow)
1. **Create a new folder** for the prompt or agent, using a clear name.
2. **Add a Markdown file** that contains the prompt (system/user/assistant as needed).
3. **Include a short descriptor** at the top of the file:

```
Title: <Prompt name>
Type: <system | user | assistant | tool>
Purpose: <1-2 sentence summary>
Tags: <comma-separated>
Updated: <YYYY-MM-DD>
```

4. **If the prompt is a reusable agent**, add any packaged artifacts (e.g., `.skill`) alongside it.
5. **Regenerate the tree** and update `notes/dirTree.txt`:

```
tree -a -I '.git' > notes/dirTree.txt
```

## How to Update Existing Prompts
- Make changes in place to preserve history.
- Update the `Updated:` date in the prompt header.
- If you changed behavior or structure, note it in the file under a **Changelog** section.

## Naming Conventions
- Folder names: short, descriptive, Title Case is acceptable.
- File names: hyphenated or Title Case are both OK; stay consistent within a folder.
- Avoid special characters in new filenames when possible (spaces are acceptable here, but prefer hyphens for portability).

## Suggested Prompt File Template
Use this for new prompt files to keep everything consistent and readable:

```
# <Prompt Name>

Title: <Prompt name>
Type: <system | user | assistant | tool>
Purpose: <1-2 sentence summary>
Tags: <comma-separated>
Updated: <YYYY-MM-DD>

## Prompt
<your prompt here>

## Notes
- Optional usage notes
- Variants or constraints

## Changelog
- YYYY-MM-DD: <what changed>
```

## Large Files and Binary Assets
- Large binaries (PDF/DOCX/XLSX/PNG) are included when they are core references.
- If you add a file >100MB, consider Git LFS or compressing before commit.

## Sensitive Data Policy
- **Do not commit secrets or passwords.**
- The folder `🔒Passwords/` is ignored by `.gitignore`.
- If any sensitive file is accidentally added, remove it immediately and rotate credentials.

## Repo Hygiene
- Keep changes grouped by purpose (e.g., new prompt vs new bookmark set).
- Prefer one focused commit per change set.
- Keep `dirTree.txt` fresh after structural changes.

## Quick Commands
```
# status
git status -s

# add and commit
git add -A
git commit -m "Add <what changed>"

# push
git push
```

## License
Private repository. Contents are for personal use unless explicitly shared.
