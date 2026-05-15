# Joanna Bassey — Interactive Developer Portfolio

A highly interactive, visually immersive developer portfolio built with SvelteKit.

## Live Demo

> Add your deployed URL here

## Setup

```bash
npm install
npm run dev        # development server
npm run build      # production build
npm run preview    # preview production build
```

## Architecture

```
src/
├── lib/
│   ├── components/
│   │   ├── Nav.svelte        # Fixed navigation with mobile hamburger menu
│   │   ├── Hero.svelte       # Landing section with particle canvas + typewriter
│   │   ├── About.svelte      # Bio, stats grid, tech stack
│   │   ├── Projects.svelte   # Dual marquee rows with drag-to-reorder + modals
│   │   ├── Terminal.svelte   # Interactive browser terminal emulator
│   │   ├── Contact.svelte    # Contact form with validation
│   │   └── Footer.svelte     # Footer with social links
│   ├── data.ts               # All portfolio content (projects, personal info, skills)
│   └── stores.ts             # Theme store (dark/light), reduced motion detection
├── routes/
│   ├── +layout.svelte        # Root layout, theme application, meta tags
│   └── +page.svelte          # Single page composition
└── app.css                   # Global styles, CSS variables, typography
```

## Animation Decisions

- **Reveal animations** — IntersectionObserver triggers `translateY` slide-ups on scroll. Each section staggers children with CSS `transition-delay` — no JS animation library needed, pure CSS transitions with a custom cubic-bezier ease.
- **Hero particle network** — Canvas-based floating dot network with connecting lines. Runs on `requestAnimationFrame`, cleared and redrawn each frame. 60 particles with proximity-based line drawing (threshold: 120px).
- **Mouse glow** — CSS radial gradient div that follows `mousemove` via reactive Svelte state. Uses `position: fixed` with `transform: translate(-50%, -50%)` for centering.
- **Typewriter** — Recursive `setTimeout` loop cycling through role strings. Respects `prefers-reduced-motion` — shows static text if motion is reduced.
- **Marquee rows** — Pure CSS `@keyframes` infinite scroll. Pauses on `hover` and during drag via `animation-play-state: paused`.
- **Magnetic button** — Removed (caused unintended movement). CTA uses standard hover transitions instead.

## Performance Optimizations

- No animation libraries — all animations use native CSS transitions and `requestAnimationFrame`
- `IntersectionObserver` for lazy reveal — elements only animate when in viewport
- Canvas particle system uses `clearRect` + minimal draw calls
- `passive: true` on all scroll/mousemove event listeners
- Svelte's compile-time reactivity — no virtual DOM overhead
- CSS `will-change` avoided to prevent unnecessary compositing layers
- Reduced motion: all animations disabled via `@media (prefers-reduced-motion: reduce)`

## Accessibility

- Semantic HTML throughout (`<section>`, `<nav>`, `<header>`, `<footer>`, `<form>`)
- All interactive elements have `aria-label`
- Skip navigation link (`:focus` reveals it)
- `aria-live="polite"` on terminal output and form submit button
- `aria-invalid` on form fields with errors
- `role="alert"` on validation error messages
- Visible focus states via `:focus-visible` outline
- Keyboard navigation: full tab order, Enter to open project modals, Escape to close
- Reduced motion support: typewriter shows static text, all transitions set to `0.01ms`

## Trade-offs

- **Contact form** — Uses Formspree for email delivery. No backend required, but requires a Formspree account. Alternative: swap endpoint for EmailJS or a serverless function.
- **Project images** — Served from `static/` as plain images. No lazy loading or blur-up placeholder implemented (trade-off for simplicity).
- **Drag-to-reorder** — Order resets on page refresh (not persisted to localStorage). Could be added trivially with a `$effect` writing to `localStorage`.
- **Marquee + drag** — Marquee pauses on hover to enable drag. A fully seamless drag-while-scrolling experience would require pointer event capture and manual position tracking.
- **Theme** — Persisted via Svelte store + `localStorage`. SSR hydration uses a blocking inline script in `+layout.svelte` to avoid flash of wrong theme.
