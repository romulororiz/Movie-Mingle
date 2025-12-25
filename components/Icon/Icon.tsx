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
	LogOut as SignOut,
	LogIn as SignIn,
	Award,
	Home,
	Menu,
	Compass,
	Cog,
	UserPlus,
	Clock,
	Globe,
	DollarSign,
	LineChart,
	Film,
	Loader2,
	X as Close,
	Twitter,
	Github,
	Linkedin,
	Tv,
	Sun,
	Moon,
	Bookmark,
	Bell,
	MessageSquare,
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
	Award,
	Home,
	SignIn,
	SignOut,
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
	Loader2,
	Twitter,
	Github,
	Linkedin,
	Tv,
	Sun,
	Moon,
	Bookmark,
	Bell,
	MessageSquare,
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
		(isMobile(windowSize) ? 22 : isTablet(windowSize) ? 26 : isLaptop(windowSize) ? 28 : 30);

	const IconComponent = lucideIcons[name];

	if (!IconComponent) {
		return null;
	}

	return <IconComponent color={color} size={size} {...props} />;
};

export default Icon;
