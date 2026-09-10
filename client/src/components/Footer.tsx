import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useContent } from '../context/ContentContext'

const ICONS: Record<string, LucideIcon> = { Github, Linkedin, Mail }

export default function Footer() {
  const { content } = useContent()

  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-4 font-mono text-xs text-text-muted">
          <span>
            &copy; {new Date().getFullYear()} {content?.profile.name ?? 'Kabin Ghimire'}
          </span>
          <span className="text-border">·</span>
          <Link to="/blog" className="transition-colors hover:text-accent">
            BLOG
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {content?.socials.map((s) => {
            const Icon = ICONS[s.icon] ?? Mail
            return (
              <a
                key={s.name}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.name}
                className="text-text-muted transition-colors hover:text-accent"
              >
                <Icon size={16} />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
