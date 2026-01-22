# Star Team - Enterprise AI Development Team Setup

Complete installation guide for the Star Team skill system - a coordinated team of 6 specialized AI roles for enterprise software development.

---

## 📁 File Structure

The Star Team uses a **single skill directory** with multiple supporting files:

```
~/.claude/skills/star-team/          # Main skill directory
├── SKILL.md                         # Orchestrator (required, auto-loaded)
├── PRODUCT-MANAGER-SKILL.md         # PM role (loaded on-demand)
├── PRINCIPAL-ENGINEER-SKILL.md      # PE role (loaded on-demand)
├── BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md  # Backend role
├── FRONTEND-UIUX-DESIGNER-SKILL.md  # Frontend role
├── DEVOPS-SRE-ENGINEER-SKILL.md     # DevOps role
├── QA-SECURITY-ENGINEER-SKILL.md    # QA/Security role
└── README.md                        # This file (optional)
```

**Key Concept:** 
- `SKILL.md` = The orchestrator (Claude loads this first)
- Other files = Role-specific knowledge (loaded progressively when needed)

---

## 🚀 Quick Start Installation

### Option 1: Personal Skills (Recommended)
**Available across ALL your projects**

```bash
# 1. Create skill directory
mkdir -p ~/.claude/skills/star-team

# 2. Copy orchestrator as SKILL.md (REQUIRED)
cp STAR-TEAM-ORCHESTRATOR-SKILL.md ~/.claude/skills/star-team/SKILL.md

# 3. Copy all role files
cp PRODUCT-MANAGER-SKILL.md ~/.claude/skills/star-team/
cp PRINCIPAL-ENGINEER-SKILL.md ~/.claude/skills/star-team/
cp BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md ~/.claude/skills/star-team/
cp FRONTEND-UIUX-DESIGNER-SKILL.md ~/.claude/skills/star-team/
cp DEVOPS-SRE-ENGINEER-SKILL.md ~/.claude/skills/star-team/
cp QA-SECURITY-ENGINEER-SKILL.md ~/.claude/skills/star-team/

# 4. Restart Claude Code
# Exit and reopen Claude Code to load the skill
```

### Option 2: Project-Specific Skills
**Only available in this project**

```bash
# 1. Create project skill directory
mkdir -p .claude/skills/star-team

# 2. Copy all files (same as above, but to .claude instead of ~/.claude)
cp STAR-TEAM-ORCHESTRATOR-SKILL.md .claude/skills/star-team/SKILL.md
cp PRODUCT-MANAGER-SKILL.md .claude/skills/star-team/
cp PRINCIPAL-ENGINEER-SKILL.md .claude/skills/star-team/
cp BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md .claude/skills/star-team/
cp FRONTEND-UIUX-DESIGNER-SKILL.md .claude/skills/star-team/
cp DEVOPS-SRE-ENGINEER-SKILL.md .claude/skills/star-team/
cp QA-SECURITY-ENGINEER-SKILL.md .claude/skills/star-team/

# 3. Commit to version control (share with team)
git add .claude/skills/
git commit -m "Add Star Team skill system"

# 4. Restart Claude Code
```

---

## 📋 Installation Script

Save this as `install-star-team.sh`:

```bash
#!/bin/bash

# Star Team Installation Script
# Usage: ./install-star-team.sh [personal|project]

INSTALL_TYPE=${1:-personal}

if [ "$INSTALL_TYPE" = "personal" ]; then
    SKILL_DIR="$HOME/.claude/skills/star-team"
    echo "Installing Star Team to: $SKILL_DIR (personal - all projects)"
elif [ "$INSTALL_TYPE" = "project" ]; then
    SKILL_DIR=".claude/skills/star-team"
    echo "Installing Star Team to: $SKILL_DIR (project-specific)"
else
    echo "Usage: $0 [personal|project]"
    exit 1
fi

# Create directory
mkdir -p "$SKILL_DIR"

# Copy orchestrator as SKILL.md
echo "Copying orchestrator..."
cp STAR-TEAM-ORCHESTRATOR-SKILL.md "$SKILL_DIR/SKILL.md"

# Copy role files
echo "Copying role files..."
cp PRODUCT-MANAGER-SKILL.md "$SKILL_DIR/"
cp PRINCIPAL-ENGINEER-SKILL.md "$SKILL_DIR/"
cp BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md "$SKILL_DIR/"
cp FRONTEND-UIUX-DESIGNER-SKILL.md "$SKILL_DIR/"
cp DEVOPS-SRE-ENGINEER-SKILL.md "$SKILL_DIR/"
cp QA-SECURITY-ENGINEER-SKILL.md "$SKILL_DIR/"

echo ""
echo "✅ Star Team installed successfully!"
echo ""
echo "📍 Location: $SKILL_DIR"
echo ""
echo "Next steps:"
echo "1. Restart Claude Code (exit and reopen)"
echo "2. Verify: Ask Claude 'What skills are available?'"
echo "3. Test: Ask Claude 'Build a user authentication system'"
echo ""
```

