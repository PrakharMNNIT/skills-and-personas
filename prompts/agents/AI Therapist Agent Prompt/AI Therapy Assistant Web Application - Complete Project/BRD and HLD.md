# AI Therapy Assistant Web Application - Complete Project Documentation

---

## BUSINESS REQUIREMENTS DOCUMENT (BRD)

### 1. Executive Summary

**Project Name:** MindFlow - AI Therapy Assistant Web Application

**Purpose:** Create a browser-based, local-storage-powered web application that enables users to engage with an AI therapeutic agent (Dr. Alex Morgan) while maintaining comprehensive clinical documentation, session tracking, and progress monitoring entirely on the client side.

**Target Users:**
- Individuals seeking mental health support for MDD, ADHD, anxiety, and executive dysfunction
- People who prefer privacy-first solutions (no server storage)
- Users comfortable with self-directed therapeutic tools

**Key Value Propositions:**
1. **Privacy-First:** All data stored locally in browser, no server transmission
2. **Comprehensive Tracking:** Clinical file system that updates with each session
3. **Evidence-Based:** Implements validated therapeutic approaches and screening tools
4. **Accessible:** Free, browser-based, no installation required
5. **Portable:** Export/download clinical files and treatment plans

---

### 2. Business Objectives

**Primary Goals:**
1. Provide accessible mental health support through AI-powered therapy
2. Maintain clinical documentation standards comparable to professional practice
3. Enable users to track their mental health journey comprehensively
4. Ensure complete data privacy through local-only storage
5. Generate exportable treatment plans and daily exercises

**Success Metrics:**
- User engagement time (avg. 30-45 min per session)
- Session completion rate (>80%)
- Clinical file documentation completeness (>90% of fields populated by session 4)
- User-reported helpfulness (qualitative feedback)
- Export/download usage (indicator of value)

**Out of Scope (v1.0):**
- Server-side storage or cloud sync
- Multi-device synchronization
- Real-time crisis intervention (includes disclaimers and emergency resources)
- Integration with external health records
- Video/voice sessions (text-only)
- Payment/subscription systems

---

### 3. Functional Requirements

#### 3.1 Core Features

**F1: AI Therapy Chat Interface**
- **F1.1** Real-time chat with AI therapist (Dr. Alex Morgan)
- **F1.2** Context-aware responses based on clinical file
- **F1.3** Support for multi-turn conversations
- **F1.4** Markdown rendering for formatted responses
- **F1.5** Typing indicators and smooth UX

**F2: Clinical File Management**
- **F2.1** Automatic creation of clinical file template on first session
- **F2.2** Real-time updates to clinical file during conversation
- **F2.3** Persistent storage using browser localStorage
- **F2.4** Multiple client profiles support (for therapists or families)
- **F2.5** View, edit, and export clinical files

**F3: Intake Process Options**
- **F3.1** Three intake pathways:
  - Crisis/Immediate Support
  - Brief Introduction
  - Structured Comprehensive Assessment
- **F3.2** User chooses preferred approach at start
- **F3.3** Ability to switch approaches mid-treatment

**F4: Validated Screening Tools**
- **F4.1** PHQ-9 (Depression) administration and scoring
- **F4.2** GAD-7 (Anxiety) administration and scoring
- **F4.3** ASRS v1.1 (ADHD) administration and scoring
- **F4.4** C-SSRS (Suicide Risk) when indicated
- **F4.5** Automated score calculation and interpretation
- **F4.6** Visual progress charts over time

**F5: Session Tracking**
- **F5.1** Numbered session logs with timestamps
- **F5.2** Session summary generation
- **F5.3** Homework/experiment tracking
- **F5.4** Mood and symptom ratings per session
- **F5.5** Progress visualization (charts/graphs)

**F6: Treatment Planning**
- **F6.1** Goal setting interface
- **F6.2** Progress tracking toward goals
- **F6.3** Intervention/skill library
- **F6.4** Customized treatment plan generation

**F7: Export & Download**
- **F7.1** Download complete clinical file (PDF/Word/Markdown)
- **F7.2** Export session-specific treatment plan
- **F7.3** Generate daily practice exercises PDF
- **F7.4** Export screening score reports
- **F7.5** Print-friendly formats

**F8: Safety Features**
- **F8.1** Automatic suicide risk detection in chat
- **F8.2** Crisis resource display when risk detected
- **F8.3** Safety plan creation and storage
- **F8.4** Emergency contact information prominent display

---

#### 3.2 User Workflows

**Workflow 1: New User - First Session**
```
1. User lands on homepage
2. Welcome screen explains the app and privacy features
3. User creates profile (name optional, can be anonymous)
4. Disclaimers and informed consent displayed
5. User agrees to terms
6. AI presents three intake approach options
7. User chooses approach
8. Clinical file template created automatically
9. Therapy session begins
10. Clinical file updates in real-time
11. Session ends with summary and homework
12. User can download session summary
```

**Workflow 2: Returning User - Ongoing Session**
```
1. User returns to app
2. Profile auto-loads from localStorage
3. Dashboard shows:
   - Last session summary
   - Current goals and progress
   - Upcoming homework review
   - Quick stats (mood trend, days since last session)
4. User clicks "Start New Session"
5. AI loads context from clinical file
6. Session continues with check-in
7. Previous homework reviewed
8. Therapeutic work conducted
9. New homework assigned
10. Clinical file updated
11. Session summary and export options available
```

**Workflow 3: Viewing Progress & Exporting**
```
1. User navigates to "My Progress" section
2. Views:
   - Clinical file (full document)
   - Screening score trends (charts)
   - Goal progress
   - Session history
3. User clicks "Export Clinical File"
4. Chooses format (PDF, Markdown, Word)
5. File downloads to device
6. User can also export specific sections (e.g., just session notes)
```

