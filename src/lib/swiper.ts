import { WindowSize } from '@/hooks/useWindowSize';
import { Autoplay, Pagination } from 'swiper';

export const getSwiperOptions = (windowSize: WindowSize) => {
	let slidesPerView;
	let spaceBetween;

	switch (true) {
		case windowSize.width! < 576:
			slidesPerView = 1;
			spaceBetween = -45;
			break;
		case windowSize.width! < 640:
			slidesPerView = 2;
			spaceBetween = 15;
			break;
		case windowSize.width! < 768:
			slidesPerView = 2;
			spaceBetween = 15;
			break;
		case windowSize.width! < 1024:
			slidesPerView = 2;
			spaceBetween = 15;
			break;
		case windowSize.width! < 1280:
			slidesPerView = 3;
			spaceBetween = 15;
			break;
		case windowSize.width! < 1536:
			slidesPerView = 4;
			spaceBetween = 15;
			break;
		default:
			slidesPerView = 5;
			spaceBetween = 15;
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
