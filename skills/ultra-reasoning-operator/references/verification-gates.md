# Verification Gates

Use this reference to turn "done" into evidence. Load it only when the main skill says the task is risky enough.

## Gate Selection

| Task type | Minimum verification |
|---|---|
| Bug fix | Reproduce or identify the failing path, apply fix, run focused test or command that exercises the path. |
| Refactor | Show behavior-preserving intent, run existing focused tests, inspect diff for behavior drift. |
| New feature | Map acceptance criteria to tests or manual checks, run focused tests, run build/typecheck when available. |
| Security-sensitive change | Identify trust boundary, abuse case, validation point, secret/logging risk, and regression check. |
| Performance claim | Measure baseline and after with the same command. No measurement means no performance claim. |
| Data migration or schema change | Verify forward path, rollback path, idempotency, partial-failure behavior, and representative sample data. |
| External API/library behavior | Verify against official docs or source for the exact version in use. |
| Current fact, price, rule, API, or release behavior | Browse or inspect the authoritative source. Do not rely on model memory. |

## Evidence Map

Before finalizing, build a private evidence map:

| Claim | Evidence required | Actual evidence | Status |
|---|---|---|---|
| It compiles | Build/typecheck command | Command output | pass/fail/not run |
| Bug is fixed | Repro test or manual path | Test/manual output | pass/fail/not run |
| No regression found | Relevant existing tests | Command output | pass/fail/not run |
| Behavior matches request | Acceptance criteria check | Inspection/test result | pass/fail/not run |

Do not present a claim as proven unless the evidence column is real.

## Debugging Verification

For a bug with multiple plausible causes:

1. Name at least three plausible root causes unless evidence strongly narrows the space.
2. For each root cause, write the fastest falsifier.
3. Run the cheapest falsifier first.
4. After each tool result, remove or update hypotheses.
5. Prefer a regression test that fails before the fix and passes after it.

If a failing test cannot be written cheaply, use a manual repro command or targeted inspection and state the limitation.

## Command Discipline

- Start focused: run the narrowest command that proves the changed path.
- Broaden only when the blast radius justifies it.
- If the repo has scripts for lint, typecheck, test, build, or smoke checks, prefer those over invented commands.
- If verification requires current external facts, use authoritative docs, changelogs, source code, release notes, or official status pages before secondary commentary.
- If a command fails, classify it before moving on:
  - pre-existing environment failure
  - failure caused by your change
  - flaky or external dependency failure
  - wrong command or missing setup
- Do not weaken or delete a failing test to make the gate pass unless the test is demonstrably invalid and that change is part of the requested work.

## Review Before Final

Inspect the final diff against the request:

- Every changed line traces to the requested outcome.
- No unrelated formatting churn or opportunistic refactor remains.
- New logic has direct verification or a clearly documented gap.
- Error handling matches existing project style.
- Public behavior, API, CLI, config, or data contracts changed only when intended.

## Unverified Work

If a gate cannot be run, say so directly:

```text
Not run: <command/check>
Reason: <missing dependency/time/env/auth/etc.>
Residual risk: <what could still be wrong>
Next verification step: <specific command or inspection>
```
