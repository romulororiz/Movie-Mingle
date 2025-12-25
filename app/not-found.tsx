'use client';

import { Button } from '@/components/ui/Button';
import { Search, Home, Film } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
			<div className="text-center max-w-2xl space-y-8">
				{/* 404 Number */}
				<div className="relative mb-8">
					<h1 className="text-[180px] md:text-[280px] font-black leading-none select-none">
						<span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900">
							404
						</span>
					</h1>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="p-8 rounded-full bg-accent-primary/10 border-2 border-accent-primary/20 backdrop-blur-sm">
							<Film className="w-20 h-20 md:w-28 md:h-28 text-accent-primary" strokeWidth={1.5} />
						</div>
					</div>
				</div>

				{/* Message */}
				<div className="space-y-4 -mt-8">
					<h2 className="text-4xl md:text-5xl font-bold text-white">Page Not Found</h2>
					<p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto leading-relaxed">
						Looks like this movie hasn't been released yet! The page you're looking for doesn't
						exist.
					</p>
				</div>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
					<Link href="/" className="w-full sm:w-auto">
						<Button size="lg" className="w-full">
							<Home className="w-5 h-5" />
							Go Home
						</Button>
					</Link>
					<Link href="/search" className="w-full sm:w-auto">
						<Button variant="outline" size="lg" className="w-full">
							<Search className="w-5 h-5" />
							Search Movies
						</Button>
					</Link>
				</div>

				{/* Suggested Links */}
				<div className="pt-12">
					<p className="text-sm text-gray-500 mb-5 font-medium">You might be interested in:</p>
					<div className="flex flex-wrap justify-center gap-3">
						<Link href="/movies/popular">
							<Button variant="subtle" size="sm">
								Popular Movies
							</Button>
						</Link>
						<Link href="/movies/trending">
							<Button variant="subtle" size="sm">
								Trending
							</Button>
						</Link>
						<Link href="/movies/top-rated">
							<Button variant="subtle" size="sm">
								Top Rated
							</Button>
						</Link>
						<Link href="/actors/popular">
							<Button variant="subtle" size="sm">
								Popular Actors
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
