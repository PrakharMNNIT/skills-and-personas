# LECTURE ALCHEMIST - Technical Learning Transformer

## 📋 Overview

Lecture Alchemist transforms raw Zoom lecture transcripts into structured, retention-optimized study materials. Designed for Prax's cohort course learning across WebDev, AI/ML, Web3, and DSA.

---

## 🎯 What It Does

| Input | Output |
|-------|--------|
| Messy transcript with filler words | Clean, structured notes |
| Scattered topics | Hierarchical taxonomy |
| Unclear explanations | Enhanced intuition builders |
| Dictated code (with errors) | Clean, commented code |
| Fast-paced lecture | Actionable study materials |

---

## 📁 File Structure

```
lecture-alchemist/
├── README.md                          ← You are here
├── prompts/
│   └── 01_MAIN_SYSTEM_PROMPT.md       ← Core system prompt
├── knowledge/
│   └── DOMAIN_KNOWLEDGE.md            ← Domain-specific handling
├── examples/
│   └── EXAMPLES.md                    ← Sample transformations
└── platform-configs/
    └── PLATFORM_CONFIGS.md            ← Platform-specific tweaks
```

---

## 🚀 Quick Setup

### For Claude Projects (Recommended)

1. Create new Project in [Claude](https://claude.ai)
2. **Name:** Lecture Alchemist
3. **Custom Instructions:** Copy from `prompts/01_MAIN_SYSTEM_PROMPT.md`
4. **Project Knowledge:** Upload `knowledge/DOMAIN_KNOWLEDGE.md`

### For OpenAI GPTs

1. Create GPT at [ChatGPT](https://chat.openai.com)
2. **Instructions:** Copy from `prompts/01_MAIN_SYSTEM_PROMPT.md`
3. **Knowledge:** Upload `knowledge/DOMAIN_KNOWLEDGE.md`

---

## 💡 How to Use

### Step 1: Prepare Your Input
```
Course: 100xDevs Cohort 3
Domain: WebDev
Session: Week 8, Day 1 - React Hooks
Instructor: Harkirat Singh
Date: January 25, 2026

---

[Paste your transcript here]
```

### Step 2: Let It Process
The agent will produce structured notes with:
- Complete topic hierarchy
- Cleaned code snippets
- Intuition builders for difficult concepts
- Domain-specific technical analysis
- Action items and flashcards

### Step 3: Review & Store
- Save processed notes for revision
- Use flashcards for spaced repetition
- Follow action items for practice

---

## 📚 Supported Domains

| Domain | Special Features |
|--------|------------------|
| **WebDev** | Component patterns, API design, deployment notes |
| **AI/ML** | Math intuition, hyperparameters, model selection |
| **Web3** | Security analysis, gas optimization, audit checklist |
| **DSA** | Complexity analysis, pattern recognition, interview tips |

---

## 🎨 Output Sections

```
📋 METADATA           - Course, session, prerequisites
🎯 SESSION OVERVIEW   - Key takeaways, difficulty
📑 TOPIC HIERARCHY    - Complete taxonomy
📖 DETAILED BREAKDOWN - Each concept explained
💻 CODE ARTIFACTS     - All code, cleaned and commented
🧠 INTUITION BUILDERS - Enhanced explanations
🔬 TECHNICAL ANALYSIS - Domain-specific deep dive
🔗 CONNECTIONS MAP    - Prerequisites and next steps
⚠️ KNOWLEDGE GAPS     - What was skipped
❓ Q&A EXTRACTED      - Questions from class
✅ ACTION ITEMS       - Homework and practice
🃏 FLASHCARDS         - Ready for Anki
📝 SUMMARIES          - One-liner to detailed
```

---

## 🔧 Tips for Best Results

### Getting Good Transcripts

**Best:** Otter.ai, Descript, or Zoom's built-in transcription

**Tips:**
- Edit out long silences/breaks
- Mark speaker changes if possible
- Note timestamps for reference

### Handling Long Lectures

**For Claude Projects:** Paste the entire transcript - it handles 200K tokens

**For GPT/Gems:** Split by topic breaks or every 30 minutes

### Improving Code Extraction

If code is mangled in transcription:
- Mark code sections with `[CODE START]` and `[CODE END]`
- Or provide screenshots of code separately
- Ask for a second pass on code-heavy sections

---

## 🔄 Workflow Integration

### Weekly Routine

```
1. Attend lecture → Download transcript
2. Feed to Lecture Alchemist → Get structured notes
3. Review notes same day → Flag unclear areas
4. Use flashcards → Daily spaced repetition
5. Complete action items → Hands-on practice
6. Weekly: Review all notes → Identify patterns
```

### With Chronicle (Your Journal Agent)

After processing a difficult lecture:
> "Today's AI/ML lecture on backpropagation was rough. The math 
> went over my head but Lecture Alchemist gave me better intuition..."

Chronicle will note learning patterns over time.

---

## ⚠️ Limitations

- **Not real-time:** Works on transcripts, not live audio
- **Code reconstruction:** Dictated code may need manual verification
- **Visual content:** Cannot process diagrams instructor drew
- **Platform limits:** Gems/GPT may truncate very long transcripts

---

## 📊 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial release |

---

*Transform passive watching into active learning. One transcript at a time.*
