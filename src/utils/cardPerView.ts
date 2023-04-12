import { WindowSize } from '@/hooks/useWindowSize';

export const actorCardPerView = (windowSize: WindowSize) => {
	const breakpoints = [
		{ max: 1280, value: 4 },
		{ max: 1536, value: 5 },
	];

	const breakpoint = breakpoints.find(bp => windowSize.width! < bp.max);

	return breakpoint ? breakpoint.value : 6;
};
