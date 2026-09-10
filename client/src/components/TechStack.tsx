import type { IconType } from 'react-icons'
import { SiPython, SiFastapi, SiLangchain, SiN8N, SiLinux, SiClaude, SiGooglegemini } from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { Bot, Database, Sparkles, Workflow, GitBranch, Code2 } from 'lucide-react'

const ICON_MAP: Record<string, IconType> = {
  Python: SiPython,
  FastAPI: SiFastapi,
  LangChain: SiLangchain,
  RAG: Database,
  n8n: SiN8N,
  AWS: FaAws,
  'Web Scraping': Bot,
  'Claude AI': SiClaude,
  GPT: Sparkles,
  Gemini: SiGooglegemini,
  Automation: Workflow,
  Linux: SiLinux,
  'AI Content': Sparkles,
  'Data Pipelines': GitBranch,
}

export default function TechStack({ items }: { items: string[] }) {
  return (
    <div>
      <span className="section-label">TECHNOLOGIES I WORK WITH</span>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {items.map((tech) => {
          const Icon = ICON_MAP[tech] ?? Code2
          return (
            <div
              key={tech}
              className="flex w-[76px] flex-col items-center gap-2.5 rounded-lg border border-border-subtle bg-surface px-2 py-3.5 transition-all hover:-translate-y-0.5 hover:border-accent/30"
            >
              <Icon size={22} className="text-text-primary/90" />
              <span className="text-center font-mono text-[10px] leading-tight text-text-secondary">{tech}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
