import { createContext, useContext, useState, type ReactNode } from 'react'
import { api } from '../lib/api'

interface AuthContextValue {
  email: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(() => localStorage.getItem('admin_email'))

  async function login(emailInput: string, password: string) {
    const res = await api.post<{ token: string; email: string }>('/auth/login', { email: emailInput, password })
    localStorage.setItem('admin_token', res.token)
    localStorage.setItem('admin_email', res.email)
    setEmail(res.email)
  }

  function logout() {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_email')
    setEmail(null)
  }

  return (
    <AuthContext.Provider value={{ email, isAuthenticated: !!email, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
