import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import PixelSprite from './PixelSprite'
import type { Sprite } from './sprites'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-pix-red text-pix-panel hover:bg-pix-red-light',
  secondary: 'bg-pix-panel text-pix-ink hover:bg-pix-chipwarm',
  ghost: 'bg-pix-panel-alt text-pix-ink hover:bg-pix-paper-deep',
}

const SIZES: Record<Size, { pad: string; text: string; icon: number; shadow: number }> = {
  sm: { pad: 'h-9 px-3.5', text: 'text-[8px]', icon: 2, shadow: 4 },
  md: { pad: 'h-11 px-5', text: 'text-[9px]', icon: 2, shadow: 5 },
  lg: { pad: 'h-14 px-6 sm:px-7', text: 'text-[11px]', icon: 3, shadow: 6 },
}

interface Common {
  children: ReactNode
  variant?: Variant
  size?: Size
  icon?: Sprite
  iconRight?: Sprite
  className?: string
  full?: boolean
}

type PixelButtonProps = Common &
  (
    | { to: string; href?: never; onClick?: never; type?: never; disabled?: never }
    | { href: string; to?: never; onClick?: never; type?: never; disabled?: never }
    | {
        to?: never
        href?: never
        onClick?: () => void
        type?: 'button' | 'submit'
        disabled?: boolean
      }
  )

/**
 * The CTA. Flat fill + notched outline + hard offset shadow; on press the button
 * travels *into* its own shadow, which is how physical retro UI buttons read.
 * The travel is `steps(2)` — smooth easing on a pixel button looks wrong.
 */
export default function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  className = '',
  full,
  ...rest
}: PixelButtonProps) {
  const s = SIZES[size]

  const inner = (
    <>
      <span
        aria-hidden
        className="pxl-edge pxl-c-shadow absolute inset-0 bg-pix-shadow transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-active:translate-x-0 group-active:translate-y-0"
        style={{ transform: `translate(${s.shadow}px, ${s.shadow}px)` }}
      />
      <span
        className={`pxl-edge relative flex w-full items-center justify-center gap-2.5 ${s.pad} ${VARIANTS[variant]} pxl-label ${s.text} leading-none transition-[transform,background-color] duration-100 [transition-timing-function:steps(2,end)] group-hover:-translate-y-[2px] group-active:translate-x-[4px] group-active:translate-y-[4px]`}
      >
        {icon && <PixelSprite sprite={icon} scale={s.icon} className="shrink-0" />}
        {children}
        {iconRight && <PixelSprite sprite={iconRight} scale={s.icon} className="shrink-0" />}
      </span>
    </>
  )

  const shell = `group relative inline-flex ${full ? 'w-full' : ''} ${className}`

  if ('to' in rest && rest.to) {
    return (
      <Link to={rest.to} className={shell}>
        {inner}
      </Link>
    )
  }

  if ('href' in rest && rest.href) {
    const external = rest.href.startsWith('http')
    return (
      <a
        href={rest.href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className={shell}
      >
        {inner}
      </a>
    )
  }

  const { onClick, type = 'button', disabled } = rest as { onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${shell} disabled:opacity-60`}>
      {inner}
    </button>
  )
}
