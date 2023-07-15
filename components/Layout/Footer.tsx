import { FC } from 'react';
import { Paragraph } from '../ui';
import Image from 'next/image';
import Link from 'next/link';
import Social from '../ui/Social';
import { ThemeToggle } from './ThemeToggle';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
	return (
		<>
			<div
				style={{ backgroundImage: 'url(/assets/footer-bg.jpg)' }}
				className='h-auto py-16 bg-cover bg-center bg-no-repeat relative z-[100]'
			>
				<div className='max-w-[1340px] container relative'>
					<div className='flex flex-col-reverse md:flex-row items-center justify-between h-full gap-y-4 md:gap-0'>
						<div className='flex-shrink-0'>
							<Link href='/'>
								<Image
									src='/assets/logo.svg'
									width={160}
									height={100}
									alt='logo'
								/>
							</Link>
						</div>
						<Social />
					</div>
				</div>
			</div>
			<div className='container max-w-[1340px] p-8 py-6'>
				<Paragraph className='text-[10px] md:text-xs max-w-none' size='sm'>
					© {new Date().getFullYear()}{' '}
					<span className='text-accent-primary'>Romulo Roriz</span>. All Rights
					Reserved.
				</Paragraph>
			</div>
		</>
	);
};

export default Footer;
