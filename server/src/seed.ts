/**
 * Seed data — single source of truth for first boot.
 * Once server/src/data/db.json exists, THAT file is authoritative and
 * editable via the admin panel; this seed only runs once to create it.
 */

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

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudyStep {
  title: string
  body: string
}

export interface CaseStudyStackGroup {
  group: string
  items: string[]
}

/** Long-form write-up shown at /projects/:slug for work with no public URL. */
export interface CaseStudy {
  summary: string
  role: string
  timeline: string
  status: string
  problem: string[]
  approach: CaseStudyStep[]
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

export interface DbShape {
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
  messages: ContactMessage[]
}

export const seedData: DbShape = {
  profile: {
    name: 'Kabin Ghimire',
    firstName: 'Kabin',
    title: 'Software Engineer',
    shortTitle: 'Backend Engineer / Automation & AI Specialist',
    location: 'Kathmandu, Nepal',
    email: 'ghimirekabin060@gmail.com',
    phone: '+977 9825959108',
    website: 'https://kabin.is-a.dev',
    websiteLabel: 'kabin.is-a.dev',
    resumeUrl: '/Kabin-Ghimire-CV.pdf',
    available: true,
    tagline: 'I build software, systems, and automations that solve real problems.',
    heroIntro:
      'Full-stack development, product thinking, APIs, automation, and AI-assisted workflows. I design and ship useful digital systems with clean execution.',
    summary:
      'ICT and digital-systems engineer specialising in AI workflows, automation, and backend development. I build production-grade systems — from FastAPI backends and RAG pipelines to web-scraping and data-normalisation engines — that drive data-driven decisions and operational efficiency. I bridge technical depth with clear communication, having led developer teams and translated complex systems for non-technical stakeholders.',
  },

  stats: [
    { value: '15', suffix: '+', label: 'Projects Delivered' },
    { value: '3', suffix: 'x', label: 'Companies & Teams' },
    { value: '5', suffix: '+', label: 'AI & Automation Stacks' },
    { value: '100', suffix: '%', label: 'Remote-Ready' },
  ],

  services: [
    {
      icon: 'Bot',
      title: 'AI & RAG Engineering',
      description:
        'LangChain + RAG workflows, LLM integrations (Claude, GPT, Gemini) and AI content systems built for accuracy and scale.',
    },
    {
      icon: 'Workflow',
      title: 'Automation Pipelines',
      description:
        'End-to-end automation with Python and n8n — web scraping, data normalisation, and self-running operational workflows.',
    },
    {
      icon: 'Server',
      title: 'Backend Development',
      description:
        'Scalable FastAPI backends, AI integrated applications and mobile experiences with clean, modular, integration-ready architecture.',
    },
  ],

  skills: [
    {
      category: 'AI & Automation',
      items: [
        'LangChain',
        'RAG Workflows',
        'Claude AI',
        'ChatGPT / GPT',
        'Gemini',
        'Python Automation',
        'n8n',
        'Web Scraping Pipelines',
        'AI Content Creation',
      ],
    },
    {
      category: 'Engineering & Cloud',
      items: ['Python', 'FastAPI', 'AWS', 'Linux', 'Data Normalization', 'System Integration', 'WordPress'],
    },
    {
      category: 'Digital & Growth',
      items: ['SEO Basics', 'Content Strategy', 'Campaign Analytics', 'Audience Targeting', 'Social Media'],
    },
    {
      category: 'Tools & Productivity',
      items: ['Notion', 'Slack', 'Google Workspace', 'MS Office Suite', 'Canva', 'CapCut'],
    },
  ],

  marqueeSkills: [
    'Python',
    'FastAPI',
    'LangChain',
    'RAG',
    'n8n',
    'AWS',
    'Web Scraping',
    'Claude AI',
    'GPT',
    'Gemini',
    'Automation',
    'Linux',
    'AI Content',
    'Data Pipelines',
  ],

  experiences: [
    {
      id: 'exp-thakur',
      role: 'Software Developer',
      company: 'Thakur International',
      location: 'Kathmandu, Nepal',
      period: 'Feb 2026 — Present',
      current: true,
      highlights: [
        'Lead developer on CRM applications, elevating customer-relationship management and retention workflows.',
        'Lead a team of developers — owning project execution, code quality and on-time delivery.',
        'Designed and shipped automation systems and mobile applications that measurably improved efficiency and UX.',
      ],
      tags: ['CRM', 'Automation', 'Team Leadership', 'Mobile Apps'],
    },
    {
      id: 'exp-worldmax',
      role: 'Customer Support & Technical Specialist',
      company: 'WorldMax TV',
      location: 'Sydney, Australia',
      period: 'Jul 2025 — Jan 2026',
      highlights: [
        'Provided technical support across digital platforms — diagnosing device compatibility, system access and connectivity issues.',
        'Translated complex technical issues into clear, actionable guidance, improving usability and product adoption.',
        'Maintained structured logs and reports of recurring issues, feeding directly into product and service reliability.',
      ],
      tags: ['Technical Support', 'Diagnostics', 'Reliability', 'User Enablement'],
    },
    {
      id: 'exp-brahmabytes',
      role: 'Junior Web Developer',
      company: 'Brahmabytes Lab Pvt Ltd',
      location: 'Kathmandu, Nepal',
      period: 'Aug 2024 — Nov 2024',
      highlights: [
        'Built scalable backend systems with FastAPI and Python for automation and structured data handling.',
        'Engineered web-scraping and data-normalisation pipelines to collect and process large datasets for analysis.',
        'Designed modular, scalable architectures with integration-readiness in mind.',
        'Authored technical documentation and simplified workflows for non-technical stakeholders.',
      ],
      tags: ['FastAPI', 'Python', 'Web Scraping', 'Data Pipelines', 'Architecture'],
    },
  ],

  projects: [
    {
      "id": "proj-ananta-legal",
      "title": "Ananta Legal",
      "category": "Corporate Law · Web",
      "description": "Website for a Kathmandu corporate law firm that works with founders — practice areas, bilingual content and a booking flow, built around flat-fee pricing and a 24-hour response promise.",
      "outcomes": [
        "Bilingual English / नेपाली experience across the whole site",
        "Practice areas from incorporation and NDAs to FDI approvals, cap tables and compliance",
        "\"Book a free intro call\" as the single conversion path"
      ],
      "tech": [
        "TypeScript",
        "Automation",
        "Web",
        "APIs"
      ],
      "featured": true,
      "year": "2025",
      "link": "https://ananta-legal.com"
    },
    {
      "id": "proj-chatboq",
      "title": "Chatboq",
      "category": "AI · SaaS Platform",
      "description": "An all-in-one live chat and AI chatbot platform — engages website visitors, automates routine conversations and pulls every customer message into a single inbox.",
      "outcomes": [
        "One inbox for live chat and AI conversations",
        "Human-controlled AI, so teams step in at the right moment",
        "Embeddable chat widget with real-time visitor analytics"
      ],
      "tech": [
        "AI/LLM",
        "React",
        "APIs",
        "Analytics"
      ],
      "featured": true,
      "year": "2025",
      "link": "https://chatboq.com"
    },
    {
      "id": "proj-ignition",
      "title": "Ignition",
      "category": "EdTech · Student Platform",
      "description": "A study-in-the-UK discovery platform — career quiz, course and university search across undergraduate, postgraduate and top-up levels, eligibility checks and application guidance in one journey.",
      "outcomes": [
        "Course and university search with side-by-side comparison",
        "Career quiz and eligibility check to narrow options early",
        "Guidance covering applications, life in the UK and careers after graduation"
      ],
      "tech": [
        "Next.js",
        "Python",
        "Automation",
        "TypeScript"
      ],
      "featured": true,
      "year": "2026",
      "link": "https://ignition-website.vercel.app/"
    },
    {
      "id": "proj-ed360",
      "title": "ED360",
      "category": "EdTech · Consultancy OS",
      "description": "An operating system for international education consultancies — every student tracked from first call to visa stamp, with leads, documents, applications and offers in one pipeline the whole team can see.",
      "outcomes": [
        "Lead follow-up on a schedule, with an automatic flag before a lead goes stale",
        "One profile per student: history, test scores, documents and preferences",
        "Per-destination application workflows for Australia, Canada, the UK and the US",
        "Document tracking that surfaces gaps before a deadline slips"
      ],
      "tech": [
        "React",
        "Node.js",
        "APIs",
        "Automation"
      ],
      "featured": true,
      "year": "2026",
      "link": "https://ed360-landing.onrender.com/"
    },
    {
      "id": "proj-rag",
      "title": "RAG Knowledge Assistant",
      "category": "AI & Automation",
      "description": "Retrieval-augmented generation workflow combining LangChain with LLMs (Claude/GPT) to answer questions over private document sets with grounded, cited responses.",
      "outcomes": [
        "Grounded answers from custom data",
        "Reduced manual lookup time",
        "Modular, reusable RAG pipeline"
      ],
      "tech": [
        "claude code",
        "RAG",
        "Fast API",
        "Python"
      ],
      "featured": false,
      "year": "2025",
      "slug": "rag-knowledge-assistant",
      "caseStudy": {
        "summary": "A question-answering layer over a private document set that refuses to guess — every sentence it returns points back at the chunk it came from.",
        "role": "Design & build",
        "timeline": "2025",
        "status": "Reusable internal pipeline",
        "problem": [
          "The knowledge a team needs is rarely in one place. It is spread across contracts, handbooks, reports and email threads, and the person who knows where to look is usually the bottleneck.",
          "Handing those documents to a general-purpose LLM does not fix it. The model has never seen the private data, so it fills the gap with something plausible — and a confident wrong answer about your own paperwork is worse than no answer at all.",
          "Plain keyword search fails the other way: ask it a question in different words than the document uses and it returns nothing, even when the answer is sitting right there."
        ],
        "approach": [
          {
            "title": "Ingest and chunk",
            "body": "Documents are parsed to text and split on structure — headings and paragraphs rather than a fixed character count — so a chunk is a complete thought. Each one keeps its source file, page and section as metadata, which is what makes citation possible later."
          },
          {
            "title": "Embed and index",
            "body": "Chunks are embedded and written to a vector store behind a thin interface. Keeping the store behind that interface meant the retrieval backend could be swapped without touching anything downstream."
          },
          {
            "title": "Retrieve, then narrow",
            "body": "A query pulls a generous set of candidate chunks by vector similarity, then re-ranks them and keeps only the top few. Over-fetching and narrowing beats fetching a small set directly — the right chunk is often not the nearest one."
          },
          {
            "title": "Generate under constraint",
            "body": "The prompt hands the model only the retrieved chunks and instructs it to answer from those alone, and to say so plainly when they do not contain the answer. Refusing is a valid, correct output."
          },
          {
            "title": "Cite and return",
            "body": "Each claim is returned alongside the chunk metadata that supports it, so a reader can jump to the source and check. FastAPI exposes the whole thing as one endpoint the rest of the stack can call."
          }
        ],
        "pipeline": [
          "$ documents ──▶ parse ──▶ chunk(+metadata)",
          "  chunks ──▶ embed ──▶ vector store",
          "",
          "$ query ──▶ embed ──▶ top-k similar",
          "  top-k ──▶ re-rank ──▶ top-n context",
          "  context + question ──▶ LLM ──▶ answer",
          "  answer + metadata ──▶ cited response ✓"
        ],
        "metrics": [
          {
            "value": "Cited",
            "label": "Every answer traces back to source chunks"
          },
          {
            "value": "Swappable",
            "label": "Claude or GPT behind one interface"
          },
          {
            "value": "Private",
            "label": "Documents stay inside the deployment"
          }
        ],
        "stack": [
          {
            "group": "Orchestration",
            "items": [
              "LangChain",
              "Python"
            ]
          },
          {
            "group": "Models",
            "items": [
              "Claude",
              "GPT",
              "Embeddings"
            ]
          },
          {
            "group": "Serving",
            "items": [
              "FastAPI",
              "REST"
            ]
          },
          {
            "group": "Retrieval",
            "items": [
              "Vector store",
              "Re-ranking",
              "Chunk metadata"
            ]
          }
        ],
        "learnings": [
          "Retrieval quality sets the ceiling. A better model cannot rescue the wrong chunks, and most of the accuracy work happened in chunking and ranking, not in prompting.",
          "Chunking on structure rather than character count removed a whole category of nonsense answers caused by splitting a sentence down the middle.",
          "\"I don't know\" has to be an allowed answer, or the model will invent one. Making refusal explicit in the prompt was the single biggest trust win.",
          "Keeping the model behind an interface meant swapping providers was a config change, not a rewrite."
        ]
      }
    },
    {
      "id": "proj-n8n",
      "title": "n8n Automation Workflows",
      "category": "Automation",
      "description": "Operational automation that connects apps and services — turning manual, repetitive processes into reliable self-running workflows.",
      "outcomes": [
        "Eliminated manual handoffs",
        "Connected multiple services",
        "Improved operational efficiency"
      ],
      "tech": [
        "n8n",
        "Python",
        "APIs",
        "Automation"
      ],
      "featured": false,
      "year": "2025",
      "slug": "n8n-automation-workflows",
      "caseStudy": {
        "summary": "A set of self-running operational workflows that replaced the copy-paste work between tools — built to fail loudly rather than quietly.",
        "role": "Design & build",
        "timeline": "2025",
        "status": "Running in production",
        "problem": [
          "Most operational work is not hard, it is just repetitive: an entry arrives in one tool, someone reformats it, pastes it into a second, notifies a third and updates a sheet. It works until the person doing it is on leave.",
          "Every one of those handoffs is also a place to drop something. There is no log, no retry and no alert — a missed step simply looks like nothing happened.",
          "Writing a bespoke script per integration solves it once and creates a maintenance problem: credentials scattered across cron jobs nobody remembers owning."
        ],
        "approach": [
          {
            "title": "Map the manual process first",
            "body": "Before automating anything, the existing process was written out step by step — trigger, decision points, every system touched. Half the steps turned out to exist only because of an earlier workaround, and were dropped rather than automated."
          },
          {
            "title": "Model it as an event-driven workflow",
            "body": "Each process became an n8n workflow with an explicit trigger — webhook or schedule — and a visible node graph. The graph is the documentation, which matters when the person maintaining it is not the person who built it."
          },
          {
            "title": "Make every step idempotent",
            "body": "Steps were designed so that running one twice is harmless: writes key on a stable external id and check-then-act. That is what makes an automatic retry safe rather than a source of duplicates."
          },
          {
            "title": "Push the hard parts to Python",
            "body": "Branching logic, parsing and data normalisation live in Python called from the workflow, not in a chain of visual nodes. The workflow handles orchestration; the code handles anything that deserves to be tested."
          },
          {
            "title": "Fail loudly",
            "body": "Every workflow has an error branch that captures the payload, retries with backoff where it makes sense, and alerts a human when it cannot recover. A silent failure is the one failure mode that is worse than the manual process."
          }
        ],
        "pipeline": [
          "$ trigger  webhook | schedule",
          "  ├─▶ validate payload",
          "  ├─▶ normalise (python)",
          "  ├─▶ branch on rules",
          "  │    ├─▶ system A  write (idempotent)",
          "  │    └─▶ system B  write (idempotent)",
          "  └─▶ notify ──▶ log run ✓",
          "",
          "  on error ──▶ retry(backoff) ──▶ alert human ⚠"
        ],
        "metrics": [
          {
            "value": "Zero",
            "label": "Manual handoffs left in the process"
          },
          {
            "value": "Retry-safe",
            "label": "Idempotent steps survive partial failures"
          },
          {
            "value": "Alerted",
            "label": "Failures surface instead of going silent"
          }
        ],
        "stack": [
          {
            "group": "Orchestration",
            "items": [
              "n8n",
              "Webhooks",
              "Cron"
            ]
          },
          {
            "group": "Logic",
            "items": [
              "Python",
              "Data normalisation"
            ]
          },
          {
            "group": "Integration",
            "items": [
              "REST APIs",
              "OAuth",
              "Third-party SaaS"
            ]
          },
          {
            "group": "Operations",
            "items": [
              "Retry & backoff",
              "Error branches",
              "Run logs"
            ]
          }
        ],
        "learnings": [
          "Mapping the manual process before automating it was the highest-value step — a meaningful share of it did not need to exist at all.",
          "Idempotency is not optional. The moment retries exist, any step that is not safe to repeat becomes a duplicate-data bug.",
          "Visual workflows are excellent orchestration and poor logic. Anything with real branching reads better — and tests better — as code.",
          "An automation nobody trusts gets bypassed. Visible run logs and real alerts did more for adoption than adding features."
        ]
      }
    },
    {
      "id": "proj-mobile",
      "title": "Mobile App & Backend",
      "category": "Full-Stack",
      "description": "A mobile application backed by clean, modular FastAPI services — designed for scalability, integration-readiness and great UX.",
      "outcomes": [
        "Improved user experience",
        "Scalable backend architecture",
        "Integration-ready APIs"
      ],
      "tech": [
        "FastAPI",
        "Python",
        "Mobile",
        "AWS"
      ],
      "featured": false,
      "year": "2026",
      "slug": "mobile-app-backend",
      "caseStudy": {
        "summary": "A mobile client and the FastAPI services behind it, built contract-first so the two halves could be developed in parallel without guessing at each other.",
        "role": "Backend & API design",
        "timeline": "2026",
        "status": "Shipped",
        "problem": [
          "A mobile client cannot be patched like a website. Once a version is on someone's phone it stays there, so an API that changes shape underneath it breaks users who have not updated — and may never update.",
          "Mobile networks are also unreliable in a way desktop ones are not. An app that assumes connectivity feels broken on a train, in a lift, or on a slow connection.",
          "Building the app and the backend against each other's assumptions is the usual way this goes wrong: both sides are finished, neither fits."
        ],
        "approach": [
          {
            "title": "Agree the contract before building",
            "body": "The API surface was specified as an OpenAPI schema and agreed before either side started. FastAPI generates that schema from the endpoint definitions, so the contract and the implementation cannot drift apart silently."
          },
          {
            "title": "Split services along seams that actually move",
            "body": "Modules were drawn around parts of the domain that change for different reasons and at different rates, rather than one service per noun. The goal was that a typical change touches one module."
          },
          {
            "title": "Version the API from day one",
            "body": "Endpoints are versioned and additive changes are the default, so an older client keeps working against a newer backend. Removing a field is a deliberate, scheduled decision rather than an accident."
          },
          {
            "title": "Design for a bad connection",
            "body": "The client treats the network as optional — reads come from a local cache first, writes are queued and replayed when connectivity returns, and each write carries a client-generated id so a replay cannot double-apply."
          },
          {
            "title": "Deploy something reproducible",
            "body": "Services run containerised on AWS with configuration in the environment rather than the image, so the same artefact promotes cleanly from staging to production."
          }
        ],
        "pipeline": [
          "$ mobile client",
          "  ├─▶ local cache ──▶ instant read",
          "  └─▶ write queue ──▶ (offline) hold",
          "                   └─▶ (online) replay",
          "",
          "$ api  /v1  FastAPI",
          "  ├─▶ auth  token + refresh",
          "  ├─▶ validate  pydantic schema",
          "  ├─▶ domain modules",
          "  └─▶ persistence ──▶ response ✓"
        ],
        "metrics": [
          {
            "value": "Contract-first",
            "label": "OpenAPI schema agreed before either side was built"
          },
          {
            "value": "Offline-ready",
            "label": "Queued writes replay when the connection returns"
          },
          {
            "value": "Versioned",
            "label": "Older clients keep working against a newer API"
          }
        ],
        "stack": [
          {
            "group": "Backend",
            "items": [
              "FastAPI",
              "Python",
              "Pydantic"
            ]
          },
          {
            "group": "Client",
            "items": [
              "Mobile",
              "Local cache",
              "Write queue"
            ]
          },
          {
            "group": "Platform",
            "items": [
              "AWS",
              "Containers",
              "Env config"
            ]
          },
          {
            "group": "Contract",
            "items": [
              "OpenAPI",
              "Versioned REST",
              "Token auth"
            ]
          }
        ],
        "learnings": [
          "Contract-first was what let the client and backend be built at the same time. The schema, not a conversation, was the integration point.",
          "Additive-only API change is a cheap discipline that removes an entire class of breakage for users who never update.",
          "Offline support has to be designed in at the start. Retrofitting a write queue onto code that assumes the network is there means rewriting the data layer.",
          "Pydantic validation at the edge kept malformed input from reaching domain logic, which made the error messages far more useful to the client team."
        ]
      }
    }
  ],

  education: [
    {
      id: 'edu-lincoln',
      degree: 'Bachelor in Information Technology',
      institution: 'Lincoln University College',
      location: 'Birtamode, Jhapa',
      period: 'May 2022 — Sep 2025',
      gpa: '3.33 / 4.0',
      details: ['Cloud Computing', 'Software Engineering', 'Artificial Intelligence', 'Algorithms', 'Operating Systems'],
    },
  ],

  certifications: [
    { id: 'cert-ml', title: 'Machine Learning with Python', issuer: 'freeCodeCamp.org' },
    { id: 'cert-marketing', title: 'Fundamentals of Digital Marketing', issuer: 'Google Digital Garage' },
    { id: 'cert-ai', title: 'AI Workflow Automation with Python & GPT', issuer: 'Udemy', note: 'Practical' },
  ],

  achievements: [
    'Led a developer team to on-time delivery of CRM and automation systems at Thakur International.',
    'Built production FastAPI backends and scraping pipelines handling large-scale datasets.',
    'Shipped RAG and AI-automation workflows across multiple LLM providers (Claude, GPT, Gemini).',
    'Delivered remote technical support internationally (Australia), driving product reliability.',
  ],

  socials: [
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://www.linkedin.com/in/kabin-ghimire-8564a721b/' },
    { name: 'GitHub', icon: 'Github', url: 'https://github.com/kabin007' },
    { name: 'Email', icon: 'Mail', url: 'mailto:ghimirekabin060@gmail.com' },
  ],

  blogPosts: [
    {
      id: 'post-rag-lessons',
      slug: 'lessons-building-rag-pipelines',
      title: 'Lessons from Building RAG Pipelines in Production',
      excerpt:
        'What actually breaks when you take retrieval-augmented generation from a notebook to a real, cited, production system.',
      content:
        'Retrieval-augmented generation looks simple in a notebook and gets hard fast in production.\n\nThe first failure mode is chunking: naive fixed-size chunks fragment context and tank retrieval quality. The fix is semantic chunking that respects document structure — headings, tables, code blocks — rather than blind character counts.\n\nThe second is grounding. Users trust an answer more when they can see where it came from, so every response should carry citations back to source spans, not just a confident paragraph of prose.\n\nThe third is evaluation. Vibes-based testing does not scale — you need a small, versioned set of question/answer pairs you can regression-test every time you change the retriever, the chunking strategy, or the prompt.\n\nNone of this is exotic. It is just engineering discipline applied to a new kind of system.',
      tags: ['AI', 'RAG', 'LangChain', 'Engineering'],
      published: true,
      createdAt: '2026-06-02T09:00:00.000Z',
      updatedAt: '2026-06-02T09:00:00.000Z',
    },
    {
      id: 'post-automation-mindset',
      slug: 'automation-is-a-mindset-not-a-tool',
      title: 'Automation Is a Mindset, Not a Tool',
      excerpt: 'n8n, cron jobs, and Python scripts are implementation details. The real skill is spotting what to automate.',
      content:
        'Every automation project I have shipped started the same way: someone doing a repetitive task by hand and accepting it as "just how it works."\n\nThe tool — n8n, a Python script, a scheduled job — is the easy part. The hard part is noticing the pattern: this task is repetitive, its inputs are structured enough to parse, and the cost of getting it wrong occasionally is lower than the cost of a human doing it every day.\n\nOnce you see workflows this way, automation stops being a technology choice and becomes a lens you apply to every operational process you touch.',
      tags: ['Automation', 'n8n', 'Process'],
      published: true,
      createdAt: '2026-07-14T09:00:00.000Z',
      updatedAt: '2026-07-14T09:00:00.000Z',
    },
  ],

  messages: [],
}
