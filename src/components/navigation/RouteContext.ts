import { createContext, useContext } from 'react'
import type { Lead, Page } from '../../types'

export interface RouteContextValue {
  page: Page
  navigate: (page: Page) => void
  openLead: (lead: Lead) => void
}

export const RouteContext = createContext<RouteContextValue | null>(null)

export function useRoute(): RouteContextValue {
  const route = useContext(RouteContext)
  if (!route) {
    throw new Error('Route context is missing. Component must be rendered inside a RouteContext.Provider')
  }
  return route
}
