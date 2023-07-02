import { WindowSize } from '@/hooks/useWindowSize';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper';

export const getSwiperOptions = (windowSize?: WindowSize) => {
	let slidesPerView;
	let spaceBetween = 15;

	if (!windowSize)
		return {
			spaceBetween: 30,
			effect: 'fade' as const,
			navigation: true,
			speed: 400,
			loop: true,
			modules: [EffectFade, Navigation],
		};

	switch (true) {
		case windowSize.width! < 480:
			slidesPerView = 2;
			break;
		case windowSize.width! < 640:
			slidesPerView = 2;
			break;
		case windowSize.width! < 768:
			slidesPerView = 3;
			break;
		case windowSize.width! < 960:
			slidesPerView = 4;
			break;
		case windowSize.width! < 1024:
			slidesPerView = 5;
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
