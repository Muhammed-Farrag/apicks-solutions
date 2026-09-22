import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '../data'
import { PageLink } from '../components/navigation'
import { PageHero, BigCTA } from '../components/common'

const SUPPORT_PROOF_POINTS = [
  'Outreach built around your market',
  'Qualified leads delivered to your CRM',
  'Daily or weekly performance reporting',
  'Follow-up from first interest to offer',
] as const

/**
 * Services Page Component.
 *
 * Cleaned in Phase 7 (DRY & Readability):
 * - Clear descriptive naming (`activeServiceIndex`, `selectedService`).
 * - Safe fallback indexing for service item lookup.
 * - Extracted support proof points constant.
 */
export function ServicesPage() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const selectedService = services[activeServiceIndex] ?? services[0]

  return (
    <>
      <PageHero
        index="03"
        label="WHAT WE DO"
        title={<>A PIPELINE<br />BUILT TO<br /><em>MOVE.</em></>}
        description="Four connected services, from first seller contact to investor-ready handoff."
      >
        <PageLink page="pricing" className="k-action k-action-mint">SEE THE NUMBERS <ArrowUpRight size={18} /></PageLink>
      </PageHero>
      <section className="k-services-work k-section">
        <div className="k-container">
          <div className="k-section-marker">01 <span>SELECT A SERVICE</span></div>
          <div className="k-services-panel">
            <div className="k-services-selector" role="tablist" aria-label="Services">
              {services.map((item, index) => (
                <button
                  key={item.number}
                  role="tab"
                  aria-selected={activeServiceIndex === index}
                  className={activeServiceIndex === index ? 'is-active' : ''}
                  onClick={() => setActiveServiceIndex(index)}
                >
                  <span>{item.number}</span>
                  <strong>{item.name}</strong>
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>
            <div className="k-service-display" role="tabpanel" key={activeServiceIndex}>
              <div className="k-service-display-top">
                <span>SERVICE / {selectedService.number}</span>
                <span>OUTPUT → {selectedService.output.toUpperCase()}</span>
              </div>
              <h2>{selectedService.name}<span>.</span></h2>
              <p>{selectedService.description}</p>
              <div className="k-service-chain">
                {selectedService.steps.map((step, i) => (
                  <div key={step}>
                    <span>0{i + 1}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
              <PageLink page="contact" className="k-underlink">TALK THROUGH THIS SERVICE <ArrowUpRight size={20} /></PageLink>
            </div>
          </div>
        </div>
      </section>
      <section className="k-services-proof k-section">
        <div className="k-container">
          <div className="k-section-marker">02 <span>THE SUPPORT SYSTEM</span></div>
          <h2 data-reveal>YOU CLOSE.<br /><em>WE KEEP THE</em><br />ENGINE RUNNING.</h2>
          <div className="k-proof-stripes">
            {SUPPORT_PROOF_POINTS.map((item, i) => (
              <div key={item} data-reveal>
                <span>0{i + 1}</span>
                <strong>{item}</strong>
                <Check size={20} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <BigCTA title={<>PUT THE RIGHT<br /><em>TEAM BEHIND</em><br />YOUR PIPELINE.</>} />
    </>
  )
}
