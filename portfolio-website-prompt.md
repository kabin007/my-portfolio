# Build a Premium Futuristic Developer Portfolio Website

You are an expert frontend engineer and UI/UX designer. Build a **production-quality personal developer/ software engineer portfolio website** based closely on the **attached reference image**.

The attached image is the primary visual reference. **Recreate its layout, spacing, proportions, typography hierarchy, terminal UI, borders, colors, and overall visual language as closely as possible**, while making the implementation responsive and functional.

The website should feel like a **premium futuristic software engineer portfolio**, not a generic template.

------

# 1. CORE CONCEPT

The website represents a modern software engineer/developer.

The visual identity should communicate:

- Software engineering
- Backend development
- AI
- Automation
- DevOps
- Linux/developer culture
- Clean engineering
- Technical precision
- Futuristic but professional design

The design should be:

**dark + minimal + futuristic + technical + premium**

Do NOT make it overly cyberpunk.

Avoid:

- Excessive neon
- Rainbow gradients
- Purple/blue gradient text
- Matrix rain
- Hacker skulls
- Excessive glowing effects
- Gaming-style UI
- Random decorative code
- Huge amounts of animation
- Generic SaaS landing-page design

The reference image uses a **restrained olive/lime accent against a nearly black interface**.

Use that design philosophy throughout the entire website.

------

# 2. VERY IMPORTANT HOMEPAGE RULE

## THE HOMEPAGE MUST BE EXACTLY ONE SCREEN

The homepage/landing page must contain **ONLY the hero section shown in the reference image**.

There must be:

**NO CONTENT BELOW THE HERO.**

There must be:

**NO VERTICAL SCROLLING ON THE HOMEPAGE.**

The homepage should fit inside:

```text
100vh
```

with appropriate responsive behavior.

The user should see the entire hero experience immediately.

Do NOT create:

- About preview section
- Projects section below
- Skills section below
- Experience section below
- Contact section below
- Footer below
- Testimonials
- Blog preview
- "More about me"
- Any additional homepage sections

Everything else must be accessible through the navigation.

The homepage is essentially:

```text
/
    ↓
Full-screen hero only
```

The navigation is the primary way users explore the rest of the website.

------

# 3. PAGE STRUCTURE

Create separate routes/pages:

```text
/
├── /about
├── /skills
├── /projects
├── /experience
├── /contact
```

Navbar navigation:

```text
HOME
ABOUT
SKILLS
PROJECTS
EXPERIENCE
CONTACT
```

Each navigation item must navigate to its corresponding page.

Do NOT implement these pages as sections on the homepage.

They are separate pages.

Use client-side routing with React Router.

Navigation should feel instant and polished.

------

# 4. HOMEPAGE HERO

Recreate the attached reference image as closely as possible.

The hero should occupy the entire viewport.

General structure:

```text
┌───────────────────────────────────────────────────────────────┐
│ KG_       HOME ABOUT SKILLS PROJECTS EXPERIENCE CONTACT       │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  SOFTWARE ENGINEER        TERMINAL             SYSTEM         │
│                                                               │
│  I BUILD                  ┌─────────────────┐   ┌──────────┐  │
│  DIGITAL                   │ terminal        │   │ SYSTEM   │  │
│  SOLUTIONS_               │                 │   │          │  │
│                           │ developer info  │   │ SERVICES │  │
│  description              │ commands        │   │ LOCATION │  │
│                           │ status          │   │ TIME     │  │
│  [VIEW PROJECTS]          └─────────────────┘   └──────────┘  │
│  [CONTACT ME]                                                   │
│                                                               │
│  TECHNOLOGIES I WORK WITH       PROJECTS / EXPERIENCE / ...   │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

The exact proportions should follow the reference.

------

# 5. NAVBAR

Create a fixed/top navigation bar.

Left:

```text
KG_
```

This is the personal logo.

Make it typographic rather than a complicated logo.

The underscore should use the accent color.

Center navigation:

```text
HOME
ABOUT
SKILLS
PROJECTS
EXPERIENCE
CONTACT
```

Right:

```text
LET'S CONNECT →
```

The navbar should have:

- Very dark background
- Thin bottom border
- Minimal spacing
- Uppercase labels
- Monospace or technical typography
- Subtle hover effects
- Accent-colored active indicator

Active page:

```text
HOME
────
```

Use the accent color for the active underline.

On other pages the corresponding navigation item becomes active.

Navbar should remain visually consistent across every page.

------

# 6. COLOR SYSTEM

Do NOT use gradients for the primary visual identity.

Use a restrained monochromatic palette.

Suggested colors:

```css
--background: #080a09;
--surface: #0d100e;
--surface-light: #121512;

