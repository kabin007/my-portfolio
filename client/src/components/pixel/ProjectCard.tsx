import { Link } from 'react-router-dom'
import type { Project } from '../../types'
import PixelSprite from './PixelSprite'
import PixelChip from './PixelChip'
import PixelBadge from './PixelBadge'
import { docSheet, flame, gradCap, iconArrow, iconExternal, iconGear, iconTerminal, star, type Sprite } from './sprites'

/**
 * Pick a glyph from the project's own words.
 *
 * Deriving the icon keeps `Project` free of a presentation-only `icon` field,
 * so the admin CMS needs no new input and existing rows keep working.
 */
function glyphFor(project: Project): Sprite {
  const hay = `${project.title} ${project.category} ${project.tech.join(' ')}`.toLowerCase()
  if (/ignition|crm|product|platform/.test(hay)) return flame
  if (/ed360|educat|learn|student|rag|knowledge|assistant/.test(hay)) return gradCap
  if (/docket|document|legal|doc|content/.test(hay)) return docSheet
  if (/scrap|pipeline|data|n8n|automat/.test(hay)) return iconGear
  return iconTerminal
}

interface ProjectCardProps {
  project: Project
  /** `featured` is the compact hero-row card; `full` is the /projects page card. */
  variant?: 'featured' | 'full'
  index?: number
}

export default function ProjectCard({ project, variant = 'featured', index }: ProjectCardProps) {
  const glyph = glyphFor(project)
  const isFull = variant === 'full'

  /* Exactly one CTA per card: work that is publicly reachable links straight
     out, and work that isn't earns a write-up instead. */
  const href = project.link
  const caseStudyPath = project.caseStudy && project.slug ? `/projects/${project.slug}` : null

  /* One shell, two densities — the featured row needs equal heights in a
     3-up grid, the index page can breathe. */
  return (
    <article className="group relative flex h-full flex-col">
      <span
        aria-hidden
        className="pxl-edge pxl-w3 pxl-c-shadow absolute inset-0 translate-x-[5px] translate-y-[5px] bg-pix-shadow transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:translate-x-[7px] group-hover:translate-y-[7px]"
      />

      <div className="pxl-edge pxl-w3 relative flex h-full flex-col bg-pix-panel transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:-translate-y-[3px]">
        {/* mini title bar */}
        <div className="flex h-6 shrink-0 items-center justify-between gap-2 border-b-[3px] border-pix-ink bg-pix-red px-2">
          <span className="pxl-label truncate text-[7px] text-pix-panel/90">
            {typeof index === 'number' ? String(index + 1).padStart(2, '0') : project.year}
          </span>
          <span aria-hidden className="flex items-center gap-1.5">
            <span className="h-[2px] w-2 bg-pix-panel" />
            <span className="h-1.5 w-1.5 border-2 border-pix-panel" />
          </span>
        </div>

        <div className={`flex flex-1 flex-col ${isFull ? 'p-5 sm:p-6' : 'p-4 sm:p-5'}`}>
          {/* icon + identity */}
          <div className="flex items-start gap-3.5">
            <span className="pxl-edge pxl-w3 flex h-12 w-12 shrink-0 items-center justify-center bg-pix-ink text-pix-panel transition-transform duration-150 [transition-timing-function:steps(3,end)] group-hover:-translate-y-[3px] sm:h-14 sm:w-14">
              <PixelSprite sprite={glyph} scale={3} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={`font-display font-bold leading-tight tracking-tight text-pix-ink ${
                    isFull ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                  }`}
                >
                  {project.title}
                </h3>
                {project.featured && isFull && (
                  <PixelBadge tone="red" className="mt-1 shrink-0">
                    <PixelSprite sprite={star} scale={1} />
                    Featured
                  </PixelBadge>
                )}
              </div>
              <p className="mt-1.5 pxl-label text-[7px] leading-[1.6] text-pix-ink-mute">{project.category}</p>
            </div>
          </div>

          <p
            className={`mt-4 font-body leading-relaxed text-pix-ink-soft ${
              isFull ? 'text-[14px]' : 'text-[13px]'
            }`}
          >
            {project.description}
          </p>

          {/* outcomes — only where there's room to read them */}
          {isFull && project.outcomes.length > 0 && (
            <ul className="mt-4 space-y-2">
              {project.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5 font-body text-[13px] text-pix-ink-soft">
                  <span aria-hidden className="mt-[6px] h-2 w-2 shrink-0 bg-pix-red" />
                  {o}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {(isFull ? project.tech : project.tech.slice(0, 3)).map((t) => (
              <PixelChip key={t} tone="blue" interactive>
                {t}
              </PixelChip>
            ))}
          </div>

          {/* footer CTA, pinned to the bottom so cards in a row align */}
          <div className="mt-auto pt-5">
            <span aria-hidden className="mb-4 block h-[3px] w-full bg-pix-ink/12" />
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 pxl-label text-[9px] text-pix-ink transition-colors duration-100 hover:text-pix-red"
              >
                View Live
                <PixelSprite
                  sprite={iconExternal}
                  scale={2}
                  className="transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:-translate-y-[3px] group-hover:translate-x-[3px]"
                />
              </a>
            ) : caseStudyPath ? (
              <Link
                to={caseStudyPath}
                className="inline-flex items-center gap-2.5 pxl-label text-[9px] text-pix-ink transition-colors duration-100 hover:text-pix-red"
              >
                Case Study
                <PixelSprite
                  sprite={iconArrow}
                  scale={2}
                  className="transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:translate-x-[4px]"
                />
              </Link>
            ) : (
              <Link
                to="/projects"
                className="inline-flex items-center gap-2.5 pxl-label text-[9px] text-pix-ink transition-colors duration-100 hover:text-pix-red"
              >
                View Project
                <PixelSprite
                  sprite={iconArrow}
                  scale={2}
                  className="transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:translate-x-[4px]"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
