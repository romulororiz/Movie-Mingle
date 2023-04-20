'use client';

import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';
import Heading from '../ui/Heading';
import SeeMore from '../ui/SeeMore';

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	title: string;
	icon?: string;
	color?: string;
	container?: boolean;
	sidebarOpen?: boolean;
	seeMore?: boolean;
	isActor?: boolean;
	route: string;
}

const Section: FC<SectionProps> = ({
	children,
	className,
	title,
	icon,
	color,
	sidebarOpen,
	container = true,
	seeMore = true,
	isActor = false,
	route,
	...props
}) => {
	const sectionVariants = cva(
		cn('mx-auto max-w-[85rem] w-full', {
			'md:max-w-[95rem]': !container,
			container: container,
		})
	);

	return (
		<section className={cn(sectionVariants({ className }))} {...props}>
			<div
				className={cn(
					'flex flex-col sm:flex-row justify-between max-w-7xl mx-auto z-[70] mb-5 relative',
					{
						'container mx-auto': !container,
					}
				)}
			>
				<Heading
					title={title}
					element='h1'
					size='large'
					icon={icon}
					className={cn({
						'top-2 md:top-14 relative': !container,
					})}
				/>

				{/* top see more */}
				{/* {seeMore && (
					<SeeMore
						route={route}
						container={container}
						isActor={isActor}
						className={cn('w-fit md:flex', {
							'top-2 md:top-14 relative': !container,
							hidden: container,
						})}
					/>
				)} */}
			</div>

			<div
				className={cn({
					'flex flex-wrap justify-start gap-x-8 gap-y-[3.5rem] relative':
						container,
					'flex-nowrap overflow-x-auto': !container,
				})}
			>
				{children}
			</div>

			{/* bottom see more mobile */}
			{seeMore && container && (
				<SeeMore
					route={route}
					container={container}
					isActor={isActor}
					className={cn('flex justify-end md:hidden mt-6', {
						'mt-10': isActor,
					})}
				/>
			)}
		</section>
	);
};

export default Section;
