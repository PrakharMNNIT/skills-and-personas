# Star Team - Complete File Structure

## 📦 What You Have

```
star-team-complete-package/
├── INSTALLATION & DOCUMENTATION
│   ├── README-STAR-TEAM-SETUP.md         # Comprehensive setup guide
│   ├── QUICKSTART.md                      # 3-minute quick start
│   ├── install-star-team.sh               # Automated installer (Linux/Mac)
│   └── FILE-STRUCTURE.md                  # This file
│
├── CORE SKILL (Required)
│   └── STAR-TEAM-ORCHESTRATOR-SKILL.md    # Main orchestrator (rename to SKILL.md)
│
└── ROLE SKILLS (Required)
    ├── PRODUCT-MANAGER-SKILL.md           # PM role (2,907 lines)
    ├── PRINCIPAL-ENGINEER-SKILL.md        # PE role (~1,200 lines)
    ├── BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md  # Backend role (1,566 lines)
    ├── FRONTEND-UIUX-DESIGNER-SKILL.md    # Frontend role (~1,800 lines)
    ├── DEVOPS-SRE-ENGINEER-SKILL.md       # DevOps role (1,566 lines)
    └── QA-SECURITY-ENGINEER-SKILL.md      # QA/Security role (2,926 lines)
```

**Total:** 11 files (~150,000 lines of enterprise development knowledge)

---

## 🎯 Installation Target Structure

After running `install-star-team.sh`, your Claude skills directory will look like:

### Personal Installation (Default)
```
~/.claude/skills/star-team/
├── SKILL.md                               # Orchestrator (auto-loaded)
├── PRODUCT-MANAGER-SKILL.md               # Loaded on-demand
├── PRINCIPAL-ENGINEER-SKILL.md            # Loaded on-demand
├── BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md  # Loaded on-demand
├── FRONTEND-UIUX-DESIGNER-SKILL.md        # Loaded on-demand
├── DEVOPS-SRE-ENGINEER-SKILL.md           # Loaded on-demand
├── QA-SECURITY-ENGINEER-SKILL.md          # Loaded on-demand
└── README.md                              # Documentation (optional)
```

### Project Installation
```
.claude/skills/star-team/
├── SKILL.md                               # Same files as above
├── PRODUCT-MANAGER-SKILL.md
├── PRINCIPAL-ENGINEER-SKILL.md
├── BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md
├── FRONTEND-UIUX-DESIGNER-SKILL.md
├── DEVOPS-SRE-ENGINEER-SKILL.md
├── QA-SECURITY-ENGINEER-SKILL.md
└── README.md
```

---

## 📋 File Descriptions

### Installation Files

**README-STAR-TEAM-SETUP.md**
- Complete installation guide
- Troubleshooting
- File structure explanation
- Advanced configuration
- 400+ lines

**QUICKSTART.md**
- 3-minute setup guide
- Verification steps
- Basic usage examples
- 200+ lines

**install-star-team.sh**
- Automated installer script
- Works on Linux/Mac
- Validates installation
- Provides next steps
- Executable bash script

**FILE-STRUCTURE.md**
- This file
- Visual directory layout
- File descriptions

---

### Core Orchestrator

**STAR-TEAM-ORCHESTRATOR-SKILL.md → SKILL.md**
- Meta-skill that coordinates all 6 roles
- Defines workflow with 2 mandatory checkpoints
- Progressive loading of role skills
- Decision tree for role activation
- 834 lines
- **MUST be renamed to `SKILL.md` during installation**

---

### Role Skills (Loaded On-Demand)

**PRODUCT-MANAGER-SKILL.md**
- Product strategy & vision
- User research & discovery
- Requirements & PRDs
- Roadmap planning
- Metrics & analytics
- Stakeholder management
- Prioritization frameworks
- 2,907 lines

**PRINCIPAL-ENGINEER-SKILL.md**
- System architecture design
- Design patterns & best practices
- Code review standards
- Technical leadership
- Technology evaluation
- Architecture documentation
- ~1,200 lines

**BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md**
- API design (REST, GraphQL, gRPC)
- Database architecture
- Microservices patterns
- Distributed systems
- Scalability engineering
- Caching strategies
- Message queues
- Security & authentication
- 1,566 lines

**FRONTEND-UIUX-DESIGNER-SKILL.md**
- Component architecture
- Design systems
- Accessibility (WCAG 2.1)
- Performance optimization
- State management
- Responsive design
- User experience patterns
- ~1,800 lines

**DEVOPS-SRE-ENGINEER-SKILL.md**
- Infrastructure as Code (Terraform)
- CI/CD pipelines
- Container orchestration (Kubernetes)
- Monitoring & observability
- Logging & alerting
- Incident response
- Cost optimization
- 1,566 lines

**QA-SECURITY-ENGINEER-SKILL.md**
- Testing strategies (unit, integration, E2E)
- Performance & load testing
- Security testing (SAST/DAST)
- Penetration testing
- Vulnerability management
- Compliance (GDPR, SOC2, PCI, HIPAA)
- OWASP Top 10
- 2,926 lines

