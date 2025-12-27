# Security and Quality Guidance

## Security fundamentals
- Perform lightweight threat modeling (assets, actors, entry points).
- Enforce least privilege for services and users.
- Encrypt data in transit and at rest where required.
- Never hardcode secrets; use managed secret stores.

## Authentication and authorization
- Prefer well-known standards (OAuth2, OIDC, SAML) when applicable.
- Use role-based or policy-based access control with clear ownership.
- Validate tokens and sessions on every request.

## Vulnerability management
- Validate inputs to prevent injection and XSS.
- Apply dependency scanning and keep critical patches current.
- Log security-relevant events with audit trails.

## Code quality
- Keep functions small and focused.
- Prefer clarity over cleverness.
- Use consistent formatting and naming conventions.

## Testing strategy
- Cover critical paths with unit and integration tests.
- Add end-to-end tests for user workflows that break revenue or safety.
- Report what tests were run and what was not.
