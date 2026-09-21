import { useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { callerPackages } from '../data'
import { PageLink } from '../components/navigation'
import { PageHero, BigCTA } from '../components/common'

/**
 * Pricing Page Component.
 *
 * WHAT WAS DONE (Phases 1-6):
 * - Extracted from Site.tsx into a dedicated single-responsibility page in Phase 6.
 * - Interactive caller team calculator with HTML5 range input (2 to 15 callers).
 * - Real-time tier matching (Starter, Focused, Expansion) calculating monthly investment.
 * - Dynamic visual bar meter indicating caller team capacity.
 * - Displays 3 package cards (highlighting 'Focused' as Most Popular).
 * - Promotional banner highlighting reference site special offer ($1,000/caller).
 * - Additional support rate cards (Acquisition managers $8/hr, 2+ at $7/hr, Skip tracing $0.03/record).
 * - Closes with shared `BigCTA` banner.
 *
 * WHAT TO DO LATER (Phase 7+ Roadmap):
 * - Extract pure calculation logic (`calculateMonthlyCost`, `findMatchingPlan`) into a dedicated
 *   utility in `src/utils/pricing.ts` with unit test suite.
 * - Extract additional support services rates into `src/data.ts`.
 */
export function PricingPage() {
  const [callers, setCallers] = useState(4)
  const plan = callerPackages.find((item) => callers >= item.range[0] && callers <= item.range[1]) ?? callerPackages[2]
  const monthly = callers * plan.price

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
            <label htmlFor="caller-count">HOW MANY CALLERS? <strong>{callers}</strong></label>
            <input
              id="caller-count"
              type="range"
              min="2"
              max="15"
              value={callers}
              onChange={(event) => setCallers(Number(event.target.value))}
            />
            <div className="k-calc-range">
              <span>2 CALLERS</span>
              <span>15 CALLERS</span>
            </div>
          </div>
          <div className="k-calc-result" aria-live="polite">
            <span>MONTHLY ESTIMATE / {plan.name.toUpperCase()}</span>
            <strong>${monthly.toLocaleString()}</strong>
            <p>{callers} callers × ${plan.price.toLocaleString()} per caller / month</p>
            <div className="k-calc-bars" aria-hidden="true">
              {Array.from({ length: 15 }, (_, index) => (
                <i key={index} className={index < callers ? 'is-on' : ''} />
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
