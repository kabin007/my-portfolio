import { useEffect, useState, type FormEvent } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Field, Input, Textarea } from '../../components/admin/Field'
import { useContent } from '../../context/ContentContext'
import { api } from '../../lib/api'
import type { Profile } from '../../types'

export default function EditProfile() {
  const { content, loading, refresh } = useContent()
  const [form, setForm] = useState<Profile | null>(null)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  useEffect(() => {
    if (content) setForm(content.profile)
  }, [content])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    try {
      await api.put('/content/profile', form)
      await refresh()
      setSavedAt(Date.now())
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <span className="section-label">Content</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-text-primary">Profile</h1>
        <p className="mt-2 text-sm text-text-secondary">Edits here update the hero, about page and contact details site-wide.</p>
      </div>

      {loading || !form ? (
        <p className="font-mono text-xs text-text-muted">Loading…</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="FULL NAME">
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="FIRST NAME">
              <Input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="TITLE">
              <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="SHORT TITLE">
              <Input required value={form.shortTitle} onChange={(e) => setForm({ ...form, shortTitle: e.target.value })} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="EMAIL">
              <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
            <Field label="PHONE">
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="LOCATION">
              <Input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </Field>
            <Field label="WEBSITE LABEL">
              <Input value={form.websiteLabel} onChange={(e) => setForm({ ...form, websiteLabel: e.target.value })} />
            </Field>
          </div>
          <Field label="TAGLINE (hero statement)">
            <Textarea required rows={3} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          </Field>
          <Field label="HERO INTRO (short paragraph under the hero statement)">
            <Textarea
              rows={3}
              value={form.heroIntro ?? ''}
              onChange={(e) => setForm({ ...form, heroIntro: e.target.value })}
            />
          </Field>
          <Field label="SUMMARY (about page)">
            <Textarea required rows={4} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
          </Field>
          <label className="flex items-center gap-2 font-mono text-xs text-text-secondary">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => setForm({ ...form, available: e.target.checked })}
              className="h-4 w-4 accent-[#b8bd72]"
            />
            Available for new work
          </label>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-sm bg-accent px-6 py-3 font-display text-xs font-semibold tracking-[0.1em] text-background hover:bg-accent-light disabled:opacity-60"
            >
              {saving ? 'SAVING…' : 'SAVE CHANGES'}
            </button>
            {savedAt && <span className="font-mono text-xs text-accent">Saved ✓</span>}
          </div>
        </form>
      )}
    </AdminLayout>
  )
}
