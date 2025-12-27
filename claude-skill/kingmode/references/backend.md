# Backend Guidance

## API design
- Use resource-oriented URLs and standard HTTP verbs.
- Define consistent error formats and status codes.
- Version APIs and document pagination, filtering, and sorting.

## Data modeling
- Design schemas around access patterns, not just entities.
- Use constraints and indexes intentionally; document trade-offs.
- Favor migrations that are reversible and tested.

## Service architecture
- Choose monolith vs microservices based on team size and domain complexity.
- Keep service boundaries clear and data ownership explicit.
- Use messaging or events only when you need decoupling or async workflows.

## Technology selection
- Pick frameworks that match the problem and team expertise.
- Avoid niche or unmaintained dependencies.
- Pin versions in production and document upgrade paths.

## Quality gate
- Input validation at boundaries.
- Clear error handling and logging with correlation IDs.
- Document SLAs or performance expectations when relevant.
