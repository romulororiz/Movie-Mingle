import { FC } from 'react';

interface SkeletonHeaderProps {}

const SkeletonHeader: FC<SkeletonHeaderProps> = ({}) => {
	return (
		<header className='relative overflow-hidden h-[750px] ml-0 md:ml-64 bg-gray-500 animate-pulse'>
			<div className='absolute inset-0 bg-gradient-to-b from-transparent from-35% via-dark-background via-[80%] to-dark-background'></div>
			<div className='absolute top-[40%] left-0 right-0 container w-full flex flex-col items-start gap-4 max-w-7xl md:top-[40%] opacity-80 max-h-[300px]'>
				<div className='w-[50%] h-8 bg-gray-400 rounded animate-pulse'></div>
				<div className='w-[50%] h-5 bg-gray-400 rounded animate-pulse'></div>
				<div className='w-[30%] h-5 bg-gray-400 rounded animate-pulse'></div>
			</div>
		</header>
	);
};

export default SkeletonHeader;
