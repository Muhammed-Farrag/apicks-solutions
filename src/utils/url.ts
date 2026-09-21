import type { DragEvent } from 'react'
import type { Page } from '../types'
import { PAGE_NAMES } from '../types'

/**
 * Validates whether an external configuration URL uses a safe protocol (https, or http on localhost).
 */
export function safeUrl(value: string | undefined): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    if (url.protocol === 'https:' || (url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) {
      return url.href
    }
  } catch {
    /* Invalid configuration stays unavailable. */
  }
  return null
}

/**
 * Reads the active page name from the current window location search parameters.
 */
export function currentPage(): Page {
  const value = new URLSearchParams(window.location.search).get('page')
  return PAGE_NAMES.find((name) => name === value) ?? 'home'
}

/**
 * Constructs a formatted query-parameter URL for navigation and sharing.
 */
export function pageUrl(page: Page, leadId?: string): string {
  const url = new URL(window.location.href)
  if (page === 'home') {
    url.searchParams.delete('page')
  } else {
    url.searchParams.set('page', page)
  }
  if (leadId) {
    url.searchParams.set('lead', leadId)
  } else {
    url.searchParams.delete('lead')
  }
  url.hash = ''
  return url.href
}

/**
 * Attaches drag-and-drop link metadata to anchor drag events.
 */
export function dragLink(event: DragEvent<HTMLAnchorElement>): void {
  event.dataTransfer.setData('text/uri-list', event.currentTarget.href)
  event.dataTransfer.setData('text/plain', event.currentTarget.href)
}
