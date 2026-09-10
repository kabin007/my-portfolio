import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import InfoCard from './InfoCard'

export default function TimeCard() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(t)
  }, [])

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  const date = now
    .toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    .toUpperCase()

  return (
    <InfoCard icon={Clock} title="TIME">
      <div className="font-display text-2xl font-semibold tabular text-text-primary">{time}</div>
      <div className="mt-1 font-mono text-[11px] tracking-wide text-text-muted">{date}</div>
    </InfoCard>
  )
}
