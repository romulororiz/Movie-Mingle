import { WindowSize } from '@/hooks/useWindowSize';
import { Autoplay, Pagination } from 'swiper';

export const getSwiperOptions = (windowSize: WindowSize) => {
	let slidesPerView;
	let spaceBetween;

	if (windowSize.width! < 640) {
		slidesPerView = 1;
		spaceBetween = 20;
	} else if (windowSize.width! < 768) {
		slidesPerView = 2;
		spaceBetween = 8;
	} else if (windowSize.width! < 1024) {
		slidesPerView = 2;
		spaceBetween = 8;
	} else if (windowSize.width! < 1280) {
		slidesPerView = 3;
		spaceBetween = 8;
	} else if (windowSize.width! < 1536) {
		slidesPerView = 4;
		spaceBetween = 16;
	} else {
		slidesPerView = 5;
		spaceBetween = 10;
	}

	return {
		pagination: {
			dynamicBullets: true,
		},
		slidesPerView,
		spaceBetween,
		modules: [Pagination, Autoplay],
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
	};
};
