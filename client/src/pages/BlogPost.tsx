import { Link, useParams } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import PixelShell from '../components/pixel/PixelShell'
import PixelLoader from '../components/pixel/PixelLoader'
import PixelWindow from '../components/pixel/PixelWindow'
import PixelButton from '../components/pixel/PixelButton'
import PixelChip from '../components/pixel/PixelChip'
import PixelSprite from '../components/pixel/PixelSprite'
import { heart, iconArrow, iconPen } from '../components/pixel/sprites'

const DATE_FMT: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }

export default function BlogPost() {
  const { slug } = useParams()
  const { content, loading } = useContent()

  if (loading || !content) return <PixelLoader label="Loading post" />

  const post = content.blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <PixelShell>
        <PixelWindow title="404.exe" size="md" bodyClassName="p-8 text-center">
          <p className="font-display text-2xl font-bold text-pix-ink">Post not found</p>
          <p className="mt-3 font-body text-[14px] text-pix-ink-soft">
            That post may have been moved or unpublished.
          </p>
          <PixelButton to="/blog" variant="secondary" size="md" className="mt-6">
            Back to Blog
          </PixelButton>
        </PixelWindow>
      </PixelShell>
    )
  }

  return (
    <PixelShell>
      <Link
        to="/blog"
        className="mb-6 inline-flex items-center gap-2.5 pxl-label text-[8px] text-pix-ink-mute transition-colors hover:text-pix-red"
      >
        <PixelSprite sprite={iconArrow} scale={2} flip />
        Back to Blog
      </Link>

      <PixelWindow title={`${post.slug}.md`} icon={iconPen} size="lg" titleTag="p" bodyClassName="p-6 sm:p-9">
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

        <h1 className="mt-5 max-w-3xl font-display text-[30px] font-bold leading-[1.08] tracking-tight text-pix-ink sm:text-[42px]">
          {post.title}
        </h1>

        <span aria-hidden className="mt-6 block h-[5px] w-20 bg-pix-red" />

        {/* Long-form copy stays in Inter at a comfortable measure — the pixel
            face belongs on labels, never on body text people have to read. */}
        <div className="mt-8 max-w-[65ch] space-y-5">
          {post.content.split('\n\n').map((para, i) => (
            <p key={i} className="font-body text-[15px] leading-[1.75] text-pix-ink-soft sm:text-[16px]">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 border-t-[3px] border-pix-ink/12 pt-6">
          <PixelSprite sprite={heart} scale={3} />
          <span className="pxl-label text-[8px] text-pix-ink-mute">Thanks for reading</span>
        </div>
      </PixelWindow>
    </PixelShell>
  )
}
