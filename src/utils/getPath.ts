import { MovieOrActor } from '@/types/tmdb';
import { isMovieResponseItem } from './typeGuards';

const getAbsoluteUrl = (path: string, isImage: boolean) => {
	switch (path) {
		case null:
			return isImage ? `assets/no-image.jpg` : `url(assets/no-image.jpg)`;
		default:
			return isImage
				? `https://image.tmdb.org/t/p/original${path}`
				: `url(https://image.tmdb.org/t/p/original${path})`;
	}
};

export const getImagePath = (item: MovieOrActor) => {
	if (isMovieResponseItem(item)) {
		return getAbsoluteUrl(item.poster_path, true);
	} else {
		return getAbsoluteUrl(item.profile_path, true);
	}
};

export const getBackgroundImagePath = (item: MovieOrActor) => {
	if (isMovieResponseItem(item)) {
		return {
			backgroundImage: getAbsoluteUrl(item.backdrop_path, false),
		};
	}
};
