import { db } from '@/db'
import { notes } from '@/db/schema'
import { readRatelimit, writeRatelimit } from '@/lib/ratelimit'
import { createNoteSchema } from '@/lib/validations'
import type { APIRoute } from 'astro'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const GET: APIRoute = async ({ locals }) => {
	const { userId, isAuthenticated } = locals.auth()

	if (!isAuthenticated) {
		return new Response(JSON.stringify({ error: 'No autenticado' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	// Rate limiting
	const { success, reset } = await readRatelimit.limit(userId)
	if (!success) {
		return new Response(
			JSON.stringify({
				error: 'Demasiadas solicitudes, intenta en unos segundos',
				retryAfter: Math.ceil((reset - Date.now()) / 1000),
			}),
			{
				status: 429,
				headers: {
					'Content-Type': 'application/json',
					'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
				},
			},
		)
	}

	try {
		const userNotes = await db
			.select()
			.from(notes)
			.where(eq(notes.userId, userId))
			.orderBy(desc(notes.updatedAt))

		return new Response(JSON.stringify({ data: userNotes }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		console.error('Error al obtener notas: ', error)
		return new Response(JSON.stringify({ error: 'Error del servidor' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}

// POST /api/notes - Crear nueva nota
export const POST: APIRoute = async ({ request, locals }) => {
	const { userId, isAuthenticated } = locals.auth()

	if (!isAuthenticated) {
		return new Response(JSON.stringify({ error: 'No autenticado' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	// Rate limiting
	const { success, reset } = await writeRatelimit.limit(userId)
	if (!success) {
		return new Response(
			JSON.stringify({
				error: 'Demasiadas solicitudes, intenta en unos segundos',
				retryAfter: Math.ceil((reset - Date.now()) / 1000),
			}),
			{
				status: 429,
				headers: {
					'Content-Type': 'application/json',
					'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
				},
			},
		)
	}

	try {
		const body = await request.json()

		// Validación con Zod
		const validation = createNoteSchema.safeParse(body)
		if (!validation.success) {
			const flattened = z.flattenError(validation.error)

			return new Response(
				JSON.stringify({
					error: 'Datos inválidos',
					details: flattened.fieldErrors,
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		// Insertar en BD
		const [newNote] = await db
			.insert(notes)
			.values({
				title: validation.data.title,
				textNote: validation.data.textNote,
				userId: userId,
			})
			.returning()

		return new Response(JSON.stringify({ data: newNote }), {
			status: 201,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		console.error('Error al crear nota:', error)
		return new Response(JSON.stringify({ error: 'Error del servidor' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
