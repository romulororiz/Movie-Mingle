import Link from 'next/link';
import { FC } from 'react';
import { Button } from './Button';
import Icon from '../Icon';

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
		<div className={className} {...props}>
			<Link href={route}>
				<Button variant='ghost' className='ml-4 md:ml-0 pr-0 group'>
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
