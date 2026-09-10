import { useEffect, useRef, useState } from 'react'

interface PixelTerminalProps {
  lines: string[]
  className?: string
  /** ms per character. Set 0 to render instantly (no typing). */
  speed?: number
}

/**
 * Sunken code strip with a type-on effect and a blinking block caret.
 *
 * Typing only starts once the element is on screen, and the whole thing
 * short-circuits to the final frame under `prefers-reduced-motion` — an
 * animation nobody asked for shouldn't also be an animation nobody can stop.
 */
export default function PixelTerminal({ lines, className = '', speed = 34 }: PixelTerminalProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [chars, setChars] = useState(0)
  const [start, setStart] = useState(false)

  const full = lines.join('\n')
  const total = full.length

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || speed === 0) {
      setChars(total)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [speed, total])

  useEffect(() => {
    if (!start || chars >= total) return
    const t = setTimeout(() => setChars((c) => c + 1), speed)
    return () => clearTimeout(t)
  }, [start, chars, total, speed])

  const shown = full.slice(0, chars).split('\n')

  return (
    <div ref={ref} className={`pxl-well bg-pix-panel-alt px-4 py-3.5 ${className}`}>
      {/* Reserve the final height so the panel never reflows while typing. */}
      <pre className="relative m-0 whitespace-pre-wrap break-words font-mono text-[12px] leading-[1.75] text-pix-ink sm:text-[13px]">
        <span aria-hidden className="invisible block" role="presentation">
          {lines.map((l, i) => (
            <span key={i} className="block">
              {'> '}
              {l}
            </span>
          ))}
        </span>
        <span className="absolute inset-0 block">
          {shown.map((l, i) => (
            <span key={i} className="block">
              <span className="text-pix-red">{'> '}</span>
              {l}
              {i === shown.length - 1 && (
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-[13px] w-[7px] translate-y-[2px] animate-caret bg-pix-ink"
                />
              )}
            </span>
          ))}
        </span>
      </pre>
      <span className="sr-only">{full}</span>
    </div>
  )
}
