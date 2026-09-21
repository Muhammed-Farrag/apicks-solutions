import { safeUrl } from '../utils/url'

const DEFAULT_CONTACT_ENDPOINT = 'https://formspree.io/f/mbdeqevq'

/**
 * Resolves the configured contact API endpoint, falling back to Formspree if not configured.
 */
export function getContactEndpoint(): string {
  return safeUrl(import.meta.env.VITE_CONTACT_API_URL) ?? DEFAULT_CONTACT_ENDPOINT
}

/**
 * Submits the contact form data to the contact service.
 * Preserves the exact request method, headers, and payload.
 *
 * @param formData FormData payload from the contact form.
 * @returns The Fetch Response on success, or throws on network/HTTP error.
 */
export async function submitContactMessage(formData: FormData): Promise<Response> {
  const endpoint = getContactEndpoint()
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Contact submission failed with status ${response.status}`)
  }

  return response
}