--text-primary: #e8e5d8;
--text-secondary: #a8a89b;
--text-muted: #66695f;

--accent: #b8bd72;
--accent-light: #c9ce88;
--accent-dark: #747a43;

--border: rgba(184, 189, 114, 0.22);
--border-subtle: rgba(232, 229, 216, 0.10);
```

The exact values can be adjusted slightly to match the reference.

IMPORTANT:

**No purple-to-blue gradients.**

**No rainbow gradients.**

**No gradient typography.**

The accent should primarily be:

```text
muted olive / lime / yellow-green
```

Use it sparingly.

------

# 7. TYPOGRAPHY

Typography is extremely important.

The reference has a futuristic technical display font for the large headline.

Use a font combination such as:

### Display

```text
Space Grotesk
```

or another excellent futuristic geometric font.

For an even more distinctive look, consider:

```text
Oxanium
```

or

```text
Chakra Petch
```

Use the display font for:

- Main headline
- Navigation
- Small technical labels
- Numbers

### Body

Use:

```text
Inter
```

or

```text
Manrope
```

### Terminal

Use:

```text
JetBrains Mono
```

or

```text
IBM Plex Mono
```

The typography should feel like a combination of:

**modern engineering interface + futuristic editorial design.**

Do not use generic Arial.

------

# 8. HERO LEFT SIDE

At the upper-left:

```text
SOFTWARE ENGINEER
```

Use:

- Small uppercase text
- Letter spacing
- Accent color
- Thin horizontal technical line beside/after it

Then the primary headline:

```text
I BUILD
DIGITAL
SOLUTIONS_
```

The underscore should use the accent color.

The headline must be:

- Very large
- Bold
- Geometric
- Tight line-height
- High contrast
- Visually dominant

Do NOT use gradient text.

The words should be primarily off-white.

Only the underscore should use the accent.

------

# 9. DESCRIPTION

Below the headline:

```text
I build scalable web applications, automate
workflows and turn ideas into real-world
products that make an impact.
```

Use a readable muted-gray/off-white color.

Keep the width constrained so the paragraph forms a clean block.

------

# 10. HERO BUTTONS

Create two buttons.

Primary:

```text
>_ VIEW PROJECTS
```

Secondary:

```text
CONTACT ME →
```

Primary button:

- Accent background
- Dark text
- Sharp/slightly rounded corners
- Subtle hover state

Secondary:

- Transparent
- Thin accent border
- Off-white text

Hover effects should be subtle.

Example:

Primary:

```text
background → slightly brighter accent
transform → translateY(-2px)
```

Secondary:

```text
border → accent
background → subtle accent tint
```

Clicking:

```text
VIEW PROJECTS
```

must navigate to:

```text
/projects
```

Clicking:

```text
CONTACT ME
```

must navigate to:

```text
/contact
```

------

# 11. TERMINAL PANEL

The terminal is the major visual element on the right side.

Build it as a real React component rather than a static image.

Structure:

```text
┌───────────────────────────────────────────┐
│ ● ● ●     kabin@dev-machine: ~        +   │
├───────────────────────────────────────────┤
│                                           │
│ 01  $ whoami                              │
│ 02  kabin@dev-machine                     │
│                                           │
│ 04  $ what_i_do                           │
│ 05  > Backend Development                 │
│ 06  > API Design & Integration            │
│ 07  > Database Design                     │
│ 08  > Automation & DevOps                │
│ 09  > AI & Intelligent Solutions          │
│                                           │
│ 11  $ cat mission.txt                     │
│ 12  Building clean, efficient and         │
│ 13  scalable solutions that make          │
│ 14  an impact.                            │
│                                           │
│ 15  $ git status                          │
│ 16  On branch main                        │
│ 17  working tree clean                    │
│                                           │
│ 19  $ ./build.sh                          │
│ 20  [████████████] 100%                  │
│ 21  Build completed successfully.        │
│                                           │
│ 23  $ █                                   │
├───────────────────────────────────────────┤
│ ~/projects/portfolio     zsh     10:42 AM │
└───────────────────────────────────────────┘
```

Make it look realistic.

------

# 12. TERMINAL VISUAL DESIGN

Terminal:

- Dark surface
- Thin border
- Very subtle accent border
- Slight corner radius
- No excessive glow
- Subtle shadow
- Fine internal dividers

Top bar:

```text
● ● ●
```

Use muted versions of the traditional terminal window controls.

Title:

```text
kabin@dev-machine: ~
```

Right:

```text
+
```

and possibly a small menu icon.

Use JetBrains Mono.

------

# 13. TERMINAL ANIMATION

Add subtle terminal animation.

On initial page load:

1. Terminal appears
2. Commands appear progressively
3. Output appears
4. Cursor starts blinking

Do NOT make the animation slow or annoying.

The terminal should be fully readable almost immediately.

After initialization, occasionally update the cursor/status subtly.

Do NOT constantly type fake code.

The terminal animation should feel like a polished UI interaction, not a gimmick.

------

# 14. RIGHT-SIDE INFORMATION CARDS

To the right of the terminal create vertically stacked compact cards.

### SYSTEM

```text
SYSTEM

