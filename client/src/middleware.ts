import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])

export const onRequest = clerkMiddleware((auth, context) => {
	const { isAuthenticated, redirectToSignIn } = auth()

	if (!isPublicRoute(context.request) && !isAuthenticated) {
		return redirectToSignIn()
	}
})
