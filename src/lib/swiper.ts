import { WindowSize } from '@/hooks/useWindowSize';
import { Autoplay, Pagination } from 'swiper';

export const getSwiperOptions = (windowSize: WindowSize) => {
	let slidesPerView;
	let spaceBetween;

	if (windowSize.width! < 640) {
		slidesPerView = 1;
		spaceBetween = -15;
	} else if (windowSize.width! < 768) {
		slidesPerView = 1;
		spaceBetween = -25;
	} else if (windowSize.width! < 1024) {
		slidesPerView = 2;
		spaceBetween = 15;
	} else if (windowSize.width! < 1280) {
		slidesPerView = 3;
		spaceBetween = 15;
	} else if (windowSize.width! < 1536) {
		slidesPerView = 4;
		spaceBetween = 15;
	} else {
		slidesPerView = 5;
		spaceBetween = 15;
	}

	return {
		slidesPerView,
		spaceBetween,
		modules: [Autoplay],
		loop: true,
		speed: 1000,
		autoplay: {
			disableOnInteraction: false,
		},
	};
};