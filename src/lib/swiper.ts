import { WindowSize } from '@/hooks/useWindowSize';
import { Autoplay, Pagination } from 'swiper';

export const getSwiperOptions = (windowSize: WindowSize) => {
	let slidesPerView;

	if (windowSize.width! < 576) {
		slidesPerView = 1;
	} else if (windowSize.width! < 640) {
		slidesPerView = 2;
	} else if (windowSize.width! < 768) {
		slidesPerView = 2;
	} else if (windowSize.width! < 1024) {
		slidesPerView = 3;
	} else if (windowSize.width! < 1280) {
		slidesPerView = 4;
	} else if (windowSize.width! < 1536) {
		slidesPerView = 5;
	} else {
		slidesPerView = 5;
	}

	return {
		slidesPerView,
		spaceBetween: 15,
		centeredSlides: true,
		modules: [Autoplay, Pagination],
		pagination: {
			dynamicBullets: true,
		},
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 4500,
			disableOnInteraction: false,
		},
	};
};
