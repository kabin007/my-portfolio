import { useMemo } from 'react'
import type { Sprite } from './sprites'

interface PixelSpriteProps {
  sprite: Sprite
  /** Rendered size of one sprite pixel, in CSS px. Keep it a whole number. */
  scale?: number
  className?: string
  /** Mirror horizontally — lets one critter sprite face both ways. */
  flip?: boolean
  /** Decorative by default; pass a label to expose it to assistive tech. */
  label?: string
}

/**
 * Renders a character-map sprite as run-length-encoded <rect>s.
 *
 * `shapeRendering="crispEdges"` plus integer coordinates means no anti-aliasing
 * on the pixel boundaries at any scale — the whole point of the exercise.
 */
export default function PixelSprite({ sprite, scale = 4, className = '', flip, label }: PixelSpriteProps) {
  const rects = useMemo(() => {
    if (import.meta.env.DEV) {
      if (sprite.rows.length !== sprite.h) {
        console.warn(`PixelSprite: expected ${sprite.h} rows, got ${sprite.rows.length}`)
      }
      const off = sprite.rows.findIndex((r) => r.length !== sprite.w)
      if (off !== -1) console.warn(`PixelSprite: row ${off} is ${sprite.rows[off].length}px, expected ${sprite.w}`)
    }

    const out: { x: number; y: number; w: number; fill: string; key: string }[] = []
    sprite.rows.forEach((row, y) => {
      let x = 0
      while (x < row.length) {
        const ch = row[x]
        let run = 1
        while (x + run < row.length && row[x + run] === ch) run++
        if (ch !== '.') {
          const fill = sprite.palette[ch]
          if (fill) out.push({ x, y, w: run, fill, key: `${y}-${x}` })
        }
        x += run
      }
    })
    return out
  }, [sprite])

  return (
    <svg
      viewBox={`0 0 ${sprite.w} ${sprite.h}`}
      width={sprite.w * scale}
      height={sprite.h * scale}
      shapeRendering="crispEdges"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {rects.map((r) => (
        <rect key={r.key} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  )
}
