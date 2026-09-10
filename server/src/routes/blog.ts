import { Router } from 'express'
import { randomUUID } from 'crypto'
import { mutate, readDb } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Admin: all posts including drafts. Must be registered before "/:slug".
router.get('/admin/all', requireAuth, async (_req, res) => {
  const db = await readDb()
  res.json([...db.blogPosts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
})

// Public: published posts only.
router.get('/', async (_req, res) => {
  const db = await readDb()
  res.json(
    db.blogPosts
      .filter((p) => p.published)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  )
})

router.get('/:slug', async (req, res) => {
  const db = await readDb()
  const post = db.blogPosts.find((p) => p.slug === req.params.slug && p.published)
  if (!post) return res.status(404).json({ error: 'Post not found' })
  res.json(post)
})

router.post('/', requireAuth, async (req, res) => {
  const now = new Date().toISOString()
  const title = req.body?.title ?? 'Untitled'
  const post = {
    id: `post-${randomUUID().slice(0, 8)}`,
    slug: req.body?.slug || slugify(title),
    title,
    excerpt: req.body?.excerpt ?? '',
    content: req.body?.content ?? '',
    tags: req.body?.tags ?? [],
    published: req.body?.published ?? false,
    createdAt: now,
    updatedAt: now,
  }
  const posts = await mutate((db) => {
    db.blogPosts.unshift(post)
    return db.blogPosts
  })
  res.status(201).json(posts)
})

router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const posts = await mutate((db) => {
    const idx = db.blogPosts.findIndex((p) => p.id === id)
    if (idx === -1) return null
    db.blogPosts[idx] = {
      ...db.blogPosts[idx],
      ...req.body,
      id,
      updatedAt: new Date().toISOString(),
    }
    return db.blogPosts
  })
  if (!posts) return res.status(404).json({ error: 'Post not found' })
  res.json(posts)
})

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const posts = await mutate((db) => {
    db.blogPosts = db.blogPosts.filter((p) => p.id !== id)
    return db.blogPosts
  })
  res.json(posts)
})

export default router
