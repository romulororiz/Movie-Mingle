import { CastResponse, MovieOrActor } from '@/types/tmdb';
import {
	isCastResponseItem,
	isMovieDetailResponse,
	isMovieResponseItem,
	isPeopleResponseItem,
} from '@/utils/typeGuards';
import { ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getAbsoluteUrl = (url: string, path?: string): string => {
	if (path === null) return '/assets/no-image.jpg';

	return `${url}${path}`;
};

export const blurredPlaceholder = (isLoading: boolean) => {
	if (isLoading) {
		return 'grayscale blur-2xl scale-105 duration-[200]';
	} else {
		return 'grayscale-0 blur-0 scale-100 duration-[200]';
	}
};

export const formatDate = (date: string, dateFormat: string = 'MMM yyyy') => {
	if (date === '') return 'N/A';

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
		.toString() // Convert to string
		.normalize('NFD') // Split an accented letter in the base letter and the accent
		.replace(/[\u0300-\u036f]/g, '') // Remove accents
		.toLowerCase() // Convert to lowercase
		.trim() // Remove whitespace
		.replace(/[^\w\s\/]|_/g, '') // Allow trailing slash
		.replace(/\s+/g, '-'); // Replace spaces with hyphens

	if (number) return `${slugifiedText}-${number}`;
};

export const createSlug = (item: MovieOrActor | CastResponse) => {
	if (isMovieResponseItem(item) || isMovieDetailResponse(item))
		return `/movies/${slugify(item.title, item.id)}`;
	if (isPeopleResponseItem(item) || isCastResponseItem(item))
		return `/actors/${slugify(item.name, item.id)}`;
};

export const getIdFromSlug = (slug: string) => {
	return Number(slug.split('-').pop());
};
