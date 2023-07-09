import { FC } from 'react';
import { Icon } from '@/components/Icon';
import { cn } from '@/lib/utils';

interface LoadMoreProps {
	fetchNextPage: () => void;
	isFetchingNextPage: boolean;
}

const LoadMore: FC<LoadMoreProps> = ({ fetchNextPage, isFetchingNextPage }) => {
	return (
		<div
			className='w-fit rounded-full bg-accent-primary absolute -bottom-14 inset-x-0 mx-auto cursor-pointer hover:scale-105 duration-300 p-1'
			onClick={() => fetchNextPage()}
		>
			<Icon
				name={isFetchingNextPage ? 'Loader2' : 'ChevronDown'}
				color='#030e13'
				className={cn('transition', isFetchingNextPage ? 'animate-spin' : '')}
				size={25}
			/>
		</div>
	);
};

export default LoadMore;
