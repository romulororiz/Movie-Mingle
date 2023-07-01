'use client';

import Link from 'next/link';
import { FC } from 'react';
import { Icon } from '@/components/Icon';
import { Button } from './Button';
import { isTablet } from '@/utils/breakpoints';
import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { cn } from '@/lib/utils';

interface SeeMoreProps {
	route: string;
	className?: string;
	icon?: boolean;
	isSection?: boolean;
}

const SeeMore: FC<SeeMoreProps> = ({
	route,
	className,
	icon,
	isSection,
	...props
}) => {
	const windowSize = useWindowSize();

	const getVariant = (windowSize: WindowSize) => {
		if (isTablet(windowSize) && isSection) {
			return 'outline';
		} else {
			return 'ghost';
		}
	};

	return (
		<div className={className} {...props}>
			<Link href={route}>
				<Button
					variant={getVariant(windowSize)}
					className={cn('group', {
						'font-semibold tracking-wider md:pr-0 pr-4': isSection,
						'font-normal pr-0': !isSection,
					})}
				>
					See More
					{icon && (
						<Icon
							name='ArrowRight'
							size={16}
							className='ml-2 group-hover:animate-slideInOut'
						/>
					)}
				</Button>
			</Link>
		</div>
	);
};

export default SeeMore;
