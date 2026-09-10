import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { seedData, type DbShape } from './seed.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, 'data', 'db.json')

let cache: DbShape | null = null
let writeQueue: Promise<unknown> = Promise.resolve()

async function ensureFile(): Promise<DbShape> {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(raw) as DbShape
  } catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
    await fs.writeFile(DB_PATH, JSON.stringify(seedData, null, 2))
    return structuredClone(seedData)
  }
}

export async function readDb(): Promise<DbShape> {
  if (!cache) cache = await ensureFile()
  return cache
}

export async function writeDb(next: DbShape): Promise<void> {
  cache = next
  writeQueue = writeQueue.then(() => fs.writeFile(DB_PATH, JSON.stringify(next, null, 2)))
  await writeQueue
}

export async function mutate<T>(fn: (db: DbShape) => T): Promise<T> {
  const db = await readDb()
  const result = fn(db)
  await writeDb(db)
  return result
}
