'use client';

import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';
import Heading from './ui/Heading';
import SeeMore from './ui/SeeMore';
import Overlay from './ui/Overlay';

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	title?: string;
	icon?: string;
	container?: boolean;
	seeMore?: boolean;
	isActor?: boolean;
	route: string;
}

const Section: FC<SectionProps> = ({
	children,
	className,
	title,
	icon,
	container = true,
	seeMore = true,
	isActor = false,
	route,
}) => {
	const sectionVariants = cva(
		cn('mx-auto max-w-[85rem] w-full relative z-[2]', {
			'md:max-w-[95rem]': !container,
			container: container,
		})
	);

	return (
		<section className={cn(sectionVariants({ className }))}>
			{container && <Overlay className='spotlight' />}
			<div
				className={cn(
					'flex justify-between max-w-7xl mx-auto z-[70] mb-5 relative',
					{
						'px-[2rem] mx-auto top-2 md:top-8 md:mb-0': !container,
					}
				)}
			>
				<Heading title={title} element='h1' size='large' icon={icon} />

				{/* top see more */}
				{seeMore && (
					<SeeMore
						route={route}
						container={container}
						isActor={isActor}
						className={cn('w-fit md:flex hidden', {
							hidden: !container,
						})}
					/>
				)}
			</div>

			<div
				// className={cn({
				// 	'flex flex-wrap justify-start gap-x-8 gap-y-[3.5rem] relative':
				// 		container,
				// 	'flex-nowrap overflow-x-auto': !container,
				// })}
				className={cn({
					'grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12':
						container && !isActor,
					'grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-4':
						container && isActor,
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
					className={cn('flex justify-end md:hidden', {})}
				/>
			)}
		</section>
	);
};

export default Section;