CPU       23%
MEM       4.16GB / 8GB
DISK      120GB / 256GB
UPTIME    12d 14h 28m
```

Use very small progress bars.

### SERVICES

```text
SERVICES

API          ● ONLINE
DATABASE     ● ONLINE
REDIS        ● ONLINE
WORKER       ● ONLINE
```

Use the accent color for status indicators.

### LOCATION

Show a subtle minimalist world map/grid visualization.

Keep it understated.

Do NOT use a giant colorful map.

### TIME

Display:

```text
10:42 AM
MON, MAY 27
```

This can use the actual user's current local time dynamically.

------

# 15. TECHNOLOGY STRIP

At the bottom-left of the hero:

```text
TECHNOLOGIES I WORK WITH
```

Then compact cards:

```text
Python
FastAPI
PostgreSQL
Docker
AWS
Linux
Git
TypeScript
```

Each should have:

- Small icon
- Technology name
- Dark card
- Thin border
- Subtle hover

Do not use huge colorful logos.

Keep them monochromatic or muted.

------

# 16. STATS PANEL

Bottom-right:

Create a horizontal statistics panel:

```text
</>              BRIEFCASE           CUP              ROCKET

15+              3+                  ∞                50+
PROJECTS         YEARS EXPERIENCE    CUPS OF CODE     DEPLOYMENTS
```

Use simple line icons.

The numbers should be prominent.

Use the accent color sparingly.

------

# 17. BACKGROUND

The background should be:

```text
almost black
```

with an extremely subtle technical grid.

Example:

```text
background:
    #080a09
```

Add a very subtle:

```text
grid
```

using CSS gradients.

The grid must barely be visible.

Also add extremely subtle vertical technical lines.

Do NOT use:

- stars everywhere
- particle explosions
- huge glowing circles
- futuristic landscapes

Keep it sophisticated.

------

# 18. SIDE INDICATOR

On the far-left edge create a minimal vertical page indicator.

Example:

```text
01
 ●
 ○
 ○
 ○
 ○
05
```

This is decorative.

It should be subtle.

------

# 19. SCROLL INDICATOR

At the bottom center:

```text
mouse icon
SCROLL DOWN
```

However, remember:

### THE HOMEPAGE DOES NOT SCROLL.

This is only a visual design element from the reference.

Instead of actually suggesting page scrolling, clicking it should navigate to:

```text
/about
```

or it can simply be a subtle navigation cue.

Do NOT introduce actual vertical scrolling.

------

# 20. HOMEPAGE RESPONSIVENESS

Desktop should reproduce the reference closely.

For desktop:

```text
1440 × 900
```

should be the primary design target.

Also support:

```text
1920 × 1080
1366 × 768
1280 × 800
```

The entire hero must remain within the viewport.

Do not allow content to overflow vertically.

Use CSS techniques such as:

```css
min-height: 100dvh;
height: 100dvh;
overflow: hidden;
```

where appropriate.

Do not simply shrink everything until it becomes unreadable.

Create responsive breakpoints.

------

# 21. MOBILE DESIGN

On mobile, the desktop layout should not simply be squashed.

Create a dedicated responsive composition.

Navbar:

```text
KG_                         ☰
```

Open a full-screen navigation menu.

Hero should prioritize:

```text
SOFTWARE ENGINEER

I BUILD
DIGITAL
SOLUTIONS_

description

