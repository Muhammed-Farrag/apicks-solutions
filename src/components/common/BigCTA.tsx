import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PageLink } from '../navigation/PageLink'

export interface BigCTAProps {
  title: ReactNode
}

/**
 * Reusable full-width call-to-action banner displayed at the bottom of pages.
 */
export function BigCTA({ title }: BigCTAProps) {
  return (
    <section className="k-big-cta">
      <div className="k-container">
        <span>YOUR NEXT DEAL STARTS WITH A CONVERSATION</span>
        <h2 data-reveal>{title}</h2>
        <PageLink page="contact" className="k-action k-action-mint">
          START A CONVERSATION <ArrowUpRight size={20} />
        </PageLink>
        <div className="k-cta-circles" aria-hidden="true" />
      </div>
    </section>
  )
}
