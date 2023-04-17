import { WindowSize } from '@/hooks/useWindowSize';

export const CardPerView = (
	windowSize: WindowSize,
	options: { isActor: boolean; isMovie: boolean } = {
		isActor: false,
		isMovie: false,
	}
) => {
	const { isActor, isMovie } = options;

	const breakpoints = [
		{ max: 1280, value: 4 },
		{ max: 1536, value: 5 },
	];

	const breakpoint = breakpoints.find(bp => windowSize.width! < bp.max);

	if (isMovie) return breakpoint ? breakpoint.value : 7;

	return breakpoint ? breakpoint.value : 6;
};

// export const movieCardPerView = (windowSize: WindowSize) => {
// 	const breakpoints = [
// 		{ max: 576, value: 1 },
// 		{ max: 640, value: 2 },
// 		{ max: 768, value: 2 },
// 		{ max: 1024, value: 2 },
// 		{ max: 1280, value: 3 },
// 		{ max: 1536, value: 4 },
// 	];

// 	const breakpoint = breakpoints.find(bp => windowSize.width! < bp.max);

// 	return breakpoint ? breakpoint.value : 5;
// }
