/**
 * Local dev / self-hosted entrypoint. On Vercel the app is served by
 * api/[...path].mjs instead, and static files come from the CDN.
 */
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import app from './app.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CLIENT_DIST = path.resolve(__dirname, '../../client/dist')
const PORT = process.env.PORT || 4000

app.use(express.static(CLIENT_DIST))
app.get('*', (_req, res) => {
  res.sendFile(path.join(CLIENT_DIST, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
