# CHRONICLE - Personal Journal Intelligence

## 📋 Overview

Chronicle is a personal journal processing system designed specifically for Prax Lannister. It transforms raw, unorganized thoughts into structured diary entries with psychological analysis, gratitude extraction, health-aware pattern recognition, and actionable insights.

---

## 📁 File Structure

```
chronicle-agent/
├── README.md                          ← You are here
├── prompts/
│   └── 01_MAIN_SYSTEM_PROMPT.md       ← Core system prompt (platform-agnostic)
├── knowledge/
│   ├── PRAX_CONTEXT.md                ← Personal/health context for personalization
│   └── PSYCHOLOGICAL_FRAMEWORKS.md    ← Clinical frameworks reference
├── examples/
│   └── EXAMPLES.md                    ← Sample inputs/outputs for calibration
└── platform-configs/
    └── PLATFORM_CONFIGS.md            ← Platform-specific adaptations
```

---

## 🚀 Quick Setup Guide

### For OpenAI GPTs

1. Go to [ChatGPT](https://chat.openai.com) → Create a GPT
2. **Name:** Chronicle - Journal Intelligence
3. **Instructions:** Copy entire content from `prompts/01_MAIN_SYSTEM_PROMPT.md`
4. **Knowledge:** Upload `knowledge/PRAX_CONTEXT.md`
5. **Conversation Starters:**
   - "Process today's journal"
   - "Here are my rough thoughts for [date]"
   - "Voice memo transcript incoming"
   - "Just need to dump some thoughts"
6. **Capabilities:** All OFF (no browsing, DALL-E, or code interpreter needed)

### For Google Gems

1. Go to [Google AI Studio](https://aistudio.google.com) or Gemini → Create Gem
2. **Name:** Chronicle
3. **Instructions:** Copy content from `prompts/01_MAIN_SYSTEM_PROMPT.md`
4. Add modifications from `platform-configs/PLATFORM_CONFIGS.md` (Gems section)
5. Note: No file upload or persistent memory available

### For Claude Projects

1. Go to [Claude](https://claude.ai) → Create Project
2. **Name:** Chronicle - Prax's Journal System
3. **Custom Instructions:** Copy from `prompts/01_MAIN_SYSTEM_PROMPT.md`
4. **Project Knowledge:** Upload:
   - `knowledge/PRAX_CONTEXT.md`
   - `knowledge/PSYCHOLOGICAL_FRAMEWORKS.md`
5. Add Claude-specific additions from `platform-configs/PLATFORM_CONFIGS.md`

---

## 💡 Usage

### Basic Daily Entry
Just paste your raw thoughts in any format:
- Stream of consciousness
- Bullet points
- Voice memo transcriptions
- Fragmented notes

Chronicle will organize everything while preserving every detail.

### Including Tomorrow's Notes
If you have thoughts about tomorrow, include them - Chronicle will add a dedicated "Tomorrow's Agenda" section.

### Weekly Review Mode (Claude Projects)
Ask: "Can you create a weekly review of these entries?" and paste multiple days.

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| **Zero Omission** | Every detail from your input is preserved |
| **Voice Preservation** | Refined output sounds like you, not a therapist |
| **Multi-Level Analysis** | Light → Medium → Deep psychological insights |
| **Health Awareness** | Flags patterns relevant to your health context |
| **Gratitude Extraction** | Finds things to be grateful for (explicit + implied) |
| **Bridge to Tomorrow** | Carries forward unresolved thoughts + reflection prompts |
| **Crisis Support** | Compassionate handling if severe distress appears |

---

## ⚠️ Important Notes

### What Chronicle Does
- Organizes and structures your thoughts
- Provides psychological pattern analysis
- Suggests actionable micro-steps
- Flags health-relevant patterns
- Maintains your authentic voice

### What Chronicle Does NOT Do
- Replace professional mental health care
- Provide diagnoses
- Suggest medication changes
- Make decisions for you
- Minimize or dismiss your experiences

### When to Seek Professional Help
Chronicle will flag when professional support is recommended, but always trust your own judgment. If you're struggling, please reach out:
- **Dr. Pallavi A. Joshi** (your previous psychiatrist)
- **iCall:** 9152987821
- **Vandrevala Foundation:** 1860-2662-345

---

## 🔄 Updating the System

### When to Update PRAX_CONTEXT.md
- After significant health changes
- After major life events
- When patterns change
- When you start/stop medications
- When you change mental health providers

### When to Update Main Prompt
- If output format isn't working
- If voice doesn't feel right
- If certain sections aren't useful
- To add new sections you want

---

## 📊 Output Structure Reference

```
📔 DIARY ENTRY: [Date]
├── 🗓️ METADATA (date, mood arc, energy, themes)
├── 📝 THE DAY'S NARRATIVE (full organized entry)
├── 🙏 GRATITUDE HARVEST (3-5 items)
├── 💭 DAY IN THREE SENTENCES (essence distillation)
├── 🧠 PSYCHOLOGICAL ANALYSIS
│   ├── Patterns Observed
│   ├── Multi-Level Analysis (Light/Medium/Deep)
│   ├── Health Pattern Flags (if relevant)
│   └── Therapeutic Micro-Actions
├── 🌅 BRIDGE TO TOMORROW
│   ├── Carry Forward
│   ├── Tomorrow's Anchors
│   └── Reflection Prompt
└── 📊 ENTRY METADATA (word counts, completeness check)
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Output too long | Use Gems for quick processing, or request "brief version" |
| Voice feels off | Adjust tone guidance in main prompt |
| Missing details | Verify Zero Omission rule is clearly stated |
| Too clinical | Reduce DEEP analysis, increase conversational warmth |
| Not clinical enough | Explicitly request deeper analysis |
| Health flags everywhere | Calibrate to only flag when genuinely relevant |

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial Chronicle system created |

---

## 🤝 Credits

Created with Claude (Anthropic) for Prax Lannister's personal productivity system.

---

*Remember: The goal isn't perfection. The goal is understanding yourself better, one entry at a time.*
