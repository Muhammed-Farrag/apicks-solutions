import { useState } from 'react'
import type { FormEvent } from 'react'
import { Apple, ArrowUpRight } from 'lucide-react'
import { isSignupConfigured, redirectToApple, redirectToGoogle, registerAccountEmail } from '../services'
import { PageLink } from '../components/navigation'
import { PageHero } from '../components/common'

const PIPELINE_PREVIEW_STAGES = [
  { step: '01', label: 'DISCOVER', progress: '72%' },
  { step: '02', label: 'REVIEW', progress: '55%' },
  { step: '03', label: 'MOVE', progress: '86%' },
] as const

/**
 * Account Access / Deal Room Onboarding Page Component.
 *
 * Cleaned in Phase 7 (DRY & Readability):
 * - Clear descriptive naming (`signupStatus`, `isSubmitting`, `handleEmailSignup`).
 * - Declarative pipeline preview stages extracted to `PIPELINE_PREVIEW_STAGES`.
 * - Preserves independent form state and authentication service integration.
 */
export function AccountPage() {
  const [email, setEmail] = useState('')
  const [signupStatus, setSignupStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleEmailSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isSignupConfigured()) {
      setSignupStatus('Email registration is not open yet. Send the team a message for account access.')
      return
    }
    setIsSubmitting(true)
    try {
      await registerAccountEmail(email)
      setSignupStatus('Check your inbox for the next step.')
      setEmail('')
    } catch {
      setSignupStatus('Registration could not be completed. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        index="08"
        label="ACCOUNT ACCESS"
        title={<>A BETTER<br /><em>VIEW OF</em><br />WHAT’S NEXT.</>}
        description="Create your account to follow lead opportunities as the marketplace comes online."
      />
      <section className="k-account-section k-section">
        <div className="k-container k-account-layout">
          <div className="k-account-display" data-reveal>
            <span>YOUR PIPELINE / ACCESS PREVIEW</span>
            <h2>SEE THE SIGNAL.<br /><em>STAY AHEAD.</em></h2>
            <div className="k-account-visual">
              {PIPELINE_PREVIEW_STAGES.map((stage) => (
                <div key={stage.step}>
                  <span>{stage.step}</span>
                  <strong>{stage.label}</strong>
                  <i style={{ width: stage.progress }} />
                </div>
              ))}
            </div>
            <p>The account view is a preview; live leads and personal activity will appear after the authentication and bidding services are connected.</p>
          </div>
          <div className="k-account-form">
            <span>JOIN THE DEAL ROOM</span>
            <h2>START HERE<span>.</span></h2>
            <p>Choose a sign-up method. Provider buttons become live when A-Picks connects its authentication service.</p>
            <button
              className="k-provider"
              onClick={() => {
                if (!redirectToGoogle()) setSignupStatus('Google sign-up is being prepared. Contact the team for access.')
              }}
            >
              <span className="k-google">G</span> CONTINUE WITH GOOGLE <ArrowUpRight size={18} />
            </button>
            <button
              className="k-provider"
              onClick={() => {
                if (!redirectToApple()) setSignupStatus('Apple sign-up is being prepared. Contact the team for access.')
              }}
            >
              <Apple size={20} fill="currentColor" /> CONTINUE WITH APPLE <ArrowUpRight size={18} />
            </button>
            <div className="k-account-divider">OR USE YOUR EMAIL</div>
            <form onSubmit={handleEmailSignup}>
              <label htmlFor="account-email">WORK EMAIL</label>
              <input
                id="account-email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button className="k-action k-action-mint" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'SENDING…' : 'SIGN UP WITH EMAIL'} <ArrowUpRight size={18} />
              </button>
            </form>
            {signupStatus && <p className="k-form-status" role="status">{signupStatus}</p>}
            <PageLink page="contact" className="k-underlink">NEED HELP? TALK TO A-PICKS <ArrowUpRight size={17} /></PageLink>
          </div>
        </div>
      </section>
    </>
  )
}
