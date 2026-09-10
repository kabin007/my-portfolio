import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LayoutDashboard, Briefcase, FolderKanban, Newspaper, Mail, UserCog, LogOut, ExternalLink } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/blog', label: 'Blog', icon: Newspaper },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/profile', label: 'Profile', icon: UserCog },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { email, logout } = useAuth()

  return (
    <div className="admin-shell flex min-h-screen">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border-subtle sm:flex">
        <div className="flex h-16 items-center border-b border-border-subtle px-6">
          <Link to="/" className="font-display text-lg font-semibold text-text-primary">
            KG<span className="text-accent">_</span>
            <span className="ml-2 font-mono text-[10px] tracking-widest text-text-muted">ADMIN</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-sm px-3 py-2.5 font-mono text-xs tracking-wide transition-colors ${
                  isActive
                    ? 'border border-accent/30 bg-accent/[0.08] text-accent'
                    : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`
              }
            >
              <item.icon size={15} />
              {item.label.toUpperCase()}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-2 border-t border-border-subtle p-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-sm px-3 py-2.5 font-mono text-xs text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
          >
            <ExternalLink size={15} />
            VIEW SITE
          </a>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 font-mono text-xs text-text-secondary transition-colors hover:bg-surface hover:text-danger"
          >
            <LogOut size={15} />
            LOGOUT
          </button>
          <p className="truncate px-3 pt-1 font-mono text-[10px] text-text-muted">{email}</p>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden px-5 py-8 sm:px-10">{children}</main>
    </div>
  )
}
