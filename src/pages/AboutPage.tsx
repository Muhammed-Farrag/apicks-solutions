import { ArrowUpRight } from 'lucide-react'
import { PageLink } from '../components/navigation'
import { PageHero, BigCTA } from '../components/common'
/**
 * About Page Component.
 *
 * WHAT WAS DONE (Phases 1-6):
 * - Extracted from Site.tsx into a clean, dedicated page component in Phase 6.
 * - Utilizes shared `PageHero` with index 02 and 3D miniature artwork via `SceneStage`.
 * - Features the brand mission narrative ("Calls are easy. Trust is earned.") and showcase imagery.
 * - Displays the 4 Core Values ("What Drives the Work") grid with reveal triggers.
 * - Closes with shared `BigCTA` component linking to Contact.
 *
 * WHAT TO DO LATER (Phase 7+ Roadmap):
 * - Extract the 4 values array (01 Experienced callers, 02 Clear economics, etc.) into `src/data.ts`.
 * - Add optional Team members card section once leadership profiles are provided.
 */
export function AboutPage() {
  return (
    <>
      <PageHero
        index="02"
        label="WHO WE ARE"
        title={<>THE WORK<br />BEHIND THE<br /><em>WIN.</em></>}
        description="A-Picks Solutions helps wholesalers, investors, and real estate teams turn purposeful outreach into deal momentum."
      >
        <PageLink page="contact" className="k-action k-action-mint">MEET OUR TEAM <ArrowUpRight size={18} /></PageLink>
      </PageHero>
      <section className="k-about-story k-section">
        <div className="k-container k-story-grid">
          <div data-reveal>
            <span className="k-mini-label">THE MISSION / 001</span>
            <h2>CALLS ARE EASY.<br /><em>TRUST IS EARNED.</em></h2>
            <p>We are a real estate telemarketing partner focused on honest outreach, qualified communication, and follow-through. Our job is to make your next decision clearer—not just fill a spreadsheet with names.</p>
            <p>That means trained callers, cost-conscious support, and a campaign shaped around your market and buying criteria.</p>
          </div>
          <div className="k-story-image" data-reveal>
            <img src="./images/townhouse.webp" alt="Illustrative residential property" loading="lazy" />
            <span>THE CONVERSATION CHANGES EVERYTHING / AP 02</span>
          </div>
        </div>
      </section>
      <section className="k-about-values k-section">
        <div className="k-container">
          <div className="k-section-marker">02 <span>WHAT DRIVES THE WORK</span></div>
          <div className="k-values-grid">
            {[
              { n: '01', title: 'Experienced callers', text: 'Professional conversations that build trust and surface useful information.' },
              { n: '02', title: 'Clear economics', text: 'Straightforward pricing and reporting so outreach can grow with your business.' },
              { n: '03', title: 'Built around you', text: 'Campaign criteria, quality reviews, and follow-up shaped to your goals.' },
              { n: '04', title: 'Results that matter', text: 'Qualified leads, booked appointments, and actual deal movement.' },
            ].map((value) => (
              <article key={value.n} data-reveal>
                <span>{value.n}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <BigCTA title={<>GOOD PEOPLE.<br /><em>BETTER PROCESS.</em><br />MORE MOMENTUM.</>} />
    </>
  )
}
