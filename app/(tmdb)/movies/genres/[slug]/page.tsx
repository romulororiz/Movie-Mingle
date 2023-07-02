'use client';

import { getIdFromSlug } from '@/lib/utils';
import { useMoviesByGenre } from '@/hooks/useTMDB';
import { notFound } from 'next/navigation';

interface PageProps {
	params: {
		slug: string;
	};
}

export default function GenrePage({ params }: PageProps) {
	const { slug } = params;

	const genreId = getIdFromSlug(slug);

	const { data, isLoading } = useMoviesByGenre(genreId);

	if (isLoading) return 'loading...';

	if (!data.results) return notFound();

	return <div>Genre Page</div>;
}
