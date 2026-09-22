import type { CallerPackage } from '../types'
import { callerPackages } from '../data'

export const MIN_CALLERS = 2
export const MAX_CALLERS = 15
export const DEFAULT_CALLERS = 4

/**
 * Finds the corresponding caller package tier based on team size.
 * If no package matches the range, falls back to the highest package tier.
 */
export function findCallerPackage(
  callers: number,
  packages: readonly CallerPackage[] = callerPackages
): CallerPackage {
  const matched = packages.find(
    (pkg) => callers >= pkg.range[0] && callers <= pkg.range[1]
  )
  return matched ?? packages[packages.length - 1] ?? callerPackages[2]
}

/**
 * Calculates total estimated monthly investment for the calling team.
 */
export function calculateMonthlyPrice(callers: number, packagePrice: number): number {
  return callers * packagePrice
}

/**
 * Formats a number as a localized USD currency string without cents.
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString()}`
}
