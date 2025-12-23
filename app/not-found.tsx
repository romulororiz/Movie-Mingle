'use client';

import { Button } from '@/components/ui/Button';
import { Search, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-dark-background via-zinc-950 to-dark-background">
			<div className="text-center max-w-2xl space-y-8">
				{/* 404 Number */}
				<div className="relative">
					<h1 className="text-[180px] md:text-[240px] font-black text-transparent bg-clip-text bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-primary opacity-20 leading-none select-none">
						404
					</h1>
					<div className="absolute inset-0 flex items-center justify-center">
						<Search className="w-24 h-24 text-accent-primary animate-pulse" />
					</div>
				</div>

				{/* Message */}
				<div className="space-y-4 -mt-12">
					<h2 className="text-3xl md:text-4xl font-bold text-white">
						Page Not Found
					</h2>
					<p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto">
						Looks like this movie hasn't been released yet! The page you're looking
						for doesn't exist.
					</p>
				</div>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
					<Link href="/">
						<Button size="lg" className="w-full sm:w-auto">
							<Home className="w-5 h-5 mr-2" />
							Go Home
						</Button>
					</Link>
					<Link href="/search">
						<Button variant="outline" size="lg" className="w-full sm:w-auto">
							<Search className="w-5 h-5 mr-2" />
							Search Movies
						</Button>
					</Link>
				</div>

				{/* Suggested Links */}
				<div className="pt-8 border-t border-gray-800">
					<p className="text-sm text-gray-500 mb-4">You might be interested in:</p>
					<div className="flex flex-wrap justify-center gap-3">
						<Link href="/movies/popular">
							<Button variant="ghost" size="sm">
								Popular Movies
							</Button>
						</Link>
						<Link href="/movies/trending">
							<Button variant="ghost" size="sm">
								Trending
							</Button>
						</Link>
						<Link href="/movies/top-rated">
							<Button variant="ghost" size="sm">
								Top Rated
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

