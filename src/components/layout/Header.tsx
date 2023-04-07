import Link from 'next/link';

export const Header = async () => {
	return (
		<header className='bg-blue-500 h-20'>
			<div className='container flex justify-between items-center sm:flex-row sm:justify-between h-full'>
				<Link href='/'>LOGO</Link>

				{/* Search Input */}
				<h1 className='hidden sm:flex'>Search Input</h1>

				{/* User Area */}
				<div className='gap-3 hidden sm:flex'>
					<h1>username</h1>
					<h1>avatar</h1>
				</div>

				{/* Hamburger menu */}
				<div className='sm:hidden'>
					<h1>mob. menu</h1>
					<h1>Search Input</h1>
				</div>
			</div>
		</header>
	);
};
