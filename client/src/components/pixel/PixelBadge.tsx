import type { ReactNode } from 'react'
import PixelSprite from './PixelSprite'
import type { Sprite } from './sprites'

type Tone = 'red' | 'ink' | 'green' | 'cream'

const TONES: Record<Tone, string> = {
  red: 'bg-pix-red text-pix-panel',
  ink: 'bg-pix-ink text-pix-panel',
  green: 'bg-[#4F9E36] text-pix-panel',
  cream: 'bg-pix-panel-alt text-pix-ink',
}

/**
 * Tiny status marker — FEATURED, CURRENT, OPEN TO WORK.
 * Deliberately unframed: at this size a 2px outline turns the label to mush.
 */
export default function PixelBadge({
  children,
  tone = 'red',
  icon,
  pulse,
  className = '',
}: {
  children: ReactNode
  tone?: Tone
  icon?: Sprite
  pulse?: boolean
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 pxl-label text-[8px] leading-none ${TONES[tone]} ${className}`}
    >
      {pulse && <span aria-hidden className="h-1.5 w-1.5 animate-pix-sparkle bg-current" />}
      {icon && <PixelSprite sprite={icon} scale={1} />}
      {children}
    </span>
  )
}
