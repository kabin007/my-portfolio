import PixelFrame from './PixelFrame'

/** Loading state, in-theme: a chunky stepped progress bar in a small window. */
export default function PixelLoader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4" role="status" aria-live="polite">
      <PixelFrame weight="base" shadow={6} className="w-full max-w-xs">
        <div className="px-5 py-6">
          <p className="pxl-label text-center text-[9px] text-pix-ink">
            {label}
            <span aria-hidden className="ml-1 inline-block h-[3px] w-2.5 align-middle animate-caret bg-pix-red" />
          </p>
          <div className="pxl-well mt-4 flex h-5 gap-1 bg-pix-panel-alt p-1">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <span
                key={i}
                className="h-full flex-1 animate-pix-sparkle bg-pix-red"
                style={{ animationDelay: `${i * 130}ms` }}
              />
            ))}
          </div>
        </div>
      </PixelFrame>
    </div>
  )
}
