import { FC, HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLDivElement> {}

const Section: FC<SectionProps> = ({ children, className, ...props }) => {
	return (
		// will have swiiper and be set to auto play
		<section className={className} {...props}>
			{children}
		</section>
	);
};

export default Section;
