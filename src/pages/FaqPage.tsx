import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { faqs } from '../data'
import { PageLink } from '../components/navigation'
import { PageHero, BigCTA } from '../components/common'
import { FAQ_CATEGORIES, filterFaqs } from '../utils'

/**
 * FAQ (Frequently Asked Questions) Page Component.
 *
 * Cleaned in Phase 7 (DRY & Readability):
 * - Pure category filtering logic extracted to `src/utils/faq.ts`.
 * - Category list centralized as `FAQ_CATEGORIES`.
 * - Clear descriptive state naming (`selectedCategory`, `filteredFaqs`).
 */
export function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const filteredFaqs = filterFaqs(faqs, selectedCategory)

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
                {FAQ_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                    className={selectedCategory === category ? 'is-active' : ''}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="k-faq-list" key={selectedCategory}>
              {filteredFaqs.map((item, index) => (
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
