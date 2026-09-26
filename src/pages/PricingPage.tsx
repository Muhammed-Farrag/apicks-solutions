import type { CSSProperties } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { callerPackages } from '../data'
import { PageLink } from '../components/navigation'
import { BigCTA, Marquee } from '../components/common'
import { PricingOffer } from '../components/pricing'

/**
 * Pricing Page Component.
 *
 * Features the dedicated PricingOffer hero component, followed by
 * caller package tiers and additional acquisitions support.
 */
export function PricingPage() {
  return (
    <>
      {/* 1. SPECIAL OFFER HERO */}
      <PricingOffer />

      <Marquee />

      {/* 2. CALLING PACKAGES */}
      <section className="k-pricing-plans k-section">
        <div className="k-container">
          <div className="k-section-marker">01 <span>CALLING PACKAGES</span></div>
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
                <PageLink page="contact" className="k-package-link">
                  ASK ABOUT THIS PACKAGE <ArrowUpRight size={18} />
                </PageLink>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 3. ADDITIONAL SUPPORT */}
      <section className="k-pricing-extras k-section">
        <div className="k-container">
          <div className="k-section-marker">02 <span>ADDITIONAL SUPPORT</span></div>
          <div className="k-extra-grid">
            <div data-reveal>
              <span>ACQUISITION / LEAD MANAGERS</span>
              <h3>$8 <small>/ HOUR</small></h3>
              <p>For one manager. Lead filtering, offers, and conversion support.</p>
            </div>
            <div data-reveal>
              <span>DISPOSITION ASSISTANCE</span>
              <h3>$8 <small>/ HOUR</small></h3>
              <p>Buyer matching, outreach coordination, and transaction support.</p>
            </div>
            <div data-reveal>
              <span>SKIP TRACING DATA</span>
              <h3>0.03 <small>/ RECORD</small></h3>
              <p>Targeted contact data validation for owner records and lists.</p>
            </div>
          </div>
        </div>
      </section>

      <BigCTA
        title={<>TRANSPARENT COSTS.<br /><em>PREDICTABLE ROI.</em><br />NO HIDDEN FEES.</>}
        subtitle="Talk to an acquisitions specialist today to get a customized campaign proposal tailored to your target markets."
        primaryText="REQUEST CUSTOM PROPOSAL"
        primaryPage="contact"
      />
    </>
  )
}