Make it executable:
```bash
chmod +x install-star-team.sh
./install-star-team.sh personal
```

---

## ✅ Verification

After installation, verify the skill is loaded:

### Step 1: Check Skill Availability
```
You: What skills are available?

Claude: I have access to the following skills:
- star-team-orchestrator: Full-stack enterprise development team 
  orchestrator. Coordinates Product Manager, Principal Engineer, 
  Backend/Frontend Engineers, DevOps, and QA/Security through a 
  structured workflow with mandatory checkpoints...
```

### Step 2: Test Activation
```
You: Build a simple user authentication API

Claude: I'll use the star-team-orchestrator skill to build this.

[Activates Product Manager role]
Let me start by creating a PRD for the authentication API...

[Then Principal Engineer for architecture approval]
Now I'll design the architecture for this authentication system...

[etc.]
```

---

## 🎯 How It Works

### 1. Single Skill Directory = One Skill

```
~/.claude/skills/star-team/    ← This is ONE skill called "star-team"
```

Claude treats the entire directory as a single skill.

### 2. SKILL.md is the Entry Point

```
SKILL.md                       ← Claude loads THIS first
```

This file contains:
- Skill metadata (name, description)
- Orchestrator logic
- References to role files

### 3. Progressive Disclosure

```
User Request → Claude loads SKILL.md → Determines needed roles → 
Loads only those role files
```

**Example:**
```
User: "Design the architecture for a chat app"

Claude:
1. Loads SKILL.md (orchestrator)
2. Sees request needs: PM (brief) + PE (architecture)
3. Loads: PRINCIPAL-ENGINEER-SKILL.md only
4. Does NOT load: Backend, Frontend, DevOps, QA (not needed)
```

### 4. File References in SKILL.md

The orchestrator references role files like this:

```markdown
## SKILL FILE REFERENCES

| Role | Skill File | When to Load |
|------|------------|--------------|
| Product Manager | [PRODUCT-MANAGER-SKILL.md](PRODUCT-MANAGER-SKILL.md) | When PM activates |
| Principal Engineer | [PRINCIPAL-ENGINEER-SKILL.md](PRINCIPAL-ENGINEER-SKILL.md) | For checkpoints |
```

When Claude needs a role, it uses the `view` tool:
```
view PRINCIPAL-ENGINEER-SKILL.md
```

---

## 🔧 Understanding the Structure

### Why This Structure?

**❌ WRONG Approach: 6 Separate Skills**
```
~/.claude/skills/
├── product-manager/
│   └── SKILL.md
├── principal-engineer/
│   └── SKILL.md
├── backend-engineer/
│   └── SKILL.md
...
```

**Problem:** 
- No coordination between roles
- Claude doesn't know workflow
- No checkpoints enforced
- User has to manually activate each role

**✅ CORRECT Approach: One Skill with Multiple Roles**
```
~/.claude/skills/star-team/
├── SKILL.md                    ← Orchestrator coordinates everything
├── PRODUCT-MANAGER-SKILL.md    ← Role knowledge
├── PRINCIPAL-ENGINEER-SKILL.md ← Role knowledge
...
```

**Benefits:**
- Single activation ("Build X")
- Orchestrator manages workflow
- Checkpoints enforced automatically
- Progressive loading (efficient)

---

## 📖 SKILL.md Anatomy

```markdown
---
name: star-team-orchestrator
description: Full-stack enterprise development team orchestrator...
---

# STAR TEAM ORCHESTRATOR          ← What Claude reads first

## WORKFLOW                        ← Workflow logic

## ROLE ACTIVATION                 ← Decision tree: which roles to use

## SKILL FILE REFERENCES           ← Links to role files
[PRODUCT-MANAGER-SKILL.md](PRODUCT-MANAGER-SKILL.md)
[PRINCIPAL-ENGINEER-SKILL.md](PRINCIPAL-ENGINEER-SKILL.md)
...
```

