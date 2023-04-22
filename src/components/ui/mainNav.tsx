'use client';

import * as React from 'react';
import { MainNavItem } from '@/types';
import Link from 'next/link';
import Heading from './Heading';
import useScrollPosition from '@/hooks/useScrollPosition';
import { useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/utils/cn';

interface mainNavProps {
	items?: MainNavItem[];
}

export function MainNav({ items }: mainNavProps) {
	const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

	const segment = useSelectedLayoutSegment();
	const scrollPosition = useScrollPosition();

	return (
		<div className='flex bg-red-500'>
			<Link href='/' className='flex relative font-bold text-slate-200'>
				<Heading element='h1' className='text-4xl' title='LOGO' />
			</Link>

			{items?.length && <nav className='flex bg-green transition'>
                    
                </nav>}
		</div>
	);
}
