# Star Team - Quick Start Guide

Get the Star Team up and running in 3 minutes.

---

## 🎯 What is Star Team?

A coordinated team of 6 AI specialists that work together to build enterprise software:

- **Product Manager** - Defines what to build
- **Principal Engineer** - Approves architecture & code
- **Backend Engineer** - Builds server-side
- **Frontend Engineer** - Builds UI
- **DevOps Engineer** - Deploys & operates  
- **QA/Security Engineer** - Tests & secures

**Key Feature:** Mandatory quality checkpoints ensure nothing goes to production without proper review.

---

## 📦 Installation (60 seconds)

### Linux/Mac

```bash
# 1. Download all skill files to a directory
cd ~/Downloads/star-team-files

# 2. Run installer (choose personal or project)
./install-star-team.sh personal

# 3. Restart Claude Code
# Exit and reopen Claude Code
```

### Windows

```powershell
# 1. Create skill directory
mkdir $HOME\.claude\skills\star-team

# 2. Copy files
copy STAR-TEAM-ORCHESTRATOR-SKILL.md $HOME\.claude\skills\star-team\SKILL.md
copy PRODUCT-MANAGER-SKILL.md $HOME\.claude\skills\star-team\
copy PRINCIPAL-ENGINEER-SKILL.md $HOME\.claude\skills\star-team\
copy BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md $HOME\.claude\skills\star-team\
copy FRONTEND-UIUX-DESIGNER-SKILL.md $HOME\.claude\skills\star-team\
copy DEVOPS-SRE-ENGINEER-SKILL.md $HOME\.claude\skills\star-team\
copy QA-SECURITY-ENGINEER-SKILL.md $HOME\.claude\skills\star-team\

# 3. Restart Claude Code
```

### Manual Installation

If the script doesn't work:

```bash
# 1. Create directory
mkdir -p ~/.claude/skills/star-team

# 2. Copy orchestrator (MUST be named SKILL.md)
cp STAR-TEAM-ORCHESTRATOR-SKILL.md ~/.claude/skills/star-team/SKILL.md

# 3. Copy all role files (keep original names)
cp PRODUCT-MANAGER-SKILL.md ~/.claude/skills/star-team/
cp PRINCIPAL-ENGINEER-SKILL.md ~/.claude/skills/star-team/
cp BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md ~/.claude/skills/star-team/
cp FRONTEND-UIUX-DESIGNER-SKILL.md ~/.claude/skills/star-team/
cp DEVOPS-SRE-ENGINEER-SKILL.md ~/.claude/skills/star-team/
cp QA-SECURITY-ENGINEER-SKILL.md ~/.claude/skills/star-team/

# 4. Verify
ls -la ~/.claude/skills/star-team/
# Should see: SKILL.md + 6 role files

# 5. Restart Claude Code
```

---

## ✅ Verification

### Step 1: Check if skill is loaded

```
You: What skills are available?

Claude: I have access to the following skills:

• star-team-orchestrator: Full-stack enterprise development team 
  orchestrator. Coordinates Product Manager, Principal Engineer, 
  Backend/Frontend Engineers, DevOps, and QA/Security through a 
  structured workflow with mandatory checkpoints...
```

If you don't see it, restart Claude Code again.

### Step 2: Test activation

```
You: Build a simple REST API for managing tasks

Claude: I'll activate the Star Team to build this REST API.

[Product Manager activates]
Let me start by creating a Product Requirements Document...

[Principal Engineer reviews]
I'll design the architecture for this API...
```

If the skill activates, you're all set! 🎉

---

## 🚀 Basic Usage

### Full Feature Development

```
You: Build a user authentication system with JWT tokens

Star Team:
→ PM: Writes PRD with requirements
→ PE: Designs architecture (CHECKPOINT 1 ✅)
→ Backend: Implements auth APIs
→ Frontend: Builds login UI
→ QA: Tests security
→ PE: Reviews code (CHECKPOINT 2 ✅)
→ DevOps: Deploys with monitoring
```

### Architecture Only

```
You: Design the architecture for a microservices application

Star Team:
→ PM: Brief requirements gathering
→ PE: Creates comprehensive architecture document

(No implementation - just design)
```

### Code Review

```
You: Review this pull request for security issues

Star Team:
→ PE: Architecture & code quality review
→ QA: Security audit

(Review only - no changes)
```

---

## 💡 Key Concepts

### 1. Two Mandatory Checkpoints

**CHECKPOINT 1 - Before Implementation:**
- Principal Engineer approves architecture
- No code written until approved
- Prevents architectural mistakes

**CHECKPOINT 2 - Before Deployment:**
- Principal Engineer approves implementation
- All tests must pass
- Security audit must be clean
- No deployment until approved

