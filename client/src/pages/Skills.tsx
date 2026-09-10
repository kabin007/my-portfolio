import { useContent } from '../context/ContentContext'
import PixelShell, { PixelPageHeader } from '../components/pixel/PixelShell'
import PixelLoader from '../components/pixel/PixelLoader'
import PixelWindow from '../components/pixel/PixelWindow'
import PixelChip from '../components/pixel/PixelChip'
import PixelTerminal from '../components/pixel/PixelTerminal'
import StackTile from '../components/pixel/StackTile'
import { iconChart, iconGear, iconTerminal } from '../components/pixel/sprites'

export default function Skills() {
  const { content, loading } = useContent()

  if (loading || !content) return <PixelLoader label="Loading stack" />

  const { skills, marqueeSkills } = content

  return (
    <PixelShell>
      <PixelPageHeader
        windowTitle="Stack.exe"
        icon={iconChart}
        title="Tech Stack"
        description="The languages, frameworks and platforms I reach for. Grouped by what I use them to build rather than by category label."
      />

      {/* daily drivers */}
      <PixelWindow title="Daily Drivers" icon={iconGear} size="md" className="mb-10" bodyClassName="p-5 sm:p-6">
        <div className="pxl-well grid grid-cols-3 justify-items-center gap-4 bg-pix-panel-alt px-3 py-6 sm:grid-cols-5 sm:gap-6">
          {marqueeSkills.slice(0, 10).map((name) => (
            <StackTile key={name} name={name} />
          ))}
        </div>
      </PixelWindow>

      {/* grouped detail */}
      <div className="grid gap-8 sm:grid-cols-2">
        {skills.map((group, i) => (
          <PixelWindow
            key={group.category}
            title={group.category}
            size="md"
            tone={i % 2 === 0 ? 'red' : 'ink'}
            bodyClassName="p-5"
            className="animate-fadeUp"
          >
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <PixelChip key={item} tone={i % 2 === 0 ? 'blue' : 'warm'} interactive>
                  {item}
                </PixelChip>
              ))}
            </div>
            <p className="mt-4 pxl-label text-[7px] text-pix-ink-mute">
              {String(i + 1).padStart(2, '0')} / {String(skills.length).padStart(2, '0')} ·{' '}
              {group.items.length} tools
            </p>
          </PixelWindow>
        ))}
      </div>

      <PixelWindow title="Philosophy.sh" icon={iconTerminal} size="md" className="mt-10" bodyClassName="p-5">
        <PixelTerminal
          lines={[
            'const passion = new Developer("build");',
            'passion.makeImpact();',
            '// clean code · useful tools · happier people',
          ]}
        />
      </PixelWindow>
    </PixelShell>
  )
}
