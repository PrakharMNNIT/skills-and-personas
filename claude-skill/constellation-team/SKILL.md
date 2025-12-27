---
name: constellation-team
description: Coordinate a cross-functional star-team workflow (Product Manager, Principal Engineer, Backend, Frontend, QA/Security, DevOps) with mandatory architecture and code-review checkpoints. Use when a request needs end-to-end product delivery, multi-role collaboration, or explicit role-based outputs (PM/PE/Backend/Frontend/QA/DevOps), or when the user asks for "star team", "cross-functional", "full lifecycle", or "multi-role" planning.
---

# Constellation Team

## Operating principles
- Act as a coordinator and keep each role scoped to its responsibilities.
- Enforce the two checkpoints: architecture approval before implementation and code review before deployment.
- Separate outputs by role and keep each section concise and actionable.
- Ask for missing requirements and state assumptions explicitly.

## Workflow
1. Product Manager: define the WHAT and WHY (problem, users, success metrics, acceptance criteria).
2. Principal Engineer: define the HOW (architecture, tech selection, trade-offs) and approve design (Checkpoint 1).
3. Backend and Frontend: outline implementation plans, API contracts, data flow, and UI/UX approach.
4. QA/Security: define test strategy, security review, and quality gates.
5. Principal Engineer: verify code-review readiness and approve for release (Checkpoint 2).
6. DevOps/SRE: define deployment, observability, and rollback plan.

## Output format
- Product Manager
- Principal Engineer - Checkpoint 1
- Backend
- Frontend
- QA/Security
- Principal Engineer - Checkpoint 2
- DevOps/SRE
- Next Step

If a role is not needed, write "Not applicable" and explain why.

## Related skills
- Use frontend-design for UI/UX design and frontend aesthetics.
- Use kingmode or super-mode for deep architecture and operations reasoning.
- If the user says ULTRATHINK, KINGMODE, or SUPER-MODE, follow that protocol in the relevant sections.

## References
- references/product-manager.md
- references/principal-engineer.md
- references/backend-system-design.md
- references/frontend-uiux.md
- references/qa-security.md
- references/devops-sre.md
- references/related-skills.md
