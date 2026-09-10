import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, X, MoreVertical } from 'lucide-react'
import TerminalArt from './TerminalArt'

interface TerminalLine {
  type: 'command' | 'output' | 'muted' | 'blank' | 'progress' | 'error'
  text: string
}

interface TerminalProps {
  whatIDo: string[]
  mission: string
  username?: string
}

interface CommandResult {
  output?: string[]
  clear?: boolean
  navigateTo?: string
}

const ROUTES: Record<string, string> = {
  about: '/about',
  skills: '/skills',
  projects: '/projects',
  experience: '/experience',
  contact: '/contact',
  blog: '/blog',
  home: '/',
}

const HELP_LINES = [
  'Available commands:',
  '  help                 show this list',
  '  whoami               who is running this shell',
  '  ls                   list available sections',
  '  ls <section>         open a section (skills, projects, experience, about, contact, blog)',
  '  sudo ls experience   open the experience page',
  '  cat about.txt        open the about page',
  '  clear                clear the screen',
]

function wrapText(text: string, width: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    if ((current + ' ' + word).trim().length > width) {
      lines.push(current.trim())
      current = word
    } else {
      current = (current + ' ' + word).trim()
    }
  }
  if (current) lines.push(current)
  return lines
}

function runCommand(raw: string, username: string): CommandResult {
  const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ')

  if (cmd === '') return {}
  if (cmd === 'clear' || cmd === 'cls') return { clear: true }
  if (cmd === 'help' || cmd === '--help') return { output: HELP_LINES }
  if (cmd === 'whoami') return { output: [username] }
  if (cmd === 'ls' || cmd === 'ls -la') return { output: [Object.keys(ROUTES).filter((r) => r !== 'home').join('  ')] }
  if (cmd === 'pwd') return { output: ['~/projects/portfolio'] }

  const section = cmd
    .replace(/^sudo\s+/, '')
    .replace(/^(ls|cd|cat|open)\s+/, '')
    .replace(/\.txt$/, '')

  if (ROUTES[section]) {
    return { output: [`Opening ~/${section === 'home' ? '' : section} ...`], navigateTo: ROUTES[section] }
  }

  if (cmd.startsWith('sudo')) {
    return { output: ["Permission denied: you don't need sudo for this one 🙂"] }
  }

  return { output: [`command not found: ${raw.trim()}`, "Type 'help' to see available commands."] }
}

