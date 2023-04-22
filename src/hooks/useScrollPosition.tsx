import { useState, useEffect } from 'react';

export default function useScrollPosition() {
	const [scrollPosition, setScrollPosition] = useState<number>(0);

	useEffect(() => {
		function handleScroll() {
			setScrollPosition(window.pageYOffset);
		}

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return scrollPosition;
}
