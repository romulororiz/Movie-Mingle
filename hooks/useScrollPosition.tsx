import { useState, useEffect } from 'react';

export default function useScrollPosition() {
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const [isScrolled, setIsScrolled] = useState<boolean>(false);

	useEffect(() => {
		function handleScroll() {
			setScrollPosition(window.pageYOffset);
			setIsScrolled(window.pageYOffset > 50);
		}

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
	}, [scrollPosition]);

	return { scrollPosition, isScrolled };
}
