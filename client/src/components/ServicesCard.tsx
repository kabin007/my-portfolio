import { Box } from 'lucide-react'
import InfoCard from './InfoCard'

const SERVICES = ['API', 'DATABASE', 'REDIS', 'WORKER']

export default function ServicesCard() {
  return (
    <InfoCard icon={Box} title="SERVICES">
      <div className="space-y-2">
        {SERVICES.map((s) => (
          <div key={s} className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-text-secondary">{s}</span>
            <span className="flex items-center gap-1.5 text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              ONLINE
            </span>
          </div>
        ))}
      </div>
    </InfoCard>
  )
}
