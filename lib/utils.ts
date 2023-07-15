import {
	CastResponse,
	GenreResponse,
	MovieOrActor,
	TvResponse,
} from '@/types/tmdb';
import {
	isCastResponseItem,
	isGenreResponseItem,
	isMovieDetailResponse,
	isMovieResponseItem,
	isPeopleResponseItem,
	isTvResponseItem,
} from '@/utils/typeGuards';
import { ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import slugify from 'slugify';
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

export const slugifyStr = (text: string, number?: number) => {
	const slugifiedText = slugify(text || '');

	if (number) return `${slugifiedText}-${number}`;

	return slugifiedText
};


export const createSlug = (
	item: MovieOrActor | CastResponse | GenreResponse | TvResponse
) => {
	if (isMovieResponseItem(item) || isMovieDetailResponse(item))
		return `/movies/${slugifyStr(item.title, item.id)}`;
	if (isPeopleResponseItem(item) || isCastResponseItem(item))
		return `/actors/${slugifyStr(item.name, item.id)}`;
	if (isGenreResponseItem(item))
		return `/movies/genres/${slugifyStr(item.name, item.id)}`;
	if (isTvResponseItem(item)) return `/tv/${slugifyStr(item.name, item.id)}`;
};

export const getIdFromSlug = (slug: string) => {
	return Number(slug.split('-').pop());
};
