import { useState, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Field, Input, Textarea } from '../../components/admin/Field'
import { useContent } from '../../context/ContentContext'
import { api } from '../../lib/api'
import type { Experience } from '../../types'

type FormState = Omit<Experience, 'id'> & { id?: string }

const EMPTY: FormState = {
  role: '',
  company: '',
  location: '',
  period: '',
  current: false,
  highlights: [],
  tags: [],
}

export default function ManageExperience() {
  const { content, loading, refresh } = useContent()
  const [editing, setEditing] = useState<FormState | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    if (!editing) return
    setSaving(true)
    try {
      if (editing.id) {
        await api.put(`/experience/${editing.id}`, editing)
      } else {
        await api.post('/experience', editing)
      }
      await refresh()
      setEditing(null)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    await api.delete(`/experience/${id}`)
    await refresh()
    setConfirmId(null)
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="section-label">Content</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-text-primary">Experience</h1>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 font-display text-xs font-semibold tracking-wide text-background hover:bg-accent-light"
        >
          <Plus size={15} /> NEW ENTRY
        </button>
      </div>

      {loading ? (
        <p className="font-mono text-xs text-text-muted">Loading…</p>
      ) : (
        <div className="space-y-3">
          {content?.experiences.map((exp) => (
            <div key={exp.id} className="flex items-center justify-between rounded-md border border-border-subtle bg-surface p-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-semibold text-text-primary">{exp.role}</h3>
                  {exp.current && <span className="rounded-sm border border-accent/30 px-1.5 py-0.5 font-mono text-[9px] text-accent">CURRENT</span>}
                </div>
                <p className="mt-1 font-mono text-xs text-text-muted">{exp.company} · {exp.period}</p>
              </div>
              <div className="flex items-center gap-2">
                {confirmId === exp.id ? (
                  <>
                    <button onClick={() => handleDelete(exp.id)} className="rounded-sm border border-danger/40 p-2 text-danger hover:bg-danger/10">
                      <Check size={15} />
                    </button>
                    <button onClick={() => setConfirmId(null)} className="rounded-sm border border-border-subtle p-2 text-text-muted hover:text-text-primary">
                      <X size={15} />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditing(exp)} className="rounded-sm border border-border-subtle p-2 text-text-secondary hover:border-accent/40 hover:text-accent">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => setConfirmId(exp.id)} className="rounded-sm border border-border-subtle p-2 text-text-secondary hover:border-danger/40 hover:text-danger">
                      <Trash2 size={15} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-md border border-border bg-surface p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-text-primary">{editing.id ? 'Edit Entry' : 'New Entry'}</h2>
              <button onClick={() => setEditing(null)} className="text-text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <Field label="ROLE">
                <Input required value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="COMPANY">
                  <Input required value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} />
                </Field>
                <Field label="LOCATION">
                  <Input required value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} />
                </Field>
              </div>
              <Field label="PERIOD">
                <Input required placeholder="Jan 2026 — Present" value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })} />
              </Field>
              <Field label="HIGHLIGHTS (one per line)">
                <Textarea
                  rows={4}
                  value={editing.highlights.join('\n')}
                  onChange={(e) => setEditing({ ...editing, highlights: e.target.value.split('\n').filter(Boolean) })}
                />
              </Field>
              <Field label="TAGS (comma separated)">
                <Input
                  value={editing.tags.join(', ')}
                  onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
                />
              </Field>
              <label className="flex items-center gap-2 font-mono text-xs text-text-secondary">
                <input
                  type="checkbox"
                  checked={!!editing.current}
                  onChange={(e) => setEditing({ ...editing, current: e.target.checked })}
                  className="h-4 w-4 accent-[#b8bd72]"
                />
                Current position
              </label>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-sm bg-accent py-3 font-display text-xs font-semibold tracking-[0.1em] text-background hover:bg-accent-light disabled:opacity-60"
              >
                {saving ? 'SAVING…' : 'SAVE ENTRY'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
