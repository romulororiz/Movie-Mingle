'use client';

import { Button } from '@/components/ui/Button';
import { Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { MovieDetailResponse } from '@/types/tmdb';

interface BookmarkButtonProps {
	movie: MovieDetailResponse;
	userId?: string;
}

export function BookmarkButton({ movie, userId }: BookmarkButtonProps) {
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Check if movie is bookmarked on mount
	useEffect(() => {
		if (!userId) return;

		const checkBookmark = async () => {
			try {
				const res = await fetch(`/api/bookmarks/${movie.id}`);
				if (res.ok) {
					const data = (await res.json()) as { isBookmarked: boolean };
					setIsBookmarked(data.isBookmarked);
				}
			} catch (error) {
				console.error('Error checking bookmark:', error);
			}
		};

		checkBookmark();
	}, [movie.id, userId]);

	const handleToggleBookmark = async () => {
		if (!userId) {
			toast.error('Please sign in to bookmark movies');
			return;
		}

		setIsLoading(true);

		try {
			if (isBookmarked) {
				// Remove bookmark
				const res = await fetch(`/api/bookmarks/${movie.id}`, {
					method: 'DELETE',
				});

				if (!res.ok) {
					const errorData = (await res.json()) as { error?: string; details?: unknown };
					console.error('Delete bookmark error details:', errorData);
					throw new Error(errorData.error || 'Failed to remove bookmark');
				}

				setIsBookmarked(false);
				toast.success('Removed from watchlist');
			} else {
				// Add bookmark
				const res = await fetch('/api/bookmarks', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						movieId: movie.id.toString(),
						title: movie.title,
						overview: movie.overview || '',
						posterPath: movie.poster_path || null,
						backdropPath: movie.backdrop_path || null,
						originalLang: movie.original_language || 'en',
						releaseDate: movie.release_date || new Date().toISOString(),
						voteAverage: movie.vote_average || 0,
						originalTitle: movie.original_title || movie.title,
						genres: Array.isArray(movie.genres)
							? movie.genres.map((g) => ({ id: g.id, name: g.name }))
							: [],
					}),
				});

				if (!res.ok) {
					const errorData = (await res.json()) as { error?: string; details?: unknown };
					console.error('Bookmark error details:', errorData);
					throw new Error(errorData.error || 'Failed to add bookmark');
				}

				setIsBookmarked(true);
				toast.success('Added to watchlist');
			}
		} catch (error) {
			console.error('Bookmark error:', error);
			toast.error(error instanceof Error ? error.message : 'Something went wrong');
		} finally {
			setIsLoading(false);
		}
	};

	if (!userId) {
		return (
			<Button
				variant="outline"
				size="lg"
				onClick={() => toast.error('Please sign in to bookmark movies')}
				className="gap-2"
			>
				<Bookmark className="w-5 h-5" />
				Add to Watchlist
			</Button>
		);
	}

	return (
		<Button
			variant={isBookmarked ? 'subtle' : 'outline'}
			size="lg"
			onClick={handleToggleBookmark}
			disabled={isLoading}
			isLoading={isLoading}
			className="gap-2 min-w-[180px]"
		>
			{isBookmarked ? (
				<>
					<Bookmark className="w-5 h-5 fill-current" />
					In Watchlist
				</>
			) : (
				<>
					<Bookmark className="w-5 h-5" />
					Add to Watchlist
				</>
			)}
		</Button>
	);
}
