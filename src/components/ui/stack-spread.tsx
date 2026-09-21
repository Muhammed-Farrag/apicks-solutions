// Built using Hyperiux Vault: https://vault.hyperiux.com
// Adapted for A-Picks Solutions landing page splash screen

"use client";

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
import { useEffect, useRef, useState } from "react";

// ─── Local property images (A-Picks brand assets) ───────────────────────────
const IMG = {
  modern:    "./images/modern.webp",
  ranch:     "./images/ranch.webp",
  townhouse: "./images/townhouse.webp",
  img1:      "./images/img1.jpg",
} as const;

// Per-image rest scale (index 1-8). Values below 1 shrink that card.
const SCALE: Partial<Record<number, number>> = {
  1: 0.9,
  2: 0.85,
  3: 0.92,
  4: 0.88,
  5: 0.88,
  6: 0.9,
  7: 0.9,
  8: 0.8,
};
const s = (i: number) => SCALE[i] ?? 1;

// Array order = stack order, back (z2) → front (z9)
// Layout mirrors original: 4-quadrant scatter on desktop, column grid on mobile
const CARDS: StackSpreadCard[] = [
  // top-left
  {
    item: { src: IMG.modern, alt: "Modern property" },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: s(8), w: 17, h: 22 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  // top-right
  {
    item: { src: IMG.ranch, alt: "Ranch-style property" },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: s(7), w: 18, h: 32 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  // mid-left
  {
    item: { src: IMG.townhouse, alt: "Townhouse property" },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: s(6), w: 15, h: 32 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  // top-centre
  {
    item: { src: IMG.img1, alt: "Property exterior" },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: s(5), w: 25, h: 30 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  // mid-right
  {
    item: { src: IMG.modern, alt: "Modern home exterior" },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: s(4), w: 18, h: 32 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  // bottom-left
  {
    item: { src: IMG.ranch, alt: "Ranch property side view" },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: s(3), w: 22, h: 25 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  // bottom-centre
  {
    item: { src: IMG.townhouse, alt: "Townhouse neighbourhood" },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 0, scale: s(2), w: 20, h: 26 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  // bottom-right
  {
    item: { src: IMG.img1, alt: "Residential street" },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 0, scale: s(1), w: 16, h: 20 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

// ─── Mechanism ───────────────────────────────────────────────────────────────

const SCATTER_START = 0.12;
const SCATTER_END  = 0.9;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const RESPONSIVE = {
  desktop: {
    scale: null as number | null,
    small: false,
    colX:  null as number | null,
    card:  null as { w: number; h: number } | null,
  },
  small: {
    scale: 0.72,
    small: true,
    colX:  22,
    card:  { w: 40, h: 20 },
  },
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

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x    = useSpring(rawX, PARALLAX_SPRING);
  const y    = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;
    if (!active) { rawX.set(0); rawY.set(0); return; }
    const onMove  = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth)  * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => { rawX.set(0); rawY.set(0); };
    window.addEventListener("pointermove",   onMove,  { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove",   onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

// ─── Public types ─────────────────────────────────────────────────────────────

export interface StackSpreadItem {
  src: string;
  alt?: string;
}

export interface StackSpreadTarget {
  x: number; y: number; rotate: number; scale?: number; w: number; h: number;
}

export interface StackSpreadCard {
  item: StackSpreadItem;
  target: StackSpreadTarget;
  targetSm?: { x: number; y: number };
  stackRotate?: number;
  stackOffset?: { x: number; y: number };
  z?: number;
}

// ─── Card ────────────────────────────────────────────────────────────────────

function Card({
  card, progress, reduce, clusterRotation, scaleMul,
  isSmall, colX, fixedCard, stackScale, cardRadius, pointer, depth,
}: {
  card: StackSpreadCard;
  progress: MotionValue<number>;
  reduce: boolean | null;
  clusterRotation: boolean;
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  stackScale: number;
  cardRadius: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
}) {
  const { item, target } = card;
  const flat        = reduce === true;
  const stackRotate = flat ? 0 : clusterRotation ? card.stackRotate ?? 0 : 0;
  const stackOffset = card.stackOffset ?? { x: 0, y: 0 };
  const restScale   = scaleMul ?? target.scale ?? 1;

  const sm   = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm ? (colX != null ? Math.sign(sm.x) * colX : sm.x) : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx   = stackOffset.x + (endX - stackOffset.x) * p;
      const ty   = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dx   = tx - px * PARALLAX_X * drift;
      const dy   = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale  = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width:   `${fixedCard ? fixedCard.w : target.w}vw`,
        height:  `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex:  card.z ?? 1,
        translate,
        rotate,
        scale,
      }}
    >
      <CardFace item={item} cardRadius={cardRadius} />
    </motion.div>
  );
}

function CardFace({ item, cardRadius }: { item: StackSpreadItem; cardRadius: number }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden max-md:rounded-[4vw]"
      style={{ borderRadius: `${cardRadius}px` }}
    >
      <img
        src={item.src}
        alt={item.alt ?? ""}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

// ─── Stage ───────────────────────────────────────────────────────────────────

interface StackSpreadStageProps {
  cards: StackSpreadCard[];
  scrollLength?: number;
  bgColor?: string;
  clusterRotation?: boolean;
  stackScale?: number;
  cardRadius?: number;
  textColor?: string;
  textFadeStart?: number;
  showScrollHint?: boolean;
  headline?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

function StackSpreadStage({
  cards,
  scrollLength = 250,
  bgColor       = "#061f12",
  clusterRotation = true,
  stackScale    = 0.82,
  cardRadius    = 8,
  textColor     = "#ffffff",
  textFadeStart = 0.3,
  showScrollHint = true,
  headline      = "The right lead can change the deal.",
  subtitle      = "Discover motivated seller leads. Move faster. Close smarter.",
  ctaText       = "Explore Leads →",
  onCtaClick,
}: StackSpreadStageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce  = useReducedMotion();
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } = useResponsive();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );

  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setSpread((was) => (was ? p > 0.985 : p >= 0.999));
  });

  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer         = usePointerParallax(spread, parallaxEnabled);
  const noScale         = reduce === true;

  const copyOpacity = useTransform(progress, [textFadeStart, textFadeStart + 0.35], [0, 1]);
  const copyScale   = useTransform(progress, [textFadeStart, 0.9], [0.85, 1]);
  const hintOpacity = useTransform(progress, [0, SCATTER_START], [1, 0]);

  return (
    <section
      ref={wrapRef}
      className="relative w-full"
      style={{ height: `${scrollLength}vh`, backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ zIndex: 2000, backgroundColor: bgColor }}>

        {/* Subtle green radial glow at top-left */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 55% 45% at 12% 15%, rgba(19,127,63,.28) 0%, transparent 70%)",
          }}
        />

        {/* Centre copy */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center max-md:px-8"
          style={{ opacity: copyOpacity, scale: noScale ? 1 : copyScale }}
        >
          {/* Overline */}
          <p
            className="mb-[1.5vw] text-[0.85vw] font-bold uppercase tracking-[0.28em] max-md:mb-3 max-md:text-[3vw]"
            style={{ color: "#7be29c", letterSpacing: "0.28em" }}
          >
            A-PICKS SOLUTIONS&nbsp; /&nbsp; REAL ESTATE SALES SUPPORT
          </p>

          {/* Headline */}
          <h2
            className="w-full whitespace-pre-line text-[4vw] font-extrabold leading-none! tracking-tight max-md:text-[9.5vw]"
            style={{ color: textColor, fontFamily: "'Montserrat', Arial, sans-serif" }}
          >
            {headline}
          </h2>

          {/* Subtitle */}
          <p
            className="mt-[1.4vw] w-full max-w-[40ch] text-[1.1vw] leading-relaxed tracking-tight max-md:mt-3 max-md:text-[3.4vw]"
            style={{ color: textColor, opacity: 0.65 }}
          >
            {subtitle}
          </p>

          {/* CTA */}
          {ctaText && (
            <button
              onClick={onCtaClick}
              className="pointer-events-auto mt-[2vw] inline-flex items-center gap-[0.6vw] rounded-full border border-[rgba(123,226,156,0.4)] bg-[rgba(123,226,156,0.12)] px-[2vw] py-[0.7vw] text-[0.95vw] font-bold uppercase tracking-[0.15em] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-[rgba(123,226,156,0.22)] active:scale-95 max-md:mt-6 max-md:gap-2 max-md:rounded-full max-md:px-7 max-md:py-3 max-md:text-[3.2vw]"
              style={{ color: "#7be29c" }}
              aria-label={ctaText}
            >
              {ctaText}
            </button>
          )}
        </motion.div>

        {/* Scattering cards */}
        <div className="absolute inset-0 z-10">
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              progress={progress}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, cards.length) : 0}
            />
          ))}
        </div>

        {/* Scroll hint */}
        {showScrollHint && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[3vh] z-20 flex flex-col items-center gap-[0.6vh] text-[0.8vw] font-bold uppercase tracking-[0.22em] max-md:bottom-6 max-md:gap-1 max-md:text-[2.8vw]"
            style={{ color: "#7be29c", opacity: hintOpacity }}
          >
            <span>Scroll</span>
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth={2}
              strokeLinecap="round" strokeLinejoin="round"
              className="animate-bounce max-md:h-[4vw] max-md:w-[4vw]"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export interface StackSpreadProps {
  scrollLength?: number;
  bgColor?: string;
  clusterRotation?: boolean;
  stackScale?: number;
  cardRadius?: number;
  textColor?: string;
  textFadeStart?: number;
  showScrollHint?: boolean;
  headline?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export default function StackSpread({
  scrollLength  = 250,
  bgColor       = "#061f12",
  clusterRotation = true,
  stackScale    = 0.82,
  cardRadius    = 8,
  textColor     = "#ffffff",
  textFadeStart = 0.3,
  showScrollHint = true,
  headline      = "The right lead can change the deal.",
  subtitle      = "Discover motivated seller leads. Move faster. Close smarter.",
  ctaText       = "Explore Leads →",
  onCtaClick,
}: StackSpreadProps) {
  return (
    <StackSpreadStage
      cards={CARDS}
      scrollLength={scrollLength}
      bgColor={bgColor}
      clusterRotation={clusterRotation}
      stackScale={stackScale}
      cardRadius={cardRadius}
      textColor={textColor}
      textFadeStart={textFadeStart}
      showScrollHint={showScrollHint}
      headline={headline}
      subtitle={subtitle}
      ctaText={ctaText}
      onCtaClick={onCtaClick}
    />
  );
}
