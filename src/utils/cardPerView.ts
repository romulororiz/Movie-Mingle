import { WindowSize } from '@/hooks/useWindowSize';

export const CardPerView = (
	windowSize: WindowSize,
	options: { isActor: boolean; isMovie: boolean } = {
		isActor: false,
		isMovie: true,
	}
) => {
	const { isMovie, isActor } = options;

	const breakpoints = [
		{ max: 576, value: 4 },
		{ max: 768, value: isActor ? 6 : 4 },
		{ max: 1024, value: 6 },
		{ max: 1280, value: isActor ? 6 : 8 },
	];

	const breakpoint = breakpoints.find(bp => windowSize.width! < bp.max);

	if (isMovie) return breakpoint ? breakpoint.value : 8;

	return breakpoint ? breakpoint.value : 6;
};
