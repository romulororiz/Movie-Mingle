'use client';

import useWindowSize from '@/hooks/useWindowSize';
import {
	isDesktop,
	isLaptop,
	isLargeDesktop,
	isMobile,
	isTablet,
} from '@/utils/breakpoints';
import { LucideIcon } from 'lucide-react';
import {
	TrendingUp,
	Flame,
	ChevronLeft,
	Search,
	Star,
	ThumbsUp,
	Clapperboard,
} from 'lucide-react';

export const lucideIcons: Record<string, LucideIcon> = {
	TrendingUp,
	Flame,
	ChevronLeft,
	Search,
	Star,
	ThumbsUp,
	Clapperboard,
};

import { FC, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
	name: string;
	color?: string;
	size?: number;
}

const Icon: FC<IconProps> = ({
	name,
	color = '#FDBB30',
	size = 28,
	...props
}) => {
	const windowSize = useWindowSize();

	size =
		size ||
		(isMobile(windowSize)
			? 24
			: isTablet(windowSize)
			? 28
			: isLaptop(windowSize)
			? 30
			: 32);

	const IconComponent = lucideIcons[name];

	if (!IconComponent) {
		return null;
	}

	return <IconComponent color={color} size={size} {...props} />;
};

export default Icon;
