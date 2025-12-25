import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-background active:scale-[0.98]',
	{
		variants: {
			variant: {
				default: 'bg-accent-primary text-zinc-950 hover:bg-accent-primary/90',
				destructive: 'bg-red-600 text-white hover:bg-red-700',
				outline:
					'border border-accent-primary/50 bg-transparent text-accent-primary hover:bg-accent-primary/10 hover:border-accent-primary',
				subtle:
					'bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20 border border-accent-primary/20',
				ghost: 'bg-transparent text-gray-300 hover:text-white hover:bg-white/5',
				link: 'bg-transparent text-accent-primary underline-offset-4 hover:underline p-0 h-auto',
				secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700 border border-gray-700',
			},
			size: {
				default: 'h-10 px-5 py-2',
				lg: 'h-12 px-6 py-3 text-base',
				md: 'h-9 px-4 py-2',
				sm: 'h-8 px-3 py-1.5 text-xs',
				icon: 'h-10 w-10 p-0',
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
				disabled={isLoading || props.disabled}
				{...props}
			>
				{isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
				{children}
			</button>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
