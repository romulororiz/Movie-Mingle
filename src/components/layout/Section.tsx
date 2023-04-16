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
	route,
	...props
}) => {
	const sectionVariants = cva(
		cn('mx-auto max-w-7xl container', {
			'max-w-[1536px]': !container,
		})
	);

	return (
		// will have swiper and be set to auto play
		<section className={cn(sectionVariants({ className }))} {...props}>
			{/* see more on top of slider */}

			<div
				className={cn(
					'flex justify-between max-w-7xl mx-auto z-[70] mb-5 relative'
				)}
			>
				<Heading
					title={title}
					element='h1'
					icon={icon}
					className={cn('flex',{
						'absolute -top-7 md:top-5': !container,
					})}
				/>

				{seeMore && (
					<div
						className={cn(
							'absolute flex justify-end max-w-7xl mx-auto left-0 right-0',
							{
								'-top-8 md:top-5': !container,
							}
						)}
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
			</div>

			<div
				className={cn({
					'flex flex-wrap justify-start gap-x-6 gap-y-[5rem] relative':
						container,
					'flex-nowrap overflow-x-auto': !container,
				})}
			>
				{children}
			</div>
		</section>
	);
};

export default Section;
