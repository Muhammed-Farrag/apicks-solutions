import type { ReactNode } from 'react'
import { SceneStage } from '../scene/SceneStage'

export interface PageHeroProps {
  index: string
  label: string
  title: ReactNode
  description: string
  children?: ReactNode
}

/**
 * Standard hero section used across secondary pages (About, Services, Pricing, FAQ, Contact, Leads, Account).
 */
export function PageHero({ index, label, title, description, children }: PageHeroProps) {
  return (
    <section className="k-page-hero">
      <div className="k-page-hero-grid">
        <div>
          <div className="k-page-overline">
            {index} / {label}
          </div>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </div>
        <div className="k-page-hero-art" aria-hidden="true">
          <SceneStage index={index} />
        </div>
      </div>
    </section>
  )
}
