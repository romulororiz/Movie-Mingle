'use client';
import useWindowSize from '@/hooks/useWindowSize';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';
import Icon from '../Icon';
import Heading from '../ui/Heading';

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	title: string;
	icon?: string;
	color?: string;
	size?: number;
	container?: boolean;
}

const Section: FC<SectionProps> = ({
	children,
	className,
	title,
	icon,
	color,
	size,
	container = true,

	...props
}) => {
	const windowSize = useWindowSize();

	const sectionVariants = cva(
		cn('md:pl-[264px] mx-auto', {
			container: container,
		})
	);

	return (
		// will have swiiper and be set to auto play
		<section className={cn(sectionVariants({ className }))} {...props}>
			<div
				className={cn('flex justify-between max-w-7xl mx-auto mb-5 px-0', {
					'px-[1.5rem]': !container,
				})}
			>
				<div className={'flex h-full'}>
					{icon && <Icon name={icon} color={color} className='mr-2' />}
					<Heading title={title} element='h2' />
				</div>
				{/* // todo - create button component */}
				<p className='w-fit flex items-center cursor-pointer'>See More</p>
			</div>

			<>{children}</>
		</section>
	);
};

export default Section;
