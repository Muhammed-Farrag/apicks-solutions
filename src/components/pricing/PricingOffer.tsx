import { ArrowUpRight, Tag } from 'lucide-react'
import { PageLink } from '../navigation'

/**
 * Dedicated Special Offer Showcase component for the Pricing Page.
 *
 * Encapsulates the high-impact offer layout, gradient-only background,
 * special offer tag icon, caller savings details, and dual call-to-action buttons.
 */
export function PricingOffer() {
  return (
    <section className="k-pricing-offer-hero">
      <div className="k-container">
        <span className="k-offer-badge" data-reveal>
          <Tag size={14} aria-hidden="true" />
          SPECIAL OFFER
        </span>

        <h1 data-reveal>
          FIRST 3 MONTHS SPECIAL.<br />
          <em>SAVE $300 / CALLER EVERY MONTH.</em>
        </h1>

        <p className="k-offer-desc" data-reveal>
          Lock in a discounted rate of <strong>$1,000 / month per caller</strong> (regular $1,300/mo)
          on our Focused Package (2–3 callers). Offer applies to new client campaigns while spots last.
        </p>

        <div className="k-offer-actions" data-reveal>
          <div className="k-offer-price-tag">
            <span className="k-offer-old-price">$1,300/mo</span>
            <strong className="k-offer-new-price">$1,000</strong>
            <span className="k-offer-price-sub">/ CALLER / FIRST 3 MONTHS</span>
          </div>

          <PageLink page="contact" className="k-action k-action-mint">
            CLAIM SPECIAL OFFER <ArrowUpRight size={20} />
          </PageLink>
        </div>

        <small className="k-offer-note" data-reveal>
          Applies to new clients • No setup fees • Standard package tiers below
        </small>
      </div>
    </section>
  )
}
