import { useMemo } from 'react'
import DottedMap from 'dotted-map/without-countries'
import { MapPin } from 'lucide-react'
import InfoCard from './InfoCard'
import worldMap from '../data/worldMap.json'

// Kathmandu, Nepal
const PIN = { lat: 27.7172, lng: 85.324 }

export default function LocationCard({ location }: { location: string }) {
  const svg = useMemo(() => {
    const map = new DottedMap({ map: worldMap as ConstructorParameters<typeof DottedMap>[0]['map'] })
    map.addPin({ lat: PIN.lat, lng: PIN.lng, svgOptions: { color: '#c9ce88', radius: 1.1 } })
    return map.getSVG({ radius: 0.35, color: '#454b3c', shape: 'circle', backgroundColor: 'transparent' })
  }, [])

  return (
    <InfoCard icon={MapPin} title="LOCATION">
      <div className="mb-2.5 [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
      <span className="font-mono text-[11px] text-text-secondary">{location}</span>
    </InfoCard>
  )
}