**Workflow 4: Administering Screening Tool**
```
1. During session, AI suggests screener (or user requests)
2. User agrees to take screener
3. Questionnaire UI displays (one question at a time or all at once)
4. User answers all questions
5. Score calculated automatically
6. AI interprets score and discusses with user
7. Score logged in clinical file
8. Visual added to progress chart
```

---

### 4. Non-Functional Requirements

**NFR1: Performance**
- Page load time: <2 seconds
- Chat response time: <1 second (AI API dependent)
- Clinical file save time: <500ms
- Export generation: <5 seconds for full file

**NFR2: Privacy & Security**
- 100% client-side data storage (no server transmission except AI API)
- localStorage encryption option
- Clear data deletion functionality
- No analytics or tracking without explicit consent
- GDPR/HIPAA-aware design (though not formally compliant without server controls)

**NFR3: Accessibility**
- WCAG 2.1 AA compliance
- Screen reader compatible
- Keyboard navigation support
- High contrast mode
- Adjustable font sizes

**NFR4: Browser Compatibility**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (responsive design)

**NFR5: Data Persistence**
- localStorage capacity: ~10MB per domain (sufficient for extensive clinical files)
- Backup/restore functionality
- Data export before browser cache clear
- Warning when localStorage nearing capacity

**NFR6: Usability**
- Intuitive navigation (max 3 clicks to any feature)
- Consistent UI patterns
- Clear labeling and instructions
- Minimal learning curve
- Calming, professional aesthetic

**NFR7: Maintainability**
- Modular code architecture
- Comprehensive documentation
- Version control with Git
- Automated testing coverage >80%

---

### 5. UI/UX Requirements

