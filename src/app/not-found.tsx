import Icon from '@/components/Icon';
import Heading from '@/components/ui/Heading';
import Link from 'next/link';
import { FC } from 'react';

import type { Metadata } from 'next';

// export const metadata: Metadata = {
// 	title: 'Similarity API | Page not found',
// 	description: 'Free & open-source text similarity API',
// };

const PageNotFound: FC = () => {
	return (
		<section className='container pt-32 max-w-7xl mx-auto text-center flex flex-col gap-6 items-center'>
			<Heading element='h1' title='Site not found...' />
			<p>The site you&apos;re searching for does not exist.</p>
			<Link href='/'>
				<Icon name='ChevronLeft' />
				Back to home
			</Link>
		</section>
	);
};

export default PageNotFound;
