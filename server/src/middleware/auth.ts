import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export interface AuthedRequest extends Request {
  admin?: { email: string }
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string }
    req.admin = { email: payload.email }
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
