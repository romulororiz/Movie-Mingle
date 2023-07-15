import { CastResponse, GenreResponse, MovieOrActor } from '@/types/tmdb';
import {
	isCastResponseItem,
	isGenreResponse,
	isGenreResponseItem,
	isMovieDetailResponse,
	isMovieResponseItem,
	isPeopleResponseItem,
} from '@/utils/typeGuards';
import { ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const blurData =
	'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAALCAAKAAoBAREA/8QAFQABAQAAAAAAAAAAAAAAAAAABwj/xAApEAABAwMBBQkAAAAAAAAAAAABAgMEBQYRAAcSIlFhEyExMjRBQ1Ni/9oACAEBAAA/ABewds9Aouz2PCSqM48mCG2nAUK4ezwnB6DHXUTVW97feqlSeW/F33Z8x1fG35nJDile/MnUy23UagLUIE6YAlpQSBKfwAAoAAb+B3AeHIaApcyWZcrMqR6h/wCd37FfrX//2Q==';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getAbsoluteUrl = (
	url?: string,
	path?: string,
	showCase?: boolean
): string => {
	const noImgPath = '/assets/no-image.jpg';

	if (showCase) return '/assets/showcase.jpg';

	return path !== null ? `${url}${path}` : noImgPath;
};

export const formatDate = (date: string, dateFormat: string = 'MMM yyyy') => {
	if (date === '' || date === null) return 'N/A';

	const dateObj = new Date(date);
	return format(dateObj, dateFormat).toString();
};

export const normalizePopularityScore = (score: number) => {
	const minScore = 0;
	const maxScore = 100;
	const minNormalizedScore = (score - minScore) / (maxScore - minScore);
	return Math.round(minNormalizedScore * 100) / 100;
};

export const slugify = (text: string, number?: number) => {
	const slugifiedText = text
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with dashes
		.replace(/[&#,+()$~%'.":!*?<>{}]/g, '')
		.replace(/\//g, '-');

	if (number) return `${slugifiedText}-${number}`;
};

export const createSlug = (
	item: MovieOrActor | CastResponse | GenreResponse
) => {
	if (isMovieResponseItem(item) || isMovieDetailResponse(item))
		return `/movies/${slugify(item.title, item.id)}`;
	if (isPeopleResponseItem(item) || isCastResponseItem(item))
		return `/actors/${slugify(item.name, item.id)}`;
	if (isGenreResponseItem(item))
		return `/movies/genres/${slugify(item.name, item.id)}`;
};

export const getIdFromSlug = (slug: string) => {
	return Number(slug.split('-').pop());
};