VIEW PROJECTS
CONTACT ME
```

Then a compact terminal preview.

However, the homepage must still remain a single viewport experience where practical.

If the screen is too small to fit every desktop decorative element, prioritize:

1. Navbar
2. Headline
3. Description
4. CTAs
5. Terminal
6. Minimal stats

Hide secondary decorative elements such as the system/location cards on very small screens.

------

# 22. OTHER PAGES

Every other page should use the **same design system**.

They should NOT suddenly become conventional white pages.

Maintain:

```text
#080a09
```

background.

Maintain:

```text
off-white typography
muted gray secondary text
olive/lime accent
technical borders
subtle grid
monospace labels
```

------

# 23. ABOUT PAGE

Route:

```text
/about
```

Create a sophisticated about page.

Header:

```text
ABOUT_
```

Include:

- Introduction
- Engineering philosophy
- What I build
- Current focus
- Personal developer statement

Use technical cards and editorial layout.

Do not make it look like a resume document.

------

# 24. SKILLS PAGE

Route:

```text
/skills
```

Organize skills into:

```text
BACKEND
Python
Django
FastAPI
Node.js

DATABASE
PostgreSQL
MySQL
Redis

FRONTEND
React
TypeScript
Next.js

DEVOPS
Docker
Linux
Git
AWS
GCP

AI
LLM APIs
Automation
NLP
AI integrations
```

Use interactive cards.

Add subtle hover effects.

------

# 25. PROJECTS PAGE

Route:

```text
/projects
```

Create a premium project gallery.

Each project should have:

```text
PROJECT NUMBER
PROJECT NAME
DESCRIPTION
TECHNOLOGIES
YEAR
VIEW PROJECT →
```

Use large cards.

Dark surfaces.

Thin borders.

Accent details.

Projects should feel like engineering case studies rather than generic portfolio cards.

------

# 26. EXPERIENCE PAGE

Route:

```text
/experience
```

Use a technical timeline.

Example:

```text
2026
────────────────────────
Software Engineer
Company
Description

2025
────────────────────────
Python Developer
Company
Description
```

Use the same accent-colored timeline indicators.

------

# 27. CONTACT PAGE

Route:

```text
/contact
```

Make the contact page feel like a terminal communication interface.

Heading:

```text
LET'S BUILD SOMETHING_
```

Include:

```text
Name
Email
Message
```

and:

```text
SEND MESSAGE →
```

Also show:

```text
Email
GitHub
LinkedIn
Location
```

Keep everything within the same visual system.

------

# 28. PAGE TRANSITIONS

Use subtle page transitions.

When navigating:

```text
HOME → PROJECTS
```

use a very short fade/slide transition.

Do not use dramatic page animations.

Recommended:

```text
opacity
transform: translateY(8px)
duration: 300ms
ease-out
```

The site should feel fast.

------

# 29. TECH STACK

Use:

```text
React
TypeScript
Vite
Tailwind CSS
React Router
Lucide React
Framer Motion
```

Use Framer Motion only where it genuinely improves the interface.

Do not over-animate.

Use CSS for simple effects.

------

# 30. COMPONENT ARCHITECTURE

Create reusable components.

Suggested structure:

```text
src/
├── components/
│   ├── Navbar.tsx
│   ├── Terminal.tsx
│   ├── SystemCard.tsx
│   ├── ServicesCard.tsx
│   ├── LocationCard.tsx
│   ├── TimeCard.tsx
│   ├── TechStack.tsx
│   ├── Stats.tsx
│   ├── PageIndicator.tsx
│   ├── ScrollIndicator.tsx
│   └── PageTransition.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   └── Contact.tsx
│
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── experience.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

Keep content separated from components.

------

# 31. IMPORTANT IMPLEMENTATION RULES

Do not create one giant component.

Do not hardcode repeated UI unnecessarily.

Create reusable components.

Use semantic HTML.

Use accessible buttons and links.

Use proper keyboard navigation.

Use responsive CSS.

Avoid unnecessary dependencies.

Keep bundle size reasonable.

------

# 32. INTERACTION DETAILS

Navbar:

- Hover → accent text
- Active → accent underline
- Click → route

Buttons:

- Hover → subtle movement
- Active → subtle press

Terminal:

- Blinking cursor
- Initial typing sequence

Technology cards:

- Hover → slight lift + border accent

Stats:

- Subtle entrance animation

Cards:

- No excessive glow

------

# 33. PERFORMANCE

The website must feel extremely fast.

Avoid:

- Huge background videos
- Heavy 3D scenes
- Large particle systems
- Unnecessary canvas animations

The visual sophistication should come primarily from:

