import { MovieResponse, PeopleResponse } from '@/types/tmdb';
import { isMovieResponse } from './typeGuards';

const getImg = (path: string, isImage: boolean) => {
	switch (path) {
		case null:
			return isImage ? `assets/no-image.jpg` : `url(assets/no-image.jpg)`;
		default:
			return isImage
				? `https://image.tmdb.org/t/p/original${path}`
				: `url(https://image.tmdb.org/t/p/original${path})`;
	}
};

export const getMoviePath = (
	movie: MovieResponse,
	options: { isBG?: boolean } = {
		isBG: false,
	}
) => {
	if (!movie) {
		return { backgroundImage: '' };
	}

	const { backdrop_path, poster_path } = movie;

	const { isBG } = options;

	return isBG
		? { backgroundImage: getImg(backdrop_path, false) }
		: { backgroundImage: getImg(poster_path, true) };
};

export const getActorPath = (actor: PeopleResponse) => {
	const { profile_path } = actor;
	return { backgroundImage: getImg(profile_path, true) };
};
