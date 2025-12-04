import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'

const isProtectedRoute = createRouteMatcher(['/dashboard', '/api/notes(.*)'])

export const onRequest = clerkMiddleware((auth, context) => {
	const { userId, redirectToSignIn } = auth()
	const { pathname } = new URL(context.request.url)

	if (userId && pathname === '/') {
		return context.redirect('/dashboard')
	}

	if (isProtectedRoute(context.request) && !userId) {
		return redirectToSignIn()
	}
})
