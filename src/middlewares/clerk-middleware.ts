import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
	'/teachers(.*)',
	'/courses(.*)',
	'/settings(.*)',
	'/dashboard(.*)',
	'/watch-course(.*)',
	'/whishlist(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
	const { userId } = await auth();

	if (isProtectedRoute(req) && !userId) {
		return NextResponse.redirect(new URL('/', req.url));
	}

	let role: 'learner' | 'teacher' | undefined;
	if (userId) {
		const client = await clerkClient();
		const user = await client.users.getUser(userId);
		role = user.publicMetadata.role as 'learner' | 'teacher' | undefined;
	}

	if (req.nextUrl.pathname.startsWith('/teachers') && role !== 'teacher') {
		return NextResponse.redirect(new URL('/become-instructor', req.url));
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
	],
};
