import { Link } from 'react-router-dom'
import { FolderKanban, Briefcase, Newspaper, Mail, ArrowRight } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { useContent } from '../../context/ContentContext'

export default function Dashboard() {
  const { content, loading } = useContent()

  const cards = [
    { label: 'Projects', count: content?.projects.length ?? 0, to: '/admin/projects', icon: FolderKanban },
    { label: 'Experience Entries', count: content?.experiences.length ?? 0, to: '/admin/experience', icon: Briefcase },
    { label: 'Blog Posts', count: content?.blogPosts.length ?? 0, to: '/admin/blog', icon: Newspaper },
    { label: 'Messages', count: '—', to: '/admin/messages', icon: Mail },
  ]

  return (
    <AdminLayout>
      <div className="mb-8">
        <span className="section-label">Overview</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Manage every section of the portfolio from here — changes go live immediately.
        </p>
      </div>

      {loading ? (
        <p className="font-mono text-xs text-text-muted">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="group rounded-md border border-border-subtle bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <card.icon size={20} className="mb-6 text-accent" />
              <div className="font-display text-3xl font-bold text-text-primary">{card.count}</div>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-xs text-text-muted">{card.label}</span>
                <ArrowRight size={14} className="text-text-muted transition-colors group-hover:text-accent" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
