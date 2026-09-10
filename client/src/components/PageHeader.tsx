interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-12 sm:mb-16">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-accent" />
        <span className="section-label">{eyebrow}</span>
      </div>
      <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
        {title}
        <span className="text-accent">_</span>
      </h1>
      {description && (
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">{description}</p>
      )}
    </div>
  )
}
