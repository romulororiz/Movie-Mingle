export interface MovieData {
	results: MovieResponse[] | null;
	page: number;
	total_results: number;
	total_pages: number;
}

export interface MovieResponse {
	poster_path: string;
	adult: boolean;
	overview: string;
	release_date: String;
	genres: GenreResponse[];
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

export interface PeopleData {
	results: PeopleResponse[] | null;
	page: number;
	total_results: number;
	total_pages: number;
}

export interface PeopleResponse {
	profile_path: string;
	adult: boolean;
	id: number;
	name: string;
	popularity: number;
	known_for: MovieResponse[];
}

export interface PeopleDetailResponse {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: null;
	gender: number;
	homepage: null;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string;
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

export interface GenreResponse {
	id: number;
	name: string;
}

export interface CastResponse {
	cast_id: number;
	character: string;
	credit_id: string;
	adult: boolean;
	gender: number;
	know_for_department: string;
	order: number;
	original_name: string;
	profile_path: string;
	name: string;
	popularity: number;
}

export interface MovieCreditsResponse {
	id: number;
	cast: CastResponse[];
}

export type MovieOrActor = MovieResponse | PeopleResponse;
