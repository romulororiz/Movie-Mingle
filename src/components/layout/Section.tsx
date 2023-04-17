'use client';

import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';
import Icon from '../Icon';
import Heading from '../ui/Heading';
import { Button } from '../ui/Button';
import Link from 'next/link';

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
	container = true,
	sidebarOpen,
	seeMore = true,
	isActor,
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
					icon={icon}
					className={cn('flex w-fit', {
						'top-2 md:top-14 relative': !container,
					})}
				/>

				{/* top see more */}
				{seeMore && (
					<div
						className={cn('w-fit md:flex', {
							'top-2 md:top-14 relative': !container,
							hidden: container,
						})}
					>
						<Link href={route}>
							<Button variant='ghost' className='ml-4 md:ml-0 pr-0 group'>
								See More
								<Icon
									name='ArrowRight'
									size={16}
									className='ml-2 group-hover:animate-slideInOut'
								/>
							</Button>
						</Link>
					</div>
				)}
			</div>

			<div
				className={cn({
					'flex flex-wrap justify-start gap-x-6 gap-y-[3.5rem] relative':
						container,
					'flex-nowrap overflow-x-auto': !container,
				})}
			>
				{children}
			</div>

			{/* bottom see more mobile */}
			{seeMore && container && (
				<div
					className={cn('flex justify-end md:hidden mt-6', {
						'mt-10': isActor,
					})}
				>
					<Link href={route}>
						<Button variant='ghost' className='pr-0 group'>
							See More
							<Icon
								name='ArrowRight'
								size={16}
								className='ml-2 group-hover:animate-slideInOut'
							/>
						</Button>
					</Link>
				</div>
			)}
		</section>
	);
};

export default Section;