export default function Terminal({ whatIDo, mission, username = 'kabin@dev-machine' }: TerminalProps) {
  const navigate = useNavigate()

  const bootLines = useMemo<TerminalLine[]>(() => {
    return [
      { type: 'command', text: 'whoami' },
      { type: 'output', text: username },
      { type: 'blank', text: '' },
      { type: 'command', text: 'what_i_do' },
      ...whatIDo.map((item) => ({ type: 'muted' as const, text: `> ${item}` })),
      { type: 'blank', text: '' },
      { type: 'command', text: 'cat mission.txt' },
      ...wrapText(mission, 42).map((text) => ({ type: 'output' as const, text })),
      { type: 'blank', text: '' },
      { type: 'command', text: 'git status' },
      { type: 'output', text: 'On branch main' },
      { type: 'output', text: 'working tree clean' },
      { type: 'blank', text: '' },
      { type: 'command', text: './build.sh' },
      { type: 'progress', text: '[████████████████████] 100%' },
      { type: 'output', text: 'Build completed successfully.' },
      { type: 'blank', text: '' },
      { type: 'muted', text: "Type 'help' to see what this shell can do." },
    ]
  }, [whatIDo, mission, username])

  const [visibleCount, setVisibleCount] = useState(0)
  const [done, setDone] = useState(false)
  const [history, setHistory] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [cmdLog, setCmdLog] = useState<string[]>([])
  const [logIndex, setLogIndex] = useState<number | null>(null)
  const timeStr = useRef(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
  ).current

  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (visibleCount >= bootLines.length) {
      setDone(true)
      return
    }
    const delay = bootLines[visibleCount]?.type === 'blank' ? 35 : 45
    const t = setTimeout(() => setVisibleCount((c) => c + 1), delay)
    return () => clearTimeout(t)
  }, [visibleCount, bootLines])

  useEffect(() => {
    if (done) inputRef.current?.focus()
  }, [done])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [visibleCount, history])

  function submit() {
    const raw = input
    setInput('')
    setLogIndex(null)
    if (raw.trim()) setCmdLog((c) => [...c, raw])

    const result = runCommand(raw, username)
    const entries: TerminalLine[] = [{ type: 'command', text: raw }]

    if (result.clear) {
      setHistory([])
      return
    }
    result.output?.forEach((text) => entries.push({ type: 'output', text }))
    setHistory((h) => [...h, ...entries])

    if (result.navigateTo) {
      setTimeout(() => navigate(result.navigateTo!), 450)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!cmdLog.length) return
      const nextIndex = logIndex === null ? cmdLog.length - 1 : Math.max(0, logIndex - 1)
      setLogIndex(nextIndex)
      setInput(cmdLog[nextIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (logIndex === null) return
      const nextIndex = logIndex + 1
      if (nextIndex >= cmdLog.length) {
        setLogIndex(null)
        setInput('')
      } else {
        setLogIndex(nextIndex)
        setInput(cmdLog[nextIndex])
      }
    }
  }

  let displayLineNumber = 0
  const shownBoot = bootLines.slice(0, visibleCount)

  return (
    <div className="relative flex h-full min-h-[300px] flex-col rounded-md border border-border-subtle bg-surface shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border-subtle px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 gap-1.5 pl-1">
            <span className="h-2.5 w-2.5 rounded-full bg-text-muted/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-text-muted/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-text-muted/40" />
          </div>
          <div className="flex min-w-0 items-center gap-2 rounded-sm border border-border-subtle bg-surface-light px-3 py-1.5">
            <span className="truncate font-mono text-[11px] text-text-secondary">{username}: ~</span>
            <X size={11} className="shrink-0 text-text-muted" />
          </div>
          <Plus size={14} className="shrink-0 text-text-muted" />
        </div>
        <div className="flex shrink-0 items-center gap-2.5 text-text-muted">
          <span className="hidden font-mono text-[10px] tracking-widest sm:inline">TERMINAL</span>
          <MoreVertical size={14} />
        </div>
      </div>

      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
        className="relative min-h-0 flex-1 cursor-text overflow-y-auto px-4 py-3.5 font-mono text-[12.5px] leading-[1.65] xl:text-[13px]"
      >
        <div className="pointer-events-none absolute right-4 top-3.5">
          <TerminalArt />
        </div>
        {shownBoot.map((line, i) => {
          if (line.type !== 'blank') displayLineNumber += 1
          const num = line.type !== 'blank' ? displayLineNumber : null
          return <TerminalRow key={`boot-${i}`} num={num} line={line} />
        })}

        {done &&
          history.map((line, i) => {
            if (line.type !== 'blank') displayLineNumber += 1
            const num = line.type !== 'blank' ? displayLineNumber : null
            return <TerminalRow key={`hist-${i}`} num={num} line={line} />
          })}

        {done && (
          <div className="flex items-center gap-3.5">
            <span className="w-4 shrink-0 text-right text-text-muted/50">{String(displayLineNumber + 1).padStart(2, '0')}</span>
            <span className="text-accent-light shrink-0">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              placeholder="type 'help'..."
              aria-label="Terminal command input"
              className="w-full min-w-0 flex-1 bg-transparent font-mono text-[12.5px] text-text-primary caret-accent outline-none placeholder:text-text-muted/50 xl:text-[13px]"
            />
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center justify-between border-t border-border-subtle px-4 py-2.5 font-mono text-[11px] text-text-muted">
        <span className="truncate">~/projects/portfolio</span>
        <span className="hidden sm:inline">zsh</span>
        <span className="tabular">{timeStr}</span>
      </div>
    </div>
  )
}

function TerminalRow({ num, line }: { num: number | null; line: TerminalLine }) {
  return (
    <div className="flex gap-3.5">
      <span className="w-4 shrink-0 select-none text-right text-text-muted/50">
        {num ? String(num).padStart(2, '0') : ''}
      </span>
      <span
        className={
          line.type === 'command'
            ? 'text-accent-light'
            : line.type === 'muted'
              ? 'text-text-primary'
              : line.type === 'progress'
                ? 'text-accent'
                : line.type === 'error'
                  ? 'text-danger'
                  : 'text-text-primary'
        }
      >
        {line.type === 'command' ? <span className="text-accent-light">$ </span> : null}
        {line.text}
      </span>
    </div>
  )
}
