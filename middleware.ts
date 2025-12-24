import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname; // relative path

	// Manage route protection
	const token = await getToken({ req });
	const isAuth = !!token;

	const sensitiveRoutes = ['/dashboard'];

	// Protect sensitive routes
	if (!isAuth && sensitiveRoutes.some((route) => pathname.startsWith(route))) {
		// Redirect to NextAuth default signin page
		const signInUrl = new URL('/api/auth/signin', req.url);
		signInUrl.searchParams.set('callbackUrl', pathname);
		return NextResponse.redirect(signInUrl);
	}

	// Continue processing if route is not protected or user is authenticated
	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
