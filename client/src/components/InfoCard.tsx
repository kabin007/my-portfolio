import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface InfoCardProps {
  icon?: LucideIcon
  title: string
  children: ReactNode
  className?: string
}

export default function InfoCard({ icon: Icon, title, children, className = '' }: InfoCardProps) {
  return (
    <div className={`rounded-lg border border-border-subtle bg-surface px-4 py-4 ${className}`}>
      <div className="mb-3 flex items-center gap-2">
        {Icon && <Icon size={12} className="text-text-muted" />}
        <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted">{title}</span>
      </div>
      {children}
    </div>
  )
}
