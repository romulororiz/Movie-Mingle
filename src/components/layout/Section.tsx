import { FC, HTMLAttributes } from 'react';
import Icon from '../Icon';
import Heading from '../ui/Heading';

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	title: string;
	icon?: string;
	color?: string;
	size?: number;
}

const Section: FC<SectionProps> = ({
	children,
	className,
	title,
	icon,
	color,
	size,

	...props
}) => {
	return (
		// will have swiiper and be set to auto play
		<section className={className} {...props}>
			<div className='flex  max-w-7xl mx-auto'>
				<div className='container max-w-7xl mb-6 flex items-center p-0'>
					{icon && (
						<Icon name={icon} color='#FDBB30' size={size} className='mr-2' />
					)}
					<Heading title={title} element='h1' />
				</div>
				{/* // todo - create button component */}
				<p className='w-32 flex items-center justify-center cursor-pointer'>
					See More
				</p>
			</div>

			{/* // todo - make it responsive // */}
			{children}
		</section>
	);
};

export default Section;
