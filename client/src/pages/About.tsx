import { useContent } from '../context/ContentContext'
import PixelShell, { PixelPageHeader } from '../components/pixel/PixelShell'
import PixelLoader from '../components/pixel/PixelLoader'
import PixelWindow from '../components/pixel/PixelWindow'
import PixelChip from '../components/pixel/PixelChip'
import PixelBadge from '../components/pixel/PixelBadge'
import PixelSprite from '../components/pixel/PixelSprite'
import SpeechBubble from '../components/pixel/SpeechBubble'
import {
  catGinger,
  devKabin,
  heart,
  iconGear,
  iconSparkle,
  iconTerminal,
  iconUser,
  star,
} from '../components/pixel/sprites'

/** Service icon keys in the DB are lucide names; map them onto pixel glyphs. */
const SERVICE_GLYPH: Record<string, typeof iconGear> = {
  Bot: iconSparkle,
  Workflow: iconGear,
  Server: iconTerminal,
}

export default function About() {
  const { content, loading } = useContent()

  if (loading || !content) return <PixelLoader label="Loading profile" />

  const { profile, services, education, certifications, achievements, stats } = content

  return (
    <PixelShell>
      <PixelPageHeader
        windowTitle="About.exe"
        icon={iconUser}
        title="Who I Am"
        description={profile.summary}
      >
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <PixelBadge tone="ink">{profile.shortTitle}</PixelBadge>
          {profile.available && (
            <PixelBadge tone="green" pulse>
              Available for work
            </PixelBadge>
          )}
        </div>
      </PixelPageHeader>

      {/* stats strip */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {stats.map((s) => (
          <div key={s.label} className="pxl-edge pxl-w3 pxl-lift bg-pix-panel px-4 py-4 text-center">
            <p className="flex items-baseline justify-center font-screen text-3xl font-bold leading-none text-pix-red sm:text-4xl">
              {s.value}
              <span className="font-display text-2xl text-pix-ink sm:text-3xl">{s.suffix}</span>
            </p>
            <p className="mt-2.5 pxl-label text-[7px] leading-[1.6] text-pix-ink-mute">{s.label}</p>
          </div>
        ))}
      </div>

      {/* what I build */}
      <PixelWindow title="What I Build" icon={iconGear} size="lg" className="mb-10" bodyClassName="p-5 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="group pxl-edge pxl-w3 bg-pix-panel-alt p-5 transition-transform duration-100 [transition-timing-function:steps(2,end)] hover:-translate-y-[4px]">
              <span className="pxl-edge pxl-w2 mb-4 flex h-11 w-11 items-center justify-center bg-pix-ink text-pix-panel">
                <PixelSprite sprite={SERVICE_GLYPH[service.icon] ?? iconGear} scale={3} />
              </span>
              <h3 className="font-display text-base font-bold tracking-tight text-pix-ink">{service.title}</h3>
              <p className="mt-2 font-body text-[13px] leading-relaxed text-pix-ink-soft">{service.description}</p>
            </div>
          ))}
        </div>
      </PixelWindow>

      <div className="grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-7">
        <div className="space-y-9">
          {/* achievements */}
          <PixelWindow title="Selected Wins" icon={star} size="md" bodyClassName="p-5 sm:p-6">
            <ul className="space-y-3.5">
              {achievements.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-[14px] leading-relaxed text-pix-ink-soft">
                  <PixelSprite sprite={star} scale={2} className="mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </PixelWindow>

          {/* education */}
          <PixelWindow title="Education" size="md" tone="ink" bodyClassName="p-5 sm:p-6">
            {education.map((edu) => (
              <div key={edu.id}>
                <p className="pxl-label text-[8px] text-pix-red">{edu.period}</p>
                <h3 className="mt-2.5 font-display text-lg font-bold tracking-tight text-pix-ink">{edu.degree}</h3>
                <p className="mt-1 font-body text-[13px] text-pix-ink-soft">
                  {edu.institution} — {edu.location}
                </p>
                {edu.gpa && (
                  <PixelBadge tone="cream" className="mt-3">
                    GPA {edu.gpa}
                  </PixelBadge>
                )}
                {edu.details && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {edu.details.map((d) => (
                      <PixelChip key={d} tone="warm" interactive>
                        {d}
                      </PixelChip>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </PixelWindow>
        </div>

        <div className="space-y-9">
          {/* philosophy + character */}
          <PixelWindow title="Philosophy" icon={iconSparkle} size="md" bodyClassName="relative overflow-hidden p-5 sm:p-6">
            <p className="max-w-[30ch] font-body text-[15px] font-semibold leading-snug text-pix-ink">
              {profile.tagline}
            </p>

            <div className="mt-6 flex items-end justify-between gap-2">
              <SpeechBubble direction="left" className="mb-10 animate-pix-bob-slow">
                Ship it!
              </SpeechBubble>
              <span className="flex items-end gap-1">
                <PixelSprite sprite={devKabin} scale={3} />
                <PixelSprite sprite={catGinger} scale={2} className="mb-1 animate-pix-tail" />
              </span>
            </div>
          </PixelWindow>

          {/* certifications */}
          <PixelWindow title="Certifications" size="md" tone="ink" bodyClassName="p-5">
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert.id} className="pxl-edge pxl-w2 bg-pix-panel-alt px-4 py-3">
                  <p className="font-body text-[13px] font-semibold leading-snug text-pix-ink">{cert.title}</p>
                  <p className="mt-1 font-mono text-[11px] text-pix-ink-mute">{cert.issuer}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 pxl-label text-[7px] text-pix-ink-mute">
              <PixelSprite sprite={heart} scale={2} />
              Always learning
            </p>
          </PixelWindow>
        </div>
      </div>
    </PixelShell>
  )
}
