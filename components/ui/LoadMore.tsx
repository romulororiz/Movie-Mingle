import { FC } from 'react';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/utils';

interface LoadMoreProps {
	hasNextPage?: boolean;
	fetchNextPage?: () => void;
	isFetchingNextPage?: boolean;
	setIsCollapse?: React.Dispatch<React.SetStateAction<boolean>>;
	isCollapse?: boolean;
}

const LoadMore: FC<LoadMoreProps> = ({
	hasNextPage,
	fetchNextPage,
	setIsCollapse,
	isCollapse,
	isFetchingNextPage,
}) => {
	if (!hasNextPage) return null;

	return (
		<div
			className='w-fit rounded-full bg-accent-primary absolute -bottom-14 inset-x-0 mx-auto cursor-pointer hover:scale-105 duration-300 p-[2px]'
			onClick={
				fetchNextPage
					? () => fetchNextPage()
					: setIsCollapse
					? () => setIsCollapse(prev => !prev)
					: () => {}
			}
		>
			<Icon
				name={isFetchingNextPage ? 'Loader2' : 'ChevronDown'}
				color='#030e13'
				className={cn(
					'transition',
					isFetchingNextPage ? 'animate-spin' : '',
					isCollapse ? 'rotate-180' : ''
				)}
				size={25}
			/>
		</div>
	);
};

export default LoadMore;
