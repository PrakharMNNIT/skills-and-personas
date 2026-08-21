#!/usr/bin/env bash
# symlink_fleet.sh — make ~/.agents/skills the ONLY home of skill originals;
# every other host skills-dir becomes symlinks into it.
#
# Operator directive (2026-08-21): ".agents should be the only place where all
# original copies, updates, and upgrades of skills occur. Everything should
# have a symlink — gstack, gbrain, pstack, matt pocock, superpowers, anything."
#
# Policy:
#   CANONICAL = ~/.agents/skills
#   CLIENTS   = ~/.codex/skills, ~/.config/opencode/skills
#   - Client entry missing from canonical -> MIGRATED (mv client -> canonical)
#   - Client entry identical to canonical -> RELINKED (rm client copy, ln -s)
#   - Client entry DIFFERS from canonical -> CONFLICT (left untouched, reported;
#     never destroy divergent work silently)
#   - Already a correct symlink           -> ALREADY_LINKED
# Idempotent: safe to re-run.
set -uo pipefail

CANON="$HOME/.agents/skills"
CLIENTS=("$HOME/.codex/skills" "$HOME/.config/opencode/skills")

mkdir -p "$CANON"
migrated=0 relinked=0 linked=0 conflicts=0 failed=0

dirs_identical() { # $1 $2 -> 0 if identical trees
  diff -rq "$1" "$2" >/dev/null 2>&1
}

relink_client() {
  local cdir="$1" name="$2"
  local cpath="$cdir/$name"
  local kpath="$CANON/$name"

  # already a symlink?
  if [ -L "$cpath" ]; then
    if [ -e "$cpath" ]; then linked=$((linked+1)); echo "ALREADY_LINKED $name -> $(readlink "$cpath")";
    else failed=$((failed+1)); echo "BROKEN_LINK $name -> $(readlink "$cpath")"; fi
    return
  fi

  [ -d "$cpath" ] || return   # skip non-dirs silently

  if [ ! -e "$kpath" ]; then
    if mv "$cpath" "$kpath"; then
      migrated=$((migrated+1)); echo "MIGRATED $name ($cdir -> $CANON)"
      ln -s "$kpath" "$cpath" || { failed=$((failed+1)); echo "FAILED relink-after-migrate $name"; return; }
      linked=$((linked+1))
    else
      failed=$((failed+1)); echo "FAILED migrate $name"
    fi
    return
  fi

  if dirs_identical "$cpath" "$kpath"; then
    if rm -rf "$cpath" && ln -s "$kpath" "$cpath"; then
      relinked=$((relinked+1)); echo "RELINKED $name"
    else
      failed=$((failed+1)); echo "FAILED relink $name"
    fi
  else
    conflicts=$((conflicts+1)); echo "CONFLICT $name (client differs from canonical; left untouched)"
  fi
}

for cdir in "${CLIENTS[@]}"; do
  [ -d "$cdir" ] || continue
  echo "== $cdir =="
  for entry in "$cdir"/*; do
    [ -e "$entry" ] || continue
    relink_client "$cdir" "$(basename "$entry")"
  done
done

echo "SUMMARY migrated=$migrated relinked=$relinked already_linked=$linked conflicts=$conflicts failed=$failed canonical=$CANON"
