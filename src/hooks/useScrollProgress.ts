import { useEffect } from 'react'

/**
 * Updates the scaleX transform of the target scroll progress bar on scroll and resize events.
 *
 * @param progressBarId The DOM element ID of the progress bar (default: 'scroll-progress').
 * @param trigger Value whose change recalculates progress (e.g., active page route).
 */
export function useScrollProgress(progressBarId: string = 'scroll-progress', trigger?: unknown): void {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const bar = document.getElementById(progressBarId)
    if (!bar) return

    let frame = 0
    const update = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const limit = document.documentElement.scrollHeight - window.innerHeight
        bar.style.transform = `scaleX(${limit > 0 ? Math.min(window.scrollY / limit, 1) : 0})`
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [progressBarId, trigger])
}
