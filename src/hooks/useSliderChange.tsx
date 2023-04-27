'use client';

import { useAppState } from '@/context/stateContext';
import { useEffect, useState } from 'react';
import { MovieResponse } from '@/types/tmdb';
import { formatDate, slugify } from '@/utils/formaters';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import Icon from '@/components/Icon/Icon';
import Ratings from '@/components/ui/Ratings';
import SeeMore from '@/components/ui/SeeMore';

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
