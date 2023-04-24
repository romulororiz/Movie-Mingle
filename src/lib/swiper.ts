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
			loop: true,
			modules: [EffectFade, Navigation],
		};

	switch (true) {
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
