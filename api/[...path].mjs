/**
 * Vercel serverless entrypoint. The catch-all filename means every
 * /api/* request reaches this function with its original URL intact,
 * so the Express router sees the same paths it does locally.
 *
 * Imports the tsc output, which the root build command produces
 * before Vercel bundles this function.
 */
import app from '../server/dist/app.js'

export default app
