import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'SKILLS', to: '/skills' },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'EXPERIENCE', to: '/experience' },
  { label: 'CONTACT', to: '/contact' },
]

export default function Navbar() {
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-subtle bg-background/85 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-text-primary">
          KG<span className="text-accent">_</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group relative py-1 font-display text-xs font-medium tracking-[0.18em] transition-colors ${
                  isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full group-hover:bg-text-muted'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden items-center gap-2 rounded-sm border border-border px-4 py-2 font-display text-xs font-medium tracking-[0.14em] text-text-primary transition-all hover:border-accent hover:bg-accent/[0.06] lg:flex"
        >
          LET&apos;S CONNECT
          <ArrowUpRight size={14} className="text-accent" />
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center text-text-primary lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-background lg:hidden">
          <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
            {NAV_ITEMS.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `animate-fadeUp font-display text-3xl font-semibold tracking-tight ${
                    isActive ? 'text-accent' : 'text-text-primary'
                  }`
                }
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-border-subtle px-8 py-6">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 rounded-sm border border-accent bg-accent/[0.08] py-3 font-display text-xs font-medium tracking-[0.14em] text-accent"
            >
              LET&apos;S CONNECT
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
