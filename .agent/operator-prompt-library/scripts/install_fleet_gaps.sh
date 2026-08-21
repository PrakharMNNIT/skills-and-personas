#!/usr/bin/env bash
# install_fleet_gaps.sh — set every skill from this fork into the live agent skill dirs.
#
# Operator directive (2026-08-21): "set every skill in this local fork — all,
# no exception" (gstack / pstack / matt-pocock / gbrain fleets included).
#
# Idempotent by design: a skill that already exists at a target is reported
# ALREADY and left untouched (never overwrite a working copy). Only gaps are
# filled. Safe to re-run at any time.
#
# Sources:
#   <repo>/skills/*/            (SKILL.md-bearing dirs)
#   <repo>/new-skills/*/        (SKILL.md-bearing dirs)
#   ~/.config/opencode/skills/memory-leak-debugging   (fleet skill living in an
#                                opencode host dir; mirrored out so every host sees it)
# Targets (live hosts on this machine):
#   ~/.codex/skills    (DSH/Codex host)
#   ~/.agents/skills   (opencode/gstack fleet host)
# NOTE: ~/.claude/skills, ~/.gemini/... are NOT created — no Claude Code or
# Gemini CLI host exists on this machine; creating empty-host dirs adds no
# capability. Recorded as a decision in progress.txt.
set -uo pipefail

REPO="$(cd "$(dirname "$0")"/../../.. && pwd)"
MLEAK_SRC="$HOME/.config/opencode/skills/memory-leak-debugging"
TARGETS=("$HOME/.codex/skills" "$HOME/.agents/skills")

installed=0 already=0 failed=0

install_dir() {
  local src="$1" name="$2" t dest
  [ -f "$src/SKILL.md" ] || { echo "SKIP $name (no SKILL.md at source)"; return; }
  for t in "${TARGETS[@]}"; do
    mkdir -p "$t"
    dest="$t/$name"
    if [ -e "$dest" ]; then
      already=$((already+1))
      echo "ALREADY $name -> $dest"
    elif cp -R "$src" "$dest" 2>>"$0.errors"; then
      installed=$((installed+1))
      echo "INSTALLED $name -> $dest"
    else
      failed=$((failed+1))
      echo "FAILED $name -> $dest"
    fi
  done
}

shopt -s nullglob
for base in "$REPO/skills" "$REPO/new-skills"; do
  for d in "$base"/*/; do
    install_dir "${d%/}" "$(basename "$d")"
  done
done

if [ -f "$MLEAK_SRC/SKILL.md" ]; then
  install_dir "$MLEAK_SRC" "memory-leak-debugging"
else
  echo "PARK memory-leak-debugging (source missing at $MLEAK_SRC)"
fi

echo "SUMMARY installed_copies=$installed already_copies=$already failed_copies=$failed targets=${TARGETS[*]}"