**Visual Design Principles:**
1. **Calming Color Palette:**
   - Primary: Soft blues (#4A90E2, #7AB8F5)
   - Secondary: Gentle greens (#66BB6A, #A5D6A7)
   - Neutrals: Warm grays (#F5F5F5, #E0E0E0, #616161)
   - Accents: Muted purple (#9575CD) for highlights
   - Backgrounds: Off-white (#FAFAFA)

2. **Typography:**
   - Headers: Clean sans-serif (Inter, Roboto)
   - Body text: Readable serif or sans (Merriweather, Open Sans)
   - Font sizes: 16px minimum for body text
   - Line height: 1.6 for readability

3. **Layout:**
   - Clean, uncluttered interface
   - Generous white space
   - Card-based components
   - Responsive grid system
   - Mobile-first design

4. **Interaction:**
   - Smooth transitions (300ms)
   - Subtle animations
   - Clear affordances (buttons, links)
   - Loading states
   - Success/error feedback

**Key Screens:**
1. Landing/Welcome
2. Intake Choice Selection
3. Chat Interface (primary screen)
4. Clinical File Viewer
5. Progress Dashboard
6. Screening Tool Administrator
7. Settings/Profile
8. Export Center

---

### 6. Technical Constraints

**TC1: AI Model Integration**
- Requires API access to Claude API (Anthropic) or equivalent LLM
- API costs must be considered (user-paid or sponsored)
- Rate limiting considerations
- Fallback for API unavailability

**TC2: Browser Storage Limits**
- localStorage typically 5-10MB per origin
- Must handle storage quota exceeded errors
- Need compression for large clinical files

**TC3: No Server Backend (v1.0)**
- All processing client-side
- No user authentication (relies on browser persistence)
- No cross-device sync
- No cloud backup

**TC4: Offline Functionality**
- Limited offline support (PWA features)
- Cannot conduct AI sessions offline
- Can view stored clinical files offline

---

### 7. Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| User loses data (browser cache clear) | High | Medium | Frequent export prompts, backup reminders, export on each session |
| AI gives inappropriate advice | High | Low | Extensive prompt engineering, safety protocols, disclaimers |
| localStorage quota exceeded | Medium | Low | Compression, pagination, old session archiving |
| API costs too high | Medium | Medium | Rate limiting, session length caps, explore self-hosted models |
| User in crisis not properly supported | High | Medium | Clear crisis protocols, emergency resources prominent, C-SSRS implementation |
| Privacy breach (data leakage) | High | Low | Client-side only, no analytics, clear privacy policy |
| Browser compatibility issues | Low | Medium | Progressive enhancement, polyfills, testing |

---

### 8. Success Criteria & KPIs

**Launch Criteria (v1.0):**
- [ ] All core features (F1-F8) functional
- [ ] Clinical file system fully operational
- [ ] All four screening tools implemented and validated
- [ ] Export functionality working for all formats
- [ ] Mobile responsive design complete
- [ ] Safety features tested and verified
- [ ] Documentation complete (user guide, privacy policy)
- [ ] Accessibility audit passed
- [ ] Cross-browser testing complete

**Post-Launch KPIs:**
1. **User Engagement:**
   - Average session duration
   - Sessions per user
   - Return rate (7-day, 30-day)

2. **Feature Usage:**
   - Intake approach distribution
   - Screener completion rates
   - Export/download frequency
   - Clinical file completeness

3. **Quality Metrics:**
   - Error rates
   - API response times
   - localStorage performance
   - Crash/bug reports

4. **User Satisfaction:**
   - Qualitative feedback
   - Feature requests
   - Net Promoter Score (if collected)

---

### 9. Future Enhancements (Post v1.0)

**Phase 2 Features:**
- Cloud sync option (with encryption)
- Multi-device support
- Shareable progress reports (for real therapist)
- Voice input/output
- More screening tools (BDI-II, DASS-21, etc.)
- Medication tracking
- Appointment reminders
- Journaling integration

**Phase 3 Features:**
- Therapist collaboration mode (connect with real therapist)
- Group support features
- AI-generated insights and pattern recognition
- Predictive analytics for relapse prevention
- Integration with wearables (sleep, activity tracking)

---

## HIGH-LEVEL DESIGN (HLD)

### 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                           │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    FRONTEND APPLICATION                      │ │
│  │                     (React + TypeScript)                     │ │
│  │                                                               │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │   Chat UI    │  │  Clinical    │  │    Progress      │  │ │
│  │  │  Component   │  │  File Viewer │  │    Dashboard     │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  │                                                               │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │  Screening   │  │   Export     │  │     Settings     │  │ │
│  │  │    Tools     │  │   Center     │  │                  │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  │                                                               │ │
│  └───────────────────────────┬───────────────────────────────┘ │
│                               │                                   │
│  ┌────────────────────────────▼──────────────────────────────┐ │
│  │                   STATE MANAGEMENT                          │ │
│  │                   (Zustand / Redux)                         │ │
│  │                                                              │ │
│  │  - Clinical File State                                      │ │
│  │  - Session State                                            │ │
│  │  - User Profile State                                       │ │
│  │  - UI State                                                 │ │
│  └────────────────────────────┬──────────────────────────────┘ │
│                               │                                   │
│  ┌────────────────────────────▼──────────────────────────────┐ │
│  │                   SERVICE LAYER                             │ │
│  │                                                              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │ │
│  │  │   Storage    │  │      AI      │  │     Export      │  │ │
│  │  │   Service    │  │   Service    │  │     Service     │  │ │
│  │  │ (localStorage│  │  (API calls) │  │  (PDF/MD gen)   │  │ │
│  │  └──────────────┘  └──────────────┘  └─────────────────┘  │ │
│  │                                                              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │ │
│  │  │  Screening   │  │    Safety    │  │   Clinical      │  │ │
│  │  │   Service    │  │   Service    │  │File Generator   │  │ │
│  │  └──────────────┘  └──────────────┘  └─────────────────┘  │ │
│  └────────────────────────────┬──────────────────────────────┘ │
│                               │                                   │
│  ┌────────────────────────────▼──────────────────────────────┐ │
│  │                  DATA PERSISTENCE LAYER                     │ │
│  │                                                              │ │
│  │           Browser localStorage (IndexedDB backup)           │ │
│  │                                                              │ │
│  │  - Clinical Files JSON                                      │ │
│  │  - Session History                                          │ │
│  │  - User Preferences                                         │ │
│  │  - Screening Scores                                         │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└───────────────────────────────┬───────────────────────────────────┘
                                │
                                │ HTTPS
                                ▼
                    ┌──────────────────────┐
                    │   ANTHROPIC API      │
                    │   (Claude AI)        │
                    │                      │
                    │  - Chat completions  │
                    │  - Context-aware     │
                    │    responses         │
                    └──────────────────────┘
```

---

### 2. Technology Stack Recommendations

#### Frontend Framework: **React 18+ with TypeScript**

**Rationale:**
- Component-based architecture perfect for modular UI
- Strong TypeScript support for type safety
- Large ecosystem and community
- Excellent performance with React 18 features
- Rich library ecosystem

**Alternatives Considered:**
- Vue 3: Good, but smaller ecosystem
- Svelte: Excellent performance, but smaller community
- Solid.js: Emerging, less mature tooling

#### State Management: **Zustand**

**Rationale:**
- Lightweight and simple API
- No boilerplate compared to Redux
- Built-in TypeScript support
- Perfect for localStorage persistence
- Excellent devtools

**Alternatives Considered:**
- Redux Toolkit: More verbose, overkill for this app
- Jotai: Good, but less mature
- Context API: Insufficient for complex state

#### Styling: **Tailwind CSS + shadcn/ui**

**Rationale:**
- Rapid UI development
- Consistent design system
- shadcn/ui provides beautiful, accessible components
- Easy theming and customization
- Excellent mobile-first approach

**Alternatives Considered:**
- Material-UI: Too opinionated, harder to customize
- Chakra UI: Good, but heavier bundle size
- Pure CSS/SCSS: Too much manual work

#### Build Tool: **Vite**

**Rationale:**
- Lightning-fast dev server
- Optimized production builds
- Excellent TypeScript support
- Modern, future-proof
- Great developer experience

**Alternatives Considered:**
- Create React App: Slower, being deprecated
- Next.js: Overkill for client-only app
- Webpack: More complex configuration

#### AI Integration: **Anthropic Claude API (via SDK)**

**Rationale:**
- Excellent for therapeutic conversations
- Long context window (200K tokens)
- Strong instruction following
- Ethical AI company
- Good safety features

**Alternatives Considered:**
- OpenAI GPT-4: Good, but more expensive
- Open-source models (Llama 3): Need hosting, less capable
- Google Gemini: Less proven for therapy use case

#### Export/PDF Generation: **jsPDF + html2canvas**

**Rationale:**
- Pure client-side PDF generation
- Good formatting control
- Can render HTML to PDF
- Active maintenance

**Alternatives Considered:**
- pdfmake: More complex API
- react-pdf: Good for viewing, less for generation
- Print CSS: Limited formatting control

#### Data Persistence: **localStorage + IndexedDB (via localforage)**

**Rationale:**
- localStorage: Simple, synchronous, sufficient for text data
- IndexedDB: For larger data, binary files
- localforage: Clean API over IndexedDB
- No server needed

**Alternatives Considered:**
- Server-side storage: Against privacy-first principle
- Session storage: Doesn't persist across sessions

#### Testing: **Vitest + React Testing Library + Playwright**

**Rationale:**
- Vitest: Fast, Vite-native unit testing
- RTL: Best practices for React testing
- Playwright: Reliable E2E testing
- Full coverage capabilities

#### Additional Libraries:

| Purpose | Library | Version |
|---------|---------|---------|
| Date handling | date-fns | ^3.0.0 |
| Markdown rendering | react-markdown | ^9.0.0 |
| Charts/graphs | recharts | ^2.10.0 |
| Form handling | react-hook-form | ^7.50.0 |
| Icons | lucide-react | ^0.300.0 |
| Animations | framer-motion | ^11.0.0 |
| Copy to clipboard | react-copy-to-clipboard | ^5.1.0 |
| File download | file-saver | ^2.0.5 |
| Unique IDs | uuid | ^9.0.0 |

---

### 3. Component Architecture

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatInterface.tsx          # Main chat container
│   │   ├── ChatMessage.tsx            # Individual message bubble
│   │   ├── ChatInput.tsx              # Message input box
│   │   ├── TypingIndicator.tsx        # AI typing animation
│   │   └── ChatHistory.tsx            # Session history sidebar
│   ├── clinical-file/
│   │   ├── ClinicalFileViewer.tsx     # Full file display
│   │   ├── ClinicalFileSummary.tsx    # Quick overview card
│   │   ├── SectionEditor.tsx          # Edit specific sections
│   │   └── ProgressCharts.tsx         # Visual progress displays
│   ├── screening/
│   │   ├── ScreeningTool.tsx          # Generic screener container
│   │   ├── PHQ9.tsx                   # Depression screener
│   │   ├── GAD7.tsx                   # Anxiety screener
│   │   ├── ASRS.tsx                   # ADHD screener
│   │   ├── CSSRS.tsx                  # Suicide risk screener
│   │   └── ScoreDisplay.tsx           # Score visualization
│   ├── dashboard/
│   │   ├── Dashboard.tsx              # Main dashboard
│   │   ├── StatsCard.tsx              # Stat display cards
│   │   ├── GoalTracker.tsx            # Goals progress
│   │   └── RecentSessions.tsx         # Session list
│   ├── export/
│   │   ├── ExportCenter.tsx           # Export hub
│   │   ├── PDFGenerator.tsx           # PDF creation
│   │   ├── MarkdownExporter.tsx       # MD export
│   │   └── SessionSummary.tsx         # Single session export
│   ├── intake/
│   │   ├── IntakeSelection.tsx        # Choose approach
│   │   ├── CrisisIntake.tsx           # Crisis pathway
│   │   ├── BriefIntake.tsx            # Brief pathway
│   │   └── StructuredIntake.tsx       # Full pathway
│   ├── safety/
│   │   ├── CrisisResources.tsx        # Emergency contacts
│   │   ├── SafetyPlan.tsx             # Safety plan display/edit
│   │   └── RiskAlert.tsx              # Risk warning modal
│   ├── layout/
│   │   ├── Header.tsx                 # Top navigation
│   │   ├── Sidebar.tsx                # Side navigation
│   │   ├── Footer.tsx                 # Footer
│   │   └── Layout.tsx                 # Overall layout wrapper
│   └── ui/                            # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── textarea.tsx
│       └── ... (other shadcn components)
├── services/
│   ├── ai.service.ts                  # AI API integration
│   ├── storage.service.ts             # localStorage operations
│   ├── clinical-file.service.ts       # Clinical file CRUD
│   ├── screening.service.ts           # Screener logic & scoring
│   ├── export.service.ts              # Export generation
│   ├── safety.service.ts              # Safety checks
│   └── session.service.ts             # Session management
├── stores/
│   ├── clinicalFileStore.ts           # Clinical file state
│   ├── sessionStore.ts                # Current session state
│   ├── userStore.ts                   # User profile state
│   └── uiStore.ts                     # UI state (modals, etc.)
├── types/
│   ├── clinical-file.types.ts         # Clinical file interfaces
│   ├── screening.types.ts             # Screening tool types
│   ├── session.types.ts               # Session types
│   └── api.types.ts                   # API request/response types
├── utils/
│   ├── scoring.utils.ts               # Screener scoring logic
│   ├── date.utils.ts                  # Date formatting
│   ├── export.utils.ts                # Export helpers
│   ├── validation.utils.ts            # Input validation
│   └── constants.ts                   # App constants
├── hooks/
│   ├── useLocalStorage.ts             # localStorage hook
│   ├── useClinicalFile.ts             # Clinical file operations
│   ├── useScreening.ts                # Screening administration
│   └── useSession.ts                  # Session management
├── config/
│   ├── prompt.config.ts               # AI system prompt
│   ├── screening.config.ts            # Screening tool configs
│   └── app.config.ts                  # App configuration
├── App.tsx                            # Root component
├── main.tsx                           # Entry point
└── index.css                          # Global styles (Tailwind)
```

---

### 4. Data Models

#### Clinical File Structure (TypeScript Interface)

```typescript
interface ClinicalFile {
  id: string;
  clientName: string;
  createdAt: Date;
  lastUpdated: Date;

  identification: {
    name: string;
    age?: number;
    gender?: string;
    location?: string;
    pronouns?: string;
    emergencyContact?: string;
    howFound?: string;
  };

  intakeStatus: {
    approachChosen: 'crisis-first' | 'brief' | 'structured' | 'ongoing';
    completionStatus: 'not-started' | 'in-progress' | 'completed';
    componentsCompleted: {
      chiefComplaint: boolean;
      phq9: boolean;
      gad7: boolean;
      asrs: boolean;
      cssrs: boolean;
      psychiatricHistory: boolean;
      medicalHistory: boolean;
      developmentalHistory: boolean;
      occupationalHistory: boolean;
      socialHistory: boolean;
      functionalAssessment: boolean;
      stressorsIdentified: boolean;
      strengthsIdentified: boolean;
      crisisPlanCreated: boolean;
      goalsEstablished: boolean;
    };
  };

  presentingProblems: {
    chiefComplaints: string[];
    symptoms: {
      depression: SymptomRatings;
      anxiety: SymptomRatings;
      adhd: SymptomRatings;
      other: Record<string, number>;
    };
    timeline: {
      onset: string;
      course: 'progressive' | 'episodic' | 'stable';
      triggers: string[];
      currentSeverity: 'mild' | 'moderate' | 'severe';
    };
  };

  screeningScores: {
    phq9: ScreeningScore[];
    gad7: ScreeningScore[];
    asrs: ScreeningScore[];
    cssrs: CSSRSScore[];
  };

  diagnosticImpressions: {
    primary?: string;
    secondary?: string;
    additional?: string[];
    differentialConsiderations: string[];
    assessmentStatus: string[];
  };

  history: {
    psychiatric: PsychiatricHistory;
    medical: MedicalHistory;
    developmental: DevelopmentalHistory;
    occupational: OccupationalHistory;
    social: SocialHistory;
  };

  safetyAssessment: {
    currentRisk: 'none' | 'low' | 'moderate' | 'high';
    riskFactors: string[];
    protectiveFactors: string[];
    cssrsSummary?: string;
    crisisPlan?: CrisisPlan;
  };

  treatmentPlan: {
    phase: 'stabilization' | 'skill-building' | 'integration' | 'maintenance';
    primaryApproach: string;
    sessionFrequency: 'weekly' | 'biweekly' | 'monthly';
    shortTermGoals: Goal[];
    longTermGoals: Goal[];
    interventions: string[];
    referrals: Referral[];
  };

  sessions: Session[];

  progressTracking: {
    overallProgress: 'not-improving' | 'minimal' | 'moderate' | 'significant';
    symptomTrends: {
      phq9: number[];
      gad7: number[];
    };
    functionalImprovement: Record<string, string>;
    goalAchievement: Record<string, number>;
    skillsMastered: string[];
    skillsInProgress: string[];
  };

  notes: {
    whatsWorking: string[];
    whatsNotWorking: string[];
    adjustmentsNeeded: string[];
    barriersToProgress: string[];
    consultationNotes: string[];
  };

  nextSteps: {
    todoNextSession: string[];
    clinicalQuestions: string[];
    redFlags: string[];
    upcomingMilestones: string[];
  };
}
```

#### Session Structure

```typescript
interface Session {
  id: string;
  sessionNumber: number;
  date: Date;
  duration: number; // minutes
  type: 'regular' | 'crisis' | 'assessment' | 'check-in';

  presentation: {
    mood: number; // 1-10
    anxiety: number;
    energy: number;
    sleepQuality: number;
  };

  safetyCheck: {
    status: 'safe' | 'concerns';
    details?: string;
  };

  topicsCovered: string[];
  interventionsUsed: string[];
  clientInsights: string[];

  homework: {
    assigned: string;
    fromPreviousSession?: {
      task: string;
      completed: boolean;
      outcome?: string;
      barriers?: string;
    };
  };

  newHomework: {
    task: string;
    confidenceLevel: number; // 1-10
    potentialBarriers: string[];
    contingencyPlans: string[];
  };

  clinicalObservations: string;
  nextSessionPlan: string;

  messages: ChatMessage[];
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

#### Screening Score Structures

```typescript
interface ScreeningScore {
  date: Date;
  score: number;
  severity: string;
  responses: Record<string, number>;
}

interface CSSRSScore {
  date: Date;
  ideation: boolean;
  plan: boolean;
  intent: boolean;
  behavior: boolean;
  riskLevel: 'none' | 'low' | 'moderate' | 'high';
  details: string;
}
```

---

### 5. AI Integration Architecture

```typescript
// AI Service Architecture

class AIService {
  private apiKey: string;
  private baseURL: string = 'https://api.anthropic.com/v1';
  private model: string = 'claude-sonnet-4-20250514';

  // Load clinical file and build context
  private buildContext(clinicalFile: ClinicalFile): string {
    // Convert clinical file to structured context for AI
    return `
      [CLINICAL FILE CONTEXT]
      Client: ${clinicalFile.clientName}
      Session #: ${clinicalFile.sessions.length + 1}

      Recent symptoms:
      - Depression: ${clinicalFile.presentingProblems.symptoms.depression}
      - Anxiety: ${clinicalFile.presentingProblems.symptoms.anxiety}

      Current goals:
      ${clinicalFile.treatmentPlan.shortTermGoals.map(g => `- ${g.description}`).join('\n')}

      Last session summary:
      ${this.getLastSessionSummary(clinicalFile)}

      [END CLINICAL FILE CONTEXT]
    `;
  }

  // Send message to AI with full context
  async sendMessage(
    userMessage: string,
    clinicalFile: ClinicalFile,
    conversationHistory: ChatMessage[]
  ): Promise<string> {
    const context = this.buildContext(clinicalFile);

    const messages = [
      {
        role: 'user',
        content: context + '\n\n' + userMessage
      },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const response = await fetch(`${this.baseURL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 4096,
        system: THERAPIST_SYSTEM_PROMPT, // The full v3.0 prompt
        messages: messages
      })
    });

    const data = await response.json();
    return data.content[0].text;
  }

  // Extract clinical file updates from AI response
  extractClinicalUpdates(
    aiResponse: string,
    currentFile: ClinicalFile
  ): Partial<ClinicalFile> {
    // Parse AI response for structured updates
    // E.g., new symptoms mentioned, homework assigned, etc.
    // This requires AI to output in a structured format we can parse
    return {};
  }
}
```

---

### 6. Storage Architecture

```typescript
// Storage Service

class StorageService {
  private readonly STORAGE_KEY_PREFIX = 'mindflow_';

  // Save clinical file
  saveClinicalFile(file: ClinicalFile): void {
    const key = `${this.STORAGE_KEY_PREFIX}clinical_${file.id}`;
    localStorage.setItem(key, JSON.stringify(file));
  }

  // Load clinical file
  loadClinicalFile(id: string): ClinicalFile | null {
    const key = `${this.STORAGE_KEY_PREFIX}clinical_${id}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // List all clinical files
  listClinicalFiles(): ClinicalFile[] {
    const files: ClinicalFile[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`${this.STORAGE_KEY_PREFIX}clinical_`)) {
        const data = localStorage.getItem(key);
        if (data) files.push(JSON.parse(data));
      }
    }
    return files.sort((a, b) =>
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
  }

  // Delete clinical file
  deleteClinicalFile(id: string): void {
    const key = `${this.STORAGE_KEY_PREFIX}clinical_${id}`;
    localStorage.removeItem(key);
  }

  // Export all data (backup)
  exportAllData(): string {
    const allData: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.STORAGE_KEY_PREFIX)) {
        allData[key] = localStorage.getItem(key);
      }
    }
    return JSON.stringify(allData, null, 2);
  }

  // Import data (restore from backup)
  importData(jsonData: string): void {
    const data = JSON.parse(jsonData);
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, value as string);
    });
  }

  // Clear all app data
  clearAllData(): void {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.STORAGE_KEY_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
}
```

---

### 7. Export/PDF Generation Architecture

```typescript
// Export Service

class ExportService {
  // Generate PDF from clinical file
  async generateClinicalFilePDF(file: ClinicalFile): Promise<Blob> {
    const pdf = new jsPDF();

    // Title page
    pdf.setFontSize(20);
    pdf.text('Clinical File', 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Client: ${file.clientName}`, 20, 35);
    pdf.text(`Created: ${format(file.createdAt, 'PPP')}`, 20, 45);

    // Sections
    this.addSection(pdf, 'Presenting Problems', file.presentingProblems);
    this.addSection(pdf, 'Treatment Plan', file.treatmentPlan);
    this.addScreeningScores(pdf, file.screeningScores);
    this.addSessionHistory(pdf, file.sessions);

    return pdf.output('blob');
  }

  // Generate daily practice PDF
  async generateDailyPracticePDF(session: Session): Promise<Blob> {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text('Daily Practice Plan', 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Date: ${format(new Date(), 'PPP')}`, 20, 35);

    // Homework
    pdf.text('Today\'s Practice:', 20, 50);
    pdf.text(session.newHomework.task, 30, 60);

    // Tips
    pdf.text('Tips for Success:', 20, 80);
    // ... add tips

    return pdf.output('blob');
  }

  // Generate Markdown export
  generateMarkdownExport(file: ClinicalFile): string {
    let md = `# Clinical File: ${file.clientName}\n\n`;
    md += `**Created:** ${format(file.createdAt, 'PPP')}\n\n`;
    md += `## Presenting Problems\n\n`;
    // ... add all sections in Markdown format
    return md;
  }

  // Download file
  downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
```

---

## LOW-LEVEL DESIGN (LLD)

### 1. Detailed Component Specifications

#### 1.1 ChatInterface Component

**Purpose:** Main therapy session interface where user interacts with AI therapist

**Props:**
```typescript
interface ChatInterfaceProps {
  clinicalFileId: string;
  onSessionEnd: (session: Session) => void;
}
```

**State:**
```typescript
interface ChatInterfaceState {
  messages: ChatMessage[];
  isTyping: boolean;
  currentInput: string;
  sessionStartTime: Date;
}
```

**Key Methods:**
```typescript
class ChatInterface {
  // Send user message to AI
  async sendMessage(content: string): Promise<void> {
    // 1. Add user message to chat
    // 2. Show typing indicator
    // 3. Call AI service with context
    // 4. Receive response
    // 5. Add AI response to chat
    // 6. Update clinical file if needed
    // 7. Check for safety concerns in response
  }

  // End current session
  endSession(): void {
    // 1. Calculate session duration
    // 2. Create session summary
    // 3. Save session to clinical file
    // 4. Trigger onSessionEnd callback
    // 5. Offer export options
  }

  // Handle safety crisis detected
  handleCrisisDetected(response: string): void {
    // 1. Parse response for crisis keywords
    // 2. Show crisis resources modal
    // 3. Offer to conduct C-SSRS
    // 4. Update safety assessment in file
  }
}
```

**Rendering Logic:**
```typescript
render() {
  return (
    <div className="chat-container">
      <ChatHistory messages={this.state.messages} />
      {this.state.isTyping && <TypingIndicator />}
      <ChatInput
        value={this.state.currentInput}
        onChange={this.handleInputChange}
        onSend={this.sendMessage}
      />
      <SessionControls onEnd={this.endSession} />
    </div>
  );
}
```

---

#### 1.2 PHQ9 Component (Screening Tool Example)

**Purpose:** Administer PHQ-9 depression screening questionnaire

**Props:**
```typescript
interface PHQ9Props {
  onComplete: (score: ScreeningScore) => void;
  onCancel: () => void;
}
```

**State:**
```typescript
interface PHQ9State {
  currentQuestion: number;
  responses: Record<number, number>; // question number -> response (0-3)
  isComplete: boolean;
}
```

**Key Methods:**
```typescript
class PHQ9 {
  private questions: string[] = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    // ... all 9 questions
  ];

  // Handle answer selection
  selectAnswer(questionIndex: number, value: number): void {
    // 1. Store response
    // 2. Move to next question
    // 3. If last question, calculate score
  }

  // Calculate total score
  calculateScore(): number {
    return Object.values(this.state.responses).reduce((sum, val) => sum + val, 0);
  }

  // Interpret score
  interpretScore(score: number): string {
    if (score <= 4) return 'Minimal depression';
    if (score <= 9) return 'Mild depression';
    if (score <= 14) return 'Moderate depression';
    if (score <= 19) return 'Moderately severe depression';
    return 'Severe depression';
  }

  // Handle completion
  handleComplete(): void {
    const score = this.calculateScore();
    const severity = this.interpretScore(score);

    this.props.onComplete({
      date: new Date(),
      score,
      severity,
      responses: this.state.responses
    });

    // Check item #9 (suicide question)
    if (this.state.responses[9] > 0) {
      // Trigger C-SSRS or safety protocol
    }
  }
}
```

**Rendering:**
```typescript
render() {
  const currentQ = this.questions[this.state.currentQuestion];

  return (
    <div className="screening-tool phq9">
      <h2>PHQ-9 Depression Screening</h2>
      <p>Over the last 2 weeks, how often have you been bothered by:</p>

      <div className="question">
        <p>{currentQ}</p>
        <div className="options">
          {[0, 1, 2, 3].map(value => (
            <button
              key={value}
              onClick={() => this.selectAnswer(this.state.currentQuestion, value)}
            >
              {this.getOptionLabel(value)}
            </button>
          ))}
        </div>
      </div>

      <ProgressBar current={this.state.currentQuestion + 1} total={9} />
    </div>
  );
}
```

---

#### 1.3 ClinicalFileViewer Component

**Purpose:** Display and navigate through clinical file

**Props:**
```typescript
interface ClinicalFileViewerProps {
  fileId: string;
  editable?: boolean;
}
```

**State:**
```typescript
interface ClinicalFileViewerState {
  file: ClinicalFile | null;
  activeSection: string; // which section is expanded
  editMode: boolean;
}
```

**Rendering Structure:**
```typescript
render() {
  if (!this.state.file) return <Loading />;

  return (
    <div className="clinical-file-viewer">
      <h1>Clinical File: {this.state.file.clientName}</h1>

      <Tabs>
        <Tab label="Overview">
          <ClinicalFileSummary file={this.state.file} />
        </Tab>

        <Tab label="Presenting Problems">
          <Section
            content={this.state.file.presentingProblems}
            editable={this.state.editMode}
          />
        </Tab>

        <Tab label="Screening Scores">
          <ProgressCharts scores={this.state.file.screeningScores} />
        </Tab>

        <Tab label="Treatment Plan">
          <TreatmentPlanView plan={this.state.file.treatmentPlan} />
        </Tab>

        <Tab label="Session History">
          <SessionList sessions={this.state.file.sessions} />
        </Tab>

        <Tab label="Safety">
          <SafetyAssessmentView assessment={this.state.file.safetyAssessment} />
        </Tab>
      </Tabs>

      <ActionBar>
        <Button onClick={this.toggleEditMode}>
          {this.state.editMode ? 'Save' : 'Edit'}
        </Button>
        <Button onClick={this.exportFile}>Export</Button>
      </ActionBar>
    </div>
  );
}
```

---

### 2. Detailed Service Implementations

#### 2.1 Screening Service

```typescript
class ScreeningService {
  // PHQ-9 scoring
  scorePHQ9(responses: Record<number, number>): ScreeningScore {
    const score = Object.values(responses).reduce((sum, val) => sum + val, 0);

    let severity: string;
    if (score <= 4) severity = 'Minimal';
    else if (score <= 9) severity = 'Mild';
    else if (score <= 14) severity = 'Moderate';
    else if (score <= 19) severity = 'Moderately Severe';
    else severity = 'Severe';

    return {
      date: new Date(),
      score,
      severity,
      responses
    };
  }

  // GAD-7 scoring
  scoreGAD7(responses: Record<number, number>): ScreeningScore {
    const score = Object.values(responses).reduce((sum, val) => sum + val, 0);

    let severity: string;
    if (score <= 4) severity = 'Minimal';
    else if (score <= 9) severity = 'Mild';
    else if (score <= 14) severity = 'Moderate';
    else severity = 'Severe';

    return {
      date: new Date(),
      score,
      severity,
      responses
    };
  }

  // ASRS v1.1 scoring (Part A only)
  scoreASRS(responses: Record<number, number>): ScreeningScore {
    // Questions 1-3: positive if ≥2
    // Questions 4-6: positive if ≥3
    let positiveCount = 0;

    if (responses[1] >= 2) positiveCount++;
    if (responses[2] >= 2) positiveCount++;
    if (responses[3] >= 2) positiveCount++;
    if (responses[4] >= 3) positiveCount++;
    if (responses[5] >= 3) positiveCount++;
    if (responses[6] >= 3) positiveCount++;

    const severity = positiveCount >= 4
      ? 'High probability - warrants evaluation'
      : 'Lower probability';

    return {
      date: new Date(),
      score: positiveCount,
      severity,
      responses
    };
  }

  // C-SSRS risk level determination
  assessCSSRSRisk(responses: CSSRSResponses): CSSRSScore {
    let riskLevel: 'none' | 'low' | 'moderate' | 'high';

    if (!responses.wishToBeDead && !responses.suicidalThoughts) {
      riskLevel = 'none';
    } else if (responses.suicidalThoughts && !responses.methodThought) {
      riskLevel = 'low';
    } else if (responses.methodThought && !responses.intent && !responses.planWithIntent) {
      riskLevel = 'moderate';
    } else {
      riskLevel = 'high';
    }

    return {
      date: new Date(),
      ideation: responses.suicidalThoughts,
      plan: responses.methodThought,
      intent: responses.intent,
      behavior: responses.anyBehavior,
      riskLevel,
      details: this.generateCSSRSDetails(responses)
    };
  }
}
```

---

#### 2.2 Clinical File Service

```typescript
class ClinicalFileService {
  private storage: StorageService;

  // Create new clinical file from template
  createNewFile(clientName: string): ClinicalFile {
    const file: ClinicalFile = {
      id: uuidv4(),
      clientName,
      createdAt: new Date(),
      lastUpdated: new Date(),

      identification: {
        name: clientName
      },

      intakeStatus: {
        approachChosen: 'ongoing',
        completionStatus: 'not-started',
        componentsCompleted: {
          chiefComplaint: false,
          phq9: false,
          gad7: false,
          asrs: false,
          cssrs: false,
          psychiatricHistory: false,
          medicalHistory: false,
          developmentalHistory: false,
          occupationalHistory: false,
          socialHistory: false,
          functionalAssessment: false,
          stressorsIdentified: false,
          strengthsIdentified: false,
          crisisPlanCreated: false,
          goalsEstablished: false
        }
      },

      // ... initialize all other sections with empty/default values

      sessions: [],

      progressTracking: {
        overallProgress: 'not-improving',
        symptomTrends: { phq9: [], gad7: [] },
        functionalImprovement: {},
        goalAchievement: {},
        skillsMastered: [],
        skillsInProgress: []
      },

      notes: {
        whatsWorking: [],
        whatsNotWorking: [],
        adjustmentsNeeded: [],
        barriersToProgress: [],
        consultationNotes: []
      },

      nextSteps: {
        todoNextSession: [],
        clinicalQuestions: [],
        redFlags: [],
        upcomingMilestones: []
      }
    };

    this.storage.saveClinicalFile(file);
    return file;
  }

  // Update specific section of clinical file
  updateSection(
    fileId: string,
    section: keyof ClinicalFile,
    data: any
  ): void {
    const file = this.storage.loadClinicalFile(fileId);
    if (!file) throw new Error('File not found');

    file[section] = { ...file[section], ...data };
    file.lastUpdated = new Date();

    this.storage.saveClinicalFile(file);
  }

  // Add new session to file
  addSession(fileId: string, session: Session): void {
    const file = this.storage.loadClinicalFile(fileId);
    if (!file) throw new Error('File not found');

    file.sessions.push(session);
    file.lastUpdated = new Date();

    // Update screening score trends
    if (session.type === 'assessment') {
      // Extract and store any screening scores from this session
    }

    this.storage.saveClinicalFile(file);
  }

  // Add screening score
  addScreeningScore(
    fileId: string,
    type: 'phq9' | 'gad7' | 'asrs' | 'cssrs',
    score: ScreeningScore | CSSRSScore
  ): void {
    const file = this.storage.loadClinicalFile(fileId);
    if (!file) throw new Error('File not found');

    file.screeningScores[type].push(score);

    // Update trends
    if (type === 'phq9' || type === 'gad7') {
      file.progressTracking.symptomTrends[type].push((score as ScreeningScore).score);
    }

    file.lastUpdated = new Date();
    this.storage.saveClinicalFile(file);
  }
}
```

---

### 3. State Management with Zustand

```typescript
// Clinical File Store
interface ClinicalFileStore {
  currentFile: ClinicalFile | null;
  allFiles: ClinicalFile[];

  // Actions
  loadFile: (id: string) => void;
  createFile: (name: string) => void;
  updateFile: (updates: Partial<ClinicalFile>) => void;
  deleteFile: (id: string) => void;
  loadAllFiles: () => void;
}

const useClinicalFileStore = create<ClinicalFileStore>((set, get) => ({
  currentFile: null,
  allFiles: [],

  loadFile: (id: string) => {
    const service = new ClinicalFileService();
    const file = service.storage.loadClinicalFile(id);
    set({ currentFile: file });
  },

  createFile: (name: string) => {
    const service = new ClinicalFileService();
    const file = service.createNewFile(name);
    set({ currentFile: file });
    get().loadAllFiles();
  },

  updateFile: (updates: Partial<ClinicalFile>) => {
    const current = get().currentFile;
    if (!current) return;

    const updated = { ...current, ...updates, lastUpdated: new Date() };
    const service = new ClinicalFileService();
    service.storage.saveClinicalFile(updated);
    set({ currentFile: updated });
  },

  deleteFile: (id: string) => {
    const service = new ClinicalFileService();
    service.storage.deleteClinicalFile(id);
    set({ currentFile: null });
    get().loadAllFiles();
  },

  loadAllFiles: () => {
    const service = new ClinicalFileService();
    const files = service.storage.listClinicalFiles();
    set({ allFiles: files });
  }
}));

// Session Store
interface SessionStore {
  currentSession: Session | null;
  messages: ChatMessage[];
  isActive: boolean;

  startSession: (fileId: string) => void;
  endSession: () => void;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
}

const useSessionStore = create<SessionStore>((set, get) => ({
  currentSession: null,
  messages: [],
  isActive: false,

  startSession: (fileId: string) => {
    const fileStore = useClinicalFileStore.getState();
    const file = fileStore.currentFile;
    if (!file) return;

    const session: Session = {
      id: uuidv4(),
      sessionNumber: file.sessions.length + 1,
      date: new Date(),
      duration: 0,
      type: 'regular',
      presentation: { mood: 5, anxiety: 5, energy: 5, sleepQuality: 5 },
      safetyCheck: { status: 'safe' },
      topicsCovered: [],
      interventionsUsed: [],
      clientInsights: [],
      homework: { assigned: '' },
      newHomework: { task: '', confidenceLevel: 5, potentialBarriers: [], contingencyPlans: [] },
      clinicalObservations: '',
      nextSessionPlan: '',
      messages: []
    };

    set({ currentSession: session, isActive: true, messages: [] });
  },

  endSession: () => {
    const session = get().currentSession;
    if (!session) return;

    // Calculate duration
    session.duration = Math.floor((Date.now() - session.date.getTime()) / 60000);
    session.messages = get().messages;

    // Save to clinical file
    const fileStore = useClinicalFileStore.getState();
    if (fileStore.currentFile) {
      const service = new ClinicalFileService();
      service.addSession(fileStore.currentFile.id, session);
    }

    set({ currentSession: null, isActive: false, messages: [] });
  },

  addMessage: (message: ChatMessage) => {
    set(state => ({ messages: [...state.messages, message] }));
  },

  clearMessages: () => {
    set({ messages: [] });
  }
}));
```

---

### 4. Routing Structure

```typescript
// App.tsx routing with React Router

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing/Welcome */}
        <Route path="/" element={<WelcomePage />} />

        {/* Onboarding */}
        <Route path="/getting-started" element={<OnboardingFlow />} />
        <Route path="/intake-selection" element={<IntakeSelection />} />

        {/* Main App */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<ChatInterface />} />
          <Route path="clinical-file" element={<ClinicalFileViewer />} />
          <Route path="progress" element={<ProgressDashboard />} />
          <Route path="screening/:type" element={<ScreeningToolContainer />} />
          <Route path="export" element={<ExportCenter />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

**This completes the BRD and HLD sections. Would you like me to proceed with:**
1. **Complete LLD implementation code** (full React components)
2. **Setup instructions** (package.json, vite.config, etc.)
3. **Testing specifications**
4. **Deployment guide**

Let me know which part you'd like next, and I'll provide the full implementation details! 🚀
