import { FC } from 'react';
import { Icon } from '@/components/Icon';
import { isMobile } from '@/utils/breakpoints';

import useWindowSize from '@/hooks/useWindowSize';

interface PlayBtnSwiperProps {
	isPlaying: boolean;
	onClick: () => void;
}
const PlayBtnSwiper: FC<PlayBtnSwiperProps> = ({ isPlaying, onClick }) => {
	const windowSize = useWindowSize();

	return (
		<div onClick={onClick} className='cursor-pointer '>
			{isPlaying ? (
				<Icon
					name='Pause'
					fill='white'
					color='white'
					size={isMobile(windowSize) ? 20 : 26}
				/>
			) : (
				<Icon
					name='Play'
					fill='white'
					color='white'
					size={isMobile(windowSize) ? 20 : 26}
				/>
			)}
		</div>
	);
};

export default PlayBtnSwiper;
