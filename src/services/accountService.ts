import { safeUrl } from '../utils/url'

/**
 * Resolves the email signup endpoint URL if configured and safe.
 */
export function getSignupEndpoint(): string | null {
  return safeUrl(import.meta.env.VITE_SIGNUP_API_URL)
}

/**
 * Checks whether the email signup service is configured and ready.
 */
export function isSignupConfigured(): boolean {
  return getSignupEndpoint() !== null
}

/**
 * Submits an email registration request to the configured signup endpoint.
 * Preserves the exact request method, payload format, and credentials policy.
 *
 * @param email The work email address to register.
 * @returns The Fetch Response on success, or throws on failure.
 */
export async function registerAccountEmail(email: string): Promise<Response> {
  const endpoint = getSignupEndpoint()
  if (!endpoint) {
    throw new Error('SIGNUP_ENDPOINT_NOT_CONFIGURED')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
    credentials: 'same-origin',
  })

  if (!response.ok) {
    throw new Error(`Registration failed with status ${response.status}`)
  }

  return response
}

/**
 * Resolves the configured Google OAuth entry point URL.
 */
export function getGoogleAuthUrl(): string | null {
  return safeUrl(import.meta.env.VITE_GOOGLE_AUTH_URL)
}

/**
 * Redirects the browser window to Google OAuth entry point if configured.
 *
 * @returns true if redirect was triggered, false if unconfigured.
 */
export function redirectToGoogle(): boolean {
  const url = getGoogleAuthUrl()
  if (!url || typeof window === 'undefined') return false
  window.location.assign(url)
  return true
}

/**
 * Resolves the configured Apple OAuth entry point URL.
 */
export function getAppleAuthUrl(): string | null {
  return safeUrl(import.meta.env.VITE_APPLE_AUTH_URL)
}

/**
 * Redirects the browser window to Apple OAuth entry point if configured.
 *
 * @returns true if redirect was triggered, false if unconfigured.
 */
export function redirectToApple(): boolean {
  const url = getAppleAuthUrl()
  if (!url || typeof window === 'undefined') return false
  window.location.assign(url)
  return true
}
