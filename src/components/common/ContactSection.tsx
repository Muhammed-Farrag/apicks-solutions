import { ContactForm } from './ContactForm'
import { ContactInfo } from './ContactInfo'

/**
 * ContactSection Component.
 *
 * Rendered at the very end of the Home/Landing page immediately before the footer.
 * Reuses the exact Contact page architecture, styling (`k-contact-section`,
 * `k-container`, `k-contact-layout`), contact channels (`ContactInfo`), and extracted `ContactForm`.
 */
export function ContactSection() {
  return (
    <section className="k-contact-section k-section" id="contact-us">
      <div className="k-container k-contact-layout">
        <div>
          <div className="k-section-marker">
            09 <span>Get In Touch</span>
          </div>
          <h2 data-reveal>
            CONTACT <em>US</em>
          </h2>
          <p>
            Share the essentials. Tell A-Picks where you invest, what you need from outreach,
            and what would make your next campaign a success.
          </p>
          <ContactInfo />
        </div>
        <ContactForm showPhone={false} buttonText="SEND MESSAGE" idPrefix="home-contact" />
      </div>
    </section>
  )
}
