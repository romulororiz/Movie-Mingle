'use client';

import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/Icon';
import { forwardRef } from 'react';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const windowSize: WindowSize = useWindowSize();

		return (
			<div className='relative'>
				<Icon
					name='Search'
					color='#FFF'
					size={18}
					className={cn('absolute top-2 right-2.5 md:right-3 z-10')}
				/>
				<input
					className={cn(
						'flex w-60 h-6 rounded-full border-2 border-primaryAccent-default/20 focus-within:border-primaryAccent-default transition bg-dark-background/40 backdrop-blur-sm truncate pl-4 pr-9 py-4 text-sm placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none',
						className
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
Input.displayName = 'Input';

export default Input;