When Claude sees a file link like `[file.md](file.md)`, it knows:
1. The file exists in the same directory
2. It can use `view file.md` to read it
3. Load it only when needed

---

## 🎭 Role Activation Examples

### Example 1: Full Workflow

```
You: Build a REST API for blog posts

Claude (internally):
1. Read SKILL.md → "build" keyword → full workflow needed
2. Activate PM → view PRODUCT-MANAGER-SKILL.md
3. PM creates PRD
4. Activate PE → view PRINCIPAL-ENGINEER-SKILL.md  
5. PE designs architecture (Checkpoint 1)
6. Activate Backend → view BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md
7. Backend implements
8. Activate QA → view QA-SECURITY-ENGINEER-SKILL.md
9. QA tests
10. Activate PE → PE reviews (Checkpoint 2)
11. Activate DevOps → view DEVOPS-SRE-ENGINEER-SKILL.md
12. DevOps deploys
```

### Example 2: Architecture Only

```
You: Design the architecture for a real-time notification system

Claude (internally):
1. Read SKILL.md → "design architecture" → PM + PE only
2. Activate PM → view PRODUCT-MANAGER-SKILL.md (brief requirements)
3. Activate PE → view PRINCIPAL-ENGINEER-SKILL.md (architecture)
4. STOP (user only asked for design, not implementation)
```

### Example 3: Code Review

```
You: Review this TypeScript code for security issues

Claude (internally):
1. Read SKILL.md → "review" + "security" → PE + QA
2. Activate PE → view PRINCIPAL-ENGINEER-SKILL.md (code review)
3. Activate QA → view QA-SECURITY-ENGINEER-SKILL.md (security audit)
4. STOP (only review requested)
```

---

## 🔄 Update & Maintenance

### Update a Role

```bash
# Edit the specific role file
nano ~/.claude/skills/star-team/BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md

# Restart Claude Code to reload
```

### Update Orchestrator Logic

```bash
# Edit the main SKILL.md
nano ~/.claude/skills/star-team/SKILL.md

# Restart Claude Code
```

### Delete the Skill

```bash
# Remove entire directory
rm -rf ~/.claude/skills/star-team

# Restart Claude Code
```

---

## 🐛 Troubleshooting

### Skill Not Loading

**Check file structure:**
```bash
ls -la ~/.claude/skills/star-team/

# Should see:
# SKILL.md  ← MUST be exactly this name (case-sensitive)
# PRODUCT-MANAGER-SKILL.md
# PRINCIPAL-ENGINEER-SKILL.md
# ...
```

**Check SKILL.md frontmatter:**
```bash
head -10 ~/.claude/skills/star-team/SKILL.md

# First line MUST be:
---
# Then:
name: star-team-orchestrator
description: ...
---
```

**Verify Claude sees it:**
```
You: What skills are available?

Claude: [Should list star-team-orchestrator]
```

### Skill Not Activating

**Problem:** Claude doesn't use the skill when you ask to "build X"

**Solution:** Make request more explicit:
```
❌ "Create an API"
✅ "Build a REST API with authentication"

❌ "Make a UI"
✅ "Build a user interface for the dashboard"
```

The orchestrator description includes keywords:
- "build"
- "develop"  
- "enterprise"
- "feature"
- "comprehensive"

### Role Files Not Loading

**Symptom:** Claude uses orchestrator but doesn't have role details

**Check file links in SKILL.md:**
```markdown
## SKILL FILE REFERENCES

| Role | Skill File |
|------|------------|
| Product Manager | [PRODUCT-MANAGER-SKILL.md](PRODUCT-MANAGER-SKILL.md) |
```

**Verify files exist:**
```bash
ls -la ~/.claude/skills/star-team/*.md
```

All 7 files should be present.

---

## 📊 Skill Size & Performance

### File Sizes

```
SKILL.md (Orchestrator):              ~834 lines    (always loaded)
PRODUCT-MANAGER-SKILL.md:           ~2,907 lines    (on-demand)
PRINCIPAL-ENGINEER-SKILL.md:        ~1,200 lines    (on-demand)
BACKEND-SYSTEM-DESIGN-EXPERT-SKILL: ~1,566 lines    (on-demand)
FRONTEND-UIUX-DESIGNER-SKILL:       ~1,800 lines    (on-demand)
DEVOPS-SRE-ENGINEER-SKILL:          ~1,566 lines    (on-demand)
QA-SECURITY-ENGINEER-SKILL:         ~2,926 lines    (on-demand)
```

