import { useEffect, useState } from 'react'
import { Trash2, Mail, MailOpen } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { api } from '../../lib/api'
import type { ContactMessage } from '../../types'

export default function Messages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const data = await api.get<ContactMessage[]>('/contact')
    setMessages(data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function markRead(id: string) {
    await api.put(`/contact/${id}/read`)
    load()
  }

  async function remove(id: string) {
    await api.delete(`/contact/${id}`)
    load()
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <span className="section-label">Inbox</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-text-primary">Messages</h1>
      </div>

      {loading ? (
        <p className="font-mono text-xs text-text-muted">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="font-mono text-xs text-text-muted">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-md border p-5 ${m.read ? 'border-border-subtle bg-surface' : 'border-accent/30 bg-accent/[0.04]'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-semibold text-text-primary">{m.name}</h3>
                    {!m.read && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </div>
                  <a href={`mailto:${m.email}`} className="font-mono text-xs text-text-muted hover:text-accent">
                    {m.email}
                  </a>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => markRead(m.id)}
                    className="rounded-sm border border-border-subtle p-2 text-text-secondary hover:border-accent/40 hover:text-accent"
                    title="Mark as read"
                  >
                    {m.read ? <MailOpen size={15} /> : <Mail size={15} />}
                  </button>
                  <button
                    onClick={() => remove(m.id)}
                    className="rounded-sm border border-border-subtle p-2 text-text-secondary hover:border-danger/40 hover:text-danger"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{m.message}</p>
              <p className="mt-3 font-mono text-[10px] text-text-muted">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
