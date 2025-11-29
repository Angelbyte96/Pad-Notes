import { sql } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const notes = sqliteTable(
	'notes',
	{
		id: text('id')
			.primaryKey()
			.notNull()
			.$defaultFn(() => crypto.randomUUID()),
		title: text('title').notNull(),
		textNote: text('text_note').notNull(),
		userId: text('user_id').notNull(),
		createdAt: integer('created_at', {
			mode: 'timestamp',
		})
			.notNull()
			.default(sql`(unixepoch())`),
		updatedAt: integer('updated_at', { mode: 'timestamp' })
			.notNull()
			.default(sql`(unixepoch())`),
	},
	(table) => ({
		// Índice en userId para optimizar consultas por usuario
		userIdIdx: index('user_id_idx').on(table.userId),
	}),
)
