# Frontend Guidance

## Design direction
- Define the purpose, audience, and constraints before coding.
- Choose a bold aesthetic direction and commit to it.
- Make one memorable design decision that differentiates the UI.

## Visual system
- Typography: pick distinctive fonts; avoid generic system fonts unless required.
- Color: define a small palette with a dominant color and sharp accents.
- Layout: use hierarchy, asymmetry, and intentional whitespace.

## Motion and interaction
- Use a single high-impact sequence (page load or hero) over scattered micro-effects.
- Prefer CSS animations and transitions; use transform and opacity for smoothness.
- Keep motion purposeful and accessibility-friendly.

## UI library discipline
- If the project uses a UI library, use its primitives for buttons, modals, forms, and menus.
- Wrap or style library components instead of recreating them from scratch.

## Accessibility
- Use semantic HTML and correct ARIA labels.
- Ensure keyboard navigation and visible focus states.
- Meet contrast ratios (4.5:1 for text, 3:1 for UI elements).

## Performance
- Reduce bundle size with code splitting and lazy loading.
- Avoid unnecessary re-renders; memoize where it matters.
- Treat performance targets as goals, not measured results unless verified.

## Quality gate
- Responsive on mobile and desktop.
- No placeholder copy in final output unless labeled as such.
- No hardcoded magic numbers without explanation.
