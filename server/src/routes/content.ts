import { Router } from 'express'
import { mutate, readDb } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public: everything the site needs to render, in one call.
router.get('/', async (_req, res) => {
  const db = await readDb()
  const { messages, ...publicData } = db
  res.json(publicData)
})

// Admin: update the profile / hero / about copy.
router.put('/profile', requireAuth, async (req, res) => {
  const updates = req.body ?? {}
  const profile = await mutate((db) => {
    db.profile = { ...db.profile, ...updates }
    return db.profile
  })
  res.json(profile)
})

router.put('/stats', requireAuth, async (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Body must be an array' })
  const stats = await mutate((db) => {
    db.stats = req.body
    return db.stats
  })
  res.json(stats)
})

router.put('/skills', requireAuth, async (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Body must be an array' })
  const skills = await mutate((db) => {
    db.skills = req.body
    return db.skills
  })
  res.json(skills)
})

export default router
