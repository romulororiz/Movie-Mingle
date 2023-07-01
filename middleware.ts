import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname; // relative path

	// Manage route protection
	const token = await getToken({ req });
	const isAuth = !!token;
	const isAuthPage = req.nextUrl.pathname.startsWith('/login');

	const sensitiveRoutes = ['/dashboard'];

	if (isAuthPage) {
		if (isAuth) {
			return NextResponse.redirect(new URL('/dashboard', req.url));
		}

		return null;
	}

	if (!isAuth && sensitiveRoutes.some(route => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL('/login', req.url));
	}
}

export const config = {
	matcher: ['/', '/login', '/dashboard/:path*', '/api/:path*'],
};
