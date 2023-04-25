import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const buttonVariants = cva(
	'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-all disabled:pointer-events-none',
	{
		variants: {
			variant: {
				default:
					'bg-primaryAccent-default text-dark-primary hover:bg-opacity-80',
				destructive: 'bg-red-500 text-dark-primary hover:bg-red-600',
				outline:
					'bg-transparent text-slate-100 hover:text-dark-background border-2 border-primaryAccent-default hover:border-primaryAccent-default hover:bg-primaryAccent-default',
				subtle:
					'bg-dark-background text-primaryAccent-default hover:bg-opacity-20',
				ghost: 'bg-transparent hover:text-primaryAccent-default',
				link: 'bg-transparent underline-offset-4 hover:underline text-primaryAccent-default hover:bg-transparent',
			},
			size: {
				default: 'h-10 py-2 px-4',
				sm: 'h-9 px-4',
				lg: 'h-11 px-8',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant, isLoading, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				disabled={isLoading}
				{...props}
			>
				{children}
				{isLoading ? <Loader2 className='ml-2 h-4 w-4 animate-spin' /> : null}
			</button>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
