'use client';

import useWindowSize from '@/hooks/useWindowSize';
import { isLaptop, isMobile, isTablet } from '@/utils/breakpoints';
import {
	ChevronLeft,
	ChevronDown,
	ChevronUp,
	Clapperboard,
	Flame,
	LucideIcon,
	Search,
	Star,
	ThumbsUp,
	TrendingUp,
	ArrowRight,
	Users,
	Play,
	Pause,
	Calendar,
	User,
	Settings,
	LogOut,
	Award,
	Home,
	LogIn,
	Menu,
	Compass,
	Cog,
	UserPlus,
	Clock,
	Globe,
	DollarSign,
	LineChart,
	Film,
	X as Close,
} from 'lucide-react';

export const lucideIcons: Record<string, LucideIcon> = {
	TrendingUp,
	Flame,
	ChevronLeft,
	ChevronDown,
	ChevronUp,
	Search,
	Star,
	ThumbsUp,
	Clapperboard,
	ArrowRight,
	Users,
	Play,
	Pause,
	Calendar,
	User,
	Settings,
	LogOut,
	Award,
	Home,
	LogIn,
	Menu,
	Close,
	Compass,
	Cog,
	UserPlus,
	Clock,
	Globe,
	DollarSign,
	LineChart,
	Film,
};

import { FC, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
	name: string;
	color?: string;
	size?: number;
}

const Icon: FC<IconProps> = ({ name, color = '#FDBB30', size, ...props }) => {
	const windowSize = useWindowSize();

	size =
		size ||
		(isMobile(windowSize)
			? 22
			: isTablet(windowSize)
			? 26
			: isLaptop(windowSize)
			? 28
			: 30);

	const IconComponent = lucideIcons[name];

	if (!IconComponent) {
		return null;
	}

	return <IconComponent color={color} size={size} {...props} />;
};

export default Icon;
