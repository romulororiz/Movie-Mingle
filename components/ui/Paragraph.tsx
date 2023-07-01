import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const paragraphVariants = cva('text-center max-w-prose leading-3', {
	variants: {
		size: {
			default: 'text-md sm:text-lg',
			lg: 'text-lg md:text-xl',
			md: 'text-sm md:text-md lg:text-lg',
			sm: 'text-sm md:text-base',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

interface ParagraphProps
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof paragraphVariants> {}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
	({ className, size, children, ...props }, ref) => {
		return (
			<p
				ref={ref}
				{...props}
				className={cn(paragraphVariants({ size, className }))}
			>
				{children}
			</p>
		);
	}
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
