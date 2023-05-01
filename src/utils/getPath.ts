import { MovieDetailResponse, MovieOrActor } from '@/types/tmdb';
import {
	isMovieDetailResponse,
	isMovieResponseItem,
	isPeopleResponseItem,
} from './typeGuards';

const getAbsoluteUrl = (path: string, isImage: boolean) => {
	switch (path) {
		case null:
			return isImage ? `/assets/no-image.jpg` : `url(assets/no-image.jpg)`;
		default:
			return isImage
				? `https://image.tmdb.org/t/p/original${path}`
				: `url(https://image.tmdb.org/t/p/w1280${path})`;
	}
};

export const getImagePath = (item: MovieOrActor | MovieDetailResponse) => {
	if (isMovieResponseItem(item) || isMovieDetailResponse(item)) {
		return getAbsoluteUrl(item.poster_path, true);
	} else if (isPeopleResponseItem(item)) {
		return getAbsoluteUrl(item.profile_path, true);
	}
};

export const getBackgroundImagePath = (
	item: MovieOrActor | MovieDetailResponse
) => {
	if (isMovieResponseItem(item) || isMovieDetailResponse(item)) {
		return {
			backgroundImage: getAbsoluteUrl(item.backdrop_path, false),
		};
	}
};
