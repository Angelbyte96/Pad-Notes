import { clerkMiddleware } from '@clerk/astro/server'

export const onRequest = clerkMiddleware((auth, context) => {
	const { userId } = auth()
	const { pathname } = new URL(context.request.url)

	if (userId && pathname === '/') {
		return context.redirect('/dashboard')
	}
})
