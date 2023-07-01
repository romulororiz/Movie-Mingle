import { cn } from '@/lib/utils';
import { Icon } from '@/components/Icon';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

const headingVariants = cva(
	'flex items-center text-white font-semibold tracking-tighter',
	{
		variants: {
			size: {
				default: 'text-2xl md:text-3xl',
				lg: 'text-2xl lg:text-3xl',
				md: 'text-md md:text-lg',
				sm: 'text-sm md:text-md',
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
	title?: string;
	icon?: string;
	color?: string;
}

const getAriaLevel = (element: HeadingLevels) => {
	return +element.replace('h', '');
};

const Heading: FC<HeadingProps<any>> = ({
	element: Element,
	className,
	size,
	title,
	icon,
	color,
	...props
}) => {
	return (
		<Element
			className={cn(headingVariants({ size, className }))}
			{...props}
			aria-level={getAriaLevel(Element)}
		>
			{icon && <Icon name={icon} color={color} className='mr-2' />}
			{title}
		</Element>
	);
};

export default Heading;
