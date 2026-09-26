import { ContactForm, ContactInfo } from '../components/common'

/**
 * Contact Page Component.
 *
 * WHAT WAS DONE (Phases 1-6):
 * - Extracted from Site.tsx into a dedicated single-responsibility page in Phase 6.
 * - Separated network API logic into `src/services/contactService.ts` in Phase 4.
 * - Reusable ContactForm and ContactInfo extracted and shared with Home page contact section.
 * - Displays agency contact information (phone, email, Albuquerque location, hours).
 * - Contact brief form with name, work email, phone, and project message.
 * - Busy/loading button state and accessible live region status feedback.
 */
export function ContactPage() {
  return (
    <section className="k-contact-section k-section">
        <div className="k-container k-contact-layout">
          <div>
            <div className="k-section-marker">01 <span>SEND THE BRIEF</span></div>
            <h2 data-reveal>YOUR MARKET.<br /><em>YOUR GOALS.</em><br />OUR NEXT CALL.</h2>
            <p>Share the essentials. The team can follow up about outreach, appointments, acquisition support, or lead access.</p>
            <ContactInfo />
          </div>
          <ContactForm showPhone buttonText="SEND YOUR MESSAGE" idPrefix="contact" />
        </div>
      </section>
  )
}

