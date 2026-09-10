import { Router } from 'express'
import { randomUUID } from 'crypto'
import { mutate, readDb } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' })
  }

  const entry = {
    id: randomUUID(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
    read: false,
  }

  await mutate((db) => {
    db.messages.unshift(entry)
  })

  res.status(201).json({ ok: true })
})

router.get('/', requireAuth, async (_req, res) => {
  const db = await readDb()
  res.json(db.messages)
})

router.put('/:id/read', requireAuth, async (req, res) => {
  const { id } = req.params
  const messages = await mutate((db) => {
    const msg = db.messages.find((m) => m.id === id)
    if (msg) msg.read = true
    return db.messages
  })
  res.json(messages)
})

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const messages = await mutate((db) => {
    db.messages = db.messages.filter((m) => m.id !== id)
    return db.messages
  })
  res.json(messages)
})

export default router
