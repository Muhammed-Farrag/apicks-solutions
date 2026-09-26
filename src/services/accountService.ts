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
