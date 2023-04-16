import { MovieResponse, PeopleResponse } from '@/types/tmdb';

const getImg = (path: string) => {
	if (path === null) return `url(assets/no-image.jpg)`;
	return `url(https://image.tmdb.org/t/p/original${path})`;
};

export const getMoviePath = (
	movie: MovieResponse,
	options: { isBG?: boolean } = { isBG: false }
) => {
	const { backdrop_path, poster_path } = movie;

	const { isBG } = options;

	if (isBG) return { backgroundImage: getImg(backdrop_path) };

	return { backgroundImage: getImg(poster_path) };
};

export const getActorPath = (actor: PeopleResponse) => {
	const { profile_path } = actor;
	return { backgroundImage: getImg(profile_path) };
};
