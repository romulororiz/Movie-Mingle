'use client';
import { cn } from '@/utils/cn';
import { forwardRef } from 'react';
import Icon from '../Icon';
import { isMobile } from '@/utils/breakpoints';
import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';

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
						'flex w-60 h-8 rounded-lg border border-accent-default bg-dark-background/50 backdrop-blur-sm truncate pl-4 pr-9 py-4 text-sm placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none',
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

export { Input };
