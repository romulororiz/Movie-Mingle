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

