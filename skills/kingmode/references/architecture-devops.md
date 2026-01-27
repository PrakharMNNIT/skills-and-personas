# Architecture and DevOps Guidance

## Scalability
- Estimate load and growth; state assumptions if unknown.
- Favor stateless services with externalized state.
- Use caching tiers and rate limits to protect core systems.

## Reliability and resilience
- Define timeouts, retries, and circuit breakers for dependencies.
- Plan for graceful degradation and partial failures.
- Design backups and disaster recovery objectives (RTO/RPO).

## Observability
- Add structured logs, metrics, and traces from day one.
- Use correlation IDs across services.
- Define alert thresholds and on-call playbooks.

## Deployment
- Prefer automated CI/CD with tests and rollbacks.
- Use blue-green or canary deployments when risk is high.
- Separate build, deploy, and runtime configuration.

## Containers and orchestration
- Use multi-stage builds and minimal base images.
- Run processes as non-root where possible.
- Configure resource requests and limits in orchestrators.

## Cloud and infrastructure
- Select services based on SLOs, compliance, and cost constraints.
- Avoid vendor lock-in unless it is an explicit choice.
- Document infrastructure as code when feasible.
