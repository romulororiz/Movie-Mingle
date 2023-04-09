import { LucideIcon } from 'lucide-react';
import { TrendingUp, Flame, ChevronLeft } from 'lucide-react';

export const lucideIcons: Record<string, LucideIcon> = {
	TrendingUp,
	Flame,
	ChevronLeft,
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
	const IconComponent = lucideIcons[name];

	if (!IconComponent) {
		return null;
	}

	return <IconComponent color={color} size={size} {...props} />;
};

export default Icon;
