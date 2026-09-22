import type { FaqItem } from '../types'

export const FAQ_CATEGORIES = [
  'All',
  'Getting started',
  'Results',
  'Coverage',
  'Team',
  'Pricing',
] as const

export type FaqCategory = (typeof FAQ_CATEGORIES)[number]

/**
 * Pure filter returning FAQ items matching the chosen category.
 * When "All" is chosen, returns all items in their original order.
 */
export function filterFaqs(
  faqList: readonly FaqItem[],
  category: string
): FaqItem[] {
  if (category === 'All') {
    return [...faqList]
  }
  return faqList.filter((item) => item.category === category)
}
