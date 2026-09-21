import { useEffect } from 'react'

/**
 * Reusable hook to lock/unlock document body scrolling when overlays or dialogs are active.
 * Restores the previous overflow style upon unmount or deactivation.
 *
 * @param locked Whether body scrolling should be locked (defaults to true).
 */
export function useBodyScrollLock(locked: boolean = true): void {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [locked])
}
