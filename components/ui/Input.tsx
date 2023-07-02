'use client';

import { Icon } from '@/components/Icon';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<div className='relative group'>
				<Icon
					name='Search'
					color='#FFF'
					size={16}
					className={
						'absolute top-2.5 left-2.5 md:right-3 z-10 stroke-accent-secondary group-focus-within:stroke-accent-primary transition'
					}
				/>
				<input
					className={cn(
						'flex w-60 h-6 rounded-full border-2 focus-within:placeholder:text-slate-200 border-accent-primary/20 focus-within:border-accent-secondary transition bg-dark-background/40 pl-8 pr-9 py-4 text-sm placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none',
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
