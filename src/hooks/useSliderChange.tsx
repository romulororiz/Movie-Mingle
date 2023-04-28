'use client';

import { useAppState } from '@/context/stateContext';
import { useEffect, useState } from 'react';

const useBgChange = () => {
	const { activeIndex } = useAppState();

	const [currentImageIndex, setCurrentImageIndex] = useState(activeIndex);
	const [previousImageIndex, setPreviousImageIndex] = useState<number>(0);

	useEffect(() => {
		if (activeIndex !== currentImageIndex) {
			setPreviousImageIndex(currentImageIndex);
			const timer = setTimeout(() => {
				setCurrentImageIndex(activeIndex);
			});
			return () => clearTimeout(timer);
		}
	}, [activeIndex, currentImageIndex]);

	return { currentImageIndex, previousImageIndex };
};

export default useBgChange;
