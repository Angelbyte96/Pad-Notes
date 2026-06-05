import { db } from '@/db'
import { notes } from '@/db/schema'
import { writeRatelimit } from '@/lib/ratelimit'
import { noteIdSchema, updateNoteSchema } from '@/lib/validations'
import type { APIRoute } from 'astro'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

// PUT /api/notes/[id] - Actualizar nota
export const PUT: APIRoute = async ({ params, request, locals }) => {
	const { userId, isAuthenticated } = locals.auth()

	if (!isAuthenticated) {
		return new Response(JSON.stringify({ error: 'No autenticado' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	// Validar ID
	const idValidation = noteIdSchema.safeParse(params.id)
	if (!idValidation.success) {
		return new Response(JSON.stringify({ error: 'ID inválido' }), {
			status: 400,
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
		const validation = updateNoteSchema.safeParse(body)
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

		// Verificar ownership y actualizar
		const [updatedNote] = await db
			.update(notes)
			.set({
				...validation.data,
				updatedAt: new Date(),
			})
			.where(and(eq(notes.id, params.id!), eq(notes.userId, userId)))
			.returning()

		if (!updatedNote) {
			return new Response(JSON.stringify({ error: 'Nota no encontrada' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		return new Response(JSON.stringify({ data: updatedNote }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		console.error('Error al actualizar nota:', error)
		return new Response(JSON.stringify({ error: 'Error del servidor' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}

// DELETE /api/notes/[id] - Eliminar nota
export const DELETE: APIRoute = async ({ params, locals }) => {
	const { userId, isAuthenticated } = locals.auth()

	if (!isAuthenticated) {
		return new Response(JSON.stringify({ error: 'No autenticado' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	// Validar ID
	const idValidation = noteIdSchema.safeParse(params.id)
	if (!idValidation.success) {
		return new Response(JSON.stringify({ error: 'ID inválido' }), {
			status: 400,
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
		// Hard delete con verificación de ownership
		const [deletedNote] = await db
			.delete(notes)
			.where(and(eq(notes.id, params.id!), eq(notes.userId, userId)))
			.returning()

		if (!deletedNote) {
			return new Response(JSON.stringify({ error: 'Nota no encontrada' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' },
			})
		}

		return new Response(JSON.stringify({ data: deletedNote }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		console.error('Error al eliminar nota:', error)
		return new Response(JSON.stringify({ error: 'Error del servidor' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
