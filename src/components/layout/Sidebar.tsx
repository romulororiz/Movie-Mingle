import { cn } from '@/utils/cn';
import { navItems } from '@/config/header';
import Link from 'next/link';
import Icon from '../Icon';
import NavItem from '../ui/sidebar/NavItem';
import Heading from '../ui/Heading';

export const Sidebar = () => {
	return (
		<aside
			className={cn(
				'transition duration-200 ease-linear fixed top-0 z-[100] w-64 h-screen bg-dark-background backdrop-blur-lg hidden md:block py-8'
			)}
		>
			{/* //todo create component burger menu */}
			<div className='container px-6 flex flex-col gap-8 w-full '>
				{/* logo - CHANGES PENDENT */}
				<Link
					href='/'
					className='flex relative font-bold text-primaryAccent-default '
				>
					<h1 className='text-4xl'>MOVIE</h1>
					<small className='text-lg absolute right-14 -bottom-5'>Mingle</small>
				</Link>

				<div className='mt-12 flex flex-col h-full gap-y-12 '>
					{navItems.map((item, index) => (
						<div key={index}>
							<Heading
								element='h3'
								size='medium'
								title={item.section}
								className='mb-5 text-slate-200'
							/>
							<div className='flex flex-col gap-4 text-slate-300'>
								{item.items.map((item, index) => (
									<NavItem
										key={`item-${index}`}
										title={item.title}
										icon={item.icon}
										path={item.path}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
};
