import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Field, Input } from '../../components/admin/Field'

export default function Login() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (isAuthenticated) return <Navigate to="/admin" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-shell flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-md border border-border bg-surface p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
            <Lock size={18} className="text-accent" />
          </div>
          <h1 className="font-display text-xl font-semibold text-text-primary">Admin Access</h1>
          <p className="mt-1 font-mono text-xs text-text-muted">KG_ Portfolio Console</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="EMAIL">
            <Input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </Field>
          <Field label="PASSWORD">
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Field>

          {error && <p className="font-mono text-xs text-danger">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-sm bg-accent py-3 font-display text-xs font-semibold tracking-[0.1em] text-background transition-all hover:-translate-y-0.5 hover:bg-accent-light disabled:opacity-60"
          >
            {busy ? 'SIGNING IN…' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  )
}
