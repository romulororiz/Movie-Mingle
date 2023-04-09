import { getPopularMovies } from '@/helpers/tmdb';
import { authOptions } from '@/lib/auth';
import { isMovieResponse } from '@/utils/typeGuards';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MovieCard from '../ui/MovieCard';
import Section from './Section';

export const Header = async () => {
	const session = await getServerSession(authOptions);

	if (!session || !session.user.image) return notFound();

	const { data } = await getPopularMovies();
	if (!data || data.results === null) return notFound();

	// todo - ADD SWIPER AND CHANGE BACKGROUND IMAGE AUTOMATICALLY ON AUTOPLAY - SELECT NEXT IMAGE ON AUTOPLAY AND CHANGE BACKGROUND IMAGE TO THAT IMAGE

	return (
		<header
			className='h-[80vh] relative bg-cover bg-no-repeat bg-[center_-120px]'
			// add to classname cn fun
			style={{
				backgroundImage: `url(https://image.tmdb.org/t/p/original${
					isMovieResponse(data.results) && data.results[1].backdrop_path
				})`,
			}}
		>
			<div className='absolute inset-0 bg-gradient-to-b from-transparent from-45% via-dark-background via-85% to-dark-background'></div>
			<div className='h-20 bg-dark-background/50 backdrop-blur-sm flex justify-between items-center z-50 relative'>
				<div className='container flex justify-between items-center sm:flex-row sm:justify-between max-w-7xl'>
					{/* logo - CHANGES PENDENT */}
					<Link
						href='/'
						className='flex relative font-bold text-accent-default '
					>
						<h1 className='text-4xl'>MOVIE</h1>
						<small className='text-lg absolute -right-[4rem] bottom-0'>
							Mingle
						</small>
					</Link>

					<div className='flex justify-between items-center gap-8 h-full'>
						{/* Search Input Component */}
						<h1 className='hidden sm:flex bg-red-500'>Search Input</h1>

						{/* User Area */}
						{session ? (
							<div className='gap-4 hidden sm:flex sm:items-center sm:justify-center'>
								{/* <div className='flex-col text-right'>
									<h1>{session?.user.name}</h1>
									<h1>settings</h1>
								</div> */}
								<Image
									src={session.user.image}
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
			<Section
				icon='Flame'
				size={32}
				title='Recommended 4 u' // change upon user preferences
				className='absolute top-[65vh] left-0 right-0 z-50 max-w-[1600px] mx-auto'
			>
				{isMovieResponse(data.results) && (
					<div className='grid grid-cols-5 gap-4 relative'>
						{data.results
							.map(movie => (
								<MovieCard key={`movie-${movie.id}`} movie={movie} />
							))
							.slice(0, 5)}
					</div>
				)}
			</Section>
		</header>
	);
};
