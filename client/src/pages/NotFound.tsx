import PixelShell from '../components/pixel/PixelShell'
import PixelWindow from '../components/pixel/PixelWindow'
import PixelButton from '../components/pixel/PixelButton'
import PixelSprite from '../components/pixel/PixelSprite'
import SpeechBubble from '../components/pixel/SpeechBubble'
import { catWhite, iconArrow, iconHome } from '../components/pixel/sprites'

export default function NotFound() {
  return (
    <PixelShell>
      <PixelWindow title="Error.exe" icon={iconArrow} size="lg" titleTag="p" bodyClassName="px-6 py-14 text-center sm:py-20">
        <p className="pxl-label text-[9px] text-pix-red">Error 404</p>

        <h1 className="mt-5 font-screen text-[52px] font-bold leading-none text-pix-ink pxl-text-shadow sm:text-[80px]">
          Not Found
        </h1>

        <p className="mx-auto mt-6 max-w-sm font-body text-[15px] leading-relaxed text-pix-ink-soft">
          This route doesn&apos;t exist — or it moved somewhere friendlier. The cat has no idea either.
        </p>

        <div aria-hidden className="mt-9 flex items-end justify-center gap-2">
          <SpeechBubble direction="left" className="mb-9">
            Lost?
          </SpeechBubble>
          <PixelSprite sprite={catWhite} scale={4} className="animate-pix-bob" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <PixelButton to="/" variant="primary" size="lg" icon={iconHome}>
            Back Home
          </PixelButton>
          <PixelButton to="/projects" variant="secondary" size="lg" iconRight={iconArrow}>
            See Projects
          </PixelButton>
        </div>
      </PixelWindow>
    </PixelShell>
  )
}
