import { useNavigate } from 'react-router-dom'

export default function ScrollIndicator() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate('/about')}
      className="group fixed bottom-3 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-muted transition-colors hover:text-accent xl:flex"
      aria-label="Explore more about Kabin"
    >
      <span className="flex h-8 w-5 items-start justify-center rounded-full border border-current p-1">
        <span className="h-1.5 w-0.5 animate-blink rounded-full bg-current" />
      </span>
      <span className="font-mono text-[9px] tracking-[0.2em]">SCROLL DOWN</span>
    </button>
  )
}
