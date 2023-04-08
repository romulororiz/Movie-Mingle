import { movieQuerySchema } from '@/lib/tmdb';
import { z } from 'zod';

export interface MovieResponse {
	poster_path: string;
	adult: boolean;
	overview: string;
	release_date: String;
	genre_ids: number[];
	id: number;
	original_title: string;
	original_language: string;
	title: string;
	backdrop_path: string;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
}

export interface MovieData {
	results: MovieResponse[] | null;
	page: number;
	total_results: number;
	total_pages: number;
}

export interface GenreResponse {
	id: number;
	name: string;
}

export interface PeopleResponse {
	profile_path: string;
	adult: boolean;
	id: number;
	name: string;
	popularity: number;
	known_for: MovieResponse[];
}

export interface PeopleData {
	results: PeopleResponse[] | null;
	page: number;
	total_results: number;
	total_pages: number;
}

// Movie Query Schema User Preferences
export type MovieQuery = z.infer<typeof movieQuerySchema>;
