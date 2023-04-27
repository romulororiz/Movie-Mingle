import Link from 'next/link';
import { FC } from 'react';
import { Icon } from '@/components/Icon';
import { Button } from './Button';

interface SeeMoreProps {
	route: string;
	container?: boolean;
	isActor?: boolean;
	className?: string;
	icon?: boolean;
}

const SeeMore: FC<SeeMoreProps> = ({
	route,
	container = true,
	isActor,
	className,
	icon = true,
	...props
}) => {
	return (
		<Link href={route} {...props} className={className}>
			<Button variant='ghost' className='pr-0 group'>
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
	);
};

export default SeeMore;
