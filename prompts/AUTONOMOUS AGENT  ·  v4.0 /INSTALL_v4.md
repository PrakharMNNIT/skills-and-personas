# Autonomous Agent v4 — Install

## What's different from v2/v3

v2 had one execution shape (Lifecycle). v3 split the work into four separate modes with bash drivers and template files (Ralph mode, Autoresearch mode, Gödel mode). You said v3 felt like too many files — and you were right. The Ralph "loop until verified" pattern and the autoresearch "keep-or-revert" mechanic shouldn't be separate modes you opt into. They should be **how the agent operates inside every phase, by default**.

v4 is one prompt. No bash drivers. No separate templates for the basic case. The patterns live as **operating semantics** inside the prompt:

- **Ralph (loop until verified)** is now in Section 4 (Universal Phase Contract) and Section 6 (Universal Verification Loop). Every phase has explicit binary acceptance criteria. The phase doesn't exit until 100% of criteria pass OR escalation triggers. This applies to design (Phase 2 Plan), implementation (Phase 4 Execute), and testing (Phase 5 Verify) — exactly what you asked for.

- **Auto-research (keep-or-revert with Actionable Side Information)** is now in Section 7 (Auto-Research Mechanic). It's the universal optimization primitive — used inside Self-Improvement (Phase 8), inside any optimization sub-task within Execute, and inside the Self-Modification Sandbox. Same mechanic everywhere.

- **Gödel paper's insights** are now in Section 2 (Operating Semantics) as four constitutional rules:
  - **Four primitive actions** (`self_inspect`, `interact`, `self_update`, `continue_improve`) — directly from the paper's Algorithm 1.
  - **Think Before Act** — worth +13.4 points in their MGSM ablation. Now constitutional.
  - **Error Handling Carries Forward** — worth +14.8 points. Now constitutional.
  - **Keep or Revert** — their 14% net regression rate is acceptable because reverts work. Now constitutional.

- **Human Feedback Collection** is Section 10. End of every run, the agent surfaces three uncertain decisions, surprises, and missing skills. Writes them structured to `.learnings/feedback/`. Invites your response. The next Self-Modification cycle reads those files as hypothesis seeds. Auto-research then optimizes against them.

- **Self-Modification** lives in Section 11 with the sandbox/ratchet/gate-ladder/human-merge rules embedded directly in the prompt. No separate README needed.

## Install

```bash
mkdir -p ~/.claude
cp AUTONOMOUS_AGENT_v4.xml ~/.claude/
```

That's it. One file.

## Optional: directory structure for Self-Modification

Only needed if you ever invoke Section 11 (Self-Modification). Create when you first need it:

```bash
mkdir -p ~/.claude-sandbox/{branches,proposals}
echo "0" > ~/.claude-sandbox/depth.txt
mkdir -p ~/.claude/.learnings/feedback
```

The prompt references these paths in Sections 10 and 11. The agent will create them on first use if missing.

## Use

```bash
claude --append-system-prompt "$(cat ~/.claude/AUTONOMOUS_AGENT_v4.xml)" \
       "your task here"
```

Or wire a slash command:

```bash
cat > ~/.claude/commands/auto.md <<'EOF'
---
name: auto
description: Run a task under the autonomous v4 contract.
---
Load ~/.claude/AUTONOMOUS_AGENT_v4.xml as the system prompt prefix.
Apply it fully. The user's most recent message is the task.
EOF
```

Then in any Claude Code session: `/auto build me a hotel-search service`.

## How the loops actually work now (the part you wanted clearer)

When the agent enters any phase — Plan, Execute, Verify, anything — it runs this internal shape (Section 4, Universal Phase Contract):

1. `self_inspect` — read the task statement, prior phases' outputs, relevant learnings.
2. `self_update` — declare binary acceptance criteria for this phase. Concrete, verifiable, written down.
3. `interact` — Think Before Act rationale, then produce the phase's deliverable.
4. `self_inspect` — score the deliverable against each criterion. Pass / fail per criterion.
5. Route:
   - 100% pass → exit phase, commit, move on.
   - <100% AND under budget → capture *why* each failed criterion failed (side_info), form a new hypothesis, `continue_improve` back to step 3.
   - <100% AND over budget → escalate via Fallback Matrix. Don't lower the criteria.

That's the Ralph "loop until verified" pattern, applied not to PRD stories but to every phase output. It's intrinsic.

The auto-research mechanic (Section 7) runs the same way, with one twist: it's measuring against a scalar metric, and it explicitly writes `experiment.jsonl` (the keep-or-revert log with side_info on every revert). This means the agent never re-tries a dead end and never accumulates uncertain progress.

The Self-Modification loop in Section 11 IS the auto-research mechanic, just with stricter gates: routing-eval scoring, council vote, human merge confirmation, never auto-merge.

## What you don't need anymore

From v3, the things you can throw away if you adopt v4:

- `ralph.sh` — the bash driver. The loop is in the prompt now.
- `prd.json`, `prompt.md` — the Ralph templates. Each phase declares its own criteria.
- `autoresearch.sh`, `autoresearch.md` — the autoresearch templates. The mechanic is universal in the prompt; you only need to give the agent a metric and a benchmark command.
- `godel-sandbox-README.md` — the sandbox rules are in Section 11 now.

What you keep: `~/.claude/skills/` (your existing skill library) and `~/.claude/.learnings/` (which the agent will populate). That's it.

## Where the human feedback actually goes

Section 10's ritual writes structured YAML to `.learnings/feedback/<ISO>-<slug>.md` per run. Schema is in the prompt. Next time Section 11 (Self-Modification) runs, it reads those files and uses them to seed hypotheses. You don't have to do anything except respond to the agent's questions in the Final Summary when you feel like it — your response gets appended to the feedback file as `human_response`, and the next Self-Modification cycle treats it as a strong signal.

This is the loop you described: agent runs work → reports what was uncertain → human reacts → next run uses the reaction to drive auto-research-style self-improvement. No separate tool needed; it's all on disk and all in the prompt.
