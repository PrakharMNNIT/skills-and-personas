# Adversarial Review

Use this reference when a decision or change has meaningful blast radius. The point is not to sound harsh; the point is to expose hidden failure modes before the user inherits them.

## Review Protocol

Run these passes in order:

1. **Assumption attack**: Which assumptions are unsupported, stale, or overly convenient?
2. **Correctness attack**: What input, state, timing, or dependency behavior breaks the solution?
3. **Regression attack**: What existing workflow could accidentally change?
4. **Security attack**: What can a malicious user, compromised dependency, or prompt/tool injection surface do?
5. **Operations attack**: How does this fail under deploy, rollback, monitoring, logs, retries, timeouts, or partial outage?
6. **Maintainability attack**: What will confuse the next maintainer or create future coupling?
7. **Test attack**: What important behavior is still untested or only covered by weak assertions?
8. **False-rigor attack**: Which parts of the process add ceremony without improving correctness?

## Severity Calibration

| Severity | Meaning | Required action |
|---|---|---|
| Blocker | Likely correctness, security, data-loss, irreversible, or deployment failure | Fix before finalizing or stop and disclose. |
| High | Plausible production/user-visible failure or major maintainability trap | Fix unless explicitly out of scope; disclose if deferred. |
| Medium | Edge case, partial coverage gap, or local complexity issue | Fix if cheap; otherwise document. |
| Low | Style, clarity, or small hardening opportunity | Mention only if useful. |

Do not inflate severity to look rigorous. Do not suppress severity to finish faster.

## Questions That Usually Find Bugs

- What did I assume because it made the implementation easier?
- What happens with empty, malformed, huge, duplicated, stale, or concurrent input?
- What if the dependency returns slowly, partially, out of order, or with a new field?
- What if this command runs twice?
- What if the process is interrupted halfway?
- What if a user has old config, old data, or a partially migrated state?
- What if logs contain secrets or user data?
- What old behavior might callers depend on accidentally?
- What test would have caught this if it broke next month?
- What verification step am I doing only because it looks serious, not because it reduces risk?

## Decision Review

For architecture or approach selection, write:

```text
Recommendation:
Why it wins:
Strongest counterargument:
What would make the counterargument win:
Kill criteria:
Verification needed before implementation:
```

If two options remain equally valid after evidence gathering, ask the user only if the decision changes product direction, cost boundary, safety posture, or irreversible architecture. Otherwise choose the simpler reversible option and document the assumption.

## Final Review Output

After the adversarial pass, produce one of:

- `CLEAR`: no material findings.
- `CLEAR WITH NOTES`: only medium/low risks remain and they are documented.
- `FIXED`: findings were found and fixed; include the verification evidence.
- `BLOCKED`: a blocker remains and cannot be resolved without user input or external state.

Never use this review to justify unrelated rewrites.
