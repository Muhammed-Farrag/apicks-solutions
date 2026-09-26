import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import type { Page } from '../../types'
import { Brand } from './Brand'
import { PageLink } from '../navigation/PageLink'

export interface HeaderProps {
  page: Page
}

interface NavItem {
  page: Page
  name: string
  hidden?: boolean
}

const NAV_ITEMS: readonly NavItem[] = [
  { page: 'home', name: 'Home' },
  { page: 'about', name: 'About Us' },
  { page: 'services', name: 'Services' },
  { page: 'pricing', name: 'Pricing' },
  // Future Marketplace: reuses existing leads navigation slot, hidden until marketplace launch
  { page: 'leads', name: 'Marketplace', hidden: true },
  { page: 'faq', name: 'FAQ' },
  { page: 'contact', name: 'Contact' },
] as const

/**
 * Top Header Component for A-Picks Solutions.
 *
 * BEHAVIOR & ARCHITECTURE:
 * 1. Balanced 3-Column Composition:
 *    - Left: Brand Logo.
 *    - Center-Right: Primary navigation (Home | About Us | Services | Pricing | FAQ | Contact).
 *    - Right: Squared action buttons (JOIN A-PICKS + LOGIN).
 * 2. Sticky Scroll-Shrink Effect:
 *    - Listens to window scroll events with passive listeners.
 *    - Toggles `.is-scrolled` CSS class when scrollY exceeds 30px, activating a compact backdrop blur.
 * 3. Mobile Responsive Drawer:
 *    - Accessible hamburger button with dynamic `aria-expanded` and `aria-label`.
 *    - Slide-out drawer toggling `.is-open` class on navigation container.
 *    - Displays consistent navigation list with both JOIN A-PICKS and LOGIN action buttons.
 *    - Automatically closes mobile drawer on navigation click.
 * 4. Routing Integration:
 *    - Uses PageLink component which integrates with RouteContext, browser history,
 *      and Native View Transitions API.
 */
export function Header({ page }: HeaderProps) {
  // Mobile drawer open/closed state
  const [open, setOpen] = useState(false)
  // Sticky scroll threshold state (>30px activates compact glassmorphism header)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`k-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="k-header-inner">
          <Brand />
          <nav className={open ? 'k-nav is-open' : 'k-nav'} aria-label="Primary navigation">
            {NAV_ITEMS.filter((item) => !item.hidden).map((item) => (
              <PageLink
                key={item.page + item.name}
                page={item.page}
                onClick={() => setOpen(false)}
                className={page === item.page ? 'is-current' : undefined}
              >
                {item.name}
              </PageLink>
            ))}
            <div className="k-nav-mobile-actions">
              <PageLink
                page="account"
                onClick={() => setOpen(false)}
                className="k-header-btn k-header-btn-primary"
              >
                JOIN A-PICKS <ArrowUpRight size={16} />
              </PageLink>
              <PageLink
                page="login"
                onClick={() => setOpen(false)}
                className="k-header-btn k-header-btn-secondary"
              >
                LOGIN
              </PageLink>
            </div>
          </nav>
          <div className="k-header-actions">
            <PageLink page="account" className="k-header-btn k-header-btn-primary">
              JOIN A-PICKS <ArrowUpRight size={16} />
            </PageLink>
            <PageLink page="login" className="k-header-btn k-header-btn-secondary">
              LOGIN
            </PageLink>
          </div>
          <button
            className="k-menu"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>
    </>
  )
}
