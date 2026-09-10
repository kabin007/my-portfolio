import { readDb } from '../db.js'

const db = await readDb()
console.log(`Database ready at server/src/data/db.json`)
console.log(`Seeded: ${db.projects.length} projects, ${db.experiences.length} experiences, ${db.blogPosts.length} blog posts.`)
