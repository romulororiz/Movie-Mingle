import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const buttonVariants = cva(
	'active:scale-95 inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background',
	{
		variants: {
			variant: {
				default:
					'bg-accent-primary text-zinc-950 hover:bg-accent-secondary shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/40',
				destructive: 
					'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30',
				outline:
					'bg-transparent text-accent-primary hover:text-zinc-950 border-2 border-accent-primary hover:bg-accent-primary backdrop-blur-sm hover:shadow-lg hover:shadow-accent-primary/20',
				subtle:
					'bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20 backdrop-blur-sm border border-accent-primary/20',
				ghost: 
					'bg-transparent text-gray-300 hover:text-accent-primary hover:bg-accent-primary/10',
				link: 
					'bg-transparent text-accent-primary underline-offset-4 hover:underline shadow-none',
			},
			size: {
				default: 'h-11 px-6 py-2',
				lg: 'h-13 px-8 py-3 text-base',
				md: 'h-10 px-5 py-2',
				sm: 'h-9 px-4 py-1.5 text-xs',
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
				{isLoading ? <Loader2 className='max-w-max ml-2 h-4 w-4 animate-spin' /> : null}
			</button>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
