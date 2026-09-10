import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import contentRoutes from './routes/content.js'
import projectRoutes from './routes/projects.js'
import experienceRoutes from './routes/experience.js'
import blogRoutes from './routes/blog.js'
import contactRoutes from './routes/contact.js'

const app = express()
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN

app.use(cors(CLIENT_ORIGIN ? { origin: CLIENT_ORIGIN } : {}))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/experience', experienceRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/contact', contactRoutes)

app.use('/api', (req, res) => {
  res.status(404).json({ error: `Not found: ${req.method} ${req.originalUrl}` })
})

export default app
