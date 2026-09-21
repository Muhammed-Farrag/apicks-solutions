import { useCallback, useEffect, useState } from 'react'
import type { Lead, Page } from '../types'
import { leads } from '../data'
import { currentPage, pageUrl } from '../utils/url'
import { getPrefersReducedMotion } from './useReducedMotionPreference'

export const PAGE_TITLES: Record<Page, string> = {
  home: 'A-Picks Solutions | Find the opening',
  about: 'About | A-Picks Solutions',
  services: 'Services | A-Picks Solutions',
  pricing: 'Pricing | A-Picks Solutions',
  faq: 'Questions | A-Picks Solutions',
  contact: 'Contact | A-Picks Solutions',
  leads: 'Lead marketplace | A-Picks Solutions',
  account: 'Account access | A-Picks Solutions',
}

export interface NavigationState {
  page: Page
  lead: Lead | null
  navigate: (next: Page) => void
  openLead: (item: Lead) => void
  closeLead: () => void
}

/**
 * Encapsulates the application query-parameter routing, browser history synchronization,
 * View Transitions, document title management, and modal lead selection.
 */
export function useNavigation(): NavigationState {
  const [page, setPage] = useState<Page>(currentPage)
  const [lead, setLead] = useState<Lead | null>(
    () => leads.find((item) => item.id === new URLSearchParams(window.location.search).get('lead')) ?? null,
  )

  const navigate = useCallback((next: Page) => {
    const update = () => {
      window.history.pushState({}, '', pageUrl(next))
      setLead(null)
      setPage(next)
      window.scrollTo(0, 0)
    }

    const transition = (document as Document & { startViewTransition?: (callback: () => void) => unknown })
      .startViewTransition

    if (transition && !getPrefersReducedMotion()) {
      transition.call(document, update)
    } else {
      update()
    }
  }, [])

  const openLead = useCallback((item: Lead) => {
    window.history.pushState({}, '', pageUrl('leads', item.id))
    setPage('leads')
    window.scrollTo(0, 0)
    setLead(item)
  }, [])

  const closeLead = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.delete('lead')
    window.history.replaceState({}, '', url)
    setLead(null)
  }, [])

  useEffect(() => {
    const onPopState = () => {
      setPage(currentPage())
      setLead(leads.find((item) => item.id === new URLSearchParams(window.location.search).get('lead')) ?? null)
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    document.title = PAGE_TITLES[page]
  }, [page])

  return { page, lead, navigate, openLead, closeLead }
}
