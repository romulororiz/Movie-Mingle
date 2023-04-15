'use client';

import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';
import Icon from '../Icon';
import Heading from '../ui/Heading';
import { Button } from '../ui/Button';

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	title: string;
	icon?: string;
	color?: string;
	container?: boolean;
	seeMore?: boolean;
	sidebarOpen?: boolean;
}

const Section: FC<SectionProps> = ({
	children,
	className,
	title,
	icon,
	color,
	container = true,
	seeMore = true,
	sidebarOpen,
	...props
}) => {
	const sectionVariants = cva(
		cn('transition-all duration-200 ease-linear mx-auto max-w-7xl container', {
			'max-w-[1536px]': !container,
		})
	);

	return (
		// will have swiper and be set to auto play
		<section className={cn(sectionVariants({ className }))} {...props}>
			<div className={cn('flex justify-between max-w-7xl mx-auto mb-5 px-0')}>
				<Heading title={title} element='h2' icon={icon} />

				{/* // todo - create button component */}
			</div>

			<div
				className={cn({
					'flex flex-wrap justify-start gap-4 relative': container,
					'flex-nowrap overflow-x-auto': !container,
				})}
			>
				{children}
			</div>

			{seeMore && (
				<div
					className={cn('mt-3 md:mt-5 w-full flex justify-end items-center', {
						'absolute right-0 z-50 container -bottom-2 md:bottom-5': !container,
					})}
				>
					<Button id='see-more__btn' variant='ghost' className='pr-0 group'>
						<span className='text-xs sm:text-base'>See More</span>
						<Icon
							name='ArrowRight'
							size={16}
							className='ml-2 group-hover:animate-slideInOut'
							// make color 50% opacity and 100% when button is hovered
						/>
					</Button>
				</div>
			)}
		</section>
	);
};

export default Section;
