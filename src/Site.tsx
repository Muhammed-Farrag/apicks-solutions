import type { ReactNode } from 'react'
import type { Page } from './types'
import { useNavigation, useScrollProgress, useScrollReveal } from './hooks'
import { Header, Footer } from './components/layout'
import { RouteContext } from './components/navigation'
import { BidDialog } from './components/leads'
import {
  HomePage,
  AboutPage,
  ServicesPage,
  PricingPage,
  FaqPage,
  ContactPage,
  LeadsPage,
  AccountPage,
} from './pages'

/**
 * Main Application Shell & Route Orchestrator for A-Picks Solutions.
 *
 * ARCHITECTURAL SUMMARY:
 * Refactored across 6 structured phases from a 420+ line monolith into a clean,
 * modular, single-responsibility architecture:
 *
 * 1. Global Navigation & History (`useNavigation`):
 *    - Preserves query-param routing (`?page=...&lead=...`).
 *    - Integrates browser History API (`pushState`/`replaceState`/`popstate`).
 *    - Triggers native View Transitions API with fallback for non-supporting browsers.
 * 2. Scroll Behaviors:
 *    - `useScrollReveal`: Applies scroll reveal animations to sections marked `data-reveal`.
 *    - `useScrollProgress`: Syncs top micro-progress bar (`#scroll-progress`) with page scroll.
 * 3. Shared Layout Composition:
 *    - `Header`: Sticky scroll-shrink top navigation + announcement bar + mobile drawer.
 *    - `main.k-page-enter`: Animated page transition wrapper keyed by current page.
 *    - `Footer`: Presentation navigation, brand mission, and legal copyright.
 * 4. Modal Orchestration:
 *    - Root-level rendering of `BidDialog` when `lead` is present in URL.
 *    - Handles accessible focus trapping, body scroll locking, and Escape key dismissal.
 *
 * TODO (Future Roadmap / Phase 7+):
 * - Secondary pages code-splitting: Lazy-load non-critical routes (e.g., FaqPage, AccountPage)
 *   via `React.lazy()` with `<Suspense>` boundary for faster initial bundle evaluation.
 */
export default function Site() {
  const { page, lead, navigate, openLead, closeLead } = useNavigation()
  useScrollReveal(page)
  useScrollProgress('scroll-progress', page)

  const routes: Record<Page, ReactNode> = {
    home: <HomePage />,
    about: <AboutPage />,
    services: <ServicesPage />,
    pricing: <PricingPage />,
    faq: <FaqPage />,
    contact: <ContactPage />,
    leads: <LeadsPage />,
    account: <AccountPage />,
  }

  return (
    <RouteContext.Provider value={{ page, navigate, openLead }}>
      <div className="site-v2">
        <div className="k-scroll-progress" id="scroll-progress" />
        <Header page={page} />
        <main className="k-page-enter" key={page}>
          {routes[page]}
        </main>
        <Footer />
        {lead && <BidDialog key={lead.id} lead={lead} close={closeLead} />}
      </div>
    </RouteContext.Provider>
  )
}

