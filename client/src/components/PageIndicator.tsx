export default function PageIndicator() {
  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex">
      <span className="font-mono text-[10px] text-text-muted">01</span>
      <div className="flex flex-col items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-text-muted/40" />
        ))}
      </div>
      <span className="font-mono text-[10px] text-text-muted">05</span>
    </div>
  )
}
