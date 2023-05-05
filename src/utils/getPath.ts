import {
	CastResponse,
	MovieDetailResponse,
	MovieOrActor,
	PeopleDetailResponse,
} from '@/types/tmdb';
import {
	isCastResponseItem,
	isMovieDetailResponse,
	isMovieResponseItem,
	isPeopleDetailResponse,
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

export const getImagePath = (
	item: MovieOrActor | MovieDetailResponse | PeopleDetailResponse | CastResponse
) => {
	if (isMovieResponseItem(item) || isMovieDetailResponse(item)) {
		return getAbsoluteUrl(item.poster_path, true);
	} else if (
		isPeopleResponseItem(item) ||
		isPeopleDetailResponse(item) ||
		isCastResponseItem(item)
	) {
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
