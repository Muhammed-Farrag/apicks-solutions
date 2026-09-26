import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useGoogleAuth } from '../hooks'
import { PageLink } from '../components/navigation'

const LOGIN_FEATURES = [
  { step: '01', label: 'CAMPAIGN METRICS', progress: '100%' },
  { step: '02', label: 'LEAD ACTIVITY', progress: '85%' },
  { step: '03', label: 'APPOINTMENTS', progress: '92%' },
] as const

/**
 * Dedicated Member Login Page Component.
 *
 * Implements:
 * - Google Identity Services (GIS) Web Authentication with official credential handler.
 * - Application-styled rectangular Google sign-in button.
 * - Email & Password authentication form inputs.
 * - Seamless navigation link to registration ("JOIN A-PICKS").
 * - Responsive two-column layout inheriting the established A-Picks visual system.
 */
export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localGoogleError, setLocalGoogleError] = useState('')

  const {
    user,
    error: authError,
    isLoading,
    isAuthenticated,
    isConfigured,
    googleButtonRef,
    signOut,
  } = useGoogleAuth()

  function handleEmailLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    // Frontend-only application state: portal authentication service connecting
    setTimeout(() => {
      setLoginStatus('Authentication service is currently being connected for live campaigns. Contact the team for direct portal access.')
      setIsSubmitting(false)
    }, 600)
  }

  const displayedError = authError || localGoogleError

  return (
    <section className="k-account-section k-section">
        <div className="k-container k-account-layout">
          {/* LEFT DISPLAY CARD */}
          <div className="k-account-display" data-reveal>
            <span>CLIENT PORTAL / SECURE ACCESS</span>
            <h2>WELCOME<br /><em>BACK.</em></h2>
            <div className="k-account-visual">
              {LOGIN_FEATURES.map((item) => (
                <div key={item.step}>
                  <span>{item.step}</span>
                  <strong>{item.label}</strong>
                  <i style={{ width: item.progress }} />
                </div>
              ))}
            </div>
            <p>
              The client portal gives real estate investors and wholesalers visibility into daily dial metrics, booked appointments, and lead delivery in real time.
            </p>
          </div>

          {/* RIGHT LOGIN FORM */}
          <div className="k-account-form">
            <span>MEMBER LOGIN</span>
            <h2>SIGN IN<span>.</span></h2>
            <p>Access your A-Picks account using Google or your work credentials.</p>

            {isAuthenticated && user ? (
              <div
                style={{
                  background: '#eaf5ec',
                  border: '1px solid #7be29c',
                  padding: '20px',
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name || user.email}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--green)',
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'var(--green)',
                        color: '#fff',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 800,
                        fontSize: '18px',
                      }}
                    >
                      {(user.name || user.email || 'U')[0].toUpperCase()}
                    </span>
                  )}
                  <div>
                    <strong
                      style={{
                        display: 'block',
                        fontSize: '15px',
                        color: 'var(--pine)',
                        fontFamily: "'Montserrat',Arial,sans-serif",
                      }}
                    >
                      {user.name || 'Google User'}
                    </strong>
                    <span style={{ fontSize: '13px', color: '#53735d' }}>{user.email}</span>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #c9dbc9',
                    paddingTop: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: 'var(--green)',
                    }}
                  >
                    ✓ AUTHENTICATED VIA GOOGLE
                  </span>
                  <button
                    type="button"
                    onClick={signOut}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#8b2b2b',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      letterSpacing: '0.04em',
                    }}
                  >
                    SIGN OUT
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '11px',
                }}
              >
                <div
                  ref={googleButtonRef}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: '44px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (!isConfigured) {
                        setLocalGoogleError(
                          'Google sign-in is not configured. Please set VITE_GOOGLE_CLIENT_ID in your environment.'
                        )
                      }
                    }}
                    disabled={isLoading}
                    className="k-google-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      <path fill="none" d="M0 0h48v48H0z"/>
                    </svg>
                    <span>{isLoading ? 'Connecting…' : 'Sign in with Google'}</span>
                  </button>
                </div>
              </div>
            )}

            {displayedError && (
              <p
                className="k-form-status"
                role="status"
                style={{
                  background: '#fdf2f2',
                  color: '#991b1b',
                  border: '1px solid #fecaca',
                  marginBottom: '16px',
                }}
              >
                {displayedError}
              </p>
            )}

            <div className="k-account-divider">OR USE YOUR EMAIL</div>

            <form onSubmit={handleEmailLogin}>
              <label htmlFor="login-email">WORK EMAIL</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <label htmlFor="login-password">PASSWORD</label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button className="k-action k-action-mint" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'SIGNING IN…' : 'LOGIN'} <ArrowUpRight size={18} />
              </button>
            </form>

            {loginStatus && <p className="k-form-status" role="status">{loginStatus}</p>}

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#5d7864' }}>Don't have an account?</span>
              <PageLink page="account" className="k-underlink">
                JOIN A-PICKS <ArrowUpRight size={17} />
              </PageLink>
            </div>

            <PageLink page="contact" className="k-underlink" style={{ marginTop: '16px' }}>
              NEED HELP? TALK TO A-PICKS <ArrowUpRight size={17} />
            </PageLink>
          </div>
        </div>
      </section>
  )
}
