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
import { MovieResponse } from '@/types/tmdb';

interface BookmarkGenre {
	id: string;
	genre_id: number;
	name: string;
}

interface BookmarkData {
	id: string;
	movie_id: string;
	title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string | Date;
	vote_average: number;
	original_title: string;
	original_lang: string;
	created_at: string | Date;
	genres: BookmarkGenre[];
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
				bookmark.original_title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.sort((a, b) => {
			switch (sortBy) {
				case 'recent':
					return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
				case 'rating':
					return b.vote_average - a.vote_average;
				case 'title':
					return a.title.localeCompare(b.title);
				default:
					return 0;
			}
		});

	if (authLoading || isLoading) {
		return (
			<div className="container py-8 px-4">
				<Heading element="h1" title="My Watchlist" className="text-3xl md:text-4xl mb-12" />
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
					<RenderSkeletonCards isMovie={true} />
				</div>
			</div>
		);
	}

	return (
		<div className="py-8 px-4">
			<div className="container">
				{bookmarks.length === 0 ? (
					// Empty state - centered vertically
					<div className="flex flex-col items-center justify-center min-h-[60vh]">
						<Heading
							element="h1"
							title="My Watchlist"
							className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent"
						/>
						<p className="text-gray-400 mb-12">Your personal collection of movies to watch</p>

						<div className="text-center">
							<div className="relative w-24 h-24 mx-auto mb-6">
								<div className="opacity-60 relative w-24 h-24 rounded-full bg-gray-800/50 border-2 border-gray-700 flex items-center justify-center">
									<Bookmark className="w-12 h-12 text-gray-600" />
								</div>
							</div>
							<Heading
								element="h2"
								title="Your watchlist is empty"
								className="text-2xl md:text-3xl font-bold mb-4 justify-center"
							/>
							<p className="text-gray-400 mb-8 max-w-md mx-auto">
								Start building your personal collection of movies to watch
							</p>
							<Link href="/">
								<Button
									variant="default"
									size="lg"
									className="bg-accent-secondary hover:bg-accent-primary shadow-none hover:shadow-none hover:scale-105 transition-all duration-200"
								>
									<Film className="w-5 h-5 mr-2" />
									Discover Movies
								</Button>
							</Link>
						</div>
					</div>
				) : (
					<>
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
										{bookmarks.length} {bookmarks.length === 1 ? 'movie' : 'movies'} saved
									</p>
								</div>
							</div>

							{/* Search and Filter Bar */}
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
						</div>

						{/* Empty Search Results */}
						{filteredAndSortedBookmarks.length === 0 ? (
							<div className="text-center py-20">
								<div className="relative w-24 h-24 mx-auto mb-6">
									<div className="opacity-60 relative w-24 h-24 rounded-full bg-gray-800/50 border-2 border-gray-700 flex items-center justify-center">
										<Search className="w-12 h-12 text-gray-600" />
									</div>
								</div>
								<Heading
									element="h2"
									title="No movies found"
									className="text-2xl md:text-3xl font-bold mb-4"
								/>
								<p className="text-gray-400 mb-8 max-w-md mx-auto">
									Try a different search term or clear the filter
								</p>
								<Button
									variant="outline"
									size="lg"
									onClick={() => setSearchQuery('')}
									className="gap-2"
								>
									Clear Search
								</Button>
							</div>
						) : (
							<>
								{/* Movies Grid */}
								<div className="mb-6 flex items-center justify-between">
									<p className="text-sm text-gray-400">
										Showing {filteredAndSortedBookmarks.length} of {bookmarks.length} movies
									</p>
								</div>
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
									{filteredAndSortedBookmarks.map((bookmark) => {
										// Convert bookmark to Card-compatible format
										const movieData = {
											id: parseInt(bookmark.movie_id),
											title: bookmark.title,
											original_title: bookmark.original_title,
											overview: bookmark.overview,
											poster_path: bookmark.poster_path || '',
											backdrop_path: bookmark.backdrop_path || '',
											vote_average: bookmark.vote_average,
											release_date: (bookmark.release_date instanceof Date
												? bookmark.release_date.toISOString().split('T')[0]
												: typeof bookmark.release_date === 'string'
												? bookmark.release_date.split('T')[0]
												: '') as string,
											media_type: 'movie' as const,
											adult: false,
											genre_ids: bookmark.genres?.map((g) => g.genre_id) || [],
											genres: bookmark.genres?.map((g) => ({ id: g.genre_id, name: g.name })) || [],
											original_language: bookmark.original_lang || 'en',
											popularity: 0,
											video: false,
											vote_count: 0,
										} as MovieResponse;

										return <Card key={bookmark.id} item={movieData} />;
									})}
								</div>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}
