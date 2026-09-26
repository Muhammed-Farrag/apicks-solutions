import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { PageLink } from '../navigation'
import { Marquee } from '../common'

const HOUSE_IMG_SRC = './images/Télécharger_ai_généré_dessin_animé_maison_clipart_désir_illustration_gratuitement-removebg-preview.png'

/**
 * Dedicated Hero component for the About Page.
 *
 * Scoped specifically to the About page:
 * - Vertical green gradient background (darkest green at top → lightest green at bottom).
 * - Left column: Transparent floating house illustration with smooth hover animation.
 * - Right column: Unchanged About hero copy, overline, typography, and call-to-action button.
 * - Independent from the shared PageHero component.
 */
export function AboutHero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <section className="k-about-hero">
        <div className="k-about-hero-grid">
          {/* 1. LEFT SIDE: Existing About Text */}
          <div className="k-about-hero-content">
            <div className="k-page-overline">
              02 / WHO WE ARE
            </div>
            <h1>
              THE WORK<br />
              BEHIND THE<br />
              <em>WIN.</em>
            </h1>
            <p>
              A-Picks Solutions helps wholesalers, investors, and real estate teams turn purposeful outreach into deal momentum.
            </p>
            <PageLink page="contact" className="k-action k-action-mint">
              MEET OUR TEAM <ArrowUpRight size={18} />
            </PageLink>
          </div>

          {/* 2. RIGHT SIDE: Floating House Image */}
          <div
            className="k-about-house-visual"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={HOUSE_IMG_SRC}
              alt="House illustration"
              className={`k-about-house-img ${isHovered ? 'is-floating' : ''}`}
              draggable={false}
            />
          </div>
        </div>
      </section>
      <Marquee />
    </>
  )
}
