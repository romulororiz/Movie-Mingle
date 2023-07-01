import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const buttonVariants = cva(
	'active:scale-95 shadow-[-1px_11px_12px_-8px_rgba(0,0,0,0.25)] active:shadow-none inline-flex items-center justify-center rounded-full text-sm font-medium transition-all disabled:pointer-events-none',
	{
		variants: {
			variant: {
				default:
					'bg-accent-primary text-dark-background active:bg-accent-secondary',
				destructive: 'bg-red-500 text-dark-primary hover:bg-red-600',
				outline:
					'bg-transparent text-accent-primary hover:text-dark-background border-2 border-accent-primary hover:border-accent-primary hover:bg-accent-primary',
				subtle:
					'bg-accent-primary bg-opacity-20 text-dark-background hover:bg-opacity-100',
				ghost: 'bg-transparent hover:text-accent-primary',
				link: 'bg-transparent underline-offset-4 hover:text-accent-primary shadow-none',
			},
			size: {
				default: 'h-10 py-2 px-4',
				lg: 'h-11 py-6 px-8',
				md: 'h-9 py-4 px-6',
				sm: 'h-8 py-2 px-4',
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
