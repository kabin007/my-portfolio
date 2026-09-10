import { useEffect, useState, type FormEvent } from 'react'
import { Plus, Pencil, Trash2, X, Check, Eye, EyeOff } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { Field, Input, Textarea } from '../../components/admin/Field'
import { api } from '../../lib/api'
import { useContent } from '../../context/ContentContext'
import type { BlogPost } from '../../types'

type FormState = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }

const EMPTY: FormState = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  tags: [],
  published: false,
}

export default function ManageBlog() {
  const { refresh: refreshSiteContent } = useContent()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<FormState | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    const data = await api.get<BlogPost[]>('/blog/admin/all')
    setPosts(data)
    setLoading(false)
    refreshSiteContent()
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    if (!editing) return
    setSaving(true)
    try {
      if (editing.id) {
        await api.put(`/blog/${editing.id}`, editing)
      } else {
        await api.post('/blog', editing)
      }
      await load()
      setEditing(null)
    } finally {
      setSaving(false)
    }
  }

  async function togglePublish(post: BlogPost) {
    await api.put(`/blog/${post.id}`, { published: !post.published })
    await load()
  }

  async function handleDelete(id: string) {
    await api.delete(`/blog/${id}`)
    await load()
    setConfirmId(null)
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="section-label">Content</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-text-primary">Blog</h1>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-2 rounded-sm bg-accent px-4 py-2.5 font-display text-xs font-semibold tracking-wide text-background hover:bg-accent-light"
        >
          <Plus size={15} /> NEW POST
        </button>
      </div>

      {loading ? (
        <p className="font-mono text-xs text-text-muted">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="font-mono text-xs text-text-muted">No posts yet.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between rounded-md border border-border-subtle bg-surface p-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm font-semibold text-text-primary">{post.title}</h3>
                  <span
                    className={`rounded-sm border px-1.5 py-0.5 font-mono text-[9px] ${
                      post.published ? 'border-accent/30 text-accent' : 'border-border-subtle text-text-muted'
                    }`}
                  >
                    {post.published ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-text-muted">/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePublish(post)}
                  className="rounded-sm border border-border-subtle p-2 text-text-secondary hover:border-accent/40 hover:text-accent"
                  title={post.published ? 'Unpublish' : 'Publish'}
                >
                  {post.published ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
                {confirmId === post.id ? (
                  <>
                    <button onClick={() => handleDelete(post.id)} className="rounded-sm border border-danger/40 p-2 text-danger hover:bg-danger/10">
                      <Check size={15} />
                    </button>
                    <button onClick={() => setConfirmId(null)} className="rounded-sm border border-border-subtle p-2 text-text-muted hover:text-text-primary">
                      <X size={15} />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditing(post)} className="rounded-sm border border-border-subtle p-2 text-text-secondary hover:border-accent/40 hover:text-accent">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => setConfirmId(post.id)} className="rounded-sm border border-border-subtle p-2 text-text-secondary hover:border-danger/40 hover:text-danger">
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
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md border border-border bg-surface p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-text-primary">{editing.id ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={() => setEditing(null)} className="text-text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <Field label="TITLE">
                <Input required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </Field>
              <Field label="SLUG (optional — auto-generated from title if blank)">
                <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="my-post-title" />
              </Field>
              <Field label="EXCERPT">
                <Textarea rows={2} required value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
              </Field>
              <Field label="CONTENT (paragraphs separated by a blank line)">
                <Textarea rows={10} required value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
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
                  checked={!!editing.published}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  className="h-4 w-4 accent-[#b8bd72]"
                />
                Published (visible on the public blog)
              </label>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-sm bg-accent py-3 font-display text-xs font-semibold tracking-[0.1em] text-background hover:bg-accent-light disabled:opacity-60"
              >
                {saving ? 'SAVING…' : 'SAVE POST'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
