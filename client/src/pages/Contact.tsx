import { useState, type FormEvent } from 'react'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'
import { useContent } from '../context/ContentContext'
import { api } from '../lib/api'
import PixelShell, { PixelPageHeader } from '../components/pixel/PixelShell'
import PixelLoader from '../components/pixel/PixelLoader'
import PixelWindow from '../components/pixel/PixelWindow'
import PixelButton from '../components/pixel/PixelButton'
import PixelBadge from '../components/pixel/PixelBadge'
import PixelSprite from '../components/pixel/PixelSprite'
import SpeechBubble from '../components/pixel/SpeechBubble'
import { dino, heart, iconArrow, iconMail, iconTerminal } from '../components/pixel/sprites'

const FIELD =
  'pxl-well w-full bg-pix-panel-alt px-4 py-3 font-body text-[14px] text-pix-ink outline-none transition-shadow placeholder:text-pix-ink-mute focus:shadow-[inset_0_0_0_3px_#EC3B43]'

export default function Contact() {
  const { content, loading } = useContent()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await api.post('/contact', form)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (loading || !content) return <PixelLoader label="Opening inbox" />

  const { profile, socials } = content
  const github = socials.find((s) => s.icon === 'Github')
  const linkedin = socials.find((s) => s.icon === 'Linkedin')

  return (
    <PixelShell>
      <PixelPageHeader
        windowTitle="Contact.exe"
        icon={iconMail}
        title="Let's Build Something"
        description="Have a project, a role, or an idea worth building? Tell me about it — I read everything that lands here."
      >
        {profile.available && (
          <PixelBadge tone="green" pulse className="mt-6">
            Open to new opportunities
          </PixelBadge>
        )}
      </PixelPageHeader>

      <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-7">
        {/* ── direct channels ── */}
        <div className="space-y-9">
          <PixelWindow title="Direct" icon={iconMail} size="md" bodyClassName="relative overflow-hidden p-5 sm:p-6">
            <p className="max-w-[24ch] font-body text-[16px] font-semibold leading-snug text-pix-ink">
              Let&apos;s work on something great together!
            </p>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-3 font-body text-[13px] text-pix-ink-soft transition-colors hover:text-pix-red"
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
                    className="group flex items-center gap-3 font-body text-[13px] text-pix-ink-soft transition-colors hover:text-pix-red"
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
                    className="group flex items-center gap-3 font-body text-[13px] text-pix-ink-soft transition-colors hover:text-pix-red"
                  >
                    <span className="pxl-edge pxl-w2 flex h-9 w-9 shrink-0 items-center justify-center bg-[#0A66C2] text-pix-panel transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:-translate-y-[3px]">
                      <FaLinkedin size={16} aria-hidden />
                    </span>
                    <span className="min-w-0 break-all">{linkedin.url.replace('https://www.', '')}</span>
                  </a>
                </li>
              )}
            </ul>

            <div className="mt-6 border-t-[3px] border-pix-ink/12 pt-4">
              <p className="pxl-label text-[7px] text-pix-ink-mute">Based in</p>
              <p className="mt-1.5 font-body text-[13px] text-pix-ink-soft">{profile.location}</p>
            </div>

            <div aria-hidden className="pointer-events-none mt-6 flex items-end justify-end gap-1">
              <SpeechBubble direction="right" className="mb-8">
                Hello!
              </SpeechBubble>
              <PixelSprite sprite={dino} scale={3} className="animate-pix-bob" />
            </div>
          </PixelWindow>
        </div>

        {/* ── form ── */}
        <PixelWindow title="message.sh" icon={iconTerminal} size="md" tone="ink" bodyClassName="p-5 sm:p-7">
          {status === 'sent' ? (
            <div className="flex flex-col items-center justify-center gap-4 py-14 text-center">
              <PixelSprite sprite={heart} scale={5} className="animate-pix-bob" />
              <p className="font-display text-2xl font-bold tracking-tight text-pix-ink">Message sent!</p>
              <p className="max-w-xs font-body text-[14px] leading-relaxed text-pix-ink-soft">
                Thanks for reaching out — I&apos;ll get back to you as soon as I can.
              </p>
              <PixelButton onClick={() => setStatus('idle')} variant="secondary" size="sm" className="mt-2">
                Send Another
              </PixelButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="c-name" className="mb-2.5 block pxl-label text-[8px] text-pix-ink">
                  Your Name
                </label>
                <input
                  id="c-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={FIELD}
                  placeholder="Ada Lovelace"
                />
              </div>

              <div>
                <label htmlFor="c-email" className="mb-2.5 block pxl-label text-[8px] text-pix-ink">
                  Email
                </label>
                <input
                  id="c-email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={FIELD}
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label htmlFor="c-message" className="mb-2.5 block pxl-label text-[8px] text-pix-ink">
                  Message
                </label>
                <textarea
                  id="c-message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className={`${FIELD} resize-none`}
                  placeholder="Tell me what you're building…"
                />
              </div>

              {status === 'error' && (
                <p role="alert" className="pxl-edge pxl-w2 bg-pix-red px-3 py-2 font-body text-[13px] text-pix-panel">
                  {error}
                </p>
              )}

              <PixelButton type="submit" disabled={status === 'sending'} size="lg" full iconRight={iconArrow}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </PixelButton>
            </form>
          )}
        </PixelWindow>
      </div>
    </PixelShell>
  )
}
