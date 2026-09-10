import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { requireAuth, type AuthedRequest } from '../middleware/auth.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {}

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const adminEmail = process.env.ADMIN_EMAIL
  const adminHash = process.env.ADMIN_PASSWORD_HASH

  if (!adminEmail || !adminHash) {
    return res.status(500).json({ error: 'Admin credentials are not configured on the server' })
  }

  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  const valid = await bcrypt.compare(password, adminHash)
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  const token = jwt.sign({ email: adminEmail }, JWT_SECRET, { expiresIn: '12h' })
  res.json({ token, email: adminEmail })
})

router.get('/me', requireAuth, (req: AuthedRequest, res) => {
  res.json({ email: req.admin?.email })
})

export default router
