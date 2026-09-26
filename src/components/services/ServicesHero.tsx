import { ArrowUpRight } from 'lucide-react'
import { PageLink } from '../navigation'
import { Marquee } from '../common'

/**
 * Dedicated Hero component for the Services Page.
 *
 * Scoped specifically to the Services page:
 * - Rich green background with dense white-dot decorative pattern.
 * - Left column: Existing Services hero copy, overline, typography, and CTA button.
 * - Right column: Decorative dot-patterned area (no 3D object).
 * - Independent from the shared PageHero component.
 */
export function ServicesHero() {
  return (
    <>
      <section className="k-services-hero">
        {/* White dot pattern overlay */}
        <div className="k-services-hero-dots" aria-hidden="true" />

        <div className="k-services-hero-grid">
          <div className="k-services-hero-content">
            <div className="k-page-overline">
              03 / WHAT WE DO
            </div>
            <h1>
              A PIPELINE BUILT TO <em>MOVE.</em>
            </h1>
            <div className="k-services-hero-action-row">
              <p>
                Four connected services, from first seller contact to investor-ready handoff.
              </p>
              <PageLink page="pricing" className="k-action k-action-mint">
                SEE THE NUMBERS <ArrowUpRight size={18} />
              </PageLink>
            </div>
          </div>
        </div>
      </section>
      <Marquee />
    </>
  )
}
