'use client';

import { socialLinks } from '@/config/footer';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Icon } from '@/components/Icon';
import { isMobile, isTablet } from '@/utils/breakpoints';
import { useWindowSize } from 'usehooks-ts';
import { Paragraph } from '../ui';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
	const windowSize = useWindowSize();

	return (
		<>
			<div
				style={{ backgroundImage: 'url(/assets/footer-bg.jpg)' }}
				className='h-auto py-16 bg-cover bg-center bg-no-repeat relative z-[100]'
			>
				{/* <Overlay className='bg-dark-background/40' /> */}
				<div className='max-w-[1340px] container relative'>
					<div className='gap-8 flex flex-col xs:flex-row items-center justify-between h-full'>
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
						<div className='flex gap-3 xs:gap-5'>
							{socialLinks.map((link, i) => (
								<a
									key={i}
									href={link.url}
									target='_blank'
									rel='noopener noreferrer'
									className=''
								>
									<Icon
										name={link.name}
										size={isTablet(windowSize) ? 24 : 26}
										className='transition-all duration-200 hover:stroke-accent-secondary'
									/>
								</a>
							))}
						</div>
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
