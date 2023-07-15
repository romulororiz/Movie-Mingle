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
				className='h-auto py-8 md:py-16 bg-cover bg-center bg-no-repeat relative z-[100]'
			>
				{/* <Overlay className='bg-dark-background/40' /> */}
				<div className='max-w-[1340px] container relative'>
					<div className='gap-5 flex flex-col items-center justify-between h-full md:hidden'>
						{/* <ThemeToggle /> */}
						<Social />
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
					</div>
					<div className='hidden items-center justify-between h-full md:flex'>
						{/* <ThemeToggle /> */}
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
