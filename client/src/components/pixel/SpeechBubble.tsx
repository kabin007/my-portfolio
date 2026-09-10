import type { ReactNode } from 'react'

type Dir = 'left' | 'right' | 'down'

/**
 * Speech bubble with a stepped pixel tail.
 *
 * The tail is three stacked bars of decreasing width rather than a CSS triangle
 * — a border-triangle anti-aliases its hypotenuse and reads as a smooth arrow,
 * which breaks the grid the rest of the page is drawn on.
 */
export default function SpeechBubble({
  children,
  direction = 'down',
  className = '',
}: {
  children: ReactNode
  direction?: Dir
  className?: string
}) {
  const steps = [
    { w: 12, h: 4 },
    { w: 8, h: 4 },
    { w: 4, h: 4 },
  ]

  return (
    <div className={`relative inline-block ${className}`}>
      <div className="pxl-edge pxl-w3 bg-pix-panel px-3 py-2 text-center font-body text-[13px] font-semibold leading-tight text-pix-ink">
        {children}
      </div>

      <span
        aria-hidden
        className={`absolute flex flex-col ${
          direction === 'down'
            ? 'left-5 top-full items-start'
            : direction === 'left'
              ? 'left-5 top-full items-start'
              : 'right-5 top-full items-end'
        }`}
      >
        {steps.map((s, i) => (
          <span
            key={i}
            className="bg-pix-panel"
            style={{
              width: s.w,
              height: s.h,
              boxShadow:
                direction === 'right'
                  ? `-3px 0 0 0 #1C1A20, 0 3px 0 0 #1C1A20`
                  : `3px 0 0 0 #1C1A20, 0 3px 0 0 #1C1A20`,
            }}
          />
        ))}
      </span>
    </div>
  )
}
