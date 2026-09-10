import { Router } from 'express'
import { randomUUID } from 'crypto'
import { mutate, readDb } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', async (_req, res) => {
  const db = await readDb()
  res.json(db.experiences)
})

router.post('/', requireAuth, async (req, res) => {
  const experience = { id: `exp-${randomUUID().slice(0, 8)}`, ...req.body }
  const experiences = await mutate((db) => {
    db.experiences.unshift(experience)
    return db.experiences
  })
  res.status(201).json(experiences)
})

router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const experiences = await mutate((db) => {
    const idx = db.experiences.findIndex((e) => e.id === id)
    if (idx === -1) return null
    db.experiences[idx] = { ...db.experiences[idx], ...req.body, id }
    return db.experiences
  })
  if (!experiences) return res.status(404).json({ error: 'Experience not found' })
  res.json(experiences)
})

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const experiences = await mutate((db) => {
    db.experiences = db.experiences.filter((e) => e.id !== id)
    return db.experiences
  })
  res.json(experiences)
})

export default router
