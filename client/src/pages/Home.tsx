import { Link } from 'react-router-dom'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'
import { useContent } from '../context/ContentContext'
import PixelWindow from '../components/pixel/PixelWindow'
import PixelButton from '../components/pixel/PixelButton'
import PixelBadge from '../components/pixel/PixelBadge'
import PixelSprite from '../components/pixel/PixelSprite'
import PixelTerminal from '../components/pixel/PixelTerminal'
import SpeechBubble from '../components/pixel/SpeechBubble'
import Signboard from '../components/pixel/Signboard'
import ProjectCard from '../components/pixel/ProjectCard'
import StackTile from '../components/pixel/StackTile'
import PixelLoader from '../components/pixel/PixelLoader'
import PixelFooter from '../components/pixel/PixelFooter'
import { BushRow, CloudLayer, Skyline, StoneWall } from '../components/pixel/scenery'
import {
  catGinger,
  catWhite,
  devKabin,
  dino,
  heart,
  iconArrow,
  iconChart,
  iconGear,
  iconMail,
  iconPlay,
  iconSparkle,
  star,
} from '../components/pixel/sprites'

const WAYPOINTS = ['Explore', 'Build', 'Learn', 'Repeat']
const CREDO = ['Better', 'Software', 'Brighter', 'Tomorrow']

