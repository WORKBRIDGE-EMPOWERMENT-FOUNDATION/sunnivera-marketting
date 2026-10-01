import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { config } from 'dotenv'
import postgres from 'postgres'

config({ path: '.env.local' })

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured.')

async function main() {
  const sql = postgres(process.env.DATABASE_URL!, { max: 1 })
  try {
    const setup = await readFile(resolve('supabase/blog-images.sql'), 'utf8')
    await sql.unsafe(setup)
    console.log('Blog image storage and featured image field are ready.')
  } finally {
    await sql.end()
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
