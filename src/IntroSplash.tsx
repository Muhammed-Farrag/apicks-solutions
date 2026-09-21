/**
 * Full-screen fixed splash overlay for A-Picks Solutions.
 *
 * BEHAVIOR & ARCHITECTURE:
 * 1. Hyperiux Vault Stack-Spread Motion:
 *    - Uses an internal fixed scroll container to drive scroll-linked transforms without
 *      interfering with root document scroll.
 *    - Cards begin stacked at center with slight offsets and rotations.
 *    - As user scrolls, cards smoothly scatter outward in a 3D-like perspective ring,
 *      revealing the center branding and headline ("The right lead can change the deal.").
 * 2. Landscape Property Visuals:
 *    - 8 uniform landscape property photos (`CW = 21vw`, `CH = 16vh`, ~1.6:1 aspect ratio).
 *    - Custom per-card rest scaling (`SC`) and coordinates mapped for both desktop and mobile (`targetSm`).
 * 3. Dynamic Pointer Parallax:
 *    - Real-time mouse/touch parallax using Framer Motion springs (`damping: 25, stiffness: 180`).
 * 4. Performance Optimizations Implemented:
 *    - Memoized card components preventing unnecessary re-renders during high-frequency scroll frames.
 *    - Will-change and transform3d GPU layer acceleration hints.
 *    - Passive event listeners and RAF throttling on pointer motion.
 *    - Native `prefers-reduced-motion` detection instantly presents fully spread rest state.
 *
 * @see https://vault.hyperiux.com
 */

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Images (user's landscape property photos) ────────────────────────────────
const IMAGES = [
  { src: "./images/land1.jpg", alt: "Property 1"    },
  { src: "./images/land2.jpg", alt: "Property 2"    },
  { src: "./images/land3.jpg", alt: "Property 3"    },
  { src: "./images/land4.jpg", alt: "Property 4"    },
  { src: "./images/land5.jpg", alt: "Property 5"    },
  { src: "./images/land6.jpg", alt: "Property 6"    },
  { src: "./images/img2.jpg",  alt: "Residential"   },
  { src: "./images/img4.jpg",  alt: "Home exterior" },
];

// ─── Card config — all same LANDSCAPE size ────────────────────────────────────
const CW = 21; // vw — landscape width
const CH = 16; // vh — landscape height  (CW/CH ≈ 1.6:1 ratio)

// Per-card rest scale for subtle visual variation
const SC = [0.90, 0.85, 0.92, 0.88, 0.88, 0.90, 0.85, 0.88];

interface CardDef {
  item: { src: string; alt: string };
  stackOffset: { x: number; y: number };
  stackRotate: number;
  target: { x: number; y: number; rotate: number; scale: number; w: number; h: number };
  targetSm: { x: number; y: number };
  z: number;
}

// SPREAD positions — user-adjusted (closer ring so center stays clear for text)
const CARDS: CardDef[] = [
  { item: IMAGES[0], stackOffset: { x:  -8, y: -10 }, stackRotate: -18, target: { x: -24, y: -16, rotate: 0, scale: SC[0], w: CW, h: CH }, targetSm: { x: -22, y: -40 }, z: 2 },
  { item: IMAGES[1], stackOffset: { x:  14, y: -10 }, stackRotate:  20, target: { x:  24, y: -16, rotate: 0, scale: SC[1], w: CW, h: CH }, targetSm: { x:  22, y: -40 }, z: 3 },
  { item: IMAGES[2], stackOffset: { x: -16, y:   0 }, stackRotate:  -4, target: { x: -36, y:  -2, rotate: 0, scale: SC[2], w: CW, h: CH }, targetSm: { x: -22, y: -19 }, z: 4 },
  { item: IMAGES[3], stackOffset: { x:   1, y: -10 }, stackRotate:  -2, target: { x:   5, y: -29, rotate: 0, scale: SC[3], w: CW, h: CH }, targetSm: { x:  22, y: -19 }, z: 5 },
  { item: IMAGES[4], stackOffset: { x:  18, y:   1 }, stackRotate:   6, target: { x:  37, y:   4, rotate: 0, scale: SC[4], w: CW, h: CH }, targetSm: { x: -22, y:  20 }, z: 6 },
  { item: IMAGES[5], stackOffset: { x:  -6, y:  10 }, stackRotate:   6, target: { x: -20, y:  17, rotate: 0, scale: SC[5], w: CW, h: CH }, targetSm: { x:  22, y:  20 }, z: 7 },
  { item: IMAGES[6], stackOffset: { x:   8, y:   7 }, stackRotate:   3, target: { x:   2, y:  29, rotate: 0, scale: SC[6], w: CW, h: CH }, targetSm: { x: -22, y:  40 }, z: 8 },
  { item: IMAGES[7], stackOffset: { x:  20, y:  12 }, stackRotate:  -7, target: { x:  20, y:  17, rotate: 0, scale: SC[7], w: CW, h: CH }, targetSm: { x:  22, y:  40 }, z: 9 },
];

// ─── Original StackSpread constants (unchanged) ───────────────────────────────
const SCATTER_START   = 0.12;
const SCATTER_END     = 0.90;
const PARALLAX_X      = 2.6;
const PARALLAX_Y      = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const TEXT_FADE_START = 0.30;
const SCROLL_LENGTH   = 300; // vh of internal scrollable content

const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

// ─── Responsive (original logic) ─────────────────────────────────────────────
const RESPONSIVE = {
  desktop: { scale: null as number | null, small: false, colX: null as number | null, card: null as { w: number; h: number } | null },
  small:   { scale: 0.72, small: true, colX: 20, card: { w: 38, h: 20 } },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    const mq   = window.matchMedia("(pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

// ─── Pointer parallax (optimized with cached window size & rAF throttling) ────
function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x    = useSpring(rawX, PARALLAX_SPRING);
  const y    = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;
    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    let winW = window.innerWidth;
    let winH = window.innerHeight;
    const onResize = () => {
      winW = window.innerWidth;
      winH = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    let rafId: number | null = null;
    let latestClientX = 0;
    let latestClientY = 0;

    const updatePosition = () => {
      rafId = null;
      rawX.set((latestClientX / winW) * 2 - 1);
      rawY.set((latestClientY / winH) * 2 - 1);
    };

    const onMove = (e: PointerEvent) => {
      latestClientX = e.clientX;
      latestClientY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const onLeave = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return useMemo(() => ({ x, y }), [x, y]);
}

// ─── Single card (memoized to avoid re-renders on parent state updates) ────────
const SplashCard = memo(function SplashCard({
  card, progress, reduce, scaleMul, isSmall, colX, fixedCard, stackScale, pointer, depth,
}: {
  card: CardDef;
  progress: MotionValue<number>;
  reduce: boolean | null;
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  stackScale: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
}) {
  const flat        = reduce === true;
  const stackRotate = flat ? 0 : card.stackRotate;
  const stackOffset = card.stackOffset;
  const restScale   = scaleMul ?? card.target.scale;

  const sm   = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm ? (colX != null ? Math.sign(sm.x) * colX : sm.x) : card.target.x;
  const endY = sm ? sm.y : card.target.y;
  const endRotate = flat || isSmall ? 0 : card.target.rotate;

  // Original translate formula — -50% centres the card on its anchor point
  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx    = stackOffset.x + (endX - stackOffset.x) * p;
      const ty    = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dx    = tx - px * PARALLAX_X * drift;
      const dy    = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale  = useTransform(progress, [0, 1], [stackScale, restScale]);

  const w = fixedCard ? fixedCard.w : card.target.w;
  const h = fixedCard ? fixedCard.h : card.target.h;

  return (
    <motion.div
      style={{
        position: "absolute", left: "50%", top: "50%",
        width: `${w}vw`, height: `${h}vh`,
        zIndex: card.z ?? 1,
        translate, rotate, scale,
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <div style={{
        position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: 10,
        boxShadow: "0 12px 36px rgba(0,0,0,.55), 0 2px 8px rgba(0,0,0,.3)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}>
        <img
          src={card.item.src}
          alt={card.item.alt}
          draggable={false}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </motion.div>
  );
});

// ─── IntroSplash ──────────────────────────────────────────────────────────────
interface Props { onDone: () => void }

export default function IntroSplash({ onDone }: Props) {
  const reduce    = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } = useResponsive();

  const [visible, setVisible] = useState(true);
  const dismissed = useRef(false);
  const autoDismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Preload all 8 splash images into memory
  useEffect(() => {
    IMAGES.forEach((img) => {
      const el = new Image();
      el.src = img.src;
    });
  }, []);

  // Prevent the landing page from scrolling while the overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      if (autoDismissTimer.current) clearTimeout(autoDismissTimer.current);
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    setVisible(false);         // triggers fade-out on the outer motion.div
    dismissTimer.current = setTimeout(onDone, 650);   // unmount after fade completes
  }, [onDone]);

  // Skip animation for users who prefer reduced motion
  useEffect(() => {
    if (reduce === true) dismiss();
  }, [reduce, dismiss]);

  // ── Internal scroll → drives the StackSpread progress (0 → 1) ──
  const { scrollYProgress } = useScroll({ container: scrollRef });

  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );

  // Auto-dismiss 400 ms after scatter completes (guarded against duplicate timers)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.99 && !dismissed.current && !autoDismissTimer.current) {
      autoDismissTimer.current = setTimeout(dismiss, 400);
    }
  });

  // Enable pointer parallax only after spread is complete
  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setSpread((was) => (was ? p > 0.985 : p >= 0.999));
  });

  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer         = usePointerParallax(spread, parallaxEnabled);
  const noScale         = reduce === true;

  // Text + hint opacity (mirrors original)
  const copyOpacity = useTransform(progress, [TEXT_FADE_START, TEXT_FADE_START + 0.35], [0, 1]);
  const copyScale   = useTransform(progress, [TEXT_FADE_START, 0.9], [0.85, 1]);
  const hintOpacity = useTransform(progress, [0, SCATTER_START], [1, 0]);

  // Precompute depths array
  const depths = useMemo(
    () => CARDS.map((_, i) => (parallaxEnabled ? parallaxDepth(i, CARDS.length) : 0)),
    [parallaxEnabled],
  );

  return (
    <>
      {/* Webkit scrollbar-hide rule for the inner container */}
      <style>{`.intro-scroll::-webkit-scrollbar{display:none}`}</style>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          backgroundColor: "#061f12", overflow: "hidden",
        }}
      >
        {/* ── Inner scrollable container — its scroll drives the animation ── */}
        <div
          ref={scrollRef}
          className="intro-scroll"
          style={{
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            scrollbarWidth: "none",
            overscrollBehavior: "none",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {/* Tall content = how far the user must scroll to complete the spread */}
          <div style={{ height: `${SCROLL_LENGTH}vh`, position: "relative" }}>

            {/* ── Sticky viewport — stays on screen throughout the scroll ── */}
            <div style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
              backgroundColor: "#061f12",
              contain: "layout paint",
              isolation: "isolate",
            }}>

              {/* Green ambient glow */}
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse 55% 45% at 12% 15%, rgba(19,127,63,.28) 0%, transparent 70%)",
              }} />

              {/* ── Cards — z-index 2-9, scatter on scroll ── */}
              <div style={{ position: "absolute", inset: 0 }}>
                {CARDS.map((card, i) => (
                  <SplashCard
                    key={i} card={card} progress={progress} reduce={reduce}
                    scaleMul={scaleMul} isSmall={isSmall} colX={colX}
                    fixedCard={fixedCard} stackScale={0.82}
                    pointer={pointer}
                    depth={depths[i]}
                  />
                ))}
              </div>

              {/* ── Text — z-index 30, always above every card ── */}
              <motion.div
                style={{
                  position: "absolute", inset: 0, zIndex: 30,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  textAlign: "center", padding: "0 24px",
                  // allow pointer-events only on inner content box (so scroll still works outside)
                  pointerEvents: "none",
                  opacity: copyOpacity,
                  scale: noScale ? 1 : copyScale,
                }}
              >
                {/* Dark vignette keeps text legible over any card that drifts close */}
                <div style={{
                  background: "radial-gradient(ellipse 70% 70%, rgba(6,31,18,0.94) 38%, transparent 100%)",
                  borderRadius: "50%",
                  padding: "52px 68px",
                  maxWidth: 520,
                  pointerEvents: "auto",
                }}>
                  {/* Overline */}
                  <p style={{ margin: "0 0 10px", font: "700 9.5px/1 'Montserrat',Arial,sans-serif",
                    letterSpacing: "0.26em", color: "#7be29c", textTransform: "uppercase" }}>
                    A-PICKS SOLUTIONS &nbsp;/&nbsp; REAL ESTATE SALES SUPPORT
                  </p>

                  {/* Headline */}
                  <h2 style={{ margin: "0 0 14px", font: "800 clamp(1.4rem,2.6vw,2.2rem)/1.1 'Montserrat',Arial,sans-serif",
                    color: "#ffffff", letterSpacing: "-0.015em" }}>
                    The right lead can<br />change the deal.
                  </h2>

                  {/* Subtitle */}
                  <p style={{ margin: "0 0 24px", font: "400 clamp(0.78rem,1.1vw,0.92rem)/1.6 'Open Sans',Arial,sans-serif",
                    color: "rgba(255,255,255,0.65)" }}>
                    Discover motivated seller leads.<br />Move faster. Close smarter.
                  </p>

                  {/* CTA — skip scroll, go straight to landing page */}
                  <button
                    onClick={dismiss}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "12px 26px",
                      border: "1px solid rgba(123,226,156,0.4)", borderRadius: 40,
                      background: "rgba(123,226,156,0.12)", color: "#7be29c",
                      font: "700 11.5px/1 'Montserrat',Arial,sans-serif",
                      letterSpacing: "0.14em", textTransform: "uppercase",
                      cursor: "pointer",
                      backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                      transition: "background 0.2s, transform 0.18s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(123,226,156,0.22)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(123,226,156,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}
                    onMouseDown={e  => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Explore Leads →
                  </button>
                </div>
              </motion.div>

              {/* ── Scroll hint — fades out as scatter begins ── */}
              <motion.div
                style={{
                  position: "absolute", bottom: "3vh", left: 0, right: 0, zIndex: 40,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6vh",
                  font: "600 max(11px,0.8vw)/1 'Montserrat',Arial,sans-serif",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#7be29c", pointerEvents: "none",
                  opacity: hintOpacity,
                }}
              >
                <span>Scroll</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ animation: "splash-bounce 1s ease-in-out infinite" }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </motion.div>

            </div>
            {/* /sticky */}
          </div>
          {/* /tall content */}
        </div>
        {/* /scrollable container */}

        {/* Bounce keyframe for scroll-hint arrow */}
        <style>{`
          @keyframes splash-bounce {
            0%,100% { transform: translateY(0); }
            50%      { transform: translateY(5px); }
          }
        `}</style>

      </motion.div>
    </>
  );
}
