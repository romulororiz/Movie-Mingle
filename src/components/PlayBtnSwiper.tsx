import { FC } from 'react';
import Icon from './Icon';
import { isMobile } from '@/utils/breakpoints';
import useWindowSize from '@/hooks/useWindowSize';

interface PlayBtnSwiperProps {
	isPlaying: boolean;
	onClick: () => void;
}

const PlayBtnSwiper: FC<PlayBtnSwiperProps> = ({ isPlaying, onClick }) => {
	const windowSize = useWindowSize();

	return (
		<div
			onClick={onClick}
			className='absolute bottom-0 md:bottom-8 right-0 z-[80] cursor-pointer max-w-7xl mx-auto w-full container left-0 flex justify-end'
		>
			{isPlaying ? (
				<Icon
					name='Pause'
					fill='white'
					color='white'
					size={isMobile(windowSize) ? 20 : 26}
				/>
			) : (
				<Icon name='Play' fill='white' color='white' size={26} />
			)}
		</div>
	);
};

export default PlayBtnSwiper;
