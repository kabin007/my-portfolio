import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'

const baseClasses =
  'w-full rounded-sm border border-border-subtle bg-surface-light px-3.5 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent'

export function Label({ children }: { children: string }) {
  return <label className="mb-1.5 block font-mono text-[11px] tracking-widest text-text-muted">{children}</label>
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${baseClasses} ${props.className ?? ''}`} />
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${baseClasses} resize-none ${props.className ?? ''}`} />
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  )
}
