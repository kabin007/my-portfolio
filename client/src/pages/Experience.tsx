import { useContent } from '../context/ContentContext'
import PixelShell, { PixelPageHeader } from '../components/pixel/PixelShell'
import PixelLoader from '../components/pixel/PixelLoader'
import PixelWindow from '../components/pixel/PixelWindow'
import PixelChip from '../components/pixel/PixelChip'
import PixelBadge from '../components/pixel/PixelBadge'
import { iconBriefcase } from '../components/pixel/sprites'

export default function Experience() {
  const { content, loading } = useContent()

  if (loading || !content) return <PixelLoader label="Loading history" />

  return (
    <PixelShell>
      <PixelPageHeader
        windowTitle="Experience.exe"
        icon={iconBriefcase}
        title="Track Record"
        description="Where I've worked, what I owned, and what actually shipped."
      />

      {/* Timeline rail is decorative and desktop-only; each role is a window,
          so the sequence still reads perfectly when the rail is gone. */}
      <div className="relative sm:pl-10">
        <span aria-hidden className="absolute left-[7px] top-3 hidden h-[calc(100%-24px)] w-[4px] bg-pix-ink/15 sm:block" />

        <div className="space-y-9">
          {content.experiences.map((exp) => (
            <div key={exp.id} className="relative">
              <span
                aria-hidden
                className={`absolute -left-10 top-4 hidden h-[18px] w-[18px] sm:block ${
                  exp.current ? 'animate-pix-sparkle bg-pix-red' : 'bg-pix-ink/30'
                }`}
                style={{ boxShadow: '0 0 0 3px #FDF4E0' }}
              />

              <PixelWindow title={exp.company} size="md" tone={exp.current ? 'red' : 'ink'} bodyClassName="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="pxl-label text-[8px] text-pix-red">{exp.period}</span>
                  {exp.current && <PixelBadge tone="green" pulse>Current</PixelBadge>}
                </div>

                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-pix-ink sm:text-2xl">
                  {exp.role}
                </h3>
                <p className="mt-1 font-body text-[13px] text-pix-ink-mute">{exp.location}</p>

                <ul className="mt-4 space-y-2.5">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 font-body text-[14px] leading-relaxed text-pix-ink-soft">
                      <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 bg-pix-red" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <PixelChip key={t} tone="blue" interactive>
                      {t}
                    </PixelChip>
                  ))}
                </div>
              </PixelWindow>
            </div>
          ))}
        </div>
      </div>
    </PixelShell>
  )
}
