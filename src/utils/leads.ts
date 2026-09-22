import type { Lead } from '../types'

export const LEAD_CATEGORIES = ['All', 'Single family', 'Townhouse'] as const
export type LeadCategory = (typeof LEAD_CATEGORIES)[number]

/**
 * Pure filter searching and categorizing illustrative lead marketplace items.
 *
 * Filtering rules:
 * - Category filter matches exact lead category, or matches all when "All" is selected.
 * - Search query is case-insensitive, normalized, and checks against property title, city, and state.
 * - Preserves original array ordering for stable presentation.
 */
export function filterLeads(
  leadList: readonly Lead[],
  category: string,
  searchQuery: string
): Lead[] {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return leadList.filter((lead) => {
    const matchesCategory = category === 'All' || lead.category === category
    if (!matchesCategory) return false

    if (!normalizedQuery) return true

    const searchableText = `${lead.title} ${lead.city} ${lead.state}`.toLowerCase()
    return searchableText.includes(normalizedQuery)
  })
}

/**
 * Formats a count number with two digits (e.g. 3 -> "03") for opportunity badges.
 */
export function formatOpportunityCount(count: number): string {
  return count.toString().padStart(2, '0')
}
