import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import PixelFrame from './PixelFrame'
import PixelSprite from './PixelSprite'
import {
  avatarKabin,
  iconBriefcase,
  iconChart,
  iconFolder,
  iconHome,
  iconMail,
  iconPen,
  iconUser,
  type Sprite,
} from './sprites'

/**
 * Four primary tabs, mirroring the reference. `/experience` and `/blog` stay
 * fully routable and are surfaced in the mobile sheet and the footer — a fifth
 * and sixth tab in Press Start 2P (a very wide face) would wrap the bar on
 * laptop widths, and the bar wrapping is worse than one extra click.
 */
const PRIMARY: { label: string; to: string; icon: Sprite }[] = [
  { label: 'About', to: '/about', icon: iconUser },
  { label: 'Projects', to: '/projects', icon: iconFolder },
  { label: 'Stack', to: '/skills', icon: iconChart },
  { label: 'Contact', to: '/contact', icon: iconMail },
]

const SECONDARY: { label: string; to: string; icon: Sprite }[] = [
  { label: 'Experience', to: '/experience', icon: iconBriefcase },
  { label: 'Blog', to: '/blog', icon: iconPen },
]

function Tab({ item, onClick }: { item: { label: string; to: string; icon: Sprite }; onClick?: () => void }) {
  return (
    <NavLink to={item.to} onClick={onClick} className="group relative block">
      {({ isActive }) => (
        <span
          className={`flex items-center gap-2 px-3 py-2.5 pxl-label text-[9px] leading-none transition-[transform,background-color,color] duration-100 [transition-timing-function:steps(2,end)] ${
            isActive
              ? 'pxl-edge pxl-w3 bg-pix-red text-pix-panel'
              : 'text-pix-ink group-hover:-translate-y-[2px] group-hover:text-pix-red'
          }`}
        >
          <PixelSprite sprite={item.icon} scale={2} className="shrink-0" />
          {item.label}
        </span>
      )}
    </NavLink>
  )
}

/** Hamburger drawn as three pixel bars; becomes an X when open. */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-4 w-6">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute left-0 h-[4px] w-full bg-pix-ink transition-transform duration-150 [transition-timing-function:steps(3,end)]"
          style={
            open
              ? {
                  top: 6,
                  transform: i === 1 ? 'scaleX(0)' : `rotate(${i === 0 ? 45 : -45}deg)`,
                }
              : { top: i * 6 }
          }
        />
      ))}
    </span>
  )
}

export default function PixelNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-pix-paper/95 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        {/* ── brand ── */}
        <Link to="/" className="group flex items-center gap-3">
          <PixelFrame weight="thin" shadow={4} surface="bg-pix-panel" className="shrink-0">
            <span className="flex h-11 w-11 items-end justify-center overflow-hidden sm:h-12 sm:w-12">
              <PixelSprite
                sprite={avatarKabin}
                scale={2}
                label="Kabin Ghimire"
                className="translate-y-[3px] transition-transform duration-150 [transition-timing-function:steps(2,end)] group-hover:-translate-y-0"
              />
            </span>
          </PixelFrame>

          <span className="min-w-0">
            <span className="block font-display text-lg font-bold leading-none tracking-tight text-pix-ink sm:text-xl">
              Kabin.exe
              <span aria-hidden className="ml-1 inline-block h-[3px] w-3 align-middle animate-caret bg-pix-red" />
            </span>
            <span className="mt-1.5 hidden pxl-label text-[7px] text-pix-ink-mute sm:block">
              Build Good Things
            </span>
          </span>
        </Link>

        {/* ── desktop tab window ── */}
        <PixelFrame weight="base" shadow={5} surface="bg-pix-panel" className="hidden lg:block">
          <div className="flex flex-col">
            <div className="flex h-4 items-center justify-end gap-1.5 border-b-[3px] border-pix-ink bg-pix-red px-2">
              <span aria-hidden className="h-[3px] w-2.5 bg-pix-panel" />
              <span aria-hidden className="h-2 w-2 border-[3px] border-pix-panel" />
              <span aria-hidden className="relative h-2 w-2">
                <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rotate-45 bg-pix-panel" />
                <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 -rotate-45 bg-pix-panel" />
              </span>
            </div>
            <nav aria-label="Primary" className="flex items-stretch gap-1 p-1.5">
              {PRIMARY.map((item) => (
                <Tab key={item.to} item={item} />
              ))}
            </nav>
          </div>
        </PixelFrame>

        {/* ── mobile trigger ── */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="pxl-edge pxl-w3 flex h-11 w-11 items-center justify-center bg-pix-panel lg:hidden"
        >
          <MenuGlyph open={open} />
        </button>
      </div>

      {/* 3px rule ties the nav to the page like a window chrome divider */}
      <div aria-hidden className="h-[3px] w-full bg-pix-ink/12" />

      {/* ── mobile sheet ── */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[84px] z-40 overflow-y-auto bg-pix-paper px-4 pb-10 pt-6 lg:hidden">
          <nav aria-label="All pages" className="mx-auto flex max-w-md flex-col gap-3">
            {[...PRIMARY, ...SECONDARY].map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="animate-fadeUp"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                {({ isActive }) => (
                  <PixelFrame weight="base" shadow={5} surface={isActive ? 'bg-pix-red' : 'bg-pix-panel'}>
                    <span
                      className={`flex items-center gap-3 px-4 py-4 pxl-label text-[11px] ${
                        isActive ? 'text-pix-panel' : 'text-pix-ink'
                      }`}
                    >
                      <PixelSprite sprite={item.icon} scale={3} />
                      {item.label}
                    </span>
                  </PixelFrame>
                )}
              </NavLink>
            ))}

            <NavLink to="/" onClick={() => setOpen(false)} className="animate-fadeUp" style={{ animationDelay: '270ms' }}>
              <span className="mt-2 flex items-center justify-center gap-2 pxl-label text-[9px] text-pix-ink-mute">
                <PixelSprite sprite={iconHome} scale={2} />
                Back to start
              </span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}
