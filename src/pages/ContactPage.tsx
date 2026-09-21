import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { submitContactMessage } from '../services'
import { PageHero } from '../components/common'

/**
 * Contact Page Component.
 *
 * WHAT WAS DONE (Phases 1-6):
 * - Extracted from Site.tsx into a dedicated single-responsibility page in Phase 6.
 * - Separated network API logic into `src/services/contactService.ts` in Phase 4.
 * - Displays agency contact information (phone, email, Albuquerque location, hours).
 * - Contact brief form with name, work email, phone, and project message.
 * - Busy/loading button state and accessible live region status feedback.
 *
 * WHAT TO DO LATER (Phase 7+ Roadmap):
 * - Add client-side schema validation with error messages under individual input fields.
 * - Add toast notification system instead of inline banner message.
 */
export function ContactPage() {
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (busy) return
    setBusy(true)
    setStatus('')
    const fields = new FormData(form)
    try {
      await submitContactMessage(fields)
      form.reset()
      setStatus('Message sent. A-Picks will be in touch.')
    } catch {
      setStatus('Your message could not be sent. Please email info@apicks-solutions.com or call the team.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHero
        index="06"
        label="CONTACT"
        title={<>LET’S START<br /><em>THE RIGHT</em><br />CONVERSATION.</>}
        description="Tell A-Picks where you invest, what you need from outreach, and what would make your next campaign a success."
      />
      <section className="k-contact-section k-section">
        <div className="k-container k-contact-layout">
          <div>
            <div className="k-section-marker">01 <span>SEND THE BRIEF</span></div>
            <h2 data-reveal>YOUR MARKET.<br /><em>YOUR GOALS.</em><br />OUR NEXT CALL.</h2>
            <p>Share the essentials. The team can follow up about outreach, appointments, acquisition support, or lead access.</p>
            <div className="k-contact-info">
              <div>
                <span>PHONE</span>
                <a href="tel:+14014225616">+1 (401) 422-5616</a>
              </div>
              <div>
                <span>EMAIL</span>
                <a href="mailto:info@apicks-solutions.com">info@apicks-solutions.com</a>
              </div>
              <div>
                <span>LOCATION</span>
                <strong>Albuquerque, New Mexico</strong>
              </div>
              <div>
                <span>HOURS</span>
                <strong>Monday–Friday, 9am–6pm EST</strong>
              </div>
            </div>
          </div>
          <form className="k-contact-form" onSubmit={send}>
            <div className="k-form-head">
              <span>CONTACT / A-PICKS</span>
              <span>01—04</span>
            </div>
            <label htmlFor="contact-name">YOUR NAME</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Name" maxLength={100} />
            <label htmlFor="contact-email">WORK EMAIL</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" maxLength={180} />
            <label htmlFor="contact-phone">PHONE NUMBER</label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required placeholder="+1 (555) 000-0000" maxLength={40} />
            <label htmlFor="contact-message">WHAT ARE YOU WORKING ON?</label>
            <textarea id="contact-message" name="message" required placeholder="Your market, goals, and the support you need" rows={5} maxLength={3000} />
            <input type="hidden" name="_subject" value="New Message from A-Picks Solutions" />
            <button className="k-action k-action-mint" type="submit" disabled={busy}>
              {busy ? 'SENDING…' : 'SEND YOUR MESSAGE'} <ArrowUpRight size={18} />
            </button>
            {status && <p className="k-form-status" role="status">{status}</p>}
            <small>Your message is sent through the contact service used by the current A-Picks site.</small>
          </form>
        </div>
      </section>
    </>
  )
}
