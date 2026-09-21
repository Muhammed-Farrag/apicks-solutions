import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const LeadScene = lazy(() => import('../../LeadScene'))

export interface SceneStageProps {
  index?: string
}

/**
 * Interactive viewport staging the Three.js 3D miniature world, radar sweep animation,
 * ping indicators, coordinate readouts, and pointer-driven spotlight effect.
 */
export function SceneStage({ index }: SceneStageProps = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [show3d, setShow3d] = useState(false)

  useEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) {
      setShow3d(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => setShow3d(entry.isIntersecting), {
      rootMargin: '150px',
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const stage = ref.current
    if (!stage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const move = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = stage.getBoundingClientRect()
        stage.style.setProperty('--pointer-x', `${((event.clientX - box.left) / box.width) * 100}%`)
        stage.style.setProperty('--pointer-y', `${((event.clientY - box.height) / box.height) * 100}%`)
      })
    }
    stage.addEventListener('pointermove', move)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      stage.removeEventListener('pointermove', move)
    }
  }, [])

  return (
    <div
      className="k-scene-stage"
      ref={ref}
      aria-label="Three-dimensional visualization of three real-estate opportunities"
    >
      <div className="k-scene-grid" />
      <div className="k-radar-sweep" />
      <div className="k-scene-ring ring-one" />
      <div className="k-scene-ring ring-two" />
      <div className="k-scene-fallback">
        <span className="k-fallback-core" />
      </div>
      {show3d && (
        <Suspense fallback={null}>
          <LeadScene />
        </Suspense>
      )}
      <div className="k-scene-coordinate top-left">40° 55′ / SIGNAL 01</div>
      <div className="k-scene-coordinate bottom-right">AP / {index ?? 'LIVE FIELD'}</div>
      <div className="k-scene-ping ping-a">
        <i /> OWNER CONTACT
      </div>
      <div className="k-scene-ping ping-b">
        <i /> OPPORTUNITY FOUND
      </div>
      <div className="k-scene-ping ping-c">
        <i /> QUALIFIED HANDOFF
      </div>
    </div>
  )
}
