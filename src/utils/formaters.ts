import { MovieOrActor } from '@/types/tmdb';
import { format } from 'date-fns';
import {
	isMovieDetailResponse,
	isMovieResponseItem,
	isPeopleResponseItem,
} from './typeGuards';

/**
 * @param date
 * @param dateFormat
 * @returns  Formatted date string
 */
export const formatDate = (date: string, dateFormat: string = 'MMM yyyy') => {
	if (date === '') return 'N/A';

	const dateObj = new Date(date);
	return format(dateObj, dateFormat).toString();
};

/**
 * @param score
 * @returns  Formatted score string
 */

export const normalizePopularityScore = (score: number) => {
	const minScore = 0;
	const maxScore = 100;
	const minNormalizedScore = (score - minScore) / (maxScore - minScore);
	return Math.round(minNormalizedScore * 100) / 100;
};

/**
 * @param text
 * @param number
 * @returns  Slugified string
 */

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

/**
 * @param item: MovieOrActor
 * @returns  Formatted image url
 * @description  Returns a formatted image for the given item (movie or actor)
 */

export const createSlug = (item: MovieOrActor) => {
	if (isMovieResponseItem(item) || isMovieDetailResponse(item))
		return `/movies/${slugify(item.title, item.id)}`;
	if (isPeopleResponseItem(item))
		return `/actors/${slugify(item.name, item.id)}`;
};

/**
 * @param slug
 * @returns  movie id from slug
 */

export const getIdFromSlug = (slug: string) => {
	return Number(slug.split('-').pop());
};
