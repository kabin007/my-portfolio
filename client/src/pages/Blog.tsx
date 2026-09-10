import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import PixelShell, { PixelPageHeader } from '../components/pixel/PixelShell'
import PixelLoader from '../components/pixel/PixelLoader'
import PixelChip from '../components/pixel/PixelChip'
import PixelSprite from '../components/pixel/PixelSprite'
import { catSleeping, iconArrow, iconPen } from '../components/pixel/sprites'

const DATE_FMT: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }

export default function Blog() {
  const { content, loading } = useContent()

  if (loading || !content) return <PixelLoader label="Loading posts" />

  const posts = content.blogPosts

  return (
    <PixelShell>
      <PixelPageHeader
        windowTitle="Blog.exe"
        icon={iconPen}
        title="Notes"
        description="Writing on AI engineering, automation, and what actually breaks when systems meet production."
      />

      {posts.length === 0 ? (
        <div className="pxl-edge pxl-w3 flex flex-col items-center gap-4 bg-pix-panel px-6 py-16 text-center">
          <PixelSprite sprite={catSleeping} scale={4} />
          <p className="pxl-label text-[9px] text-pix-ink">No posts yet</p>
          <p className="font-body text-[14px] text-pix-ink-soft">Check back soon — drafts are brewing.</p>
        </div>
      ) : (
        <div className="space-y-7">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
              <article className="relative">
                <span
                  aria-hidden
                  className="pxl-edge pxl-w3 pxl-c-shadow absolute inset-0 translate-x-[5px] translate-y-[5px] bg-pix-shadow transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:translate-x-[7px] group-hover:translate-y-[7px]"
                />
                <div className="pxl-edge pxl-w3 relative bg-pix-panel p-5 transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:-translate-y-[3px] sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="pxl-label text-[8px] text-pix-red">
                      {new Date(post.createdAt).toLocaleDateString('en-US', DATE_FMT)}
                    </span>
                    {post.tags.map((t) => (
                      <PixelChip key={t} tone="blue">
                        {t}
                      </PixelChip>
                    ))}
                  </div>

                  <h2 className="mt-4 font-display text-xl font-bold leading-tight tracking-tight text-pix-ink sm:text-2xl">
                    {post.title}
                  </h2>

                  <p className="mt-3 max-w-2xl font-body text-[14px] leading-relaxed text-pix-ink-soft">
                    {post.excerpt}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2.5 pxl-label text-[9px] text-pix-ink transition-colors duration-100 group-hover:text-pix-red">
                    Read Post
                    <PixelSprite
                      sprite={iconArrow}
                      scale={2}
                      className="transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:translate-x-[4px]"
                    />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </PixelShell>
  )
}