### 2. Progressive Loading

The skill loads roles on-demand:

```
User request → Orchestrator decides → Loads only needed roles
```

Not all 150,000 lines load at once - only what's needed.

### 3. Clear Role Boundaries

| Role | Decides | Does NOT Decide |
|------|---------|-----------------|
| PM | WHAT to build | HOW to build it |
| PE | HOW to architect | WHAT features |
| Engineers | Implementation | Architecture |

---

## 📖 Example Session

```
You: Build a blog API with posts and comments

Claude: I'll coordinate the Star Team for this.

[PM - Product Manager]
Creating PRD for blog API...

## PRD: Blog API

### Requirements
- CRUD operations for posts
- Nested comments
- User authentication
- Search functionality

### Success Metrics
- API response time <200ms
- 99.9% uptime
- Support 10K concurrent users

[PE - Principal Engineer - CHECKPOINT 1]
Reviewing requirements and designing architecture...

## Architecture Proposal

### Tech Stack
- Backend: Node.js + Express
- Database: PostgreSQL
- Cache: Redis
- Auth: JWT

### API Design
GET    /posts
POST   /posts
GET    /posts/:id
PUT    /posts/:id
DELETE /posts/:id
GET    /posts/:id/comments
POST   /posts/:id/comments

### Database Schema
posts:
  id, title, content, author_id, created_at

comments:
  id, post_id, content, author_id, created_at

DECISION: ✅ APPROVED

[Backend Engineer]
Implementing the blog API...

[Creates complete implementation with code]

[QA/Security Engineer]
Testing the blog API...

✅ Unit tests: 87% coverage
✅ Integration tests: All passing
✅ Security: OWASP Top 10 checks passed
✅ Performance: p95 latency 145ms

[PE - Principal Engineer - CHECKPOINT 2]
Reviewing implementation...

✅ Architecture adherence: Matches approved design
✅ Code quality: Clean, well-documented
✅ Tests: Comprehensive
✅ Security: Audit passed

DECISION: ✅ APPROVED FOR DEPLOYMENT

[DevOps Engineer]
Deploying blog API...

✅ Infrastructure created (Terraform)
✅ CI/CD pipeline configured
✅ Deployed to staging
✅ Smoke tests passed
✅ Deployed to production
✅ Monitoring active

Blog API is live! 🚀
```

---

## 🔧 Troubleshooting

### "Skill not found"

1. Check file location:
   ```bash
   ls -la ~/.claude/skills/star-team/SKILL.md
   ```
   
2. File must be exactly named `SKILL.md` (case-sensitive)

3. Restart Claude Code

### "Skill doesn't activate"

Use explicit trigger words:
- ✅ "Build a REST API"
- ✅ "Design the architecture for..."
- ✅ "Review this code"
- ❌ "Make an API" (too vague)

### "Role details missing"

1. Verify all 7 files exist:
   ```bash
   ls -la ~/.claude/skills/star-team/*.md
   ```

2. Should see:
   - SKILL.md (orchestrator)
   - 6 role files (*-SKILL.md)

---

## 📚 What's Next?

### Learn the Workflow

Read `README-STAR-TEAM-SETUP.md` for:
- Detailed workflow explanation
- Role responsibilities
- Checkpoint criteria
- Advanced usage

### Explore Individual Roles

Each role has comprehensive knowledge:
- **Product Manager:** Strategy, roadmaps, metrics
- **Principal Engineer:** Architecture, design patterns
- **Backend:** APIs, databases, microservices
- **Frontend:** UI/UX, accessibility, React
- **DevOps:** Kubernetes, CI/CD, monitoring
- **QA/Security:** Testing, OWASP, compliance

### Customize

Edit `~/.claude/skills/star-team/SKILL.md` to:
- Change activation keywords
- Modify workflow
- Add custom rules
- Configure tool permissions

---

## 🎯 Common Use Cases

| Task | Star Team Response |
|------|-------------------|
| "Build an API" | Full workflow (all 6 roles) |
| "Design architecture" | PM + PE only |
| "Review this code" | PE + QA |
| "Deploy this app" | DevOps + PE |
| "Write a PRD" | PM only |
| "Security audit" | QA only |

---

## 🎉 You're Ready!

The Star Team is installed and ready to help you build enterprise software with proper checkpoints and quality gates.

**Try it now:**
```
Build a REST API for managing a todo list
```

Watch as the team coordinates automatically! 🚀

---

## 📞 Support

- **Documentation:** `README-STAR-TEAM-SETUP.md`
- **Anthropic Docs:** https://code.claude.com/docs/en/skills
- **Troubleshooting:** See "Troubleshooting" section above

---

*Star Team - Enterprise AI Development Team*
*Get started in under 3 minutes*
