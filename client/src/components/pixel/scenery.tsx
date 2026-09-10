import PixelSprite from './PixelSprite'
import { bush, cloud, grassTuft } from './sprites'

/**
 * Environment art. Everything here is decorative and `aria-hidden`, sits behind
 * content, and is `pointer-events-none` so it can never eat a click.
 *
 * All of it is built from integer-coordinate rects or scaled sprites, so the
 * scenery shares the exact pixel grid as the UI chrome. Mixing a smooth
 * illustration into a pixel layout is the fastest way to make it look cheap.
 */

/* ── clouds ─────────────────────────────────────────────── */

const CLOUDS = [
  { top: '7%', left: '3%', scale: 5, delay: '0s' },
  { top: '15%', left: '64%', scale: 6, delay: '0.8s' },
  { top: '40%', left: '84%', scale: 4, delay: '1.6s' },
  { top: '5%', left: '42%', scale: 4, delay: '2.4s' },
]

export function CloudLayer({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="absolute animate-pix-bob-slow"
          style={{ top: c.top, left: c.left, animationDelay: c.delay }}
        >
          <PixelSprite sprite={cloud} scale={c.scale} />
        </div>
      ))}
    </div>
  )
}

/* ── city skyline ───────────────────────────────────────── */

/** [x, width, height] in sprite pixels, drawn from a 160x48 baseline. */
const BUILDINGS: [number, number, number][] = [
  [0, 14, 22],
  [15, 10, 30],
  [26, 18, 16],
  [45, 12, 38],
  [58, 8, 26],
  [67, 16, 44],
  [84, 11, 30],
  [96, 20, 20],
  [117, 9, 34],
  [127, 15, 26],
  [143, 17, 40],
]

export function Skyline({ className = '' }: { className?: string }) {
  const H = 48
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`}>
      <svg viewBox={`0 0 160 ${H}`} preserveAspectRatio="none" shapeRendering="crispEdges" className="h-full w-full">
        {BUILDINGS.map(([x, w, h], i) => (
          <g key={i}>
            <rect x={x} y={H - h} width={w} height={h} fill={i % 2 ? '#DCD7EE' : '#CFC9E6'} />
            {/* windows: a sparse lattice, not a full grid — reads as a distant city */}
            {Array.from({ length: Math.floor((h - 4) / 5) }).map((_, ry) =>
              Array.from({ length: Math.floor((w - 3) / 4) }).map((_, rx) =>
                (rx + ry) % 2 === 0 ? (
                  <rect
                    key={`${rx}-${ry}`}
                    x={x + 2 + rx * 4}
                    y={H - h + 3 + ry * 5}
                    width={2}
                    height={2}
                    fill="#BDB5D9"
                  />
                ) : null,
              ),
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ── stone wall (the hero ledge the character sits on) ──── */

export function StoneWall({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 120 20" preserveAspectRatio="none" shapeRendering="crispEdges" className="h-full w-full">
        <rect x="0" y="0" width="120" height="20" fill="#C8C3BC" />
        <rect x="0" y="0" width="120" height="3" fill="#DAD5CE" />
        <rect x="0" y="17" width="120" height="3" fill="#807A72" />
        {/* running-bond mortar joints */}
        {[4, 11].map((y, row) => (
          <g key={y}>
            <rect x="0" y={y} width="120" height="1.5" fill="#A59F98" />
            {Array.from({ length: 9 }).map((_, i) => (
              <rect
                key={i}
                x={row % 2 === 0 ? i * 14 + 7 : i * 14}
                y={y}
                width="1.5"
                height="7"
                fill="#A59F98"
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ── ground: bushes over grass over dirt ────────────────── */

const BUSH_ROW = [
  { left: '1%', scale: 4 },
  { left: '9%', scale: 3 },
  { left: '17%', scale: 5 },
  { left: '28%', scale: 3 },
  { left: '36%', scale: 4 },
  { left: '47%', scale: 3 },
  { left: '55%', scale: 5 },
  { left: '66%', scale: 3 },
  { left: '74%', scale: 4 },
  { left: '84%', scale: 3 },
  { left: '92%', scale: 5 },
]

export function BushRow({ className = '' }: { className?: string }) {
  return (
    /* overflow-hidden matters: the right-most bushes are positioned at 92% and
       their sprites run past the container, which would widen the page on
       narrow screens and add a horizontal scrollbar. */
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 overflow-hidden ${className}`}>
      {BUSH_ROW.map((b, i) => (
        <div key={i} className="absolute bottom-0" style={{ left: b.left }}>
          <PixelSprite sprite={bush} scale={b.scale} />
        </div>
      ))}
    </div>
  )
}

/**
 * The full ground band that closes the page: tufted grass, soil, and a course
 * of stone brick at the very bottom — the "end of level" floor.
 */
export function GroundBand({ height = 96, className = '' }: { height?: number; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none relative w-full overflow-hidden ${className}`} style={{ height }}>
      {/* soil */}
      <div className="absolute inset-x-0 bottom-0 top-8 bg-[#6B4A2E]">
        <div className="absolute inset-0 bg-pix-checks bg-checks opacity-40" />
      </div>
      {/* grass cap */}
      <div className="absolute inset-x-0 top-8 h-4 bg-pix-grass-mid" />
      <div className="absolute inset-x-0 top-8 h-1.5 bg-pix-grass" />
      {/* tufts along the crest */}
      <div className="absolute inset-x-0 top-0 h-8">
        {Array.from({ length: 26 }).map((_, i) => (
          <div key={i} className="absolute bottom-0" style={{ left: `${(i * 4) % 100}%` }}>
            <PixelSprite sprite={grassTuft} scale={3} />
          </div>
        ))}
      </div>
      {/* brick course */}
      <div className="absolute inset-x-0 bottom-0 h-5 bg-pix-stone-dark">
        <div className="absolute inset-x-0 top-0 h-1 bg-pix-stone-mid" />
        <div className="flex h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="h-full flex-1 border-r-[3px] border-[#5E5A54]" />
          ))}
        </div>
      </div>
    </div>
  )
}

/** Faint dot lattice — the page's "graph paper" ground tone. */
export function PaperTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-pix-paper bg-pix-dots bg-dots"
    />
  )
}
