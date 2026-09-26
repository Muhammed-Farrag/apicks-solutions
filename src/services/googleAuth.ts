import type { GoogleSignInOptions, GoogleUserProfile } from '../types/auth'

const GIS_SCRIPT_URL = 'https://accounts.google.com/gsi/client?hl=en'

/**
 * Returns the configured Google OAuth Web Client ID from the environment.
 * The Client ID is public and frontend-safe.
 */
export function getGoogleClientId(): string {
  return (import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim()
}

/**
 * Checks whether Google authentication is configured with a valid client ID.
 */
export function isGoogleAuthAvailable(): boolean {
  const clientId = getGoogleClientId()
  return Boolean(clientId && clientId !== 'your_google_client_id')
}

/**
 * Dynamically loads the official Google Identity Services (GIS) client script
 * if it has not already been loaded into the document.
 */
export function loadGoogleIdentityScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not defined'))
      return
    }

    if (window.google?.accounts?.id) {
      resolve()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${GIS_SCRIPT_URL}"]`
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Failed to load Google Identity Services library')),
        { once: true }
      )
      // If script is already loaded but accounts not yet populated, poll briefly
      let attempts = 0
      const checkInterval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(checkInterval)
          resolve()
        } else if (++attempts > 50) {
          clearInterval(checkInterval)
          reject(new Error('Google Identity Services library initialization timed out'))
        }
      }, 100)
      return
    }

    const script = document.createElement('script')
    script.src = GIS_SCRIPT_URL
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google Identity Services library'))
    document.head.appendChild(script)
  })
}

/**
 * Safely decodes standard claims from a Google ID token (JWT) on the client.
 *
 * NOTE: The frontend cannot cryptographically verify Google's signature without
 * a backend. In production, the raw ID token must be sent to the backend endpoint
 * (e.g. POST /auth/google) where the server verifies it with Google's public keys.
 */
export function decodeGoogleIdToken(token: string): GoogleUserProfile | null {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null

    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    const payload = JSON.parse(jsonPayload)
    return {
      sub: payload.sub || '',
      email: payload.email || '',
      emailVerified: Boolean(payload.email_verified),
      name: payload.name || '',
      givenName: payload.given_name || '',
      familyName: payload.family_name || '',
      picture: payload.picture || '',
    }
  } catch {
    return null
  }
}

/**
 * Future backend verification bridge:
 *
 * CONCEPTUAL FLOW WHEN BACKEND IS IMPLEMENTED:
 *   Google Identity Services (Popup)
 *              ↓
 *   Google ID token / credential
 *              ↓
 *   POST /auth/google { credential }
 *              ↓
 *   Backend verifies signature with Google OIDC certs
 *              ↓
 *   Backend creates user session / httpOnly cookie
 *              ↓
 *   Frontend receives authenticated session
 *
 * In this frontend-only phase, this service acts as the isolated handler,
 * safely extracting user claims for UI display without claiming production security.
 */
export async function verifyGoogleCredentialWithBackend(
  idToken: string
): Promise<{ success: boolean; user?: GoogleUserProfile; error?: string }> {
  const backendAuthUrl = (import.meta.env.VITE_BACKEND_AUTH_URL || '').trim()

  if (backendAuthUrl) {
    try {
      const response = await fetch(`${backendAuthUrl}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: idToken }),
        credentials: 'include',
      })

      if (!response.ok) {
        return {
          success: false,
          error: `Backend authentication failed with status ${response.status}`,
        }
      }

      const data = await response.json()
      return { success: true, user: data.user || decodeGoogleIdToken(idToken) }
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Network error during backend verification',
      }
    }
  }

  // Frontend-only mode: decode claims for immediate frontend state
  const user = decodeGoogleIdToken(idToken)
  if (!user || !user.email) {
    return { success: false, error: 'Google credential payload is invalid or missing email.' }
  }

  return { success: true, user }
}

/**
 * Initializes Google Identity Services (GIS) on the target page.
 * Renders the official Google button inside the specified container.
 *
 * @returns A cleanup function to cancel GIS subscriptions when unmounting.
 */
export async function initializeGoogleSignIn({
  buttonElement,
  onSuccess,
  onError,
  onLoading,
}: GoogleSignInOptions): Promise<() => void> {
  const clientId = getGoogleClientId()

  if (!clientId || clientId === 'your_google_client_id') {
    onError('Google Client ID is not configured. Please set VITE_GOOGLE_CLIENT_ID in your environment.')
    return () => {}
  }

  try {
    await loadGoogleIdentityScript()
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Failed to load Google Identity Services.')
    return () => {}
  }

  if (!window.google?.accounts?.id) {
    onError('Google Identity Services could not be initialized.')
    return () => {}
  }

  try {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response) => {
        if (!response.credential) {
          onError('Google did not return a valid credential. Please try again.')
          return
        }

        onLoading?.()

        try {
          const result = await verifyGoogleCredentialWithBackend(response.credential)
          if (result.success && result.user) {
            onSuccess(response.credential, result.user)
          } else {
            onError(result.error || 'Authentication verification failed.')
          }
        } catch (err) {
          onError(err instanceof Error ? err.message : 'Google authentication processing failed.')
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
      error_callback: (error) => {
        onError(typeof error === 'string' ? error : 'Google Sign-In encountered an error.')
      },
    })

    if (buttonElement) {
      const availableWidth = buttonElement.clientWidth || (typeof window !== 'undefined' ? window.innerWidth - 72 : 380)
      const buttonWidth = Math.min(380, Math.max(200, Math.floor(availableWidth)))
      window.google.accounts.id.renderButton(buttonElement, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: buttonWidth,
        locale: 'en',
      })
    }
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Failed to initialize Google Sign-In.')
  }

  return () => {
    try {
      window.google?.accounts?.id?.cancel()
    } catch {
      // Ignore cleanup errors during unmount
    }
  }
}

/**
 * Disables automatic account selection in GIS and cleans up session state.
 */
export function googleSignOut(): void {
  try {
    window.google?.accounts?.id?.disableAutoSelect()
  } catch {
    // Graceful no-op if GIS is not loaded
  }
}