### Context Window Management

Claude uses **progressive disclosure**:

1. **At startup:** Load only orchestrator (~834 lines)
2. **When skill activates:** Load orchestrator (~834 lines)
3. **When PM needed:** Load PRODUCT-MANAGER-SKILL.md (~2,907 lines)
4. **When PE needed:** Load PRINCIPAL-ENGINEER-SKILL.md (~1,200 lines)
5. **etc.**

**Not all at once!** This keeps context window usage efficient.

---

## 🎓 Usage Patterns

### Pattern 1: New Feature Development

```
You: Build a user authentication system with OAuth and JWT

Star Team:
✅ PM: Creates PRD (requirements, user stories, metrics)
✅ PE: Designs architecture (CHECKPOINT 1)
✅ Backend: Implements auth APIs
✅ Frontend: Builds login UI
✅ QA: Tests security, writes test suite
✅ PE: Reviews code (CHECKPOINT 2)  
✅ DevOps: Deploys with monitoring
```

### Pattern 2: Architecture Review

```
You: Review the architecture for our microservices migration

Star Team:
✅ PM: Clarifies business requirements
✅ PE: Reviews architecture, provides feedback
(No implementation - only review)
```

### Pattern 3: Code Quality Audit

```
You: Audit this codebase for security and performance issues

Star Team:
✅ PE: Code architecture review
✅ QA: Security audit, performance testing
✅ DevOps: Infrastructure review
(No new development - only audit)
```

### Pattern 4: Deployment Planning

```
You: Plan the deployment strategy for the new API

Star Team:
✅ DevOps: Creates deployment plan
✅ PE: Reviews infrastructure architecture
✅ QA: Defines testing gates
(No code - only planning)
```

---

## 🚀 Advanced Configuration

### Custom Activation Rules

Edit `SKILL.md` to change when the skill activates:

```markdown
---
name: star-team-orchestrator
description: |
  Full-stack enterprise development team orchestrator.
  
  USE WHEN:
  - Building features or applications
  - Designing system architecture
  - Reviewing code or security
  - Planning deployments
  - [ADD YOUR TRIGGER HERE]
---
```

### Add New Roles

1. Create new role file:
```bash
nano ~/.claude/skills/star-team/DATA-ENGINEER-SKILL.md
```

2. Update SKILL.md:
```markdown
## TEAM ROSTER

7. **Data Engineer** - Designs data pipelines, ETL processes

## SKILL FILE REFERENCES

| Data Engineer | [DATA-ENGINEER-SKILL.md](DATA-ENGINEER-SKILL.md) | Data modeling |
```

3. Update workflow if needed

---

## 📚 Additional Resources

### Skill Files in This Package

1. `STAR-TEAM-ORCHESTRATOR-SKILL.md` → Rename to `SKILL.md`
2. `PRODUCT-MANAGER-SKILL.md`
3. `PRINCIPAL-ENGINEER-SKILL.md`
4. `BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md`
5. `FRONTEND-UIUX-DESIGNER-SKILL.md`
6. `DEVOPS-SRE-ENGINEER-SKILL.md`
7. `QA-SECURITY-ENGINEER-SKILL.md`

### Documentation

- [Anthropic Skills Guide](https://code.claude.com/docs/en/skills)
- [Agent Skills Overview](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)
- [Best Practices](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)

---

## 🎉 You're Ready!

After installation:

1. ✅ Restart Claude Code
2. ✅ Verify: "What skills are available?"
3. ✅ Test: "Build a simple REST API"
4. ✅ Watch the Star Team in action!

The team will coordinate automatically, following the enterprise workflow with mandatory checkpoints to ensure quality and security.

---

## 💡 Quick Reference

### File Locations

| Type | Path |
|------|------|
| Personal | `~/.claude/skills/star-team/` |
| Project | `.claude/skills/star-team/` |

### Required Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Orchestrator (required) |
| `*-SKILL.md` | Role knowledge (7 files) |

### Activation Commands

| Want | Say |
|------|-----|
| Full workflow | "Build [feature]" |
| Architecture | "Design architecture for [X]" |
| Review | "Review this code" |
| Deploy | "Deploy [app]" |

---

*Star Team - Enterprise AI Development Team*
*Version 1.0.0*
