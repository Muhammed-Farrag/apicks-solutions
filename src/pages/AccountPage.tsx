import { useState } from 'react'
import type { FormEvent } from 'react'
import { Apple, ArrowUpRight } from 'lucide-react'
import { isSignupConfigured, redirectToApple, redirectToGoogle, registerAccountEmail } from '../services'
import { PageLink } from '../components/navigation'
import { PageHero } from '../components/common'

/**
 * Account Access / Deal Room Onboarding Page Component.
 *
 * WHAT WAS DONE (Phases 1-6):
 * - Extracted from Site.tsx into a dedicated single-responsibility page in Phase 6.
 * - Separated authentication & external redirects into `src/services/accountService.ts` in Phase 4.
 * - Displays pipeline preview visualization (01 Discover, 02 Review, 03 Move progress bars).
 * - Provider sign-up buttons for Google and Apple with fallback notifications when unconfigured.
 * - Work email signup form with validation and busy state handling.
 *
 * WHAT TO DO LATER (Phase 7+ Roadmap):
 * - Connect real Supabase / Firebase / Auth0 backend provider.
 * - Add session state store (e.g. `useAuth` hook) to track active user and deal room permissions.
 * - Add protected route guards for authenticated-only deal room actions.
 */
export function AccountPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  async function emailSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isSignupConfigured()) {
      setStatus('Email registration is not open yet. Send the team a message for account access.')
      return
    }
    setBusy(true)
    try {
      await registerAccountEmail(email)
      setStatus('Check your inbox for the next step.')
      setEmail('')
    } catch {
      setStatus('Registration could not be completed. Please try again later.')
    } finally {
      setBusy(false)
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
              <div><span>01</span><strong>DISCOVER</strong><i style={{ width: '72%' }} /></div>
              <div><span>02</span><strong>REVIEW</strong><i style={{ width: '55%' }} /></div>
              <div><span>03</span><strong>MOVE</strong><i style={{ width: '86%' }} /></div>
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
                if (!redirectToGoogle()) setStatus('Google sign-up is being prepared. Contact the team for access.')
              }}
            >
              <span className="k-google">G</span> CONTINUE WITH GOOGLE <ArrowUpRight size={18} />
            </button>
            <button
              className="k-provider"
              onClick={() => {
                if (!redirectToApple()) setStatus('Apple sign-up is being prepared. Contact the team for access.')
              }}
            >
              <Apple size={20} fill="currentColor" /> CONTINUE WITH APPLE <ArrowUpRight size={18} />
            </button>
            <div className="k-account-divider">OR USE YOUR EMAIL</div>
            <form onSubmit={emailSignup}>
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
              <button className="k-action k-action-mint" type="submit" disabled={busy}>
                {busy ? 'SENDING…' : 'SIGN UP WITH EMAIL'} <ArrowUpRight size={18} />
              </button>
            </form>
            {status && <p className="k-form-status" role="status">{status}</p>}
            <PageLink page="contact" className="k-underlink">NEED HELP? TALK TO A-PICKS <ArrowUpRight size={17} /></PageLink>
          </div>
        </div>
      </section>
    </>
  )
}
