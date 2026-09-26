import type { CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import {
  heroMetrics,
  homeFaqs,
  leads,
  services,
  testimonials,
  trustBadges,
  whatWeDoPoints,
  whyChooseUs,
  workProcessSteps,
} from '../data'
import { PageLink } from '../components/navigation'
import { BigCTA, ContactSection, Marquee } from '../components/common'
import { LeadTile } from '../components/leads'
import MorphGallery from '../components/layout/morph-gallery'

const heroGalleryItems = [
  { src: './images/land1.jpg', alt: 'Real estate property 1' },
  { src: './images/land2.jpg', alt: 'Real estate property 2' },
  { src: './images/land3.jpg', alt: 'Real estate property 3' },
  { src: './images/land4.jpg', alt: 'Real estate property 4' },
  { src: './images/land5.jpg', alt: 'Real estate property 5' },
  { src: './images/land6.jpg', alt: 'Real estate property 6' },
]

/**
 * Home Page (Landing Page) Component.
 *
 * Fully audited and completed against business requirements:
 * - HERO: Updated headline, supporting text, primary & WhatsApp CTAs, and active metrics.
 * - WHAT WE DO: Real Estate Sales Support That Delivers + 4 core points + CRM delivery description + imagery.
 * - WHY CHOOSE US: 4 benefit cards (Fast Turnaround, Expert Team, Proven Results, Full Support).
 * - SERVICES: Real Estate Cold Calling, Realtor Appointment Setting, JR & Senior Acquisition Managers, Data Management.
 * - THE LEAD ROOM: Marketplace opportunity preview.
 * - HOW WE WORK: 4-stage process with titles and descriptions.
 * - CLIENT STORIES: Client testimonials from Jordan M., Alex R., and Sam K.
 * - WHY WE STAND OUT: 6 competition trust badges.
 * - FAQ: 4 primary questions with accessible accordions + "View All FAQs" link.
 * - FINAL CTA: Dual action buttons ("Get Started Today" + "Chat on WhatsApp").
 */
export function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="k-home-hero">
        <div className="k-hero-bg">
          <MorphGallery
            items={heroGalleryItems}
            autoplay={3000}
            loop
            arrows={false}
            thumbnails={false}
            height="100%"
          />
        </div>
        <div className="k-hero-overlay" aria-hidden="true" />
        <div className="k-hero-copy">
          <div className="k-hero-overline">A-PICKS SOLUTIONS <span> / </span> REAL ESTATE SALES SUPPORT</div>
          <h1>
            <span className="hero-line">GET MORE</span>
            <span className="hero-line outline">OFF-MARKET DEALS.</span>
            <span className="hero-line mint">GET MORE CLOSED<span className="hero-period">.</span></span>
          </h1>
          <div className="k-hero-tail">
            <p>
              We help real estate wholesalers and investors increase profits with powerful sales support,
              effective lead outreach, and trusted telemarketing services.
            </p>
            <div>
              <PageLink page="contact" className="k-action k-action-mint">
                BOOK A MEETING <ArrowUpRight size={19} />
              </PageLink>
              <a
                href="https://wa.me/14014225616"
                target="_blank"
                rel="noopener noreferrer"
                className="k-action-line"
              >
                WHATSAPP US <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* STATISTICS */}
      <section className="k-home-stats" style={{ background: '#fff' }}>
        <div className="k-container">
          <div className="k-metric-grid" data-reveal>
            {heroMetrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO */}
      <section className="k-home-intro k-section">
        <div className="k-container">
          <div className="k-section-marker">01 <span>WHAT WE DO</span></div>
          <div className="k-what-grid">
            <div className="k-what-visual" data-reveal>
              <div className="k-what-card-image">
                <img src="./images/land5.jpg" alt="A-Picks Real Estate Sales Support" loading="lazy" />
                <span>OFF-MARKET DEAL OUTREACH & CRM DELIVERY</span>
              </div>
            </div>
            <div className="k-what-copy" data-reveal>
              <h2>
                REAL ESTATE SALES<br />
                SUPPORT THAT<br />
                <em>DELIVERS.</em>
              </h2>
              <p className="k-what-desc">
                A-Picks Solutions specializes in providing virtual assistants and cold calling services,
                calling prospects from your list and finding off-market deals, and delivering qualified
                leads right to your CRM.
              </p>
              <div className="k-what-points">
                {whatWeDoPoints.map((point) => (
                  <div key={point} className="k-what-point">
                    <span className="k-what-check">
                      <Check size={15} />
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="k-about-values k-section" style={{ background: '#fff' }}>
        <div className="k-container">
          <div className="k-section-marker">02 <span>WHY CHOOSE US</span></div>
          <div className="k-wide-head">
            <h2 data-reveal>
              WHY A-PICKS<br />
              <em>SOLUTIONS?</em>
            </h2>
            <div data-reveal>
              <p>
                From rapid appointment setting to expert acquisitions support, we handle the entire sales
                funnel so you can focus on closing deals.
              </p>
              <PageLink page="contact" className="k-underlink">
                START YOUR CAMPAIGN <ArrowUpRight size={20} />
              </PageLink>
            </div>
          </div>
          <div className="k-values-grid">
            {whyChooseUs.map((benefit) => (
              <article key={benefit.number} data-reveal>
                <span>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section className="k-home-services k-section">
        <div className="k-container">
          <div className="k-section-marker">03 <span>WHAT WE OFFER</span></div>
          <h2 className="k-services-heading" data-reveal>
            OUR <em>SERVICES.</em>
          </h2>
          <div className="k-service-stack">
            {services.map((service, i) => (
              <PageLink key={service.number} page="services" className="k-service-row" ariaLabel={`Read more about ${service.name}`}>
                <span>{service.number}</span>
                <strong>{service.name}</strong>
                <small>{service.short}</small>
                <span className="k-service-read-more">
                  READ MORE <ArrowUpRight size={19} style={{ '--delay': `${i * 70}ms` } as CSSProperties} />
                </span>
              </PageLink>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE LEAD ROOM (MARKETPLACE PREVIEW) */}
      <section className="k-home-leads k-section">
        <div className="k-container">
          <div className="k-section-marker">04 <span>THE LEAD ROOM</span></div>
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

      {/* 6. HOW WE WORK */}
      <section className="k-home-flow k-section">
        <div className="k-container">
          <div className="k-flow-head">
            <div className="k-section-marker">05 <span>OUR PROCESS</span></div>
            <h2 data-reveal>HOW WE<br /><em>WORK.</em></h2>
            <p>Outbound work matters when the next step is clear. Our process keeps sellers, callers, and investors moving together.</p>
          </div>
          <div className="k-flow-grid">
            {workProcessSteps.map((item, i) => (
              <div key={item.step} data-reveal style={{ '--delay': `${i * 100}ms` } as CSSProperties}>
                <span>{item.step}</span>
                <div className="k-flow-node" />
                <strong>{item.title}</strong>
                <p className="k-flow-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLIENT STORIES */}
      <section className="k-home-testimonials k-section">
        <div className="k-container">
          <div className="k-section-marker">06 <span>CLIENT STORIES</span></div>
          <div className="k-wide-head">
            <h2 data-reveal>
              WHAT CLIENTS<br />
              <em>SAY.</em>
            </h2>
            <div data-reveal>
              <p>
                Feedback from real estate investors, wholesalers, and acquisitions leaders closing deals with our team.
              </p>
              <PageLink page="contact" className="k-underlink">
                JOIN OUR CLIENT ROSTER <ArrowUpRight size={20} />
              </PageLink>
            </div>
          </div>
          <div className="k-testimonials-grid">
            {testimonials.map((item, i) => (
              <article
                key={item.id}
                className="k-testimonial-card"
                data-reveal
                style={{ '--delay': `${i * 100}ms` } as CSSProperties}
              >
                <div className="k-quote-icon" aria-hidden="true">&#8220;</div>
                <p>{item.quote}</p>
                <div className="k-testimonial-author">
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY WE STAND OUT */}
      <section className="k-home-trust k-section">
        <div className="k-container">
          <div className="k-section-marker">07 <span>WHY WE STAND OUT</span></div>
          <h2 className="k-trust-heading" data-reveal>
            WHY YOUR COMPETITION <em>TRUSTS US.</em>
          </h2>
          <p className="k-trust-desc" data-reveal>
            Consistency, transparent pricing, and specialized training built directly for real estate acquisition teams.
          </p>
          <div className="k-trust-grid">
            {trustBadges.map((badge, i) => (
              <div
                key={badge}
                className="k-trust-badge"
                data-reveal
                style={{ '--delay': `${i * 60}ms` } as CSSProperties}
              >
                <span className="k-trust-check">✓</span>
                <h4>{badge}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="k-faq-section k-section">
        <div className="k-container">
          <div className="k-section-marker">08 <span>GOT QUESTIONS?</span></div>
          <div className="k-faq-layout">
            <div>
              <h2 data-reveal>
                FREQUENTLY ASKED<br />
                <em>QUESTIONS.</em>
              </h2>
              <p>
                Straight answers about outreach speed, qualification ratios, and performance commitments before your first campaign.
              </p>
              <div style={{ marginTop: '35px' }}>
                <PageLink page="faq" className="k-action k-action-mint">
                  VIEW ALL FAQS <ArrowUpRight size={19} />
                </PageLink>
              </div>
            </div>
            <div className="k-faq-list">
              {homeFaqs.map((item, index) => (
                <details key={item.question}>
                  <summary>
                    <span>0{index + 1}</span>
                    <strong>{item.question}</strong>
                    <span className="k-faq-plus">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <BigCTA
        title={<>READY TO CLOSE<br /><em>MORE DEALS?</em></>}
        subtitle="Join 16+ successful real estate professionals who trust A-Picks Solutions to grow their business."
        primaryText="GET STARTED TODAY"
        primaryPage="contact"
        secondaryText="CHAT ON WHATSAPP"
        secondaryHref="https://wa.me/14014225616"
      />

      {/* 11. CONTACT US */}
      <ContactSection />
    </>
  )
}