```text
typography
layout
spacing
borders
micro-interactions
terminal UI
```

not computationally expensive effects.

------

# 34. EXACT VISUAL PRIORITY

When implementing the reference, prioritize these in order:

### 1. Layout

The composition must feel like the reference.

### 2. Typography

The futuristic heading is extremely important.

### 3. Color

Dark monochromatic palette + muted olive/lime accent.

### 4. Terminal

This is the hero's primary visual object.

### 5. Spacing

Maintain generous but precise spacing.

### 6. Borders

Use thin technical borders throughout.

### 7. Micro-interactions

Add subtle motion only after the static design is correct.

------

# 35. DO NOT DO THESE THINGS

Absolutely avoid:

❌ Purple gradients

❌ Blue/purple neon

❌ Rainbow gradients

❌ Giant 3D objects

❌ Cyberpunk city backgrounds

❌ Matrix rain

❌ Excessive particles

❌ Generic portfolio templates

❌ Huge "Hello I'm Kabin" text

❌ Stock developer photos

❌ Fake testimonials

❌ Excessive rounded cards

❌ White/light theme

❌ Long scrolling homepage

❌ Multiple sections underneath hero

❌ Fake loading screens

❌ Overly animated terminal

------

# 36. FINAL HOMEPAGE REQUIREMENT

When I open:

```text
/
```

I should immediately see the complete hero.

The viewport should contain:

```text
Navbar
+
Hero headline
+
Description
+
CTAs
+
Terminal
+
System cards
+
Technology strip
+
Stats
```

And then:

```text
END OF PAGE
```

There must be **nothing below it**.

No scroll.

No additional sections.

Navigation takes the user to the other pages.

------

# 37. FINAL QUALITY BAR

Do not stop after creating a functional website.

After implementation, inspect the result visually and refine:

- spacing
- alignment
- font sizes
- line heights
- borders
- contrast
- terminal proportions
- card sizes
- navbar spacing
- responsive behavior

The result should look like a **real designer-engineered portfolio**, not an AI-generated template.

The reference image is the visual source of truth.

When there is a conflict between generic portfolio conventions and the reference design, **follow the reference design**.

Build the complete website now.



Make the website dynamic, will options for admin page integration too where i can add blog, and manage contents, use react and minimal express server, with monorepo the below given is my all related inforamtion

/**
 * SINGLE SOURCE OF TRUTH
 * ----------------------
 * Every section of the site is rendered from this file.
 * All content is extracted from Kabin Ghimire's CV and rewritten into
 * concise, portfolio-friendly copy. Update here → the whole site updates.
 */

export const profile = {
  name: 'Kabin Ghimire',
  firstName: 'Kabin',
  title: 'Software Engineer',
  shortTitle: 'Backend Engineer / Automation & AI Specialist',
  location: 'Kathmandu, Nepal',
  email: 'ghimirekabin060@gmail.com',
  phone: '+977 9825959108',
  website: 'https://kabin.is-a.dev',
  websiteLabel: 'kabin.is-a.dev',
  resumeUrl: '/Kabin-Ghimire-CV.pdf', // drop your PDF in /public to make this live
  available: true,
  // Drop your photo at src/assets/profile.jpg (a graceful fallback shows until then)
  tagline:
    'I design and ship intelligent automation systems and AI-powered platforms that turn messy, manual work into reliable, data-driven workflows.',
  summary:
    'ICT and digital-systems engineer specialising in AI workflows, automation, and backend development. I build production-grade systems — from FastAPI backends and RAG pipelines to web-scraping and data-normalisation engines — that drive data-driven decisions and operational efficiency. I bridge technical depth with clear communication, having led developer teams and translated complex systems for non-technical stakeholders.',
} as const

export const stats = [
  { value: '15', suffix: '+', label: 'Projects Delivered' },
  { value: '3', suffix: 'x', label: 'Companies & Teams' },
  { value: '5', suffix: '+', label: 'AI & Automation Stacks' },
  { value: '100', suffix: '%', label: 'Remote-Ready' },
] as const

export const services = [
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
      'Scalable FastAPI backends, AI Integrated applications and mobile experiences with clean, modular, integration-ready architecture.',
  },
] as const

export const skills: { category: string; items: string[] }[] = [
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
]

// Core competencies surfaced as an animated marquee
export const marqueeSkills = [
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
]

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  highlights: string[]
  tags: string[]
}

