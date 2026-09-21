import type { ReactNode } from 'react'
import type { Page } from '../../types'
import { dragLink, pageUrl } from '../../utils/url'
import { useRoute } from './RouteContext'

export interface PageLinkProps {
  page: Page
  className?: string
  children: ReactNode
  onClick?: () => void
  ariaLabel?: string
}

/**
 * Custom navigation link that intercepts mouse clicks to coordinate query-parameter
 * routing and view transitions, while allowing standard browser behavior on modifier keys.
 */
export function PageLink({ page, className, children, onClick, ariaLabel }: PageLinkProps) {
  const { navigate } = useRoute()

  return (
    <a
      className={className}
      href={pageUrl(page)}
      aria-label={ariaLabel}
      onDragStart={dragLink}
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return
        }
        event.preventDefault()
        onClick?.()
        navigate(page)
      }}
    >
      {children}
    </a>
  )
}
