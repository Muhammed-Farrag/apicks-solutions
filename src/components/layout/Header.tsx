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
}

const NAV_ITEMS: readonly NavItem[] = [
  { page: 'about', name: 'About' },
  { page: 'services', name: 'Services' },
  { page: 'pricing', name: 'Pricing' },
  { page: 'leads', name: 'Leads' },
  { page: 'faq', name: 'FAQ' },
  { page: 'contact', name: 'Contact' },
  { page: 'account', name: 'Account access' },
] as const

/**
 * Top Header Component for A-Picks Solutions.
 *
 * BEHAVIOR & ARCHITECTURE:
 * 1. Announcement Bar: Displays the top off-market badge with direct CTA link to Lead Room.
 * 2. Sticky Scroll-Shrink Effect:
 *    - Listens to window scroll events with passive listeners.
 *    - Toggles `.is-scrolled` CSS class when scrollY exceeds 30px, activating a compact backdrop blur.
 * 3. Desktop Navigation:
 *    - Maps all 7 primary subpages.
 *    - Highlights active route with `.is-current` class based on current Page prop.
 * 4. Mobile Responsive Drawer:
 *    - Accessible hamburger button with dynamic `aria-expanded` and `aria-label`.
 *    - Slid-out drawer toggling `.is-open` class on navigation container.
 *    - Automatically closes mobile drawer on navigation click.
 * 5. Routing Integration:
 *    - Uses PageLink component which integrates with RouteContext, browser history,
 *      and Native View Transitions API.
 *
 * TODO (Future Roadmap / Phase 7+):
 * - Add user authentication avatar & notification badge when logged into deal room.
 * - Add key listener for Escape to close mobile menu when open.
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
      <div className="k-announcement">
        <span>THE OFF-MARKET ADVANTAGE</span>
        <span>CALLS → CONVERSATIONS → OPPORTUNITIES</span>
        <PageLink page="leads">
          ENTER THE LEAD ROOM <ArrowUpRight size={14} />
        </PageLink>
      </div>
      <header className={`k-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="k-header-inner">
          <Brand />
          <nav className={open ? 'k-nav is-open' : 'k-nav'} aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <PageLink
                key={item.page}
                page={item.page}
                onClick={() => setOpen(false)}
                className={`${page === item.page ? 'is-current ' : ''}${
                  item.page === 'account' ? 'k-nav-account' : ''
                }`}
              >
                {item.name}
              </PageLink>
            ))}
          </nav>
          <PageLink page="account" className="k-header-join">
            JOIN A-PICKS <ArrowUpRight size={17} />
          </PageLink>
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
