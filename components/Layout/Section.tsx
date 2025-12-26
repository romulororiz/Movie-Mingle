import { Heading, SeeMore } from '@/components/ui';
import { cn } from '@/lib/utils';
import { FC, HTMLAttributes } from 'react';

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
	return (
		<section
			className={cn(
				'mx-auto max-w-[85rem] w-full relative z-[2]',
				!container ? 'md:max-w-[95rem]' : 'container',
				className
			)}
		>
			<div
				className={cn(
					'flex justify-center md:justify-between max-w-7xl mx-auto z-[70] mb-5 relative ',
					{
						'px-[2rem] mx-auto top-0 md:top-8 mb-2': !container,
					}
				)}
			>
				<Heading title={title} element="h1" size="lg" icon={icon} />

				{/* top see more - icon hidden on mobile via CSS */}
				{seeMore && (
					<SeeMore
						route={route}
						isSection={true}
						icon={true}
						className={cn('w-fit md:flex hidden', {
							hidden: !container,
						})}
					/>
				)}
			</div>

			<div
				className={
					container
						? cn('grid gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10', {
								'grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4': container && !isActor,
								'grid-cols-2 xs:grid-cols-3 lg:grid-cols-6': container && isActor,
						  })
						: ''
				}
			>
				{children}
			</div>

			{/* bottom see more mobile */}
			{seeMore && container && (
				<SeeMore
					route={route}
					isSection={true}
					icon={false}
					className={cn('flex justify-center mt-8 md:hidden')}
				/>
			)}
		</section>
	);
};

export default Section;
