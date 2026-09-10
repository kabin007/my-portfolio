import type { ReactNode } from 'react'

/**
 * Wooden pixel signboard — the roadside markers in the hero and footer scenery.
 *
 * Wood grain is two hard inset lines, not a gradient: gradients are continuous
 * and there is no such thing as a continuous ramp in a pixel palette.
 */
export default function Signboard({
  children,
  post = true,
  postHeight = 28,
  className = '',
  tone = 'wood',
}: {
  children: ReactNode
  /** Draw the supporting post beneath the plank. */
  post?: boolean
  postHeight?: number
  className?: string
  tone?: 'wood' | 'ink'
}) {
  const isInk = tone === 'ink'

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <span
          aria-hidden
          className="pxl-edge pxl-w3 pxl-c-shadow absolute inset-0 translate-x-[4px] translate-y-[4px] bg-pix-shadow"
        />
        <div
          className={`pxl-edge pxl-w3 relative px-3 py-2 text-center ${
            isInk ? 'bg-pix-ink text-pix-panel' : 'bg-pix-wood text-pix-wood-deep'
          }`}
          style={
            isInk
              ? undefined
              : {
                  boxShadow:
                    '0 -3px 0 0 #1C1A20, 0 3px 0 0 #1C1A20, -3px 0 0 0 #1C1A20, 3px 0 0 0 #1C1A20, inset 0 3px 0 0 #E6C694, inset 0 -3px 0 0 #B98A50',
                }
          }
        >
          <span className="pxl-label block text-[9px] leading-[1.7]">{children}</span>
        </div>
      </div>

      {post && (
        <span
          aria-hidden
          className="pxl-edge pxl-w2 w-[10px] bg-pix-wood-mid"
          style={{ height: postHeight }}
        />
      )}
    </div>
  )
}
