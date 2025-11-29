import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

// Crear cliente libSQL para Turso
const client = createClient({
	url: import.meta.env.TURSO_DATABASE_URL!,
	authToken: import.meta.env.TURSO_AUTH_TOKEN!,
})

// Crear instancia de Drizzle con schema tipado
export const db = drizzle(client, { schema })

// Exportar tipos inferidos para TypeScript
export type Note = typeof schema.notes.$inferSelect
export type NewNote = typeof schema.notes.$inferInsert
