export type Page = 'home' | 'about' | 'services' | 'pricing' | 'faq' | 'contact' | 'leads' | 'account' | 'login'

export const PAGE_NAMES: readonly Page[] = [
  'home',
  'about',
  'services',
  'pricing',
  'faq',
  'contact',
  'leads',
  'account',
  'login',
] as const
