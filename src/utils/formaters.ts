import { format } from 'date-fns';

export const formatDate = (date: string) => {
	const dateObj = new Date(date);
	return format(dateObj, 'MMM yyyy');
};

export const normalizePopularityScore = (score: number) => {
	const minScore = 0;
	const maxScore = 100;
	const minNormalizedScore = (score - minScore) / (maxScore - minScore);
	return Math.round(minNormalizedScore * 100) / 100;
};

export const slugify = (text: string) => {
	return text
		.toString() // Convert to string
		.normalize('NFD') // Split an accented letter in the base letter and the accent
		.replace(/[\u0300-\u036f]/g, '') // Remove accents
		.toLowerCase() // Convert to lowercase
		.trim() // Remove whitespace
		.replace(/[^\w\s\/]|_/g, '') // Allow trailing slash
		.replace(/\s+/g, '-'); // Replace spaces with hyphens
};
