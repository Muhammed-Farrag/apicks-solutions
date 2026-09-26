import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { getContactEndpoint, submitContactMessage } from '../../services'

export interface ContactFormProps {
  /**
   * Whether to include the phone number field.
   * Dedicated Contact page includes phone (`true`),
   * while Home page contact section excludes it (`false`).
   * Default: `false`.
   */
  showPhone?: boolean
  /**
   * Text for the submit button when idle.
   * Default: `'Send Message'`.
   */
  buttonText?: string
  /**
   * Unique prefix for input and label IDs.
   * Default: `'contact'`.
   */
  idPrefix?: string
}

/**
 * Reusable Contact Form Component.
 *
 * Source of truth: Extracted from the Contact page (`ContactPage.tsx`).
 * Shared between ContactPage and the landing page ContactSection.
 */
export function ContactForm({
  showPhone = false,
  buttonText = 'Send Message',
  idPrefix = 'contact',
}: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (isSubmitting) return
    setIsSubmitting(true)
    setSubmitStatus('')
    const fields = new FormData(form)
    try {
      await submitContactMessage(fields)
      form.reset()
      setSubmitStatus('Message sent. A-Picks will be in touch.')
    } catch {
      setSubmitStatus('Your message could not be sent. Please email info@apicks-solutions.com or call the team.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className="k-contact-form"
      action={getContactEndpoint()}
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="k-form-head">
        <span>CONTACT / A-PICKS</span>
        <span>{showPhone ? '01—04' : '01—03'}</span>
      </div>

      <label htmlFor={`${idPrefix}-name`}>YOUR NAME</label>
      <input
        id={`${idPrefix}-name`}
        name="name"
        type="text"
        autoComplete="name"
        required
        placeholder="Name *"
        maxLength={100}
      />

      <label htmlFor={`${idPrefix}-email`}>WORK EMAIL</label>
      <input
        id={`${idPrefix}-email`}
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Email *"
        maxLength={180}
      />

      {showPhone && (
        <>
          <label htmlFor={`${idPrefix}-phone`}>PHONE NUMBER</label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="+1 (555) 000-0000"
            maxLength={40}
          />
        </>
      )}

      <label htmlFor={`${idPrefix}-message`}>WHAT ARE YOU WORKING ON?</label>
      <textarea
        id={`${idPrefix}-message`}
        name="message"
        required
        placeholder="Your message"
        rows={5}
        maxLength={3000}
      />

      <input type="hidden" name="_subject" value="New Message from A-Picks Solutions" />

      <button className="k-action k-action-mint" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'SENDING…' : buttonText} <ArrowUpRight size={18} />
      </button>

      {submitStatus && (
        <p className="k-form-status" role="status">
          {submitStatus}
        </p>
      )}

      <small>Your message is sent through the contact service used by the current A-Picks site.</small>
    </form>
  )
}
