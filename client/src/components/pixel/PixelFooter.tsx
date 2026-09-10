import { Link } from 'react-router-dom'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'
import { useContent } from '../../context/ContentContext'
import PixelSprite from './PixelSprite'
import Signboard from './Signboard'
import { BushRow, GroundBand } from './scenery'
import { catSleeping, heart, iconMail } from './sprites'

const FOOTER_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Stack', to: '/skills' },
  { label: 'Experience', to: '/experience' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const SOCIAL_ICON: Record<string, typeof SiGithub> = { Github: SiGithub, Linkedin: FaLinkedin }

/**
 * End-of-level footer: the message sits in the cream band, the scenery closes
 * the page underneath. The signboards are absolutely positioned and hidden
 * below `lg` — on a phone they'd crowd the only content that matters here.
 */
export default function PixelFooter() {
  const { content } = useContent()
  const profile = content?.profile
  const socials = content?.socials ?? []

  return (
    <footer className="relative mt-20 sm:mt-24">
      <div className="relative mx-auto max-w-[1240px] px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {/* ── decorative signboards (desktop only) ── */}
        <Signboard className="absolute bottom-4 left-4 hidden -rotate-2 lg:flex" postHeight={34}>
          Good
          <br />
          Code
          <br />
          Brighter
          <br />
          Days
        </Signboard>

        <Signboard className="absolute bottom-4 right-4 hidden rotate-2 lg:flex" tone="ink" postHeight={34}>
          Keep
          <br />
          Building
          <br />
          &lt;3
        </Signboard>

        {/* ── message ── */}
        <div className="relative z-10 mx-auto max-w-lg text-center">
          <p className="flex items-center justify-center gap-3">
            <PixelSprite sprite={heart} scale={3} className="animate-pix-bob" />
            <span className="pxl-label text-[11px] text-pix-ink">Thanks for visiting!</span>
            <PixelSprite sprite={heart} scale={3} className="animate-pix-bob [animation-delay:1.3s]" />
          </p>

          <p className="mx-auto mt-4 max-w-sm font-body text-[13px] leading-relaxed text-pix-ink-soft">
            Built with curiosity, caffeine, and a belief in a better internet.
          </p>

          <span aria-hidden className="mx-auto mt-5 block h-[4px] w-16 bg-pix-red" />

          {/* ── real navigation ── */}
          <nav aria-label="Footer" className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="pxl-label text-[8px] text-pix-ink-mute transition-colors duration-100 hover:text-pix-red"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex items-center justify-center gap-3">
            {socials.map((s) => {
              const Icon = SOCIAL_ICON[s.icon]
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.name}
                  className="pxl-edge pxl-w2 pxl-lift flex h-10 w-10 items-center justify-center bg-pix-ink text-pix-panel hover:bg-pix-red"
                >
                  {Icon ? <Icon size={16} aria-hidden /> : <PixelSprite sprite={iconMail} scale={2} />}
                </a>
              )
            })}
          </div>

          <p className="mt-7 font-mono text-[11px] text-pix-ink-mute">
            © {new Date().getFullYear()} {profile?.name ?? 'Kabin Ghimire'} · {profile?.location ?? 'Kathmandu, Nepal'}
          </p>
        </div>

        {/* ── sleeping cat ── */}
        {/* Sits above the bush row — at bottom-3 it was buried in the foliage. */}
        <div aria-hidden className="pointer-events-none absolute bottom-[30px] left-1/2 z-20 ml-[120px] hidden -translate-x-1/2 sm:block">
          <span className="relative block">
            <span className="absolute -top-4 left-10 pxl-label animate-pix-z text-[8px] text-pix-ink-mute">z</span>
            <span className="absolute -top-2 left-14 pxl-label animate-pix-z text-[7px] text-pix-ink-mute [animation-delay:0.9s]">
              z
            </span>
            <PixelSprite sprite={catSleeping} scale={3} />
          </span>
        </div>

        <BushRow className="z-0 opacity-95" />
      </div>

      <GroundBand height={104} />
    </footer>
  )
}
