import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

/**
 * Traps keyboard focus within a container, manages Tab/Shift+Tab cycling,
 * optionally handles Escape key dismissals, and restores focus upon unmount.
 *
 * @param containerRef Reference to the dialog or modal container element.
 * @param active Whether the focus trap is currently active.
 * @param onClose Optional callback invoked when the user presses Escape.
 * @param initialFocusSelector Optional CSS selector for the element to focus first.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean = true,
  onClose?: () => void,
  initialFocusSelector?: string,
): void {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!active || typeof document === 'undefined') return

    const container = containerRef.current
    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null

    // Focus the initial element or the first focusable element
    if (container) {
      const initialTarget = initialFocusSelector
        ? container.querySelector<HTMLElement>(initialFocusSelector)
        : null
      if (initialTarget) {
        initialTarget.focus()
      } else {
        const firstFocusable = container.querySelector<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        firstFocusable?.focus()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current?.()
        return
      }

      if (event.key === 'Tab' && containerRef.current) {
        const focusableItems = [
          ...containerRef.current.querySelectorAll<HTMLElement>(
            'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ].filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)

        if (focusableItems.length === 0) {
          event.preventDefault()
          return
        }

        const firstItem = focusableItems[0]
        const lastItem = focusableItems[focusableItems.length - 1]

        if (event.shiftKey && document.activeElement === firstItem) {
          event.preventDefault()
          lastItem.focus()
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault()
          firstItem.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousActiveElement?.focus()
    }
  }, [containerRef, active, initialFocusSelector])
}
