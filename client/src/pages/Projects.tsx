import { useContent } from '../context/ContentContext'
import PixelShell, { PixelPageHeader } from '../components/pixel/PixelShell'
import PixelLoader from '../components/pixel/PixelLoader'
import ProjectCard from '../components/pixel/ProjectCard'
import PixelBadge from '../components/pixel/PixelBadge'
import { iconFolder } from '../components/pixel/sprites'

export default function Projects() {
  const { content, loading } = useContent()

  if (loading || !content) return <PixelLoader label="Loading projects" />

  const { projects } = content
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <PixelShell wide>
      <PixelPageHeader
        windowTitle="Projects.exe"
        icon={iconFolder}
        title="Selected Work"
        description="Systems I've designed, built and shipped — platforms, pipelines and automations that run in production and solve a real problem for someone."
      >
        <div className="mt-6 flex flex-wrap gap-2.5">
          <PixelBadge tone="ink">{projects.length} Projects</PixelBadge>
          <PixelBadge tone="red">{featured.length} Featured</PixelBadge>
        </div>
      </PixelPageHeader>

      {featured.length > 0 && (
        <>
          <h2 className="mb-5 pxl-label text-[9px] text-pix-ink-mute">Featured</h2>
          <div className="mb-14 grid gap-7 lg:grid-cols-2">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} variant="full" index={i} />
            ))}
          </div>
        </>
      )}

      {rest.length > 0 && (
        <>
          <h2 className="mb-5 pxl-label text-[9px] text-pix-ink-mute">More Work</h2>
          <div className="grid gap-7 lg:grid-cols-2">
            {rest.map((project, i) => (
              <ProjectCard key={project.id} project={project} variant="full" index={featured.length + i} />
            ))}
          </div>
        </>
      )}
    </PixelShell>
  )
}
