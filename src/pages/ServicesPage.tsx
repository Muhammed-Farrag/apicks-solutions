import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '../data'
import { PageLink } from '../components/navigation'
import { PageHero, BigCTA } from '../components/common'

/**
 * Services Page Component.
 *
 * WHAT WAS DONE (Phases 1-6):
 * - Extracted from Site.tsx into a dedicated single-responsibility page in Phase 6.
 * - Utilizes shared `PageHero` with index 03 and 3D signal scene.
 * - Interactive service selector tabs with `role="tablist"` and `role="tabpanel"`.
 * - Dynamic display panel switching between:
 *   01 Dedicated Cold Callers, 02 Lead Qualification, 03 Follow-Up Engine, 04 Acquisition Support.
 * - Displays step-by-step process chain for selected service.
 * - "The Support System" proof stripes with check indicators.
 * - Closes with shared `BigCTA` component.
 *
 * WHAT TO DO LATER (Phase 7+ Roadmap):
 * - Sync active service index with query params (e.g. `?page=services&service=02`) for deep linking.
 * - Extract support system proof points into `src/data.ts`.
 */
export function ServicesPage() {
  const [active, setActive] = useState(0)
  const service = services[active]

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
                  aria-selected={active === index}
                  className={active === index ? 'is-active' : ''}
                  onClick={() => setActive(index)}
                >
                  <span>{item.number}</span>
                  <strong>{item.name}</strong>
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>
            <div className="k-service-display" role="tabpanel" key={active}>
              <div className="k-service-display-top">
                <span>SERVICE / {service.number}</span>
                <span>OUTPUT → {service.output.toUpperCase()}</span>
              </div>
              <h2>{service.name}<span>.</span></h2>
              <p>{service.description}</p>
              <div className="k-service-chain">
                {service.steps.map((step, i) => (
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
            {[
              'Outreach built around your market',
              'Qualified leads delivered to your CRM',
              'Daily or weekly performance reporting',
              'Follow-up from first interest to offer',
            ].map((item, i) => (
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
