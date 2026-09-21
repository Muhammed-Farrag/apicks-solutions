import { useEffect } from 'react'
import { getPrefersReducedMotion } from './useReducedMotionPreference'

/**
 * Observes elements with the [data-reveal] attribute and triggers their entrance transition
 * (.is-visible) when scrolling into view, respecting prefers-reduced-motion settings.
 *
 * @param trigger Value whose change prompts re-observation (e.g., active page route).
 */
export function useScrollReveal(trigger?: unknown): void {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const reduced = getPrefersReducedMotion()
    const nodes = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]

    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    nodes.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [trigger])
}
