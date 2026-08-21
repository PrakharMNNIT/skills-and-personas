#!/usr/bin/env zsh
# QA evidence collector for operator-prompt-library run. v2 — post-review hardening:
# real YAML parse (not key-presence), per-category verdicts, exit code reflects ALL defects.
setopt null_glob
QA=".agent/operator-prompt-library/qa"
mkdir -p "$QA"
FAIL=0

# 1. zip integrity
{ for z in skills/*.zip skills/teach-pro-max/references/*.zip "prompts/agents/AI Therapist Agent Prompt.zip"; do
    [ -f "$z" ] || continue
    if unzip -tq "$z" > /dev/null 2>&1; then echo "OK   $z"; else echo "FAIL $z"; fi
  done; } > "$QA/zip-integrity.log" 2>&1
grep -q "^FAIL" "$QA/zip-integrity.log" && FAIL=1

# 2. broken relative links in files touched by this run
{ for f in skills/RESOLVER.md prompts/README.md docs/agents/*.md AGENTS.md README.md; do
    dir=$(dirname "$f")
    grep -oE '\]\(([^)#]+)\)' "$f" 2>/dev/null | sed -E 's/\]\(([^)#]+)\)/\1/' | while read -r link; do
      [[ "$link" == http* || "$link" == mailto:* ]] && continue
      target="$dir/$link"
      [ -e "$target" ] || echo "BROKEN $f -> $link"
    done
  done | sort -u; } > "$QA/broken-links.log" 2>&1
[ -s "$QA/broken-links.log" ] && FAIL=1

# 3. frontmatter scan: REAL YAML parse via ruby script (python yaml unavailable on host)
ruby .agent/operator-prompt-library/scripts/fm_scan.rb > "$QA/markdown-structure.log" 2>&1
[ $? -ne 0 ] && FAIL=1

echo "--- zip-integrity ---"; cat "$QA/zip-integrity.log"
echo "--- broken-links ---"; cat "$QA/broken-links.log"; [ -s "$QA/broken-links.log" ] && echo "(defects above)"
echo "--- markdown-structure ---"; cat "$QA/markdown-structure.log"
if [ "$FAIL" -eq 0 ]; then echo "QA: PASS (all categories)"; else echo "QA: FAIL — defects listed above"; exit 1; fi
