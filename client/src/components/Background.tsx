export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-app-grid opacity-60" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(232,229,216,0.4) 0px, rgba(232,229,216,0.4) 1px, transparent 1px, transparent 160px)',
        }}
      />
      <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.035] blur-[140px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
    </div>
  )
}
