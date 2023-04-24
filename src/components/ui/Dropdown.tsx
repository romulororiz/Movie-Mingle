'use Client';

import { cn } from '@/lib/utils';
import { MainNavItem } from '@/types';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Icon from '../Icon';
import { usePathname } from 'next/navigation';
import Heading from './Heading';
import Link from 'next/link';

interface DropdownProps {
	item?: MainNavItem;
	key?: number | string;
	menuBtnClassName?: string;
	menuItemsClassName?: string;
	linkClassName?: string;
	linkActiveHoverClassName?: string;
	linkLabelClassName?: string;
	linkLabelActiveClassName?: string;
	icon?: boolean;
}

export function Dropdown({
	item,
	menuItemsClassName,
	linkClassName,
	linkActiveHoverClassName,
	linkLabelClassName,
	linkLabelActiveClassName,
	icon = true,
}: DropdownProps) {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const route = usePathname();

	if (!item) return null;

	return (
		<Menu as='div' className='relative inline-block text-left'>
			<Menu.Button
				onClick={() => setMenuOpen(!menuOpen)}
				className='inline-flex w-full justify-center items-center text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
			>
				<Heading
					element='h2'
					size='small'
					title={item.section.toUpperCase()}
					className='group transition hover:text-primaryAccent-default font-normal'
				/>
				<Icon
					name={menuOpen ? 'ChevronUp' : 'ChevronDown'}
					aria-hidden='true'
					size={16}
					className='ml-1 group group-hover:stroke-primaryAccent-default'
				/>
			</Menu.Button>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items
					className={cn(
						'absolute mt-2 p-2 w-56 space-y-1  flex flex-col origin-top-left left-0 rounded-lg shadow-md shadow-black ring-1 ring-black ring-opacity-5 focus:outline-none',
						menuItemsClassName
					)}
				>
					{item?.navItems.map((navItem, index) => (
						<Menu.Item key={index}>
							{({ active }) => (
								<Link
									href={navItem.href}
									className={cn(
										'p-2 rounded-md flex items-center transition duration-75 w-fit',
										active && linkActiveHoverClassName,
										linkClassName
									)}
									onClick={() => setMenuOpen(false)}
								>
									<span
										className={cn(
											'text-sm md:text-md flex items-center gap-2',
											route === navItem.href && linkLabelActiveClassName,
											linkLabelClassName
										)}
									>
										{icon && <Icon name={navItem.icon} size={16} />}
										{navItem.title}
									</span>
								</Link>
							)}
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
}

export default Dropdown;
