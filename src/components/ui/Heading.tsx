import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

const headingVariants = cva(
	'text-white dark:text-white font-semibold tracking-tighter',
	{
		variants: {
			size: {
				default: 'text-xl md:text-2xl lg:text-3xl',
				small: 'text-sm md:text-base lg:text-lg',
				medium: 'text-lg md:text-xl lg:text-2xl',
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
