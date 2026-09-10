import type { ReactNode } from 'react'
import {
  SiClaude,
  SiFastapi,
  SiGooglecloud,
  SiGooglegemini,
  SiLangchain,
  SiLinux,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiPandas,
  SiPython,
  SiReact,
  SiScrapy,
  SiTypescript,
  SiWordpress,
} from 'react-icons/si'
import { FaAws, FaBolt, FaBrain, FaChartLine, FaDatabase, FaGears, FaRobot, FaServer } from 'react-icons/fa6'

interface TechIcon {
  node: ReactNode
  /** Brand colour, used at tile size where it reads as a logo rather than noise. */
  color: string
}

const S = 22

/**
 * Skill name → brand mark.
 *
 * Real logos (not hand-drawn pixel approximations) for anything with a
 * trademark: a wonky 16px pixel React atom looks like a mistake, whereas the
 * real mark inside a pixel frame reads as intentional — the same trick the
 * reference uses.
 *
 * Keys are matched case-insensitively against the skill string, longest first,
 * so "Python Automation" resolves to Python rather than to Automation.
 */
const REGISTRY: Record<string, TechIcon> = {
  python: { node: <SiPython size={S} />, color: '#3776AB' },
  fastapi: { node: <SiFastapi size={S} />, color: '#009688' },
  langchain: { node: <SiLangchain size={S} />, color: '#1C3C3C' },
  'claude ai': { node: <SiClaude size={S} />, color: '#D97757' },
  claude: { node: <SiClaude size={S} />, color: '#D97757' },
  gemini: { node: <SiGooglegemini size={S} />, color: '#4285F4' },
  gpt: { node: <FaRobot size={S} />, color: '#10A37F' },
  n8n: { node: <SiN8N size={S} />, color: '#EA4B71' },
  aws: { node: <FaAws size={S} />, color: '#FF9900' },
  linux: { node: <SiLinux size={S} />, color: '#1C1A20' },
  typescript: { node: <SiTypescript size={S} />, color: '#3178C6' },
  react: { node: <SiReact size={S} />, color: '#61DAFB' },
  'next.js': { node: <SiNextdotjs size={S} />, color: '#1C1A20' },
  'node.js': { node: <SiNodedotjs size={S} />, color: '#5FA04E' },
  wordpress: { node: <SiWordpress size={S} />, color: '#21759B' },
  notion: { node: <SiNotion size={S} />, color: '#1C1A20' },
  cloud: { node: <SiGooglecloud size={S} />, color: '#4285F4' },
  'web scraping': { node: <SiScrapy size={S} />, color: '#60A839' },
  scraping: { node: <SiScrapy size={S} />, color: '#60A839' },
  'data pipelines': { node: <SiPandas size={S} />, color: '#150458' },
  'data normalization': { node: <FaDatabase size={S} />, color: '#5A6BB8' },
  rag: { node: <FaBrain size={S} />, color: '#8B5CF6' },
  automation: { node: <FaGears size={S} />, color: '#6B7280' },
  apis: { node: <FaServer size={S} />, color: '#0EA5E9' },
  api: { node: <FaServer size={S} />, color: '#0EA5E9' },
  seo: { node: <FaChartLine size={S} />, color: '#F59E0B' },
  'ai content': { node: <FaBolt size={S} />, color: '#EC4899' },
  ai: { node: <FaRobot size={S} />, color: '#10A37F' },
}

const KEYS = Object.keys(REGISTRY).sort((a, b) => b.length - a.length)

export function techIconFor(name: string): TechIcon {
  const n = name.toLowerCase()
  const hit = KEYS.find((k) => n.includes(k))
  return hit ? REGISTRY[hit] : { node: <FaGears size={S} />, color: '#6B7280' }
}
