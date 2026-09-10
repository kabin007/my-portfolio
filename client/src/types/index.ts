export interface Profile {
  name: string
  firstName: string
  title: string
  shortTitle: string
  location: string
  email: string
  phone: string
  website: string
  websiteLabel: string
  resumeUrl: string
  available: boolean
  tagline: string
  summary: string
  /** Short hero paragraph. Falls back to `summary` when unset. */
  heroIntro?: string
}

export interface Stat {
  value: string
  suffix: string
  label: string
}

export interface Service {
  icon: string
  title: string
  description: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  highlights: string[]
  tags: string[]
}

/** A headline figure on a case-study page. */
export interface CaseStudyMetric {
  value: string
  label: string
}

/** One numbered step in the "how it was built" walkthrough. */
export interface CaseStudyStep {
  title: string
  body: string
}

export interface CaseStudyStackGroup {
  group: string
  items: string[]
}

/**
 * Long-form write-up for a project that has no public URL.
 *
 * Projects that ship somewhere public link straight out via `link`; the rest
 * earn their detail here, so every card on /projects has exactly one CTA.
 */
export interface CaseStudy {
  summary: string
  role: string
  timeline: string
  status: string
  /** Framing paragraphs — what was actually going wrong before the build. */
  problem: string[]
  approach: CaseStudyStep[]
  /** Rendered into the terminal strip as a data/control flow. */
  pipeline: string[]
  metrics: CaseStudyMetric[]
  stack: CaseStudyStackGroup[]
  learnings: string[]
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  outcomes: string[]
  tech: string[]
  featured?: boolean
  /** Public URL. When set the card links out ("View Live") instead of to a case study. */
  link?: string
  year?: string
  /** URL segment for /projects/:slug. Required for a project carrying a `caseStudy`. */
  slug?: string
  caseStudy?: CaseStudy
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  gpa?: string
  details?: string[]
}

export interface Certification {
  id: string
  title: string
  issuer: string
  note?: string
}

export interface Social {
  name: string
  icon: string
  url: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
  read: boolean
}

export interface SiteContent {
  profile: Profile
  stats: Stat[]
  services: Service[]
  skills: SkillGroup[]
  marqueeSkills: string[]
  experiences: Experience[]
  projects: Project[]
  education: Education[]
  certifications: Certification[]
  achievements: string[]
  socials: Social[]
  blogPosts: BlogPost[]
}
