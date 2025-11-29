import { z } from 'zod'

// Schema para crear nota (POST)
export const createNoteSchema = z.object({
	title: z.string().min(3).max(100).trim(),
	textNote: z.string().min(3).max(400).trim(),
})

// Schema para actualizar nota (PUT)
export const updateNoteSchema = z.object({
	title: z.string().min(3).max(100).trim().optional(),
	textNote: z.string().min(3).max(400).trim().optional(),
})

// Schema para validar UUID de nota (Parámetro de ruta)
export const noteIdSchema = z.uuid()

// Tipos inferidos de los schemas
export type CreateNoteInput = z.infer<typeof createNoteSchema>
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>
