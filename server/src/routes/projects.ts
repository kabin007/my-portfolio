import { Router } from 'express'
import { randomUUID } from 'crypto'
import { mutate, readDb } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', async (_req, res) => {
  const db = await readDb()
  res.json(db.projects)
})

router.post('/', requireAuth, async (req, res) => {
  const project = { id: `proj-${randomUUID().slice(0, 8)}`, ...req.body }
  const projects = await mutate((db) => {
    db.projects.unshift(project)
    return db.projects
  })
  res.status(201).json(projects)
})

router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const projects = await mutate((db) => {
    const idx = db.projects.findIndex((p) => p.id === id)
    if (idx === -1) return null
    db.projects[idx] = { ...db.projects[idx], ...req.body, id }
    return db.projects
  })
  if (!projects) return res.status(404).json({ error: 'Project not found' })
  res.json(projects)
})

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const projects = await mutate((db) => {
    db.projects = db.projects.filter((p) => p.id !== id)
    return db.projects
  })
  res.json(projects)
})

export default router
