import { getPopularMovies, getPopularPeople } from '@/helpers/tmdb';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Section from './Section';

export const Header = async () => {
	const session = await getServerSession(authOptions);
	if (!session) return notFound();

	const { data } = await getPopularMovies();
	if (!data || data.results === null) return notFound();

	return (
		<header
			className='h-[80vh] relative bg-cover bg-no-repeat bg-[center_-100px]'
			// add to classname cn fun
			style={{
				backgroundImage: `url(https://image.tmdb.org/t/p/original${data.results[1].backdrop_path})`,
			}}
		>
			<div className='absolute inset-0 bg-gradient-to-b from-transparent from-45% via-dark-background via-80% to-dark-background'></div>
			<div className='h-20 bg-dark-background/50 backdrop-blur-sm flex justify-between items-center z-50 relative'>
				<div className='container flex justify-between items-center sm:flex-row sm:justify-between max-w-7xl'>
					{/* logo */}
					<Link href='/' className='flex relative font-bold '>
						<h1 className='text-4xl'>MOVIE</h1>
						<small className='text-lg absolute -right-[4rem] bottom-0'>
							Mingle
						</small>
					</Link>

					<div className='flex justify-between items-center gap-8 h-full'>
						{/* Search Input */}
						<h1 className='hidden sm:flex bg-red-500'>Search Input</h1>

						{/* User Area */}
						{session ? (
							<div className='gap-4 hidden sm:flex sm:items-center sm:justify-center'>
								{/* <div className='flex-col text-right'>
									<h1>{session?.user.name}</h1>
									<h1>settings</h1>
								</div> */}
								<Image
									src={`${session.user.image}`}
									alt={`${session.user.name} profile picture`}
									width={60}
									height={60}
									className='rounded-full'
									quality={100}
								/>
							</div>
						) : (
							<div className='gap-3 hidden sm:flex sm:items-center sm:justify-center'>
								{/* Sign In Button */}
								<h1>Sign In</h1>
							</div>
						)}
					</div>
					{/* Hamburger menu */}
					<div className='sm:hidden'>
						<h1>mobmenu</h1>
						{/* with search input */}
					</div>
				</div>
			</div>
			<Section className='absolute top-[60vh] left-0 right-0 z-50 max-w-[1600px] mx-auto'>
				{/* Heading Component @todo */}
				<div className='max-w-7xl container mb-6'>
					<h1 className='uppercase text-3xl'>Recommended</h1>
				</div>
				{/* Card Section / Card Component */}
				<div className='grid grid-cols-5 gap-4 relative'>
					{data.results
						.map(movie => (
							// Will be a card component
							<div
								key={movie.id}
								// adjust width and height to match the image when moving to its own component
								className='min-w-[200px] h-[300px] bg-cover bg-no-repeat bg-center cursor-pointer rounded-3xl relative after:border-2 after:border-transparent
								after:content after:rounded-3xl after:absolute after:inset-0 after:bg-dark-background/20 hover:after:bg-transparent after:transition after:hover:border-accent-default'
								style={{
									backgroundImage: `
						url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
					`,
								}}
							>
								<h1 className='text-center'>{movie.title}</h1>
							</div>
						))
						.slice(10, 15)}

					<div className='absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-dark-background from-0% via-dark-background via-40% to-transparent'></div>
					<div className='absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-dark-background via-dark-background to-transparent'></div>
				</div>
			</Section>
		</header>
	);
};
