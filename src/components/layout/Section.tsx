import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';
import Icon from '../Icon';
import Heading from '../ui/Heading';

const sectionVariants = cva('md:pl-72 container mx-auto');

interface SectionProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof sectionVariants> {
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
		<section className={cn(sectionVariants({ className }))} {...props}>
			<div className='flex justify-between max-w-7xl mx-auto mb-5'>
				<div className='flex h-full items-center px-0'>
					{icon && <Icon name={icon} color={color} className='mr-2' />}
					<Heading title={title} element='h1' />
				</div>
				{/* // todo - create button component */}
				<p className='w-fit flex items-center cursor-pointer'>See More</p>
			</div>

			{/* is actors is movies */}

			{/* // todo - make it responsive // */}
			{children}
		</section>
	);
};

export default Section;
