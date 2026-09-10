export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-text-muted">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        LOADING
        <span className="inline-block h-3 w-1.5 animate-blink bg-accent" />
      </div>
    </div>
  )
}
