'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui';
import { Bookmark, Search, Film } from 'lucide-react';
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
	const { user, loading: authLoading } = useSupabaseUser();
	const router = useRouter();
	const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'title'>('recent');

	useEffect(() => {
		if (!authLoading && !user) {
			router.push('/');
		}
	}, [authLoading, user, router]);

	useEffect(() => {
		if (user) {
			fetchBookmarks();
		}
	}, [user]);

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

	// Filter and sort bookmarks
	const filteredAndSortedBookmarks = bookmarks
		.filter(
			(bookmark) =>
				searchQuery === '' ||
				bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				bookmark.originalTitle.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.sort((a, b) => {
			switch (sortBy) {
				case 'recent':
					return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
				case 'rating':
					return b.voteAverage - a.voteAverage;
				case 'title':
					return a.title.localeCompare(b.title);
				default:
					return 0;
			}
		});

	if (authLoading || isLoading) {
		return (
			<div className="container py-12 min-h-screen">
				<Heading element="h1" title="My Watchlist" className="text-3xl md:text-4xl mb-12" />
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
					<RenderSkeletonCards isMovie={true} />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen py-12 md:py-20">
			<div className="container">
				{/* Header */}
				<div className="mb-8">
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
						<div>
							<Heading
								element="h1"
								title="My Watchlist"
								className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
							/>
							<p className="text-gray-400">
								{bookmarks.length > 0
									? `${bookmarks.length} ${bookmarks.length === 1 ? 'movie' : 'movies'} saved`
									: 'Your personal collection of movies to watch'}
							</p>
						</div>
						<Link href="/">
							<Button
								variant="default"
								size="lg"
								className="gap-2 shadow-lg shadow-accent-primary/20"
							>
								<Search className="w-5 h-5" />
								Discover Movies
							</Button>
						</Link>
					</div>

					{/* Search and Filter Bar */}
					{bookmarks.length > 0 && (
						<div className="flex flex-col md:flex-row gap-4">
							<div className="flex-1 relative">
								<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type="text"
									placeholder="Search your watchlist..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors"
								/>
							</div>
							<div className="flex gap-2">
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
									className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors cursor-pointer"
								>
									<option value="recent">Recently Added</option>
									<option value="rating">Highest Rated</option>
									<option value="title">Title (A-Z)</option>
								</select>
							</div>
						</div>
					)}
				</div>

				{/* Empty State */}
				{filteredAndSortedBookmarks.length === 0 && (
					<div className="text-center py-20">
						<div className="relative w-32 h-32 mx-auto mb-6">
							<div className="absolute inset-0 bg-accent-primary/20 blur-3xl rounded-full" />
							<div className="relative w-32 h-32 rounded-full bg-gray-800/50 border-2 border-gray-700 flex items-center justify-center">
								{bookmarks.length === 0 ? (
									<Bookmark className="w-16 h-16 text-gray-600" />
								) : (
									<Search className="w-16 h-16 text-gray-600" />
								)}
							</div>
						</div>
						<Heading
							element="h2"
							title={bookmarks.length === 0 ? 'Your watchlist is empty' : 'No movies found'}
							className="text-2xl md:text-3xl font-bold mb-2"
						/>
						<p className="text-gray-400 mb-8 max-w-md mx-auto">
							{bookmarks.length === 0
								? 'Start building your personal collection of movies to watch'
								: 'Try a different search term or clear the filter'}
						</p>
						{bookmarks.length === 0 ? (
							<Link href="/">
								<Button
									variant="default"
									size="lg"
									className="gap-2 shadow-lg shadow-accent-primary/20"
								>
									<Film className="w-5 h-5" />
									Discover Movies
								</Button>
							</Link>
						) : (
							<Button
								variant="outline"
								size="lg"
								onClick={() => setSearchQuery('')}
								className="gap-2"
							>
								Clear Search
							</Button>
						)}
					</div>
				)}

				{/* Movies Grid */}
				{filteredAndSortedBookmarks.length > 0 && (
					<>
						<div className="mb-6 flex items-center justify-between">
							<p className="text-sm text-gray-400">
								Showing {filteredAndSortedBookmarks.length} of {bookmarks.length} movies
							</p>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
							{filteredAndSortedBookmarks.map((bookmark) => {
								// Convert bookmark to Card-compatible format
								const movieData = {
									id: parseInt(bookmark.movieId),
									title: bookmark.title,
									original_title: bookmark.originalTitle,
									overview: bookmark.overview,
									poster_path: bookmark.posterPath || '',
									backdrop_path: bookmark.backdropPath || '',
									vote_average: bookmark.voteAverage,
									release_date: (bookmark.releaseDate instanceof Date
										? bookmark.releaseDate.toISOString().split('T')[0]
										: typeof bookmark.releaseDate === 'string'
										? bookmark.releaseDate.split('T')[0]
										: '') as string,
									media_type: 'movie' as const,
									adult: false,
									genres: [],
									original_language: 'en',
									popularity: 0,
									video: false,
									vote_count: 0,
								};

								return <Card key={bookmark.id} item={movieData} />;
							})}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