export default function Home() {
  const { content, loading } = useContent()

  if (loading || !content) return <PixelLoader label="Booting" />

  const { profile, projects, marqueeSkills, socials } = content

  const featured = projects.filter((p) => p.featured).slice(0, 3)
  const showcase = featured.length >= 3 ? featured : projects.slice(0, 3)
  const stack = marqueeSkills.slice(0, 7)

  const github = socials.find((s) => s.icon === 'Github')
  const linkedin = socials.find((s) => s.icon === 'Linkedin')

  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-[1240px] flex-1 px-4 pt-6 sm:px-6 lg:px-8">
        {/* ══ HERO ══════════════════════════════════════════ */}
        <div className="relative">
          {/* Gutter rails. Only rendered once the page margin is genuinely wide
              enough to hold them — inside the window they collide with the CTAs. */}
          <p className="absolute -left-[104px] top-2 hidden pxl-label text-[7px] leading-[2] text-pix-ink-mute 2xl:block">
            A more
            <br />
            useful
            <br />
            internet
            <span className="ml-1 inline-block h-[3px] w-2 align-middle bg-pix-red" />
          </p>

          <div aria-hidden className="absolute -left-[100px] bottom-[120px] hidden flex-col gap-[3px] 2xl:flex">
            {WAYPOINTS.map((w, i) => (
              <Signboard key={w} post={false} className={i % 2 ? 'translate-x-2' : ''}>
                {w}
              </Signboard>
            ))}
          </div>

          <p
            aria-hidden
            className="absolute -right-[96px] top-2 hidden pxl-label text-[7px] leading-[2.2] text-pix-ink-mute 2xl:block"
          >
            Ideas
            <br />
            <span className="text-pix-red">&gt;</span>
            <br />
            Code
            <br />
            <span className="text-pix-red">&gt;</span>
            <br />
            Impact
            <PixelSprite sprite={heart} scale={2} className="mt-2" />
          </p>

          <PixelWindow
            title="Welcome.exe"
            icon={iconSparkle}
            size="lg"
            shadow={8}
            titleTag="p"
            bodyClassName="relative overflow-hidden bg-pix-panel"
          >
            {/* backdrop */}
            <CloudLayer className="hidden sm:block" />
            <Skyline className="hidden h-28 opacity-55 sm:block lg:h-36" />

            <div className="relative z-10 grid gap-8 px-5 pt-8 sm:px-9 sm:pt-11 lg:grid-cols-[1.22fr_0.78fr] lg:gap-4">
              {/* ── copy ── */}
              <div className="min-w-0">
                <h1 className="font-display text-[46px] font-bold leading-[0.92] tracking-[-0.03em] text-pix-ink sm:text-[68px] lg:text-[76px]">
                  {profile.firstName}
                  <span className="text-pix-ink-mute"> //</span>
                </h1>

                <p className="mt-1.5 font-screen text-[30px] font-bold leading-[1.05] tracking-tight text-pix-red pxl-text-shadow-red sm:text-[40px] lg:text-[36px] xl:text-[42px] 2xl:text-[46px]">
                  {profile.title}
                </p>

                <p className="mt-6 max-w-xl font-body text-[17px] font-semibold leading-snug text-pix-ink sm:text-[21px]">
                  {profile.tagline}
                </p>

                <p className="mt-4 max-w-lg font-body text-[14px] leading-relaxed text-pix-ink-soft sm:text-[15px]">
                  {profile.heroIntro ?? profile.summary}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <PixelButton to="/projects" variant="primary" size="lg" icon={iconPlay}>
                    View Projects
                  </PixelButton>
                  <PixelButton to="/contact" variant="secondary" size="lg" icon={iconMail}>
                    Get in Touch
                  </PixelButton>
                </div>

                {profile.available && (
                  <PixelBadge tone="green" pulse className="mt-6">
                    Open to new work
                  </PixelBadge>
                )}
              </div>

              {/* ── character scene ── */}
              <div className="relative z-10 -mb-8 flex items-end justify-center sm:-mb-[62px] lg:justify-end">
                {/* credo signposts */}
                <div
                  aria-hidden
                  className="absolute bottom-0 right-0 hidden flex-col items-end gap-[3px] lg:flex"
                >
                  {CREDO.map((word, i) => (
                    <Signboard key={word} post={false} className={i % 2 ? 'translate-x-2' : ''}>
                      {word}
                    </Signboard>
                  ))}
                  <span className="h-9 w-[10px] pxl-edge pxl-w2 bg-pix-wood-mid" />
                </div>

                <div className="relative flex items-end gap-1 lg:mr-[132px]">
                  <SpeechBubble direction="left" className="mb-14 hidden animate-pix-bob-slow sm:block">
                    Let&apos;s
                    <br />
                    build!
                  </SpeechBubble>

                  <PixelSprite
                    sprite={devKabin}
                    scale={4}
                    label="Pixel illustration of Kabin coding on a laptop"
                    className="relative z-10 sm:hidden"
                  />
                  <PixelSprite
                    sprite={devKabin}
                    scale={5}
                    label="Pixel illustration of Kabin coding on a laptop"
                    className="relative z-10 hidden sm:block"
                  />

                  <PixelSprite sprite={catGinger} scale={4} className="mb-[2px] animate-pix-tail" />
                </div>
              </div>
            </div>

            {/* ── ground ── */}
            <div className="relative z-[5] mt-2 h-[86px]">
              {/* Depth order: skyline (behind) → ledge → foliage (nearest). */}
              <StoneWall className="absolute bottom-0 right-0 z-0 h-[58px] w-full sm:w-[72%]" />
              <BushRow className="z-10 h-14" />
              <div aria-hidden className="absolute bottom-[52px] left-[13%] z-20 hidden sm:block">
                <PixelSprite sprite={catWhite} scale={3} />
              </div>
            </div>

          </PixelWindow>
        </div>

        {/* ══ FEATURED PROJECTS ═════════════════════════════ */}
        <PixelWindow
          title="Featured Projects"
          icon={star}
          size="lg"
          shadow={7}
          className="mt-14 sm:mt-16"
          bodyClassName="p-5 sm:p-7"
        >
          <div className="grid gap-6 sm:gap-7 lg:grid-cols-3">
            {showcase.map((project, i) => (
              <ProjectCard key={project.id} project={project} variant="featured" index={i} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <PixelButton to="/projects" variant="ghost" size="md" iconRight={iconArrow}>
              All Projects
            </PixelButton>
          </div>
        </PixelWindow>

        {/* ══ STACK + CONTACT ═══════════════════════════════ */}
        <div className="mt-14 grid gap-9 sm:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-7">
          <PixelWindow title="Tech Stack" icon={iconGear} size="lg" shadow={7} bodyClassName="p-5 sm:p-6">
            <div className="pxl-well grid grid-cols-3 justify-items-center gap-4 bg-pix-panel-alt px-3 py-5 sm:grid-cols-4 sm:gap-5 lg:grid-cols-7">
              {stack.map((name) => (
                <StackTile key={name} name={name} />
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <PixelTerminal
                className="flex-1"
                lines={['const passion = new Developer("build");', 'passion.makeImpact();']}
              />
              <p className="shrink-0 self-center pxl-label text-[7px] leading-[2] text-pix-ink-mute sm:text-right">
                Clean code
                <br />
                Useful tools
                <br />
                Happier people
                <PixelSprite sprite={heart} scale={2} className="mt-2 sm:ml-auto" />
              </p>
            </div>

            <Link
              to="/skills"
              className="mt-5 inline-flex items-center gap-2.5 pxl-label text-[9px] text-pix-ink transition-colors duration-100 hover:text-pix-red"
            >
              Full Stack Breakdown
              <PixelSprite sprite={iconArrow} scale={2} />
            </Link>
          </PixelWindow>

          <PixelWindow title="Get in Touch" icon={iconMail} size="lg" shadow={7} bodyClassName="relative p-5 sm:p-6">
            <p className="max-w-[22ch] font-body text-[16px] font-semibold leading-snug text-pix-ink sm:text-[17px]">
              Let&apos;s work on something great together!
            </p>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-3 font-body text-[13px] text-pix-ink-soft transition-colors hover:text-pix-red sm:text-[14px]"
                >
                  <span className="pxl-edge pxl-w2 flex h-9 w-9 shrink-0 items-center justify-center bg-pix-red text-pix-panel transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:-translate-y-[3px]">
                    <PixelSprite sprite={iconMail} scale={2} />
                  </span>
                  <span className="min-w-0 break-all">{profile.email}</span>
                </a>
              </li>

              {github && (
                <li>
                  <a
                    href={github.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 font-body text-[13px] text-pix-ink-soft transition-colors hover:text-pix-red sm:text-[14px]"
                  >
                    <span className="pxl-edge pxl-w2 flex h-9 w-9 shrink-0 items-center justify-center bg-pix-ink text-pix-panel transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:-translate-y-[3px]">
                      <SiGithub size={16} aria-hidden />
                    </span>
                    <span className="min-w-0 break-all">{github.url.replace('https://', '')}</span>
                  </a>
                </li>
              )}

              {linkedin && (
                <li>
                  <a
                    href={linkedin.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 font-body text-[13px] text-pix-ink-soft transition-colors hover:text-pix-red sm:text-[14px]"
                  >
                    <span className="pxl-edge pxl-w2 flex h-9 w-9 shrink-0 items-center justify-center bg-[#0A66C2] text-pix-panel transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:-translate-y-[3px]">
                      <FaLinkedin size={16} aria-hidden />
                    </span>
                    <span className="min-w-0 break-all">{linkedin.url.replace('https://www.', '')}</span>
                  </a>
                </li>
              )}
            </ul>

            <PixelButton to="/contact" variant="primary" size="md" className="mt-6" iconRight={iconArrow}>
              Send a Message
            </PixelButton>

            {/* dino greeter */}
            <div aria-hidden className="pointer-events-none absolute bottom-3 right-3 hidden items-end gap-1 sm:flex">
              <SpeechBubble direction="right" className="mb-8">
                Hello!
              </SpeechBubble>
              <PixelSprite sprite={dino} scale={3} className="animate-pix-bob" />
            </div>
          </PixelWindow>
        </div>

        {/* ══ QUICK LINKS ═══════════════════════════════════ */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <Link to="/experience" className="group block">
            <span className="pxl-edge pxl-w3 pxl-lift flex items-center justify-between gap-4 bg-pix-panel px-5 py-4">
              <span>
                <span className="block pxl-label text-[9px] text-pix-ink">Experience</span>
                <span className="mt-1.5 block font-body text-[13px] text-pix-ink-soft">
                  Teams I&apos;ve built with, and what shipped
                </span>
              </span>
              <PixelSprite sprite={iconChart} scale={3} className="shrink-0 text-pix-red" />
            </span>
          </Link>

          <Link to="/blog" className="group block">
            <span className="pxl-edge pxl-w3 pxl-lift flex items-center justify-between gap-4 bg-pix-panel px-5 py-4">
              <span>
                <span className="block pxl-label text-[9px] text-pix-ink">Writing</span>
                <span className="mt-1.5 block font-body text-[13px] text-pix-ink-soft">
                  Notes on AI, automation and shipping
                </span>
              </span>
              <PixelSprite sprite={iconArrow} scale={3} className="shrink-0 text-pix-red" />
            </span>
          </Link>
        </div>
      </main>

      <PixelFooter />
    </div>
  )
}
