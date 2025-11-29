import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './src/db/schema.ts',
	out: './drizzle',
	dialect: 'turso', // ✅ Dialect específico para Turso (introducido en drizzle-kit 0.25.0)
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
	verbose: true, // Muestra logs detallados durante migraciones
	strict: true, // Validación estricta del schema
})
