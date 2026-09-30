import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const g = globalThis as unknown as { sql?: ReturnType<typeof postgres> }
// prepare:false keeps it compatible with pooled connections (Supabase, Neon)
const sql = g.sql ?? postgres(process.env.DATABASE_URL!, { max: 5, prepare: false })
if (process.env.NODE_ENV !== 'production') g.sql = sql

export const db = drizzle(sql, { schema })
