// @ts-nocheck
import { NextResponse } from 'next/server';

// Simple in-memory rate limiting (for development)
// For production, use Redis-based rate limiting with @upstash/ratelimit

interface RateLimitStore {
	[key: string]: {
		count: number;
		resetAt: number;
	};
}

const store: RateLimitStore = {};

const WINDOW_MS = 10 * 1000; // 10 seconds
const MAX_REQUESTS = 10; // 10 requests per window

/**
 * Simple rate limiter for API routes
 * For production, replace with Redis-based solution (@upstash/ratelimit)
 */
export async function checkRateLimit(identifier: string) {
	const now = Date.now();
	const key = `ratelimit:${identifier}`;

	// Clean up expired entries
	if (store[key] && store[key].resetAt < now) {
		delete store[key];
	}

	// Initialize or get current count
	if (!store[key]) {
		store[key] = {
			count: 0,
			resetAt: now + WINDOW_MS,
		};
	}

	// Increment count
	store[key].count++;

	// Check if limit exceeded
	if (store[key].count > MAX_REQUESTS) {
		const retryAfter = Math.ceil((store[key].resetAt - now) / 1000);

		return {
			success: false,
			response: NextResponse.json(
				{
					error: 'Too many requests',
					message: 'You have exceeded the rate limit. Please try again later.',
					retryAfter,
				},
				{
					status: 429,
					headers: {
						'Retry-After': String(retryAfter),
						'X-RateLimit-Limit': String(MAX_REQUESTS),
						'X-RateLimit-Remaining': '0',
						'X-RateLimit-Reset': String(Math.ceil(store[key].resetAt / 1000)),
					},
				}
			),
		};
	}

	const remaining = MAX_REQUESTS - store[key].count;

	return {
		success: true,
		headers: {
			'X-RateLimit-Limit': String(MAX_REQUESTS),
			'X-RateLimit-Remaining': String(remaining),
			'X-RateLimit-Reset': String(Math.ceil(store[key].resetAt / 1000)),
		},
	};
}

/**
 * Get IP address from request
 */
export function getClientIP(request: Request): string {
	// Try various headers (Vercel, Cloudflare, etc.)
	const forwardedFor = request.headers.get('x-forwarded-for');
	const realIP = request.headers.get('x-real-ip');
	const cfConnectingIP = request.headers.get('cf-connecting-ip');

	if (forwardedFor) {
		return forwardedFor.split(',')[0].trim();
	}

	if (realIP) {
		return realIP;
	}

	if (cfConnectingIP) {
		return cfConnectingIP;
	}

	return 'anonymous';
}

