import { WindowSize } from '@/hooks/useWindowSize';
import { Autoplay, Pagination } from 'swiper';

export const getSwiperOptions = (windowSize: WindowSize) => {
	let slidesPerView;
	let spaceBetween = 15;

	switch (true) {
		case windowSize.width! < 440:
			slidesPerView = 1;
		case windowSize.width! < 576:
			slidesPerView = 2;
			break;
		case windowSize.width! < 640:
			slidesPerView = 3;
			break;
		case windowSize.width! < 768:
			slidesPerView = 3;
			break;
		case windowSize.width! < 1024:
			slidesPerView = 4;
			break;
		case windowSize.width! < 1280:
			slidesPerView = 5;
			break;
		case windowSize.width! < 1536:
			slidesPerView = 6;
			break;
		default:
			slidesPerView = 6;
	}

	return {
		slidesPerView,
		spaceBetween,
		centeredSlides: true,
		modules: [Autoplay, Pagination],
		pagination: {
			dynamicBullets: true,
		},
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 3000,
			disableOnInteraction: true,
		},
	};
};
