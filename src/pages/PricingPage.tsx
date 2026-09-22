import { useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { callerPackages } from '../data'
import { PageLink } from '../components/navigation'
import { PageHero, BigCTA } from '../components/common'
import {
  MIN_CALLERS,
  MAX_CALLERS,
  DEFAULT_CALLERS,
  findCallerPackage,
  calculateMonthlyPrice,
  formatCurrency,
} from '../utils'

/**
 * Pricing Page Component.
 *
 * Cleaned in Phase 7 (DRY & Readability):
 * - Pure calculation logic extracted to `src/utils/pricing.ts`.
 * - Explicit naming (`selectedCallers`, `selectedPackage`, `monthlyEstimate`).
 * - Constants `MIN_CALLERS` and `MAX_CALLERS` centralized.
 */
export function PricingPage() {
  const [selectedCallers, setSelectedCallers] = useState(DEFAULT_CALLERS)
  const selectedPackage = findCallerPackage(selectedCallers, callerPackages)
  const monthlyEstimate = calculateMonthlyPrice(selectedCallers, selectedPackage.price)

  return (
    <>
      <PageHero
        index="04"
        label="PRICING"
        title={<>CLEAR COSTS.<br /><em>MORE ROOM</em><br />TO GROW.</>}
        description="The calling packages and add-on rates below follow the reference site. Use the calculator to see how team size changes the monthly estimate."
      >
        <PageLink page="contact" className="k-action k-action-mint">DISCUSS A PLAN <ArrowUpRight size={18} /></PageLink>
      </PageHero>
      <section className="k-pricing-calc k-section">
        <div className="k-container k-calc-layout">
          <div>
            <div className="k-section-marker">01 <span>PLAN YOUR CALLING TEAM</span></div>
            <h2 data-reveal>PUT A NUMBER<br /><em>ON MOMENTUM.</em></h2>
            <p>Move the slider to estimate monthly caller costs from the published package tiers. The team can confirm a current quote for your campaign.</p>
            <label htmlFor="caller-count">HOW MANY CALLERS? <strong>{selectedCallers}</strong></label>
            <input
              id="caller-count"
              type="range"
              min={MIN_CALLERS}
              max={MAX_CALLERS}
              value={selectedCallers}
              onChange={(event) => setSelectedCallers(Number(event.target.value))}
            />
            <div className="k-calc-range">
              <span>{MIN_CALLERS} CALLERS</span>
              <span>{MAX_CALLERS} CALLERS</span>
            </div>
          </div>
          <div className="k-calc-result" aria-live="polite">
            <span>MONTHLY ESTIMATE / {selectedPackage.name.toUpperCase()}</span>
            <strong>{formatCurrency(monthlyEstimate)}</strong>
            <p>{selectedCallers} callers × {formatCurrency(selectedPackage.price)} per caller / month</p>
            <div className="k-calc-bars" aria-hidden="true">
              {Array.from({ length: MAX_CALLERS }, (_, index) => (
                <i key={index} className={index < selectedCallers ? 'is-on' : ''} />
              ))}
            </div>
            <small>Caller package pricing only. Taxes or additional services, if any, are excluded.</small>
            <PageLink page="contact" className="k-underlink">GET A CURRENT QUOTE <ArrowUpRight size={18} /></PageLink>
          </div>
        </div>
      </section>
      <section className="k-pricing-plans k-section">
        <div className="k-container">
          <div className="k-section-marker">02 <span>CALLING PACKAGES</span></div>
          <div className="k-package-grid">
            {callerPackages.map((item, index) => (
              <article
                key={item.name}
                className={index === 1 ? 'k-package featured' : 'k-package'}
                data-reveal
                style={{ '--delay': `${index * 100}ms` } as CSSProperties}
              >
                <div className="k-package-head">
                  <span>0{index + 1} / {item.name.toUpperCase()}</span>
                  {index === 1 && <b>MOST POPULAR</b>}
                </div>
                <h3>{item.name}</h3>
                <p>{item.callers}</p>
                <div className="k-package-price">
                  <strong>${item.price.toLocaleString()}</strong>
                  <span>/ CALLER / MONTH</span>
                </div>
                <ul>
                  {item.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <PageLink page="contact" className="k-package-link">ASK ABOUT THIS PACKAGE <ArrowUpRight size={18} /></PageLink>
              </article>
            ))}
          </div>
          <div className="k-promo-band">
            <span>REFERENCE SITE OFFER</span>
            <strong>FIRST 3 MONTHS / FOCUSED PACKAGE: $1,000 PER CALLER</strong>
            <PageLink page="contact">CHECK AVAILABILITY <ArrowUpRight size={16} /></PageLink>
          </div>
        </div>
      </section>
      <section className="k-pricing-extras k-section">
        <div className="k-container">
          <div className="k-section-marker">03 <span>ADDITIONAL SUPPORT</span></div>
          <div className="k-extra-grid">
            <div data-reveal>
              <span>ACQUISITION / LEAD MANAGERS</span>
              <h3>$8 <small>/ HOUR</small></h3>
              <p>For one manager. Lead filtering, offers, and conversion support.</p>
            </div>
            <div data-reveal>
              <span>2+ ACQUISITION MANAGERS</span>
              <h3>$7 <small>/ HOUR</small></h3>
              <p>More coverage with a reduced hourly rate.</p>
            </div>
            <div data-reveal>
              <span>SKIP TRACING</span>
              <h3>$0.03 <small>/ RECORD</small></h3>
              <p>Add accurate contact information to keep lists fresh.</p>
            </div>
          </div>
        </div>
      </section>
      <BigCTA title={<>THE RIGHT TEAM.<br /><em>THE RIGHT SIZE.</em><br />THE RIGHT NEXT STEP.</>} />
    </>
  )
}
