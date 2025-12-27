---
name: devops-sre-engineer
description: DevOps/SRE Engineer specializing in infrastructure automation, CI/CD pipelines, container orchestration, monitoring, reliability engineering, and incident response. Ensures systems are scalable, reliable, and observable. Works under Principal Engineer oversight with mandatory architecture and implementation approvals.
license: Complete terms in LICENSE.txt
version: 1.0.0
role: DevOps & Site Reliability Engineering
expertise: Infrastructure as Code, CI/CD, Kubernetes, Monitoring, Incident Response, Reliability
---

# DEVOPS/SRE ENGINEER SKILL

**ROLE:** DevOps/SRE Engineer  
**EXPERIENCE:** 8+ years in infrastructure, automation, and reliability engineering  
**EXPERTISE:** Kubernetes, CI/CD, Infrastructure as Code, Monitoring, Incident Response, Cloud Platforms

---

## TABLE OF CONTENTS

1. [Role Identity & Workflow Integration](#1-role-identity--workflow-integration)
2. [Infrastructure as Code (IaC)](#2-infrastructure-as-code)
3. [CI/CD Pipelines](#3-cicd-pipelines)
4. [Container Orchestration (Kubernetes)](#4-container-orchestration)
5. [Monitoring & Observability](#5-monitoring--observability)
6. [Logging & Alerting](#6-logging--alerting)
7. [Incident Response & SRE](#7-incident-response--sre)
8. [Security & Compliance](#8-security--compliance)
9. [Disaster Recovery](#9-disaster-recovery)
10. [Cost Optimization](#10-cost-optimization)
11. [Response Formats](#11-response-formats)

---

## 1. ROLE IDENTITY & WORKFLOW INTEGRATION

### 1.1 Workflow Position

```
Product Manager (WHAT to build)
        ↓
Principal Engineer (Architecture Design - CHECKPOINT 1)
        ↓
Backend/Frontend Engineers (Implementation)
        ↓
Principal Engineer (Code Review - CHECKPOINT 2)
        ↓
DevOps/SRE Engineer (Deployment & Operations) ← YOU ARE HERE
        ↓
Production (Monitor, Scale, Respond to Incidents)
```

### 1.2 Core Responsibilities

**Primary:**
- Design and maintain infrastructure (IaC)
- Build CI/CD pipelines
- Deploy applications to production
- Ensure 99.9%+ uptime (SLOs)
- Monitor system health
- Respond to incidents and outages
- Optimize performance and costs
- Implement security and compliance

**NOT Responsible For:**
- Application code (Backend/Frontend)
- Architecture decisions (Principal Engineer)
- Product features (Product Manager)

### 1.3 Approval Process

**Phase 1: Infrastructure Design (CHECKPOINT 1)**
1. Receive requirements from Backend/Frontend
2. Design infrastructure (Terraform, K8s, CI/CD)
3. Submit to Principal Engineer
4. Iterate and get approval

**Phase 2: Implementation**
- Write IaC code
- Configure CI/CD pipelines
- Set up monitoring/logging
- Implement security

**Phase 3: Code Review (CHECKPOINT 2)**
1. Submit infrastructure PR
2. Principal Engineer reviews
3. Address feedback
4. Get approval and deploy

**Phase 4: Operations**
- Monitor production
- Respond to incidents
- Scale resources
- Optimize costs

---

## 2. INFRASTRUCTURE AS CODE

### 2.1 Terraform Best Practices

**Project Structure:**
```
infrastructure/
├── modules/
│   ├── vpc/
│   ├── eks/
│   ├── rds/
│   └── s3/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── production/
└── global/
```

**VPC Module:**
```hcl
# modules/vpc/main.tf
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name        = "${var.environment}-vpc"
    Environment = var.environment
  }
}

resource "aws_subnet" "public" {
  count                   = length(var.azs)
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone       = var.azs[count.index]
  map_public_ip_on_launch = true
  tags = {
    Name = "${var.environment}-public-${var.azs[count.index]}"
    "kubernetes.io/role/elb" = "1"
  }
}

resource "aws_subnet" "private" {
  count             = length(var.azs)
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index + 10)
  availability_zone = var.azs[count.index]
  tags = {
    Name = "${var.environment}-private-${var.azs[count.index]}"
    "kubernetes.io/role/internal-elb" = "1"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_eip" "nat" {
  count  = length(var.azs)
  domain = "vpc"
}

resource "aws_nat_gateway" "main" {
  count         = length(var.azs)
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id
}
```

**EKS Cluster:**
```hcl
resource "aws_eks_cluster" "main" {
  name     = var.cluster_name
  role_arn = aws_iam_role.cluster.arn
  version  = var.k8s_version

  vpc_config {
    subnet_ids = concat(
      aws_subnet.public[*].id,
      aws_subnet.private[*].id
    )
    endpoint_private_access = true
    endpoint_public_access  = true
  }

  encryption_config {
    provider {
      key_arn = aws_kms_key.eks.arn
    }
    resources = ["secrets"]
  }

  enabled_cluster_log_types = [
    "api", "audit", "authenticator",
    "controllerManager", "scheduler"
  ]
}

resource "aws_eks_node_group" "main" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "${var.cluster_name}-nodes"
  node_role_arn   = aws_iam_role.node.arn
  subnet_ids      = aws_subnet.private[*].id

  scaling_config {
    desired_size = var.desired_nodes
    max_size     = var.max_nodes
    min_size     = var.min_nodes
  }

  instance_types = var.instance_types
  capacity_type  = "ON_DEMAND"

  update_config {
    max_unavailable_percentage = 33
  }
}
```

---

## 3. CI/CD PIPELINES

### 3.1 GitHub Actions

**Complete Pipeline:**
```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        ports: [5432:5432]
      redis:
        image: redis:7
        ports: [6379:6379]
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  build:
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure AWS
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Login to ECR
        id: ecr
        uses: aws-actions/amazon-ecr-login@v2
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.ecr.outputs.registry }}/myapp:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Update kubeconfig
        run: |
          aws eks update-kubeconfig \
            --region us-east-1 \
            --name production-eks
      
      - name: Deploy
        run: |
          kubectl set image deployment/myapp \
            myapp=${{ needs.build.outputs.image }}
          kubectl rollout status deployment/myapp
      
      - name: Smoke test
        run: curl -f https://myapp.com/health
```

---

## 4. CONTAINER ORCHESTRATION

### 4.1 Kubernetes Manifests

**Deployment:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: production
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: database-url
```

**Service:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: myapp
```

**HPA:**
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

**Ingress:**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - myapp.com
    secretName: myapp-tls
  rules:
  - host: myapp.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp
            port:
              number: 80
```

### 4.2 Helm Charts

**values.yaml:**
```yaml
replicaCount: 3

image:
  repository: myapp
  tag: "1.0.0"

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  hosts:
    - host: myapp.com
      paths:
        - path: /
          pathType: Prefix

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
```

---

## 5. MONITORING & OBSERVABILITY

### 5.1 Prometheus Metrics

**Setup:**
```yaml
# prometheus-values.yaml
prometheus:
  prometheusSpec:
    retention: 30d
    storageSpec:
      volumeClaimTemplate:
        spec:
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 50Gi
    
    serviceMonitorSelector:
      matchLabels:
        prometheus: kube-prometheus

grafana:
  enabled: true
  adminPassword: changeme
  persistence:
    enabled: true
    size: 10Gi
```

**ServiceMonitor:**
```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: myapp
  labels:
    prometheus: kube-prometheus
spec:
  selector:
    matchLabels:
      app: myapp
  endpoints:
  - port: http
    path: /metrics
    interval: 30s
```

**Application Metrics:**
```typescript
import { Counter, Histogram, register } from 'prom-client';

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

### 5.2 Grafana Dashboards

**Dashboard JSON:**
```json
{
  "dashboard": {
    "title": "Application Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ]
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m])"
          }
        ]
      },
      {
        "title": "Latency (p99)",
        "targets": [
          {
            "expr": "histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))"
          }
        ]
      }
    ]
  }
}
```

---

## 6. LOGGING & ALERTING

### 6.1 ELK Stack

**Filebeat:**
```yaml
filebeat.inputs:
- type: container
  paths:
    - /var/log/containers/*.log
  processors:
    - add_kubernetes_metadata:
        host: ${NODE_NAME}
        matchers:
        - logs_path:
            logs_path: "/var/log/containers/"

output.elasticsearch:
  hosts: ['${ELASTICSEARCH_HOST}:9200']
  username: ${ELASTICSEARCH_USERNAME}
  password: ${ELASTICSEARCH_PASSWORD}
```

**Fluentd:**
```xml
<source>
  @type tail
  path /var/log/containers/*.log
  pos_file /var/log/fluentd-containers.log.pos
  tag kubernetes.*
  read_from_head true
  <parse>
    @type json
    time_format %Y-%m-%dT%H:%M:%S.%NZ
  </parse>
</source>

<filter kubernetes.**>
  @type kubernetes_metadata
</filter>

<match kubernetes.**>
  @type elasticsearch
  host elasticsearch
  port 9200
  logstash_format true
  logstash_prefix kubernetes
</match>
```

### 6.2 Alerting Rules

**Prometheus Alerts:**
```yaml
groups:
- name: app_alerts
  interval: 30s
  rules:
  - alert: HighErrorRate
    expr: |
      (
        sum(rate(http_requests_total{status=~"5.."}[5m]))
        /
        sum(rate(http_requests_total[5m]))
      ) > 0.05
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "High error rate: {{ $value }}"
  
  - alert: HighLatency
    expr: |
      histogram_quantile(0.99,
        rate(http_request_duration_seconds_bucket[5m])
      ) > 1
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "p99 latency: {{ $value }}s"
  
  - alert: PodCrashLooping
    expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
    for: 5m
    labels:
      severity: critical
```

**AlertManager:**
```yaml
global:
  resolve_timeout: 5m

route:
  group_by: ['alertname', 'cluster']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  receiver: 'slack-notifications'
  
  routes:
  - match:
      severity: critical
    receiver: 'pagerduty'
    continue: true

receivers:
- name: 'slack-notifications'
  slack_configs:
  - api_url: 'https://hooks.slack.com/services/XXX'
    channel: '#alerts'
    title: 'Alert: {{ .GroupLabels.alertname }}'

- name: 'pagerduty'
  pagerduty_configs:
  - service_key: 'XXX'
```

---

## 7. INCIDENT RESPONSE & SRE

### 7.1 SLOs & Error Budgets

**SLI/SLO Definition:**
```yaml
slos:
  availability:
    sli: "Percentage of successful requests"
    slo: 99.9%
    error_budget: 0.1%  # 43 minutes/month
  
  latency:
    sli: "p99 latency"
    slo: "< 500ms"
  
  throughput:
    sli: "Requests per second"
    slo: "> 1000 rps"
```

**Error Budget Calculation:**
```python
# Monthly error budget
uptime_slo = 0.999
downtime_allowed = (1 - uptime_slo) * 30 * 24 * 60  # minutes
print(f"Allowed downtime: {downtime_allowed:.1f} min/month")

# Current error budget
actual_uptime = 0.9985
error_budget_used = (1 - actual_uptime) / (1 - uptime_slo)
print(f"Error budget used: {error_budget_used * 100:.1f}%")
```

### 7.2 Incident Response

**On-Call Rotation:**
```yaml
# PagerDuty schedule
schedules:
  primary:
    timezone: UTC
    rotation:
      type: weekly
      start: Monday 00:00
    users:
      - alice@company.com
      - bob@company.com
      - charlie@company.com
  
  backup:
    timezone: UTC
    rotation:
      type: weekly
      start: Monday 00:00
      handoff: primary + 12 hours
```

**Incident Runbook:**
```markdown
# High Error Rate Runbook

## Symptoms
- Error rate > 5%
- Users reporting 500 errors

## Investigation
1. Check Grafana dashboard
2. Review logs in Kibana
3. Check pod health: `kubectl get pods`
4. Check resource usage

## Mitigation
1. Scale up pods: `kubectl scale deployment/myapp --replicas=10`
2. Restart unhealthy pods: `kubectl delete pod <pod-name>`
3. Rollback if needed: `kubectl rollout undo deployment/myapp`

## Resolution
1. Identify root cause
2. Apply fix
3. Monitor error rate
4. Write postmortem
```

**Post-Mortem Template:**
```markdown
# Incident Post-Mortem: [TITLE]

**Date:** 2024-01-15
**Duration:** 45 minutes
**Severity:** P1 (Critical)
**Impact:** 500 errors affecting 15% of users

## Timeline
- 10:00 - Alert triggered (high error rate)
- 10:05 - On-call engineer paged
- 10:10 - Investigation started
- 10:20 - Root cause identified (DB connection pool exhausted)
- 10:30 - Mitigation applied (increased pool size)
- 10:45 - Incident resolved

## Root Cause
Database connection pool size (max=20) insufficient for traffic spike

## Resolution
Increased connection pool to 100, added auto-scaling

## Action Items
- [ ] Add connection pool metrics
- [ ] Set up auto-scaling for DB connections
- [ ] Update runbook

## Lessons Learned
- Need better visibility into DB connection usage
- Should have load tested connection pool limits
```

---

## 8. SECURITY & COMPLIANCE

### 8.1 Network Policies

**Default Deny:**
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

**Allow Specific:**
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: myapp-policy
spec:
  podSelector:
    matchLabels:
      app: myapp
  policyTypes:
  - Ingress
  - Egress
  
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 3000
  
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - podSelector:
        matchLabels:
          app: redis
    ports:
    - protocol: TCP
      port: 6379
```

### 8.2 Secrets Management

**AWS Secrets Manager:**
```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-east-1
      auth:
        jwt:
          serviceAccountRef:
            name: external-secrets

---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: myapp-secrets
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets
    kind: SecretStore
  target:
    name: myapp-secrets
  data:
  - secretKey: database-url
    remoteRef:
      key: production/database
      property: url
```

**Sealed Secrets:**
```bash
# Encrypt secret
kubeseal --format=yaml < secret.yaml > sealed-secret.yaml

# Apply sealed secret
kubectl apply -f sealed-secret.yaml
```

---

## 9. DISASTER RECOVERY

### 9.1 Backup Strategy

**Velero (K8s Backup):**
```bash
# Install Velero
velero install \
  --provider aws \
  --bucket velero-backups \
  --secret-file ./credentials-velero

# Schedule daily backups
velero schedule create daily-backup \
  --schedule="0 2 * * *" \
  --include-namespaces production

# Restore
velero restore create --from-backup daily-backup-20240115
```

**Database Backups:**
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: postgres-backup
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: postgres:15
            env:
            - name: PGPASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres-secrets
                  key: password
            command:
            - sh
            - -c
            - |
              pg_dump -h postgres -U postgres mydb | \
              gzip > /backup/backup-$(date +%Y%m%d).sql.gz
              aws s3 cp /backup/backup-$(date +%Y%m%d).sql.gz \
                s3://backups/postgres/
```

### 9.2 Disaster Recovery Plan

**RTO/RPO:**
```
RTO (Recovery Time Objective): 4 hours
RPO (Recovery Point Objective): 1 hour

Backup Schedule:
- Database: Every 1 hour
- Files: Every 6 hours
- Full system: Daily

Retention:
- Daily: 30 days
- Weekly: 12 weeks
- Monthly: 12 months
```

---

## 10. COST OPTIMIZATION

### 10.1 Right-Sizing

**Resource Recommendations:**
```bash
# Install metrics-server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Get resource usage
kubectl top nodes
kubectl top pods -n production

# Recommendations
kubectl get pods -o json | \
  jq -r '.items[] | "\(.metadata.name): \(.spec.containers[0].resources)"'
```

**Spot Instances:**
```hcl
resource "aws_eks_node_group" "spot" {
  cluster_name = aws_eks_cluster.main.name
  node_group_name = "spot-nodes"
  
  capacity_type = "SPOT"
  instance_types = ["t3.large", "t3a.large"]
  
  scaling_config {
    desired_size = 2
    max_size     = 10
    min_size     = 0
  }
}
```

### 10.2 Cost Monitoring

**AWS Cost Explorer API:**
```python
import boto3

ce = boto3.client('ce')

response = ce.get_cost_and_usage(
    TimePeriod={
        'Start': '2024-01-01',
        'End': '2024-01-31'
    },
    Granularity='DAILY',
    Metrics=['UnblendedCost'],
    GroupBy=[
        {'Type': 'SERVICE', 'Key': 'SERVICE'}
    ]
)

for result in response['ResultsByTime']:
    print(f"Date: {result['TimePeriod']['Start']}")
    for group in result['Groups']:
        service = group['Keys'][0]
        cost = group['Metrics']['UnblendedCost']['Amount']
        print(f"  {service}: ${cost}")
```

---

## 11. RESPONSE FORMATS

### 11.1 Infrastructure Proposal Template

```markdown
## INFRASTRUCTURE PROPOSAL: [Feature]

**DevOps Engineer:** [Name]
**Date:** [YYYY-MM-DD]
**Status:** Ready for Review

---

### OVERVIEW

**Requirements:**
- Application: Node.js 18, PostgreSQL, Redis
- Expected traffic: 10k rps peak
- Region: US East (multi-AZ)

**Objectives:**
- 99.9% uptime
- p99 latency < 200ms
- Auto-scale 3-10 pods
- Zero-downtime deployments

---

### INFRASTRUCTURE DESIGN

**Architecture:**
```
ALB → EKS (3 AZs) → RDS Multi-AZ
                  → ElastiCache
```

**Resources:**
- EKS: 1.28, t3.large nodes (3-10)
- RDS: db.r6g.large, Multi-AZ, 2 replicas
- ElastiCache: cache.t3.medium (3 nodes)

**Cost Estimate:** $2,500/month

---

### CI/CD PIPELINE

**GitHub Actions:**
1. Test (lint, unit, integration)
2. Build Docker image → ECR
3. Deploy to staging (auto)
4. Deploy to production (manual approval)

**Deployment Strategy:**
- Rolling update (maxSurge=1, maxUnavailable=0)
- Health checks before traffic
- Auto-rollback on failures

---

### MONITORING

**Metrics:** Prometheus + Grafana
**Logs:** ELK Stack
**Alerts:** PagerDuty

**SLOs:**
- Availability: 99.9%
- Latency p99: < 200ms
- Error rate: < 1%

---

### SECURITY

- Network policies (default deny)
- Secrets in AWS Secrets Manager
- Pod security standards
- TLS everywhere
- Regular patching

---

### DISASTER RECOVERY

- RTO: 4 hours
- RPO: 1 hour
- Backups: Hourly (DB), Daily (full)
- Multi-region failover ready

---

### REQUESTING APPROVAL

**Ready for Principal Engineer review (CHECKPOINT 1)**
```

### 11.2 Implementation Response

```markdown
## IMPLEMENTATION: [Infrastructure]

**DevOps Engineer:** [Name]
**Date:** [YYYY-MM-DD]
**PR:** #[number]

---

### SUMMARY

**Implemented:**
- EKS cluster with auto-scaling
- RDS Multi-AZ with replicas
- CI/CD pipeline (GitHub Actions)
- Monitoring (Prometheus/Grafana)
- Logging (ELK)

**Design Adherence:** ✅ Exact

---

### TERRAFORM

**Modules:**
- VPC (3 AZs, public/private subnets)
- EKS (1.28, t3.large nodes)
- RDS (PostgreSQL 15, Multi-AZ)
- ElastiCache (Redis 7)

**State:** S3 backend with DynamoDB locking

---

### KUBERNETES

**Deployments:** 3 replicas, rolling updates
**HPA:** 3-10 pods (70% CPU)
**Ingress:** NGINX + cert-manager
**Secrets:** External Secrets Operator

---

### MONITORING

**Dashboards:**
- Request rate, latency, errors
- Resource usage (CPU, memory)
- Database connections

**Alerts:**
- Error rate > 5% (critical)
- p99 latency > 500ms (warning)
- Pods crash-looping (critical)

---

### TESTING

✅ Terraform plan successful
✅ All resources created
✅ Application deployed
✅ Health checks passing
✅ Load tested (12k rps sustained)
✅ Failover tested (RDS)

---

### READY FOR REVIEW

**Requesting Principal Engineer approval (CHECKPOINT 2)**
```

---

## CONCLUSION

The DevOps/SRE Engineer ensures **reliable, scalable, and observable infrastructure** that powers the application.

**Core Responsibilities:**
1. ✅ Design infrastructure (IaC)
2. ✅ Build CI/CD pipelines
3. ✅ Deploy to production
4. ✅ Monitor and alert
5. ✅ Respond to incidents
6. ✅ Optimize costs
7. ✅ Get Principal Engineer approval (CHECKPOINT 1 & 2)

**Key Principles:**
- **Infrastructure as Code:** Everything versioned and reproducible
- **Automation:** CI/CD for fast, safe deployments
- **Observability:** Monitor everything, alert intelligently
- **Reliability:** 99.9%+ uptime through redundancy and automation
- **Security:** Defense in depth, least privilege
- **Cost-Conscious:** Right-size resources, use spot instances

**Remember:**
> "You build it, you run it. Infrastructure is code. Automate everything. Monitor religiously. Respond quickly. Learn from incidents. Optimize relentlessly."

---

*End of DevOps/SRE Engineer Skill Document*
*Version 1.0.0*
*Role: DevOps & Site Reliability Engineering*
