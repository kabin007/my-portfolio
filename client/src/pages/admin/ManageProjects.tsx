import { useState, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Field, Input, Textarea } from '../../components/admin/Field'
import { useContent } from '../../context/ContentContext'
import { api } from '../../lib/api'
import type { Project } from '../../types'

type FormState = Omit<Project, 'id'> & { id?: string }

const EMPTY: FormState = {
  title: '',
  category: '',
  description: '',
  outcomes: [],
  tech: [],
  featured: false,
  link: '',
  year: new Date().getFullYear().toString(),
}

export default function ManageProjects() {
  const { content, loading, refresh } = useContent()
  const [editing, setEditing] = useState<FormState | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    if (!editing) return
    setSaving(true)
    try {
      const payload = { ...editing }
      if (editing.id) {
        await api.put(`/projects/${editing.id}`, payload)
      } else {
        await api.post('/projects', payload)
      }
      await refresh()
      setEditing(null)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    await api.delete(`/projects/${id}`)
    await refresh()
    setConfirmId(null)
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="section-label">Content</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-text-primary">Projects</h1>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 font-display text-xs font-semibold tracking-wide text-background hover:bg-accent-light"
        >
          <Plus size={15} /> NEW PROJECT
        </button>
      </div>

      {loading ? (
        <p className="font-mono text-xs text-text-muted">Loading…</p>
      ) : (
        <div className="space-y-3">
          {content?.projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between rounded-md border border-border-subtle bg-surface p-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-semibold text-text-primary">{project.title}</h3>
                  {project.featured && <span className="rounded-sm border border-accent/30 px-1.5 py-0.5 font-mono text-[9px] text-accent">FEATURED</span>}
                </div>
                <p className="mt-1 font-mono text-xs text-text-muted">{project.category} · {project.year}</p>
              </div>
              <div className="flex items-center gap-2">
                {confirmId === project.id ? (
                  <>
                    <button onClick={() => handleDelete(project.id)} className="rounded-sm border border-danger/40 p-2 text-danger hover:bg-danger/10">
                      <Check size={15} />
                    </button>
                    <button onClick={() => setConfirmId(null)} className="rounded-sm border border-border-subtle p-2 text-text-muted hover:text-text-primary">
                      <X size={15} />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditing(project)} className="rounded-sm border border-border-subtle p-2 text-text-secondary hover:border-accent/40 hover:text-accent">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => setConfirmId(project.id)} className="rounded-sm border border-border-subtle p-2 text-text-secondary hover:border-danger/40 hover:text-danger">
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
              <h2 className="font-display text-lg font-semibold text-text-primary">
                {editing.id ? 'Edit Project' : 'New Project'}
              </h2>
              <button onClick={() => setEditing(null)} className="text-text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <Field label="TITLE">
                <Input required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="CATEGORY">
                  <Input required value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
                </Field>
                <Field label="YEAR">
                  <Input value={editing.year ?? ''} onChange={(e) => setEditing({ ...editing, year: e.target.value })} />
                </Field>
              </div>
              <Field label="DESCRIPTION">
                <Textarea required rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </Field>
              <Field label="OUTCOMES (one per line)">
                <Textarea
                  rows={3}
                  value={editing.outcomes.join('\n')}
                  onChange={(e) => setEditing({ ...editing, outcomes: e.target.value.split('\n').filter(Boolean) })}
                />
              </Field>
              <Field label="TECH (comma separated)">
                <Input
                  value={editing.tech.join(', ')}
                  onChange={(e) => setEditing({ ...editing, tech: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })}
                />
              </Field>
              <Field label="LINK (optional)">
                <Input value={editing.link ?? ''} onChange={(e) => setEditing({ ...editing, link: e.target.value })} placeholder="https://" />
              </Field>
              <label className="flex items-center gap-2 font-mono text-xs text-text-secondary">
                <input
                  type="checkbox"
                  checked={!!editing.featured}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  className="h-4 w-4 accent-[#b8bd72]"
                />
                Featured project
              </label>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-sm bg-accent py-3 font-display text-xs font-semibold tracking-[0.1em] text-background hover:bg-accent-light disabled:opacity-60"
              >
                {saving ? 'SAVING…' : 'SAVE PROJECT'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