---

## 🎯 How Files Work Together

### At Installation

```
1. User runs: ./install-star-team.sh
   
2. Script copies:
   STAR-TEAM-ORCHESTRATOR-SKILL.md → ~/.claude/skills/star-team/SKILL.md
   [6 role files]                  → ~/.claude/skills/star-team/
   
3. User restarts Claude Code
   
4. Claude loads: SKILL.md (orchestrator only)
```

### At Runtime

```
1. User: "Build a REST API"
   
2. Claude reads: SKILL.md (orchestrator)
   
3. Orchestrator decides: Need PM, PE, Backend, QA, DevOps
   
4. Claude progressively loads:
      - PRODUCT-MANAGER-SKILL.md (when PM needed)
      - PRINCIPAL-ENGINEER-SKILL.md (when PE needed)
      - BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md (when Backend needed)
      - QA-SECURITY-ENGINEER-SKILL.md (when QA needed)
      - DEVOPS-SRE-ENGINEER-SKILL.md (when DevOps needed)
   
5. Roles execute in workflow order with checkpoints
```

**Key Insight:** Not all files load at once! Only what's needed for the current task.

---

## 💾 Size Information

| File | Lines | Approx Size |
|------|-------|-------------|
| SKILL.md (orchestrator) | 834 | 60 KB |
| PRODUCT-MANAGER-SKILL.md | 2,907 | 180 KB |
| PRINCIPAL-ENGINEER-SKILL.md | 1,200 | 80 KB |
| BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md | 1,566 | 120 KB |
| FRONTEND-UIUX-DESIGNER-SKILL.md | 1,800 | 140 KB |
| DEVOPS-SRE-ENGINEER-SKILL.md | 1,566 | 115 KB |
| QA-SECURITY-ENGINEER-SKILL.md | 2,926 | 200 KB |
| **Total** | **~12,800** | **~900 KB** |

---

## 🔄 Update Process

### Update Orchestrator Logic
```bash
# Edit the workflow
nano ~/.claude/skills/star-team/SKILL.md

# Restart Claude Code
```

### Update a Role
```bash
# Edit specific role
nano ~/.claude/skills/star-team/BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md

# Restart Claude Code
```

### Add New Role
```bash
# Create new role file
nano ~/.claude/skills/star-team/DATA-ENGINEER-SKILL.md

# Update SKILL.md to reference it
nano ~/.claude/skills/star-team/SKILL.md

# Restart Claude Code
```

---

## 🎓 File Naming Rules

### CRITICAL: SKILL.md Must Be Exact

```
✅ CORRECT:
~/.claude/skills/star-team/SKILL.md

❌ WRONG:
~/.claude/skills/star-team/skill.md          # lowercase 's'
~/.claude/skills/star-team/Skill.md          # wrong case
~/.claude/skills/star-team/ORCHESTRATOR.md   # wrong name
```

Claude looks for exactly `SKILL.md` (case-sensitive).

### Role Files Can Keep Original Names

```
✅ CORRECT:
PRODUCT-MANAGER-SKILL.md
PRINCIPAL-ENGINEER-SKILL.md
BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md

✅ ALSO OK:
product-manager.md
pe-role.md
backend-expert.md

Just update references in SKILL.md if you rename them.
```

---

## 📦 Distribution Options

### Option 1: Share Complete Package
Zip all 11 files and share:
```bash
zip -r star-team-complete.zip *.md *.sh
```

### Option 2: Git Repository
```bash
git init
git add *.md *.sh
git commit -m "Initial Star Team skill system"
git remote add origin <your-repo>
git push
```

### Option 3: Individual Distribution
Share files individually:
- Users need: Orchestrator (as SKILL.md) + all 6 role files
- Optional: README, QUICKSTART, installer

---

## ✅ Verification Checklist

After installation, verify:

```bash
# 1. Check directory exists
ls -la ~/.claude/skills/star-team/

# 2. Verify SKILL.md exists (exact name)
test -f ~/.claude/skills/star-team/SKILL.md && echo "✓ SKILL.md found"

# 3. Count role files (should be 6)
ls -1 ~/.claude/skills/star-team/*-SKILL.md | wc -l
# Should output: 6

# 4. Check file permissions (should be readable)
ls -l ~/.claude/skills/star-team/SKILL.md
# Should show: -rw-r--r--

# 5. Test in Claude
# Restart Claude Code, then ask: "What skills are available?"
# Should see: star-team-orchestrator
```

---

## 🚀 Next Steps

1. ✅ Run `install-star-team.sh`
2. ✅ Restart Claude Code
3. ✅ Verify: "What skills are available?"
4. ✅ Test: "Build a simple REST API"

You're ready to build enterprise software with the Star Team! 🎉

---

*Star Team - Complete File Structure Guide*
*All files organized and documented*
