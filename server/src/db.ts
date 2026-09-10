import { get, put, BlobNotFoundError } from '@vercel/blob'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { seedData, type DbShape } from './seed.js'

/**
 * Two storage drivers behind one interface:
 *  - Vercel Blob when BLOB_READ_WRITE_TOKEN is set (serverless, read-only FS)
 *  - a local JSON file otherwise, for `npm run dev`
 * Routes only ever touch readDb/writeDb/mutate, so they don't care which.
 */
interface Driver {
  load(): Promise<DbShape | null>
  save(db: DbShape): Promise<void>
  /** Blob reads hit the network, so results must not be cached across requests. */
  cacheable: boolean
}

const BLOB_KEY = 'portfolio/db.json'

function blobDriver(): Driver {
  return {
    cacheable: false,
    async load() {
      try {
        const res = await get(BLOB_KEY, { access: 'private', useCache: false })
        if (!res || res.statusCode !== 200) return null
        return JSON.parse(await new Response(res.stream).text()) as DbShape
      } catch (err) {
        if (err instanceof BlobNotFoundError) return null
        throw err
      }
    },
    async save(db) {
      await put(BLOB_KEY, JSON.stringify(db, null, 2), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
      })
    },
  }
}

function fileDriver(): Driver {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const DB_PATH = path.join(__dirname, 'data', 'db.json')
  return {
    cacheable: true,
    async load() {
      try {
        return JSON.parse(await fs.readFile(DB_PATH, 'utf-8')) as DbShape
      } catch {
        return null
      }
    },
    async save(db) {
      await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
      await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
    },
  }
}

function pickDriver(): Driver {
  if (process.env.BLOB_READ_WRITE_TOKEN) return blobDriver()
  if (process.env.VERCEL) {
    throw new Error(
      'BLOB_READ_WRITE_TOKEN is not set. Create a Blob store in the Vercel ' +
        'dashboard (Storage tab) and connect it to this project.'
    )
  }
  return fileDriver()
}

let driver: Driver | null = null
let cache: DbShape | null = null
let writeQueue: Promise<unknown> = Promise.resolve()

export async function readDb(): Promise<DbShape> {
  if (cache) return cache
  driver ??= pickDriver()

  let db = await driver.load()
  if (!db) {
    // First boot: persist the seed so it becomes editable from the admin panel.
    db = structuredClone(seedData)
    await driver.save(db)
  }

  if (driver.cacheable) cache = db
  return db
}

export async function writeDb(next: DbShape): Promise<void> {
  const d = (driver ??= pickDriver())
  if (d.cacheable) cache = next
  // Serialise writes so concurrent admin saves can't interleave.
  writeQueue = writeQueue.then(() => d.save(next))
  await writeQueue
}

export async function mutate<T>(fn: (db: DbShape) => T): Promise<T> {
  const db = await readDb()
  const result = fn(db)
  await writeDb(db)
  return result
}
