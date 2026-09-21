/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_AUTH_URL?: string
  readonly VITE_APPLE_AUTH_URL?: string
  readonly VITE_SIGNUP_API_URL?: string
  readonly VITE_CONTACT_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
