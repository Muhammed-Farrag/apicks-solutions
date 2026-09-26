import { useCallback, useEffect, useRef, useState } from 'react'
import type { AuthState, GoogleUserProfile } from '../types/auth'
import {
  googleSignOut,
  initializeGoogleSignIn,
  isGoogleAuthAvailable,
} from '../services/googleAuth'

const SESSION_STORAGE_KEY = 'apicks_google_session'

interface StoredSession {
  user: GoogleUserProfile
  idToken: string
}

/**
 * Custom React Hook for Google Identity Services Authentication.
 *
 * Provides:
 * - State machine tracking: 'unauthenticated' | 'loading' | 'authenticated' | 'error'
 * - `googleButtonRef`: Attaches to a container to render Google's official GIS button
 * - `signOut`: Cleans up session and disables GIS auto-select
 * - `clearError`: Dismisses any active error notification
 */
export function useGoogleAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Restore non-permanent session from sessionStorage if user previously authenticated
    if (typeof window !== 'undefined') {
      try {
        const raw = sessionStorage.getItem(SESSION_STORAGE_KEY)
        if (raw) {
          const parsed: StoredSession = JSON.parse(raw)
          if (parsed.user && parsed.idToken) {
            return {
              status: 'authenticated',
              user: parsed.user,
              idToken: parsed.idToken,
              error: null,
            }
          }
        }
      } catch {
        // Ignore parsing errors and fall through to unauthenticated
      }
    }
    return {
      status: 'unauthenticated',
      user: null,
      idToken: null,
      error: null,
    }
  })

  const googleButtonRef = useRef<HTMLDivElement | null>(null)
  const isConfigured = isGoogleAuthAvailable()

  const handleSuccess = useCallback((idToken: string, user: GoogleUserProfile) => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ idToken, user }))
    } catch {
      // sessionStorage unavailable (e.g. strict private browsing mode)
    }

    setAuthState({
      status: 'authenticated',
      user,
      idToken,
      error: null,
    })
  }, [])

  const handleError = useCallback((errorMessage: string) => {
    setAuthState((prev) => ({
      ...prev,
      status: 'error',
      error: errorMessage,
    }))
  }, [])

  const handleLoading = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      status: 'loading',
      error: null,
    }))
  }, [])

  const clearError = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      error: null,
      status: prev.status === 'error' ? 'unauthenticated' : prev.status,
    }))
  }, [])

  const signOut = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY)
    } catch {
      // Ignore storage errors
    }
    googleSignOut()
    setAuthState({
      status: 'unauthenticated',
      user: null,
      idToken: null,
      error: null,
    })
  }, [])

  // Initialize Google Identity Services and mount the button container
  useEffect(() => {
    let cleanupFn: (() => void) | undefined
    let isCancelled = false

    async function setupGIS() {
      const cleanup = await initializeGoogleSignIn({
        buttonElement: googleButtonRef.current,
        onSuccess: (idToken, user) => {
          if (!isCancelled) handleSuccess(idToken, user)
        },
        onError: (err) => {
          if (!isCancelled) handleError(err)
        },
        onLoading: () => {
          if (!isCancelled) handleLoading()
        },
      })
      if (!isCancelled) {
        cleanupFn = cleanup
      } else {
        cleanup()
      }
    }

    setupGIS()

    return () => {
      isCancelled = true
      if (cleanupFn) cleanupFn()
    }
  }, [handleSuccess, handleError, handleLoading])

  return {
    status: authState.status,
    user: authState.user,
    idToken: authState.idToken,
    error: authState.error,
    isAuthenticated: authState.status === 'authenticated',
    isLoading: authState.status === 'loading',
    isConfigured,
    googleButtonRef,
    signOut,
    clearError,
  }
}
