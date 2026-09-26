import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Page } from '../../types'
import { PageLink } from '../navigation/PageLink'

export interface BigCTAProps {
  title: ReactNode
  subtitle?: ReactNode
  overline?: string
  primaryText?: string
  primaryPage?: Page
  secondaryText?: string
  secondaryHref?: string
}

/**
 * Reusable full-width call-to-action banner displayed at the bottom of pages.
 */
export function BigCTA({
  title,
  subtitle,
  overline = 'YOUR NEXT DEAL STARTS WITH A CONVERSATION',
  primaryText = 'START A CONVERSATION',
  primaryPage = 'contact',
  secondaryText,
  secondaryHref,
}: BigCTAProps) {
  return (
    <section className="k-big-cta">
      <div className="k-container">
        <span>{overline}</span>
        <h2 data-reveal>{title}</h2>
        {subtitle && (
          <p data-reveal className="k-big-cta-sub">
            {subtitle}
          </p>
        )}
        <div className="k-big-cta-actions" data-reveal>
          <PageLink page={primaryPage} className="k-action k-action-mint">
            {primaryText} <ArrowUpRight size={20} />
          </PageLink>
          {secondaryText && secondaryHref && (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="k-action-line k-big-cta-secondary"
            >
              {secondaryText} <ArrowRight size={18} />
            </a>
          )}
        </div>
        <div className="k-cta-circles" aria-hidden="true" />
      </div>
    </section>
  )
}
