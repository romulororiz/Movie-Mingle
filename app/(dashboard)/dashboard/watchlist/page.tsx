'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui';
import { Bookmark, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BookmarkData {
	id: string;
	movieId: string;
	title: string;
	overview: string;
	posterPath: string | null;
	backdropPath: string | null;
	releaseDate: string | Date;
	voteAverage: number;
	originalTitle: string;
	createdAt: string | Date;
}

export default function WatchlistPage() {
	const { user, loading: authLoading, isAuthenticated } = useSupabaseUser();
	const router = useRouter();
	const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/api/auth/signin');
			return;
		}

		if (status === 'authenticated') {
			fetchBookmarks();
		}
	}, [status, router]);

	const fetchBookmarks = async () => {
		try {
			const res = await fetch('/api/bookmarks');
			if (res.ok) {
				const data = (await res.json()) as BookmarkData[];
				setBookmarks(data);
			}
		} catch (error) {
			console.error('Error fetching bookmarks:', error);
		} finally {
			setIsLoading(false);
		}
	};

	if (authLoading || isLoading) {
		return (
			<div className="container py-12">
				<Heading
					element="h1"
					title="My Watchlist"
					className="text-accent-primary text-3xl md:text-4xl mb-12"
				/>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
					<RenderSkeletonCards isMovie={true} />
				</div>
			</div>
		);
	}

	// Empty state
	if (bookmarks.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen px-4">
				<div className="text-center max-w-md space-y-6">
					{/* Icon */}
					<div className="flex justify-center">
						<div className="rounded-full bg-accent-primary/10 p-8">
							<Bookmark className="w-20 h-20 text-accent-primary" />
						</div>
					</div>

					{/* Message */}
					<div className="space-y-3">
						<h1 className="text-3xl md:text-4xl font-bold text-white">
							Your Watchlist is Empty
						</h1>
						<p className="text-lg text-gray-400">
							Start building your collection by bookmarking movies you want to watch!
						</p>
					</div>

					{/* Actions */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
						<Link href="/">
							<Button size="lg">
								<Search className="w-5 h-5 mr-2" />
								Discover Movies
							</Button>
						</Link>
						<Link href="/movies/popular">
							<Button variant="outline" size="lg">
								Browse Popular
							</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container py-12">
			{/* Header */}
			<div className="flex justify-between items-center mb-12">
				<div>
					<Heading
						element="h1"
						title="My Watchlist"
						className="text-accent-primary text-3xl md:text-4xl mb-2"
					/>
					<p className="text-gray-400 text-lg">
						{bookmarks.length} {bookmarks.length === 1 ? 'movie' : 'movies'} saved
					</p>
				</div>
			</div>

			{/* Grid of bookmarked movies */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
				{bookmarks.map((bookmark) => {
					// Transform bookmark to movie response format for Card component
					// Ensure release_date is always a string
					const releaseDateStr: string = 
						typeof bookmark.releaseDate === 'string' 
							? bookmark.releaseDate 
							: bookmark.releaseDate instanceof Date
							? bookmark.releaseDate.toISOString().split('T')[0] ?? ''
							: '';
					
					const movieData = {
						id: parseInt(bookmark.movieId),
						title: bookmark.title,
						poster_path: bookmark.posterPath || '',
						backdrop_path: bookmark.backdropPath || '',
						overview: bookmark.overview,
						release_date: releaseDateStr,
						vote_average: bookmark.voteAverage,
						original_title: bookmark.originalTitle,
						adult: false,
						genres: [],
						original_language: '',
						popularity: 0,
						vote_count: 0,
						video: false,
					};

					return <Card key={bookmark.id} item={movieData} />;
				})}
			</div>
		</div>
	);
}

