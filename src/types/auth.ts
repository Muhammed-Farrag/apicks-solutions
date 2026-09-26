/**
 * Google Identity Services User Profile Decoded from ID Token (JWT).
 * Contains standard OpenID Connect profile claims returned by Google.
 */
export interface GoogleUserProfile {
  sub: string
  email: string
  emailVerified?: boolean
  name?: string
  givenName?: string
  familyName?: string
  picture?: string
}

/**
 * Frontend authentication state machine status.
 */
export type AuthStatus = 'unauthenticated' | 'loading' | 'authenticated' | 'error'

/**
 * Complete frontend-safe authentication state.
 */
export interface AuthState {
  status: AuthStatus
  user: GoogleUserProfile | null
  idToken: string | null
  error: string | null
}

/**
 * Options for Google Identity Services initialization and button rendering.
 */
export interface GoogleSignInOptions {
  buttonElement: HTMLElement | null
  onSuccess: (idToken: string, user: GoogleUserProfile) => void
  onError: (errorMessage: string) => void
  onLoading?: () => void
}

/**
 * Google Identity Services Global Interface on `window.google`.
 */
export interface GoogleCredentialResponse {
  credential: string
  select_by?: string
}

export interface GooglePromptMomentNotification {
  isNotDisplayed: () => boolean
  isSkippedMoment: () => boolean
  isDismissedMoment: () => boolean
  getNotDisplayedReason: () => string
  getSkippedReason: () => string
  getDismissedReason: () => string
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: GoogleCredentialResponse) => void
            auto_select?: boolean
            cancel_on_tap_outside?: boolean
            context?: 'signin' | 'signup' | 'use'
            prompt_parent_id?: string
            state_cookie_domain?: string
            error_callback?: (error: unknown) => void
          }) => void
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: 'standard' | 'icon'
              theme?: 'outline' | 'filled_blue' | 'filled_black'
              size?: 'large' | 'medium' | 'small'
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
              shape?: 'rectangular' | 'pill' | 'circle' | 'square'
              logo_alignment?: 'left' | 'center'
              width?: number | string
              locale?: string
            }
          ) => void
          prompt: (momentListener?: (notification: GooglePromptMomentNotification) => void) => void
          cancel: () => void
          disableAutoSelect: () => void
          storeCredential: (credential: unknown, callback?: () => void) => void
        }
      }
    }
  }
}
