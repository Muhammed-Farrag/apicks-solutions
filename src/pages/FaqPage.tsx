import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { faqs } from '../data'
import { PageLink } from '../components/navigation'
import { PageHero, BigCTA } from '../components/common'

/**
 * FAQ (Frequently Asked Questions) Page Component.
 *
 * WHAT WAS DONE (Phases 1-6):
 * - Extracted from Site.tsx into a dedicated single-responsibility page in Phase 6.
 * - Utilizes shared `PageHero` with index 05 and 3D signal scene.
 * - Category filter pills: All, Getting started, Results, Coverage, Team, Pricing.
 * - Accessible HTML `<details>` and `<summary>` accordion list with animated plus icon.
 * - Closes with shared `BigCTA` banner.
 *
 * WHAT TO DO LATER (Phase 7+ Roadmap):
 * - Add search bar filtering questions by keyword in addition to category.
 * - Extract category list into `src/data.ts` derived dynamically from FAQ data.
 */
export function FaqPage() {
  const categories = ['All', 'Getting started', 'Results', 'Coverage', 'Team', 'Pricing']
  const [category, setCategory] = useState('All')
  const shown = faqs.filter((item) => category === 'All' || item.category === category)

  return (
    <>
      <PageHero
        index="05"
        label="QUESTIONS"
        title={<>NO GUESSWORK.<br /><em>JUST ANSWERS.</em></>}
        description="Get straight answers about outreach, team training, pricing, and what happens before your first campaign."
      >
        <PageLink page="contact" className="k-action k-action-mint">ASK YOUR OWN QUESTION <ArrowUpRight size={18} /></PageLink>
      </PageHero>
      <section className="k-faq-section k-section">
        <div className="k-container">
          <div className="k-section-marker">01 <span>THE DETAILS</span></div>
          <div className="k-faq-layout">
            <div>
              <h2 data-reveal>THE THINGS<br /><em>YOU SHOULD</em><br />KNOW.</h2>
              <p>Choose a topic. Expand a question. If your market needs a more specific answer, the team is one message away.</p>
              <div className="k-faq-filters" role="group" aria-label="Filter questions">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    aria-pressed={item === category}
                    className={item === category ? 'is-active' : ''}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="k-faq-list" key={category}>
              {shown.map((item, index) => (
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
      <BigCTA title={<>STILL HAVE<br /><em>A QUESTION?</em><br />LET’S TALK.</>} />
    </>
  )
}
