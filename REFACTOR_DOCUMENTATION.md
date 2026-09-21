# A-Picks Solutions — Comprehensive Refactoring Documentation

This document provides a complete technical record of the refactoring and modernization performed over the last 5 days on the **A-Picks Solutions** web application.

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Navbar & Navigation Behavior](#2-navbar--navigation-behavior)
3. [IntroSplash Screen & Motion Architecture](#3-introsplash-screen--motion-architecture)
4. [3D Lead Scene (Three.js) Integration](#4-3d-lead-scene-threejs-integration)
5. [Refactoring Phases (Phase 1 through Phase 6)](#5-refactoring-phases-phase-1-through-phase-6)
6. [Per-Page Breakdown: Done vs. Roadmap (Phase 7+)](#6-per-page-breakdown-done-vs-roadmap-phase-7)
7. [Repository Structure](#7-repository-structure)
8. [Build & Verification](#8-build--verification)

---

## 1. Executive Summary

The project transitioned from a set of static HTML files into a modern, high-performance, single-page web application powered by:
- **React 19** & **TypeScript 5.7**
- **Vite 6** (lightning-fast development and optimized production bundling)
- **Framer Motion (`motion/react`)** for scroll-linked animations and gestures
- **Three.js** for real-time 3D opportunity visualization
- **Lucide Icons**
- **Custom Modular CSS (`kinetic.css`)** preserving 100% of brand aesthetics, glassmorphism, responsive breakpoints, and animations without visual regressions.

---

## 2. Navbar & Navigation Behavior

The top navigation system is encapsulated inside `src/components/layout/Header.tsx` and `src/components/navigation/PageLink.tsx`.

### Core Features:
1. **Announcement Bar**:
   - Displays brand positioning (`"THE OFF-MARKET ADVANTAGE | CALLS → CONVERSATIONS → OPPORTUNITIES"`).
   - Direct CTA deep-link into the Lead Room (`?page=leads`).
2. **Sticky Scroll-Shrink Effect**:
   - A passive `scroll` event listener monitors `window.scrollY`.
   - When scroll passes `30px`, the `.is-scrolled` class is applied to the header, triggering a compact height, glassmorphic backdrop blur, and subtle border.
3. **Desktop Navigation**:
   - Maps across all 7 primary subpages: `About`, `Services`, `Pricing`, `Leads`, `FAQ`, `Contact`, and `Account access`.
   - Compares the active `page` prop with each navigation item to apply the `.is-current` indicator.
   - Dedicated "JOIN A-PICKS" button linking directly to `?page=account`.
4. **Mobile Navigation Drawer**:
   - Accessible hamburger toggle button (`.k-menu`) updating `aria-expanded` and `aria-label`.
   - Toggles the `.is-open` class on the `<nav className="k-nav">` container.
   - Automatically closes the drawer (`setOpen(false)`) whenever any navigation link is clicked.
5. **Routing & Browser History Integration**:
   - Query-param routing preserves URLs like `?page=leads` and `?page=about`.
   - `PageLink` intercepts normal primary mouse clicks (while bypassing modifier clicks such as `Cmd`/`Ctrl`/`Shift` for opening in new tabs).
   - Triggers native **View Transitions API** (`document.startViewTransition`) where supported by modern browsers, providing fluid cross-fade page transitions with instant fallback.

---

## 3. IntroSplash Screen & Motion Architecture

The splash screen is implemented in `src/IntroSplash.tsx` and is built on the **Hyperiux Vault StackSpread** animation pattern.

### Technical Architecture & Optimizations:
1. **Internal Scroll Container**:
   - Operates inside an internal fixed overlay container (`.intro-scroll`), ensuring that scroll-driven animations do not alter or conflict with the underlying document's scroll position.
2. **Landscape Property Cards**:
   - 8 uniform landscape property visuals (`CW = 21vw`, `CH = 16vh`, ~1.6:1 aspect ratio).
   - Starts tightly stacked in the center with subtle rotational and coordinate offsets.
   - As the user scrolls, cards smoothly disperse in a 3D-like radial ring, cleanly revealing the center typography:
     > *"The right lead can change the deal. Discover motivated seller leads. Move faster. Close smarter."*
3. **Dynamic Pointer Parallax**:
   - Tracks cursor and touch coordinates in real time.
   - Interpolated with Framer Motion spring physics (`damping: 25, stiffness: 180`) to add depth and tactile responsiveness.
4. **Performance Auditing & Optimizations**:
   - **Memoized Card Rendering**: Extracted card components wrapped in `React.memo` to prevent re-renders on high-frequency scroll events.
   - **Hardware Acceleration**: CSS `will-change: transform` and `transform3d` hints ensure GPU-accelerated compositing without main-thread paint bottlenecks.
   - **Passive Listeners & RAF Throttling**: Pointer tracking events execute via `requestAnimationFrame`.
   - **Reduced Motion Support**: Native `(prefers-reduced-motion: reduce)` media query instantly renders the cards at their rest spread state with zero heavy motion transforms.

---

## 4. 3D Lead Scene (Three.js) Integration

Encapsulated in `src/components/scene/SceneStage.tsx` and `src/LeadScene.tsx`:
- **Independent Lazy-Loaded Chunk**: Bundled separately (`dist/assets/LeadScene-*.js`) so the initial page bundle remains lean and loads instantly.
- **IntersectionObserver Lifecycle**: Automatically disconnects rendering loops and pauses Three.js animations when the component scrolls out of the active viewport (`rootMargin: '150px'`).
- **Pointer Spotlight Effect**: Tracks pointer movements across the stage and dynamically updates CSS custom properties `--pointer-x` and `--pointer-y`.
- **Decorative Elements**: Displays sweeping radar animations, coordinate markers (`40° 55′ / SIGNAL 01`), and real-time deal stage pings.

---

## 5. Refactoring Phases (Phase 1 through Phase 6)

The project underwent 6 systematic, non-breaking refactoring phases:

### Phase 1: Codebase Audit & Architectural Mapping
- Analyzed the original monolithic `Site.tsx` (~420+ lines).
- Cataloged dependencies, CSS styles, animations, and invariants.
- Established strict preservation rules: zero design alterations, identical visual layout, and zero regressions.

### Phase 2: Domain Types & URL Utilities Foundation
- Created `src/types/`: Explicit TypeScript interfaces for `Page`, `Lead`, `Service`, `PricingPackage`, `FaqItem`.
- Created `src/utils/url.ts`: Centralized query string generation (`pageUrl`), link dragging (`dragLink`), and parameter extraction.
- Strongly typed `src/data.ts` using domain interfaces.

### Phase 3: Custom React Hooks Extraction
Extracted stateful logic and browser behaviors into reusable hooks in `src/hooks/`:
- `useNavigation`: Manages query-param URL syncing, browser history (`pushState`/`popstate`), lead modal selection, and View Transitions.
- `useScrollProgress`: Drives the top micro-progress scroll indicator.
- `useScrollReveal`: Observes elements with `data-reveal` attributes.
- `useFocusTrap`: Accessible focus trapping for modals with Escape key handling.
- `useBodyScrollLock`: Prevents background scrolling when dialogs are active.
- `useReducedMotionPreference`: Accessible motion preference detection.

### Phase 4: Services & API Layer Separation
Extracted external network requests and authentication workflows into `src/services/`:
- `contactService.ts`: Handles contact form submissions to Formspree endpoint with error fallbacks.
- `accountService.ts`: Handles Google/Apple OAuth redirects and mock email registrations with fallback handling.

### Phase 5: Shared Component Decomposition
Extracted reusable presentation components out of `Site.tsx` into `src/components/`:
- `layout/`: `Brand`, `Header`, `Footer`
- `navigation/`: `RouteContext`, `PageLink`
- `common/`: `PageHero`, `BigCTA`
- `leads/`: `LeadTile`, `BidDialog`
- `scene/`: `SceneStage`

### Phase 6: Page Decomposition
Extracted all 8 page components into dedicated modules in `src/pages/`:
- `HomePage.tsx`, `AboutPage.tsx`, `ServicesPage.tsx`, `PricingPage.tsx`, `FaqPage.tsx`, `ContactPage.tsx`, `LeadsPage.tsx`, `AccountPage.tsx`.
- Reduced `Site.tsx` from 420+ lines down to **49 clean, declarative lines** focused solely on application shell orchestration.

---

## 6. Per-Page Breakdown: Done vs. Roadmap (Phase 7+)

### 1. `HomePage.tsx`
* **What Was Done**: Extracted to dedicated page; integrates hero copy, 3D `SceneStage`, infinite marquee, advantage metrics, curved gallery, services rows, sample `LeadTile` cards, 4-stage process pipeline, and `BigCTA`.
* **What To Do Later (Phase 7+)**:
  - Extract hardcoded metric numbers into `src/data.ts`.
  - Extract process steps into `data.ts`.
  - Write component unit tests.

### 2. `AboutPage.tsx`
* **What Was Done**: Extracted to dedicated page; utilizes `PageHero` with index 02, mission story, and 4 core values grid.
* **What To Do Later (Phase 7+)**:
  - Move core values array into `src/data.ts`.
  - Add team member leadership profiles.

### 3. `ServicesPage.tsx`
* **What Was Done**: Extracted to dedicated page; interactive service selector tabs (`role="tablist"`), process chains, and support system proof stripes.
* **What To Do Later (Phase 7+)**:
  - Deep-link tab selection into URL query parameters (e.g. `?page=services&service=02`).
  - Memoize service chain nodes.

### 4. `PricingPage.tsx`
* **What Was Done**: Extracted to dedicated page; interactive caller team range slider (2-15 callers), real-time tier calculation, capacity bar meter, package comparison cards, and additional support rates.
* **What To Do Later (Phase 7+)**:
  - Extract calculation formulas into pure utility `src/utils/pricing.ts` with test coverage.
  - Extract additional support rates into `src/data.ts`.

### 5. `FaqPage.tsx`
* **What Was Done**: Extracted to dedicated page; 6 category filter pills and 8 accessible `<details>` accordion questions.
* **What To Do Later (Phase 7+)**:
  - Add real-time search input for filtering FAQ questions by keyword.
  - Dynamically derive category pills from dataset.

### 6. `ContactPage.tsx`
* **What Was Done**: Extracted to dedicated page; agency contact info, brief form with submission via `contactService`, busy state, and status live region.
* **What To Do Later (Phase 7+)**:
  - Add client-side schema validation (e.g. Zod) with inline field errors.
  - Replace status banner with toast notification system.

### 7. `LeadsPage.tsx`
* **What Was Done**: Extracted to dedicated page; category filter tabs, live search input across title/city/state, `LeadTile` card grid, deep-linking integration with `BidDialog`, and educational auction terms.
* **What To Do Later (Phase 7+)**:
  - Extract search and filter logic into custom hook `useLeadFilter` with debounce.
  - Implement pagination or infinite scrolling.
  - Connect live WebSocket stream for real-time bid updates.

### 8. `AccountPage.tsx`
* **What Was Done**: Extracted to dedicated page; visual pipeline preview, Google and Apple OAuth redirect handlers via `accountService`, and work email signup form.
* **What To Do Later (Phase 7+)**:
  - Integrate real backend auth provider (Supabase / Firebase / Auth0).
  - Add authentication context / session store (`useAuth`).
  - Add protected route guards.

---

## 7. Repository Structure

```text
src/
├── components/
│   ├── common/
│   │   ├── BigCTA.tsx
│   │   ├── PageHero.tsx
│   │   └── index.ts
│   ├── layout/
│   │   ├── Brand.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── leads/
│   │   ├── BidDialog.tsx
│   │   ├── LeadTile.tsx
│   │   └── index.ts
│   ├── navigation/
│   │   ├── PageLink.tsx
│   │   ├── RouteContext.ts
│   │   └── index.ts
│   ├── scene/
│   │   ├── SceneStage.tsx
│   │   └── index.ts
│   └── ui/
│       └── stack-spread.tsx
├── hooks/
│   ├── useBodyScrollLock.ts
│   ├── useFocusTrap.ts
│   ├── useNavigation.ts
│   ├── useReducedMotionPreference.ts
│   ├── useScrollProgress.ts
│   ├── useScrollReveal.ts
│   └── index.ts
├── pages/
│   ├── AboutPage.tsx
│   ├── AccountPage.tsx
│   ├── ContactPage.tsx
│   ├── FaqPage.tsx
│   ├── HomePage.tsx
│   ├── LeadsPage.tsx
│   ├── PricingPage.tsx
│   ├── ServicesPage.tsx
│   └── index.ts
├── services/
│   ├── accountService.ts
│   ├── contactService.ts
│   └── index.ts
├── types/
│   ├── faq.ts
│   ├── lead.ts
│   ├── page.ts
│   ├── pricing.ts
│   ├── service.ts
│   └── index.ts
├── utils/
│   ├── url.ts
│   └── index.ts
├── data.ts
├── IntroSplash.tsx
├── LeadScene.tsx
├── kinetic.css
├── Site.tsx
└── main.tsx
```

---

## 8. Build & Verification

### Type Check:
```bash
npx tsc --noEmit
```
*Result: 0 errors.*

### Production Build:
```bash
npm run build
```
*Result: Clean production bundle built in ~8-10 seconds with automatic code-splitting for `LeadScene`.*
