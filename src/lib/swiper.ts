import { WindowSize } from '@/hooks/useWindowSize';
import { Autoplay, Pagination } from 'swiper';

export const getSwiperOptions = (windowSize: WindowSize) => {
	let slidesPerView;

	switch (true) {
		case windowSize.width! < 576:
			slidesPerView = 1;
			break;
		case windowSize.width! < 640:
			slidesPerView = 2;
			break;
		case windowSize.width! < 768:
			slidesPerView = 2;
			break;
		case windowSize.width! < 1024:
			slidesPerView = 3;
			break;
		case windowSize.width! < 1280:
			slidesPerView = 4;
			break;
		case windowSize.width! < 1536:
			slidesPerView = 5;
			break;
		default:
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
