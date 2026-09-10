import { Link, useParams } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import PixelShell from '../components/pixel/PixelShell'
import PixelWindow from '../components/pixel/PixelWindow'
import PixelLoader from '../components/pixel/PixelLoader'
import PixelButton from '../components/pixel/PixelButton'
import PixelBadge from '../components/pixel/PixelBadge'
import PixelChip from '../components/pixel/PixelChip'
import PixelSprite from '../components/pixel/PixelSprite'
import PixelTerminal from '../components/pixel/PixelTerminal'
import NotFound from './NotFound'
import {
  docSheet,
  iconArrow,
  iconChart,
  iconFolder,
  iconGear,
  iconMail,
  iconSparkle,
  iconTerminal,
  star,
} from '../components/pixel/sprites'

/**
 * Long-form write-up for a project with no public URL, at /projects/:slug.
 *
 * The page is built from the same window chrome as every other section, so a
 * case study reads as one more app on the desktop rather than a document that
 * wandered in from another site.
 */
export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const { content, loading } = useContent()

  if (loading || !content) return <PixelLoader label="Opening case study" />

  const project = content.projects.find((p) => p.slug === slug)

  // A project without a write-up has nothing to show here — the card would have
  // linked straight out instead, so reaching this URL is a genuine 404.
  if (!project?.caseStudy) return <NotFound />

  const cs = project.caseStudy
  const others = content.projects.filter((p) => p.caseStudy && p.slug && p.slug !== slug)

  return (
    <PixelShell>
      {/* breadcrumb — the way back out, before anything else */}
      <Link
        to="/projects"
        className="group mb-6 inline-flex items-center gap-2.5 pxl-label text-[9px] text-pix-ink-mute transition-colors duration-100 hover:text-pix-red"
      >
        <PixelSprite
          sprite={iconArrow}
          scale={2}
          className="rotate-180 transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:-translate-x-[4px]"
        />
        All Projects
      </Link>

      {/* ── identity ─────────────────────────────────────────── */}
      <PixelWindow
        title={`${project.title}.md`}
        icon={docSheet}
        size="lg"
        titleTag="p"
        className="mb-9"
        bodyClassName="p-6 sm:p-8"
      >
        <p className="pxl-label text-[8px] text-pix-red">{project.category}</p>

        <h1 className="mt-3 font-display text-[34px] font-bold leading-[0.95] tracking-tight text-pix-ink sm:text-5xl">
          {project.title}
        </h1>
        <span aria-hidden className="mt-4 block h-[5px] w-20 bg-pix-red" />

        <p className="mt-5 max-w-2xl font-body text-[15px] leading-relaxed text-pix-ink-soft sm:text-[16px]">
          {cs.summary}
        </p>

        {/* the three facts a reader wants before committing to the scroll */}
        <dl className="mt-7 grid gap-5 border-t-[3px] border-pix-ink/12 pt-6 sm:grid-cols-3">
          {[
            { term: 'Role', detail: cs.role },
            { term: 'Timeline', detail: cs.timeline },
            { term: 'Status', detail: cs.status },
          ].map(({ term, detail }) => (
            <div key={term}>
              <dt className="pxl-label text-[8px] text-pix-ink-mute">{term}</dt>
              <dd className="mt-2 font-body text-[14px] font-medium text-pix-ink">{detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <PixelChip key={t} tone="blue" interactive>
              {t}
            </PixelChip>
          ))}
        </div>
      </PixelWindow>

      {/* ── headline characteristics ─────────────────────────── */}
      <div className="mb-9 grid gap-6 sm:grid-cols-3">
        {cs.metrics.map((m) => (
          <div key={m.label} className="pxl-edge pxl-w3 bg-pix-panel p-5">
            <p className="font-display text-[26px] font-bold leading-none tracking-tight text-pix-red sm:text-[30px]">
              {m.value}
            </p>
            <p className="mt-3 font-body text-[13px] leading-relaxed text-pix-ink-soft">{m.label}</p>
          </div>
        ))}
      </div>

      {/* ── the problem ──────────────────────────────────────── */}
      <PixelWindow title="The Problem" icon={iconSparkle} size="lg" className="mb-9" bodyClassName="p-6 sm:p-8">
        <div className="max-w-3xl space-y-4">
          {cs.problem.map((para) => (
            <p key={para} className="font-body text-[14px] leading-relaxed text-pix-ink-soft sm:text-[15px]">
              {para}
            </p>
          ))}
        </div>
      </PixelWindow>

      {/* ── approach ─────────────────────────────────────────── */}
      <PixelWindow title="Approach" icon={iconGear} size="lg" className="mb-9" bodyClassName="p-6 sm:p-8">
        <ol className="space-y-7">
          {cs.approach.map((step, i) => (
            <li key={step.title} className="flex gap-4 sm:gap-5">
              <span
                aria-hidden
                className="pxl-edge pxl-w3 flex h-10 w-10 shrink-0 items-center justify-center bg-pix-ink pxl-label text-[10px] text-pix-panel sm:h-12 sm:w-12 sm:text-[12px]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <h3 className="font-display text-[17px] font-bold leading-tight tracking-tight text-pix-ink sm:text-[19px]">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-2xl font-body text-[14px] leading-relaxed text-pix-ink-soft">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </PixelWindow>

      {/* ── how it flows ─────────────────────────────────────── */}
      <PixelWindow
        title="How It Runs"
        icon={iconTerminal}
        size="lg"
        tone="ink"
        className="mb-9"
        bodyClassName="p-5 sm:p-6"
      >
        <PixelTerminal lines={cs.pipeline} speed={0} />
      </PixelWindow>

      {/* ── stack + outcomes, side by side ───────────────────── */}
      <div className="mb-9 grid gap-7 lg:grid-cols-2">
        <PixelWindow title="Stack" icon={iconChart} size="md" bodyClassName="p-5 sm:p-6">
          <div className="space-y-5">
            {cs.stack.map((group) => (
              <div key={group.group}>
                <p className="pxl-label text-[8px] text-pix-ink-mute">{group.group}</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <PixelChip key={item} tone="warm" interactive>
                      {item}
                    </PixelChip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PixelWindow>

        <PixelWindow title="Outcomes" icon={star} size="md" bodyClassName="p-5 sm:p-6">
          <ul className="space-y-3.5">
            {project.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 font-body text-[14px] leading-relaxed text-pix-ink-soft">
                <span aria-hidden className="mt-[7px] h-2.5 w-2.5 shrink-0 bg-pix-red" />
                {o}
              </li>
            ))}
          </ul>
        </PixelWindow>
      </div>

      {/* ── learnings ────────────────────────────────────────── */}
      <PixelWindow title="What I'd Carry Forward" icon={iconSparkle} size="lg" className="mb-9" bodyClassName="p-6 sm:p-8">
        <ul className="grid gap-5 sm:grid-cols-2">
          {cs.learnings.map((l) => (
            <li key={l} className="pxl-edge pxl-w2 bg-pix-panel-alt p-4 font-body text-[14px] leading-relaxed text-pix-ink-soft">
              {l}
            </li>
          ))}
        </ul>
      </PixelWindow>

      {/* ── keep reading ─────────────────────────────────────── */}
      {others.length > 0 && (
        <PixelWindow title="More Case Studies" icon={iconFolder} size="md" className="mb-9" bodyClassName="p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.slug}`}
                className="group pxl-edge pxl-w2 flex items-center justify-between gap-3 bg-pix-panel-alt p-4 transition-transform duration-100 [transition-timing-function:steps(2,end)] hover:-translate-y-[3px]"
              >
                <span className="min-w-0">
                  <span className="block truncate font-display text-[16px] font-bold tracking-tight text-pix-ink">
                    {p.title}
                  </span>
                  <span className="mt-1 block pxl-label text-[7px] text-pix-ink-mute">{p.category}</span>
                </span>
                <PixelSprite
                  sprite={iconArrow}
                  scale={2}
                  className="shrink-0 text-pix-red transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:translate-x-[4px]"
                />
              </Link>
            ))}
          </div>
        </PixelWindow>
      )}

      {/* ── close ────────────────────────────────────────────── */}
      <PixelWindow title="Next" icon={iconMail} size="lg" tone="ink" bodyClassName="p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <PixelBadge tone="red">Open to new work</PixelBadge>
            <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-pix-ink-soft">
              Got something with a similar shape? I&apos;d like to hear about it.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <PixelButton to="/contact" variant="primary" size="md" icon={iconMail}>
              Get in Touch
            </PixelButton>
            <PixelButton to="/projects" variant="secondary" size="md" iconRight={iconArrow}>
              All Projects
            </PixelButton>
          </div>
        </div>
      </PixelWindow>
    </PixelShell>
  )
}
