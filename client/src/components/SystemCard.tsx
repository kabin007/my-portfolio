import { Monitor } from 'lucide-react'
import InfoCard from './InfoCard'

const METRICS = [
  { label: 'CPU', value: 23, display: '23%' },
  { label: 'MEM', value: 52, display: '4.16GB / 8GB' },
  { label: 'DISK', value: 47, display: '120GB / 256GB' },
]

export default function SystemCard() {
  return (
    <InfoCard icon={Monitor} title="SYSTEM">
      <div className="space-y-2.5">
        {METRICS.map((m) => (
          <div key={m.label}>
            <div className="mb-1 flex items-center justify-between font-mono text-[11px]">
              <span className="text-text-muted">{m.label}</span>
              <span className="tabular text-text-secondary">{m.display}</span>
            </div>
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-surface-lighter">
              <div className="h-full rounded-full bg-accent/70" style={{ width: `${m.value}%` }} />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between pt-0.5 font-mono text-[11px]">
          <span className="text-text-muted">UPTIME</span>
          <span className="tabular text-text-secondary">12d 14h 28m</span>
        </div>
      </div>
    </InfoCard>
  )
}
