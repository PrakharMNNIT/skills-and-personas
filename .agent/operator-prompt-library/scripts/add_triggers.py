#!/usr/bin/env python3
"""One-shot lever: add gbrain-conformant `triggers:` frontmatter to legacy
skills and regenerate skills/RESOLVER.md (the human-readable dispatch map).
Rerunnable: skips skills that already declare triggers."""
import re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[3]
SKILLS = ROOT / "skills"

CURATED = {
    "backend-pe": ["backend PE", "distinguished engineer review", "high-performance backend design", "production readiness review"],
    "backend-principle-eng-cpp-pro-max": ["C++ backend design", "cpp performance service", "low latency C++ systems"],
    "backend-principle-eng-java-pro-max": ["Java backend design", "Java microservice architecture", "JVM service reliability"],
    "backend-principle-eng-javascript-pro-max": ["JavaScript backend design", "Node service architecture"],
    "backend-principle-eng-nodejs-pro-max": ["Node.js backend design", "NodeJS service performance", "express service review"],
    "backend-principle-eng-python-ml-pro-max": ["Python ML pipeline design", "MLOps architecture", "model serving review"],
    "backend-principle-eng-python-pro-max": ["Python backend design", "FastAPI service architecture", "python service reliability"],
    "backend-principle-eng-typescript-pro-max": ["TypeScript backend design", "TS service architecture", "type-safe API review"],
    "blueprint-creator": ["create a blueprint", "expand this spec into a blueprint", "implementation bible", "BLUEPRINT.md"],
    "chronicle": ["journal entry", "process my thoughts", "daily reflection", "write up my day"],
    "coding-agent-leadership-principles": ["leadership principles", "operating floor", "extreme ownership rules"],
    "concept-cartographer": ["create diagrams from notes", "visualize concepts", "make a flowchart", "diagram this", "concept map"],
    "constellation-team": ["star team", "cross-functional workflow", "full lifecycle planning", "multi-role planning"],
    "cross-agent-handoff": ["hand off to another agent", "prepare a handoff", "resume work in another session", "cross-session handoff"],
    "frontend-pe": ["Ultrafrontend", "High-End UX", "Awwwards style", "world-class UI design"],
    "idea-capturer": ["capture an idea", "develop a raw idea", "organize my ideas"],
    "lecture-alchemist": ["process this transcript", "convert lecture to notes", "lecture notes", "study material from lecture"],
    "obsidian-cli": ["obsidian vault operations", "obsidian command line", "search my obsidian vault"],
    "spec-creator": ["write a spec", "create SPEC.md", "implementation contract", "spec out this feature"],
    "superimprove": ["improve this codebase", "harden the codebase", "fix all confirmed defects", "overhaul this repo"],
    "svg-logo-designer": ["design an SVG logo", "brand mark", "wordmark design", "vector logo"],
    "teach-pro-max": ["teach me", "build intuition", "quiz me", "Socratic guidance", "resume my course"],
    "techtutor": ["explain X", "how does X work", "tutor me on", "mock interview", "intuition for"],
    "transcribe-refiner": ["clean this transcript", "refine captions", "fix this transcript", "clean up meeting notes"],
    "transcript-pipeline": ["run transcript pipeline", "generate class tutorial", "validate transcript coverage", "enrich class resources"],
    "ultra-reasoning-operator": ["ultra reasoning", "think harder", "verify everything", "adversarial review", "war room", "no hallucinations"],
}

FM_RE = re.compile(r"\A---\n(.*?)\n---\n", re.S)

def add_triggers(path: pathlib.Path, triggers: list[str]) -> bool:
    text = path.read_text()
    m = FM_RE.match(text)
    if not m:
        print(f"SKIP no-frontmatter {path}", file=sys.stderr); return False
    fm = m.group(1)
    if re.search(r"^triggers:", fm, re.M):
        return False
    block = "triggers:\n" + "".join(f'  - "{t}"\n' for t in triggers).rstrip("\n")
    # insert AFTER the full description value: scan past the description key and
    # any of its continuation lines (block scalars like `description: >` indent
    # their prose; a plain scalar has none). Inserting right after the KEY line
    # splices into block scalars and produces invalid YAML.
    lines = fm.split("\n")
    idx = next((i for i, l in enumerate(lines) if l.startswith("description:")), 0)
    key_indent = len(lines[idx]) - len(lines[idx].lstrip())
    j = idx + 1
    while j < len(lines) and (
        not lines[j].strip()  # blank line inside a scalar
        or len(lines[j]) - len(lines[j].lstrip()) > key_indent  # continuation
    ):
        j += 1
    lines.insert(j, block)
    new_fm = "\n".join(lines)
    path.write_text(text[:m.start(1)] + new_fm + text[m.end(1):])
    return True

def get_triggers(path: pathlib.Path) -> list[str]:
    m = FM_RE.match(path.read_text())
    if not m: return []
    fm = m.group(1)
    tm = re.search(r"^triggers:\n((?:[ \t]+-.*\n?)*)", fm, re.M)
    if not tm: return []
    out = []
    for raw in re.findall(r"[ \t]+-(.*)", tm.group(1)):
        item = raw.strip().strip('"').strip("'").strip("`").strip()
        if item:
            out.append(item)
    return out

def main():
    changed = []
    for d in sorted(SKILLS.iterdir()):
        sk = d / "SKILL.md"
        if not d.is_dir() or not sk.exists() or d.name.startswith("_"):
            continue
        if d.name in CURATED and add_triggers(sk, CURATED[d.name]):
            changed.append(d.name)
    # regenerate RESOLVER.md from authoritative frontmatter
    rows = []
    for d in sorted(SKILLS.iterdir()):
        sk = d / "SKILL.md"
        if not d.is_dir() or not sk.exists() or d.name.startswith("_"):
            continue
        ts = get_triggers(sk)
        rows.append(f"| [{d.name}]({d.name}/SKILL.md) | {', '.join(f'`{t}`' for t in ts) or '—'} |")
    resolver = (
        "# Skill Resolver\n\n"
        "Human-readable dispatch map over `skills/<slug>/SKILL.md`. "
        "Frontmatter `triggers:` are authoritative; this file is for scanning "
        "and disambiguation. Regenerate with `.agent/operator-prompt-library/scripts/add_triggers.py`.\n\n"
        "| Skill | Trigger phrases |\n|---|---|\n" + "\n".join(rows) + "\n"
    )
    (SKILLS / "RESOLVER.md").write_text(resolver)
    print(f"frontmatter updated: {len(changed)} -> {changed}")
    print(f"RESOLVER.md rows: {len(rows)}")

if __name__ == "__main__":
    main()
