import { WindowSize } from '@/hooks/useWindowSize';
import { Autoplay, EffectFade, FreeMode, Navigation, Pagination } from 'swiper/modules';

export const getSwiperOptions = (windowSize?: WindowSize) => {
	let slidesPerView;

	switch (true) {
		case windowSize?.width! < 640:
			slidesPerView = 2;
			break;
		case windowSize?.width! < 768:
			slidesPerView = 3;
			break;
		case windowSize?.width! < 1024:
			slidesPerView = 4;
			break;
		case windowSize?.width! < 1280:
			slidesPerView = 5;
			break;
		case windowSize?.width! < 1536:
			slidesPerView = 6;
			break;
		default:
			slidesPerView = 7;
			break;
	}

	return {
		loop: true,
		loopedSlides: 3,
		spaceBetween: 15,
		slidesPerView: slidesPerView,
		slidesPerGroup: 2,
		speed: 600,
		pagination: {
			clickable: true,
		},
		navigation: true,
		modules: [Navigation, Pagination, Autoplay, EffectFade, FreeMode],
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		breakpoints: {
			300: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			640: {
				slidesPerView: 3,
				spaceBetween: 15,
			},
			768: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			1024: {
				slidesPerView: 5,
				spaceBetween: 20,
			},
			1280: {
				slidesPerView: 6,
				spaceBetween: 20,
			},
		},
	};
};
