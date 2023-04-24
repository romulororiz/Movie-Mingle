'use client';

import useWindowSize from '@/hooks/useWindowSize';
import { cn } from '@/lib/utils';
import { isTablet } from '@/utils/breakpoints';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { FC, Fragment, useEffect, useState } from 'react';
import Heading from './Heading';
import Icon from '../Icon';

interface HambugerMenuProps {
	isOpen: boolean;
	iconName: string;
	openModal?: () => void;
	closeModal?: () => void;
}

export function HamburgerMenu({
	isOpen,
	openModal,
	closeModal,
	iconName,
}: HambugerMenuProps) {
	return (
		<div
			className='cursor-pointer flex items-center justify-center'
			onClick={isOpen ? closeModal : openModal}
		>
			<span className='sr-only'>{isOpen ? 'Close menu' : 'Open menu'}</span>
			<Icon name={iconName} color='#fff' size={30} />
		</div>
	);
}

const MobileNav = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const windowSize = useWindowSize();

	useEffect(() => {
		if (!isTablet(windowSize)) {
			setIsOpen(false);
		}
	}, [windowSize]);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<HamburgerMenu isOpen={isOpen} openModal={openModal} iconName='Menu' />

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' onClose={closeModal} className='relative z-[100]'>
					<Transition.Child
						as={Fragment}
						enter='ease-out'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-dark-background/90'></div>
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div
							className={cn(
								'min-h-full flex justify-end text-center w-full transform overflow-hidden shadow-xl transition-all'
							)}
						>
							<Transition.Child
								as={Fragment}
								enter='ease-out '
								enterFrom='translate-x-[90%] opacity-0'
								enterTo='translate-x-0 opacity-100'
								leave='ease-in'
								leaveFrom='translate-x-0 opacity-100'
								leaveTo='translate-x-full opacity-0'
							>
								<Dialog.Panel className='w-80 h-screen max-w-md overflow-hidden bg-dark-background backdrop-blur-lg p-6 text-left align-middle shadow-black shadow-xl transition-all'>
									<Dialog.Title className='flex items-center justify-between'>
										<Link href='/'>
											<Heading element='h1' title='LOGO' size='large' />
										</Link>
										<HamburgerMenu
											isOpen={isOpen}
											closeModal={closeModal}
											iconName='Close'
										/>
									</Dialog.Title>
									<div className='mt-10'>
										<p className='text-sm text-gray-500'>
											Your payment has been successfully submitted. We’ve sent
											you an email with all of the details of your order.
										</p>
									</div>

									<div className='mt-4'>
										<button
											type='button'
											className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
											onClick={closeModal}
										>
											Got it, thanks!
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default MobileNav;
