import { Code2, Coffee, Rocket, Briefcase } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Stat } from '../types'

const ICONS: LucideIcon[] = [Code2, Briefcase, Coffee, Rocket]

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 divide-y divide-border-subtle rounded-lg border border-border-subtle sm:grid-cols-4 sm:divide-x sm:divide-y-0">
      {stats.map((stat, i) => {
        const Icon = ICONS[i % ICONS.length]
        return (
          <div key={stat.label} className="flex flex-col items-center gap-2.5 px-6 py-5 text-center">
            <Icon size={20} className="text-text-primary/90" />
            <div className="font-display text-2xl font-semibold leading-none text-text-primary">
              {stat.value}
              <span className="text-accent">{stat.suffix}</span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.12em] text-text-muted">{stat.label.toUpperCase()}</div>
          </div>
        )
      })}
    </div>
  )
}
