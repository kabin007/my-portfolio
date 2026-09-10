import type { ReactNode } from 'react'

type Tone = 'blue' | 'warm' | 'red' | 'green' | 'plain'

const TONES: Record<Tone, string> = {
  blue: 'bg-pix-chip text-pix-ink-soft',
  warm: 'bg-pix-chipwarm text-pix-ink-soft',
  red: 'bg-pix-red text-pix-panel',
  green: 'bg-[#E6F5DC] text-[#2F6B22]',
  plain: 'bg-pix-panel text-pix-ink-soft',
}

/** A tech tag. 2px frame keeps it visually subordinate to cards and windows. */
export default function PixelChip({
  children,
  tone = 'blue',
  className = '',
  interactive,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
  interactive?: boolean
}) {
  return (
    <span
      className={`pxl-edge pxl-w2 inline-flex items-center px-2.5 py-1.5 font-mono text-[11px] font-medium leading-none ${
        TONES[tone]
      } ${
        interactive
          ? 'cursor-default transition-transform duration-100 [transition-timing-function:steps(2,end)] hover:-translate-y-[3px]'
          : ''
      } ${className}`}
    >
      {children}
    </span>
  )
}
