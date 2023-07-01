import { FC } from 'react';
import { Overlay } from '../ui';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
	return (
		<div
			style={{ backgroundImage: 'url(/assets/footer-bg.jpg)' }}
			className='h-[300px] bg-cover bg-center bg-no-repeat relative z-[100]'
		>
			<Overlay className='bg-dark-background/40' />
			<div className='container max-w-7xl'>Footer</div>
		</div>
	);
};

export default Footer;
