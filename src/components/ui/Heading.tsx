import { FC, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const headingVariants = cva(
	'text-white dark:text-white font-semibold tracking-tighter',
	{
		variants: {
			size: {
				default: 'text-2xl lg:text-3xl',
				sm: 'text-3xl lg:text-4xl',
				lg: 'text-5xl md:text-6xl lg:text-7xl',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	}
);

type HeadingLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps<T extends HeadingLevels>
	extends HTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof headingVariants> {
	element: T;
	title: string;
}

const Heading: FC<HeadingProps<any>> = ({
	element: Element,
	className,
	size,
	title,
	...props
}) => {
	return (
		<Element className={cn(headingVariants({ size }), className)} {...props}>
			{title}
		</Element>
	);
};

export default Heading;
