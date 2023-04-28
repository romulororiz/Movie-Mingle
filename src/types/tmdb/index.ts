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

export interface MovieDetailResponse {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: null;
	budget: number;
	genres: GenreResponse[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompanyResponse[];
	production_countries: ProductionCountryResponse[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguageResponse[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface ProductionCompanyResponse {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface ProductionCountryResponse {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguageResponse {
	iso_639_1: string;
	name: string;
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

export type MovieOrActor = MovieResponse | PeopleResponse;
