# MindFlow Implementation Guide

## Complete Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Code editor (VS Code recommended)
- Anthropic API key

### Step 1: Extract & Setup

```bash
# Extract the ZIP file
unzip mindflow-ai-therapy.zip

# Navigate to project
cd mindflow-ai-therapy

# Install dependencies
npm install
```

### Step 2: Environment Configuration

Create `.env` file in root directory:

```env
VITE_ANTHROPIC_API_KEY=your_api_key_here
VITE_APP_NAME=MindFlow
VITE_APP_VERSION=1.0.0
```

### Step 3: Get Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create new key
5. Copy key to `.env` file

### Step 4: Run Development Server

```bash
npm run dev
```

Open browser to `http://localhost:5173`

### Step 5: Build for Production

```bash
npm run build
```

Output in `/dist` folder - deploy to any static host.

## Project Structure

```
mindflow-ai-therapy/
├── docs/                    # All documentation
│   ├── AI_THERAPIST_SYSTEM_PROMPT.md
│   ├── BRD_Business_Requirements.md
│   ├── HLD_High_Level_Design.md
│   ├── LLD_Low_Level_Design.md
│   ├── IMPLEMENTATION_GUIDE.md
│   └── API_SETUP.md
├── src/
│   ├── components/          # React components
│   ├── services/            # Business logic
│   ├── stores/              # State management
│   ├── types/               # TypeScript types
│   ├── utils/               # Helper functions
│   ├── hooks/               # Custom React hooks
│   ├── config/              # Configuration
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                  # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Key Implementation Notes

### 1. AI Integration

The AI service (`src/services/ai.service.ts`) handles:
- API calls to Anthropic Claude
- Context building from clinical file
- Response parsing
- Error handling

### 2. Storage Service

localStorage service (`src/services/storage.service.ts`):
- Save/load clinical files
- List all files
- Delete files
- Export/import data
- Clear all data

### 3. Clinical File

Auto-generated template on first session with comprehensive tracking.

### 4. State Management

Zustand stores for:
- Clinical file state
- Session state
- User profile
- UI state

### 5. Screening Tools

Each screener component:
- Administers questions
- Calculates scores
- Interprets results
- Saves to clinical file

## Development Workflow

### 1. Local Development

```bash
npm run dev
```

### 2. Type Checking

```bash
npm run build  # Runs tsc first
```

### 3. Linting

```bash
npm run lint
```

## Deployment Options

### Option 1: Vercel

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm run build
# Upload /dist folder to Netlify
```

### Option 3: GitHub Pages

```bash
npm run build
# Deploy /dist to gh-pages branch
```

### Option 4: Static Host

Any static file hosting (AWS S3, Cloudflare Pages, etc.)

## Customization

### Change Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#4A90E2',      // Your brand color
      secondary: '#66BB6A',
      // ...
    }
  }
}
```

### Change AI Model

Edit `src/services/ai.service.ts`:

```typescript
private model: string = 'claude-sonnet-4-20250514';
```

### Add New Screening Tool

1. Create component in `src/components/screening/`
2. Add scoring logic to `src/services/screening.service.ts`
3. Add to clinical file types
4. Integrate in screening flow

## Troubleshooting

### API Key Issues

- Verify key in `.env` starts with `VITE_`
- Restart dev server after changing `.env`
- Check API key is valid in Anthropic console

### localStorage Full

- Browser limit is ~10MB
- Export and delete old files
- Use compression (future enhancement)

### Build Errors

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Type Errors

Check `tsconfig.json` settings and ensure all types are properly defined.

## Security Notes

### API Key Protection

- Never commit `.env` to git
- Use environment variables in production
- Rotate keys regularly

### Data Privacy

- All data stored locally
- No server transmission except AI API
- Clear data option for users
- Export before browser data clear

## Testing

### Manual Testing Checklist

- [ ] Create new clinical file
- [ ] Complete each intake approach
- [ ] Administer each screening tool
- [ ] Have therapy session
- [ ] Assign and complete homework
- [ ] View progress charts
- [ ] Export clinical file (all formats)
- [ ] Test crisis detection
- [ ] Test on mobile devices
- [ ] Test in all supported browsers

### Future: Automated Testing

- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright

## Performance Optimization

### Tips

1. **Code splitting**: Already handled by Vite
2. **Lazy loading**: Import components lazily for large ones
3. **Memoization**: Use `React.memo` for expensive components
4. **localStorage**: Use compression for large data

## Support & Resources

### Documentation

- Full system prompt: `docs/AI_THERAPIST_SYSTEM_PROMPT.md`
- Architecture: `docs/HLD_High_Level_Design.md`
- Detailed specs: `docs/LLD_Low_Level_Design.md`

### External Resources

- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Vite: https://vitejs.dev/
- Anthropic Claude: https://docs.anthropic.com/

## License

MIT License - Free to use and modify.

---

*Version 1.0 - January 2026*
