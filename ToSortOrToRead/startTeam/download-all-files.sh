#!/bin/bash

# Download All Files Script
# For use with curl or wget to download individual files

echo "Star Team - Individual File Download Script"
echo "==========================================="
echo ""

# Base URL (update this with your hosting location)
BASE_URL="https://your-hosting-location.com/star-team"

# Create download directory
DOWNLOAD_DIR="$HOME/Downloads/star-team-files"
mkdir -p "$DOWNLOAD_DIR"
cd "$DOWNLOAD_DIR"

echo "Downloading to: $DOWNLOAD_DIR"
echo ""

# List of files to download
FILES=(
    "00-START-HERE.md"
    "QUICKSTART.md"
    "README-STAR-TEAM-SETUP.md"
    "FILE-STRUCTURE.md"
    "COMPLETE-PACKAGE-SUMMARY.md"
    "INDEX.txt"
    "install-star-team.sh"
    "STAR-TEAM-ORCHESTRATOR-SKILL.md"
    "PRODUCT-MANAGER-SKILL.md"
    "PRINCIPAL-ENGINEER-SKILL.md"
    "BACKEND-SYSTEM-DESIGN-EXPERT-SKILL.md"
    "FRONTEND-UIUX-DESIGNER-SKILL.md"
    "DEVOPS-SRE-ENGINEER-SKILL.md"
    "QA-SECURITY-ENGINEER-SKILL.md"
    "DOWNLOAD-INSTRUCTIONS.md"
)

echo "Downloading 15 files..."
echo ""

# Download each file
DOWNLOADED=0
FAILED=0

for file in "${FILES[@]}"; do
    echo -n "Downloading $file... "
    
    if curl -f -L -o "$file" "$BASE_URL/$file" 2>/dev/null; then
        echo "✓"
        DOWNLOADED=$((DOWNLOADED + 1))
    elif wget -q -O "$file" "$BASE_URL/$file" 2>/dev/null; then
        echo "✓"
        DOWNLOADED=$((DOWNLOADED + 1))
    else
        echo "✗ FAILED"
        FAILED=$((FAILED + 1))
    fi
done

echo ""
echo "==========================================="
echo "Download complete!"
echo "✓ Downloaded: $DOWNLOADED files"
echo "✗ Failed: $FAILED files"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "All files downloaded successfully! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Make installer executable: chmod +x install-star-team.sh"
    echo "2. Run installer: ./install-star-team.sh personal"
    echo "3. Restart Claude Code"
else
    echo "Some files failed to download."
    echo "Please check your internet connection and BASE_URL in this script."
fi

echo ""
echo "Files are in: $DOWNLOAD_DIR"
