#!/bin/bash

# Star Team Installation Script
# Installs the complete Star Team skill system for Claude Code
# Usage: ./install-star-team.sh [personal|project]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default to personal installation
INSTALL_TYPE=${1:-personal}

# Determine installation directory
if [ "$INSTALL_TYPE" = "personal" ]; then
    SKILL_DIR="$HOME/.claude/skills/star-team"
    SCOPE="PERSONAL (available in all projects)"
elif [ "$INSTALL_TYPE" = "project" ]; then
    SKILL_DIR=".claude/skills/star-team"
    SCOPE="PROJECT (only in this directory)"
else
    echo -e "${RED}Error: Invalid install type${NC}"
    echo "Usage: $0 [personal|project]"
    echo "  personal - Install for all projects (default)"
    echo "  project  - Install only for current project"
    exit 1
fi

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Star Team Installation Script      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Installation type:${NC} $SCOPE"
echo -e "${YELLOW}Target directory:${NC} $SKILL_DIR"
echo ""

# Check if directory already exists
if [ -d "$SKILL_DIR" ]; then
    echo -e "${YELLOW}⚠️  Warning: Skill directory already exists${NC}"
    read -p "Overwrite existing installation? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Installation cancelled${NC}"
        exit 1
    fi
    echo -e "${YELLOW}Removing existing installation...${NC}"
    rm -rf "$SKILL_DIR"
fi

# Create directory
echo -e "${BLUE}Creating skill directory...${NC}"
mkdir -p "$SKILL_DIR"

# Required files
REQUIRED_FILES=(
    "STAR-TEAM-ORCHESTRATOR-SKILL.md"
    "PRODUCT-MANAGER-SKILL.md"
    "PRINCIPAL-ENGINEER-SKILL.md"
    "BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md"
    "FRONTEND-UIUX-DESIGNER-SKILL.md"
    "DEVOPS-SRE-ENGINEER-SKILL.md"
    "QA-SECURITY-ENGINEER-SKILL.md"
)

# Check if all required files exist
echo -e "${BLUE}Checking required files...${NC}"
MISSING_FILES=0
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}✗ Missing: $file${NC}"
        MISSING_FILES=$((MISSING_FILES + 1))
    else
        echo -e "${GREEN}✓ Found: $file${NC}"
    fi
done

if [ $MISSING_FILES -gt 0 ]; then
    echo ""
    echo -e "${RED}Error: $MISSING_FILES required file(s) missing${NC}"
    echo "Please ensure all Star Team skill files are in the current directory"
    exit 1
fi

echo ""
echo -e "${BLUE}Installing Star Team...${NC}"

# Copy orchestrator as SKILL.md (required name)
echo -e "${YELLOW}→${NC} Installing orchestrator (SKILL.md)..."
cp STAR-TEAM-ORCHESTRATOR-SKILL.md "$SKILL_DIR/SKILL.md"

# Copy all role files
echo -e "${YELLOW}→${NC} Installing Product Manager role..."
cp PRODUCT-MANAGER-SKILL.md "$SKILL_DIR/"

echo -e "${YELLOW}→${NC} Installing Principal Engineer role..."
cp PRINCIPAL-ENGINEER-SKILL.md "$SKILL_DIR/"

echo -e "${YELLOW}→${NC} Installing Backend Engineer role..."
cp BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md "$SKILL_DIR/"

echo -e "${YELLOW}→${NC} Installing Frontend Engineer role..."
cp FRONTEND-UIUX-DESIGNER-SKILL.md "$SKILL_DIR/"

echo -e "${YELLOW}→${NC} Installing DevOps Engineer role..."
cp DEVOPS-SRE-ENGINEER-SKILL.md "$SKILL_DIR/"

echo -e "${YELLOW}→${NC} Installing QA/Security Engineer role..."
cp QA-SECURITY-ENGINEER-SKILL.md "$SKILL_DIR/"

# Copy README if exists
if [ -f "README-STAR-TEAM-SETUP.md" ]; then
    echo -e "${YELLOW}→${NC} Installing documentation..."
    cp README-STAR-TEAM-SETUP.md "$SKILL_DIR/README.md"
fi

# Verify installation
echo ""
echo -e "${BLUE}Verifying installation...${NC}"
FILE_COUNT=$(ls -1 "$SKILL_DIR"/*.md 2>/dev/null | wc -l)

if [ "$FILE_COUNT" -ge 7 ]; then
    echo -e "${GREEN}✓ All files installed successfully${NC}"
else
    echo -e "${RED}✗ Installation incomplete ($FILE_COUNT/7+ files)${NC}"
    exit 1
fi

# Show installed files
echo ""
echo -e "${BLUE}Installed files:${NC}"
ls -lh "$SKILL_DIR"/*.md | awk '{printf "  %s %s\n", $9, $5}'

# Calculate total size
TOTAL_SIZE=$(du -sh "$SKILL_DIR" | awk '{print $1}')
echo ""
echo -e "${YELLOW}Total size:${NC} $TOTAL_SIZE"

# Success message
echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✓ Installation Completed! 🎉         ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📍 Installation location:${NC}"
echo "   $SKILL_DIR"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo ""
echo -e "  1. ${BLUE}Restart Claude Code${NC}"
echo "     Exit and reopen Claude Code to load the skill"
echo ""
echo -e "  2. ${BLUE}Verify installation${NC}"
echo "     Ask Claude: 'What skills are available?'"
echo "     You should see 'star-team-orchestrator' in the list"
echo ""
echo -e "  3. ${BLUE}Test the skill${NC}"
echo "     Try: 'Build a REST API for user authentication'"
echo "     The Star Team will activate and coordinate all roles"
echo ""
echo -e "${GREEN}The Star Team is ready to help you build enterprise software! 🚀${NC}"
echo ""

# Project-specific instructions
if [ "$INSTALL_TYPE" = "project" ]; then
    echo -e "${YELLOW}💡 Tip for project installation:${NC}"
    echo "   Add to version control to share with your team:"
    echo "   git add .claude/skills/star-team/"
    echo "   git commit -m 'Add Star Team skill system'"
    echo ""
fi

exit 0
