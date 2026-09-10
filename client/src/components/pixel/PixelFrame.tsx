import type { ElementType, ReactNode } from 'react'

type Weight = 'thin' | 'base' | 'thick'

const WEIGHT: Record<Weight, string> = {
  thin: 'pxl-w2',
  base: '',
  thick: 'pxl-w5',
}

export interface PixelFrameProps {
  children: ReactNode
  /** Border thickness. thin = 2px (chips), base = 4px (cards), thick = 5px (hero). */
  weight?: Weight
  /** Hard drop-shadow offset in px. 0 disables the shadow layer. */
  shadow?: number
  className?: string
  /** Fill class for the panel, e.g. `bg-pix-panel`. */
  surface?: string
  as?: ElementType
  /** Extra classes for the inner surface only. */
  innerClassName?: string
}

/**
 * The single geometric primitive the whole design system is built on.
 *
 * Two stacked layers:
 *   1. an offset solid-colour layer → the hard pixel drop shadow
 *   2. the panel itself
 *
 * Both wear `.pxl-edge`, whose four directional box-shadows produce an outline
 * with *notched* corners (see index.css). A CSS border can't do that, and the
 * notch is what separates real pixel art from "rounded box with a dark border".
 *
 * The shadow lives in the DOM rather than in a box-shadow so it inherits the
 * same notched geometry as the frame — a blurred CSS shadow would give the
 * whole thing away.
 */
export default function PixelFrame({
  children,
  weight = 'base',
  shadow = 6,
  className = '',
  surface = 'bg-pix-panel',
  as: Tag = 'div',
  innerClassName = '',
}: PixelFrameProps) {
  const edge = `pxl-edge ${WEIGHT[weight]}`

  return (
    <Tag className={`relative ${className}`}>
      {shadow > 0 && (
        <span
          aria-hidden
          className={`${edge} pxl-c-shadow pointer-events-none absolute inset-0 bg-pix-shadow`}
          style={{ transform: `translate(${shadow}px, ${shadow}px)` }}
        />
      )}
      <div className={`${edge} relative h-full ${surface} ${innerClassName}`}>{children}</div>
    </Tag>
  )
}