export const experiences: Experience[] = [
  {
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
]

export interface Project {
  title: string
  category: string
  description: string
  outcomes: string[]
  tech: string[]
  featured?: boolean
  link?: string
}

/**
 * Projects are derived from real work described in the CV
 * (CRM systems, automation, RAG/AI, FastAPI backends, scraping pipelines).
 */
 export const projects: Project[] = [
   {
    title: 'AI-Powered CRM Platform',
    category: 'Full-Stack · AI',
    description:
      'A CRM application enhanced with AI-driven insights and automation to streamline customer relationship management and follow-ups.',
    outcomes: ['Automated repetitive CRM tasks', 'Faster, data-driven customer follow-ups', 'Led the build with a dev team'],
    tech: ['Python', 'FastAPI', 'AI/LLM', 'Automation'],
    featured: true,
   },
   {
    title: 'RAG Knowledge Assistant',
    category: 'AI Engineering',
    description:
      'Retrieval-augmented generation workflow combining LangChain with LLMs (Claude/GPT) to answer questions over private document sets with grounded, cited responses.',
    outcomes: ['Grounded answers from custom data', 'Reduced manual lookup time', 'Modular, reusable RAG pipeline'],
    tech: ['LangChain', 'RAG', 'Claude AI', 'Python'],
    featured: true,
   },
   {
    title: 'Web Scraping & Data Pipeline',
    category: 'Automation · Data',
    description:
      'Resilient scraping and data-normalisation pipeline that collects, cleans and structures large datasets for downstream analysis and reporting.',
    outcomes: ['Processed large-scale datasets', 'Clean, normalized, analysis-ready data', 'Hands-off scheduled runs'],
    tech: ['Python', 'Web Scraping', 'FastAPI', 'Data Normalization'],
    featured: true,
   },
   {
    title: 'n8n Automation Workflows',
    category: 'Automation',
    description:
      'Operational automation that connects apps and services — turning manual, repetitive processes into reliable self-running workflows.',
    outcomes: ['Eliminated manual handoffs', 'Connected multiple services', 'Improved operational efficiency'],
    tech: ['n8n', 'Python', 'APIs', 'Automation'],
   },
   {
    title: 'AI Content Generation System',
    category: 'AI · Media',
    description:
      'A content engine using LLMs and AI media tools to generate on-brand copy and visuals at speed for marketing and social channels.',
    outcomes: ['Faster content turnaround', 'Consistent brand voice', 'Multi-channel output'],
    tech: ['GPT', 'Gemini', 'Canva', 'CapCut'],
   },
   {
    title: 'Mobile App & Backend',
    category: 'Full-Stack',
    description:
      'A mobile application backed by clean, modular FastAPI services — designed for scalability, integration-readiness and great UX.',
    outcomes: ['Improved user experience', 'Scalable backend architecture', 'Integration-ready APIs'],
    tech: ['FastAPI', 'Python', 'Mobile', 'AWS'],
   },
 ]

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
  gpa?: string
  details?: string[]
}

export const education: Education[] = [
  {
    degree: 'Bachelor in Information Technology',
    institution: 'Lincoln University College',
    location: 'Birtamode, Jhapa',
    period: 'May 2022 — Sep 2025',
    gpa: '3.33 / 4.0',
    details: ['Cloud Computing', 'Software Engineering', 'Artificial Intelligence', 'Algorithms', 'Operating Systems'],
  },
]

export interface Certification {
  title: string
  issuer: string
  note?: string
}

export const certifications: Certification[] = [
  { title: 'Machine Learning with Python', issuer: 'freeCodeCamp.org' },
  { title: 'Fundamentals of Digital Marketing', issuer: 'Google Digital Garage' },
  { title: 'AI Workflow Automation with Python & GPT', issuer: 'Udemy', note: 'Practical' },
]

export const achievements = [
  'Led a developer team to on-time delivery of CRM and automation systems at Thakur International.',
  'Built production FastAPI backends and scraping pipelines handling large-scale datasets.',
  'Shipped RAG and AI-automation workflows across multiple LLM providers (Claude, GPT, Gemini).',
  'Delivered remote technical support internationally (Australia), driving product reliability.',
]





export const socials = [
  { name: 'LinkedIn', icon: 'Linkedin', url: 'https://www.linkedin.com/in/kabin-ghimire-8564a721b/' },
  { name: 'GitHub', icon: 'Github', url: 'https://github.com/kabin007 },
  { name: 'Email', icon: 'Mail', url: 'mailto:ghimirekabin060@gmail.com' },
]

