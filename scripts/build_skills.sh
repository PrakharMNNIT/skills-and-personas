#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage: scripts/build_skills.sh [--force-md]

Packages all skills in claude-skill/ into .skill archives.
Generates portable .md files in md-personas/ (overwrite with --force-md).
USAGE
}

force_md=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --force-md)
      force_md=1
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown flag: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
  shift
done

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
skill_dir="$root_dir/claude-skill"
md_dir="$root_dir/md-personas"

if ! command -v zip >/dev/null 2>&1; then
  echo "zip is required but not found." >&2
  exit 1
fi

mkdir -p "$md_dir"

for skill_path in "$skill_dir"/*; do
  if [[ ! -d "$skill_path" ]]; then
    continue
  fi

  skill_name="$(basename "$skill_path")"
  if [[ "$skill_name" == "legacy" ]]; then
    continue
  fi

  if [[ ! -f "$skill_path/SKILL.md" ]]; then
    continue
  fi

  (
    cd "$skill_dir"
    zip -r "${skill_name}.skill" "$skill_name" -x '*/.DS_Store' >/dev/null
  )

  portable_name="$(echo "$skill_name" | tr '[:lower:]' '[:upper:]').md"
  out_path="$md_dir/$portable_name"
  if [[ $force_md -eq 1 || ! -f "$out_path" ]]; then
    {
      echo "# $(echo "$skill_name" | tr '[:lower:]' '[:upper:]')"
      echo ""
      echo "Use this document with LLMs that do not support .skill packaging."
      echo ""
      awk 'BEGIN{infront=0} NR==1 && $0=="---"{infront=1; next} infront && $0=="---"{infront=0; next} !infront {print}' "$skill_path/SKILL.md"
    } > "$out_path"
  fi

done

echo "Skill packaging complete."
