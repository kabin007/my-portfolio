import type { ReactNode } from 'react'
import PixelFrame from './PixelFrame'
import PixelSprite from './PixelSprite'
import type { Sprite } from './sprites'

type Size = 'sm' | 'md' | 'lg'

interface PixelWindowProps {
  title: string
  icon?: Sprite
  children: ReactNode
  size?: Size
  className?: string
  bodyClassName?: string
  /** Titlebar tint. `red` is the default chrome; `ink` marks a focused/system window. */
  tone?: 'red' | 'ink'
  /** Hide the minimise/maximise glyphs, keeping only close. */
  compact?: boolean
  id?: string
  shadow?: number
  /**
   * Element for the title-bar text. Defaults to `h2` because on most sections
   * the window title *is* the section heading. Pass `p` where the window wraps
   * its own `h1` (page headers, the hero) so heading order stays valid.
   */
  titleTag?: 'h2' | 'h3' | 'p'
}

const SIZES: Record<Size, { bar: string; text: string; icon: number; frame: 'thin' | 'base' | 'thick'; ctl: number }> = {
  sm: { bar: 'h-7 px-2', text: 'text-[8px]', icon: 2, frame: 'thin', ctl: 2 },
  md: { bar: 'h-9 px-3', text: 'text-[9px]', icon: 2, frame: 'base', ctl: 2 },
  lg: { bar: 'h-11 px-4', text: 'text-[11px]', icon: 3, frame: 'base', ctl: 3 },
}

/** The three retro window glyphs, drawn as pixels rather than typed as text. */
function WindowControls({ unit, compact }: { unit: number; compact?: boolean }) {
  const bar = { height: unit, width: unit * 4 }
  const box = { width: unit * 4, height: unit * 4, boxShadow: `inset 0 0 0 ${unit}px currentColor` }

  return (
    <span aria-hidden className="flex shrink-0 items-end gap-[6px] text-pix-panel">
      {!compact && <span style={bar} className="bg-current" />}
      {!compact && <span style={box} />}
      <span className="relative" style={{ width: unit * 4, height: unit * 4 }}>
        <span
          className="absolute left-0 top-1/2 w-full bg-current"
          style={{ height: unit, transform: 'translateY(-50%) rotate(45deg)' }}
        />
        <span
          className="absolute left-0 top-1/2 w-full bg-current"
          style={{ height: unit, transform: 'translateY(-50%) rotate(-45deg)' }}
        />
      </span>
    </span>
  )
}

/**
 * A framed "application window" — the layout unit for every section on the site.
 *
 * Sections are windows rather than plain cards because the reference language is
 * a retro desktop: a red title bar naming the section (ABOUT.EXE) does the job of
 * an eyebrow label and a heading at once, and gives every block the same anchor.
 */
export default function PixelWindow({
  title,
  icon,
  children,
  size = 'lg',
  className = '',
  bodyClassName = '',
  tone = 'red',
  compact,
  id,
  shadow = 6,
  titleTag: TitleTag = 'h2',
}: PixelWindowProps) {
  const s = SIZES[size]
  const barTone = tone === 'red' ? 'bg-pix-red' : 'bg-pix-ink'

  return (
    <PixelFrame weight={s.frame} shadow={shadow} className={className} surface="bg-pix-panel" as="section">
      <div id={id} className="flex h-full flex-col">
        {/* Title bar. The bottom rule keeps the 4px outline reading as continuous. */}
        <div
          className={`flex shrink-0 items-center justify-between gap-3 border-b-[3px] border-pix-ink ${barTone} ${s.bar}`}
        >
          <span className="flex min-w-0 items-center gap-2.5">
            {icon && <PixelSprite sprite={icon} scale={s.icon} className="shrink-0 text-pix-panel" />}
            <TitleTag className={`pxl-label truncate text-pix-panel ${s.text}`}>{title}</TitleTag>
          </span>
          <WindowControls unit={s.ctl} compact={compact} />
        </div>

        <div className={`min-w-0 flex-1 ${bodyClassName}`}>{children}</div>
      </div>
    </PixelFrame>
  )
}
