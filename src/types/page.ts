export type Page = 'home' | 'about' | 'services' | 'pricing' | 'faq' | 'contact' | 'leads' | 'account'

export const PAGE_NAMES: readonly Page[] = [
  'home',
  'about',
  'services',
  'pricing',
  'faq',
  'contact',
  'leads',
  'account',
] as const
