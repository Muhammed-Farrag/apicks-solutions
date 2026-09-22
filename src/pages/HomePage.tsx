import type { CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { services, leads } from '../data'
import { PageLink } from '../components/navigation'
import { BigCTA, Marquee } from '../components/common'
import { LeadTile } from '../components/leads'
import { SceneStage } from '../components/scene'
const ADVANTAGE_METRICS = [
  { value: '25', label: 'ACTIVE CALLERS' },
  { value: '16+', label: 'CLIENTS SERVED' },
  { value: '1,500+', label: 'LEADS MONTHLY' },
  { value: '24–48h', label: 'RESPONSE WINDOW' },
] as const

const PIPELINE_PROCESS_STEPS = [
  'Understand your criteria',
  'Find the conversation',
  'Qualify the opportunity',
  'Hand it over with context',
] as const

/**
 * Home Page Component.
 *
 * Cleaned in Phase 7 (DRY & Readability):
 * - Extracted advantage metrics and pipeline process steps into declarative constants.
 * - Simplified JSX loops and streamlined structure.
 */
export function HomePage() {
  return (
    <>
      <section className="k-home-hero">
        <div className="k-hero-copy">
          <div className="k-hero-overline">A-PICKS SOLUTIONS <span> / </span> REAL ESTATE SALES SUPPORT</div>
          <h1>
            <span className="hero-line">THE NEXT</span>
            <span className="hero-line outline">DEAL IS</span>
            <span className="hero-line mint">OUT THERE<span className="hero-period">.</span></span>
          </h1>
          <div className="k-hero-tail">
            <p>We find the opening: qualified seller conversations, disciplined follow-through, and a stronger path from lead to close.</p>
            <div>
              <PageLink page="contact" className="k-action k-action-mint">BUILD YOUR PIPELINE <ArrowUpRight size={19} /></PageLink>
              <PageLink page="leads" className="k-action-line">EXPLORE LEADS <ArrowRight size={18} /></PageLink>
            </div>
          </div>
        </div>
        <SceneStage />
      </section>
      <Marquee />
      <section className="k-home-intro k-section">
        <div className="k-container">
          <div className="k-section-marker">01 <span>THE A-PICKS ADVANTAGE</span></div>
          <div className="k-intro-grid">
            <h2 data-reveal>GOOD DEALS<br />DON’T WAIT<br /><em>FOR A CALL.</em></h2>
            <div data-reveal>
              <p>The right opportunity is rarely sitting in plain sight. We build the list, make the call, qualify the conversation, and put useful information in the hands of investors.</p>
              <PageLink page="services" className="k-underlink">WHAT WE DO <ArrowUpRight size={20} /></PageLink>
            </div>
          </div>
          <div className="k-metric-grid" data-reveal>
            {ADVANTAGE_METRICS.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="k-home-services k-section">
        <div className="k-container">
          <div className="k-section-marker">02 <span>THE ENGINE</span></div>
          <div className="k-wide-head">
            <h2 data-reveal>THE PEOPLE.<br /><em>THE PROCESS.</em><br />THE MOMENTUM.</h2>
            <div className="k-wide-right">
              <div className="k-curved-gallery" aria-label="Property photo gallery" data-reveal>
                <figure className="k-curved-gallery__item"><img src="./images/modern.webp" alt="Modern property" loading="lazy" /></figure>
                <figure className="k-curved-gallery__item"><img src="./images/townhouse.webp" alt="Townhouse property" loading="lazy" /></figure>
                <figure className="k-curved-gallery__item"><img src="./images/img1.jpg" alt="Property exterior" loading="lazy" /></figure>
              </div>
              <PageLink page="services" className="k-underlink">EXPLORE THE FULL SERVICE SYSTEM <ArrowUpRight size={20} /></PageLink>
            </div>
          </div>
          <div className="k-service-stack">
            {services.map((service, i) => (
              <PageLink key={service.number} page="services" className="k-service-row" ariaLabel={`Explore ${service.name}`}>
                <span>{service.number}</span>
                <strong>{service.name}</strong>
                <small>{service.short}</small>
                <ArrowUpRight size={23} style={{ '--delay': `${i * 70}ms` } as CSSProperties} />
              </PageLink>
            ))}
          </div>
        </div>
      </section>
      <section className="k-home-leads k-section">
        <div className="k-container">
          <div className="k-section-marker">03 <span>THE LEAD ROOM</span></div>
          <div className="k-wide-head">
            <h2 data-reveal>OPPORTUNITY<br /><em>HAS AN ADDRESS.</em></h2>
            <div>
              <p>Step into the marketplace preview. The property imagery and bid values are illustrative; the experience shows where live leads will go.</p>
              <PageLink page="leads" className="k-underlink">ENTER THE LEAD ROOM <ArrowUpRight size={20} /></PageLink>
            </div>
          </div>
          <div className="k-lead-grid">
            {leads.map((lead, i) => <LeadTile key={lead.id} lead={lead} index={i} />)}
          </div>
        </div>
      </section>
      <section className="k-home-flow k-section">
        <div className="k-container">
          <div className="k-section-marker">04 <span>FROM SIGNAL TO HANDOFF</span></div>
          <div className="k-flow-head">
            <h2 data-reveal>EVERY STAGE<br /><em>IS CONNECTED.</em></h2>
            <p>Outbound work matters when the next step is clear. Our process keeps sellers, callers, and investors moving together.</p>
          </div>
          <div className="k-flow-grid">
            {PIPELINE_PROCESS_STEPS.map((item, i) => (
              <div key={item} data-reveal style={{ '--delay': `${i * 100}ms` } as CSSProperties}>
                <span>0{i + 1}</span>
                <div className="k-flow-node" />
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BigCTA title={<>LET’S MAKE<br /><em>THE NEXT CALL</em><br />COUNT.</>} />
    </>
  )
}

