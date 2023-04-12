'use client';
import Section from '@/components/layout/Section';
import ActorCard from '@/components/ui/ActorCard';
import MovieCard from '@/components/ui/MovieCard';
import useTMDB from '@/hooks/useTMDB';
import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { actorCardPerView } from '@/utils/cardPerView';
import { isMovieResponse, isPeopleResponse } from '@/utils/typeGuards';

const Home = () => {
	const {
		data: { popularActors, topRated, nowPlaying, upcoming },
	} = useTMDB();

	const windowSize: WindowSize = useWindowSize();

	return (
		<>
			<Section
				icon='TrendingUp'
				className='mt-[10rem] md:mt-[8rem]'
				title='Popular Actors'
			>
				{popularActors && isPeopleResponse(popularActors) && (
					<div
						className='
						flex flex-wrap lg:flex-nowrap justify-start gap-4 relative mx-auto max-w-7xl
					'
					>
						{popularActors
							.map(actor => (
								<ActorCard key={`actor-${actor.id}`} actor={actor} />
							))
							.slice(0, actorCardPerView(windowSize))}
					</div>
				)}
			</Section>

			<Section
				icon='Flame'
				className='mt-16 md:mt-24'
				title='Trending this week'
			>
				{isMovieResponse(nowPlaying) && (
					<div className='flex flex-wrap justify-start gap-4 relative mx-auto max-w-7xl'>
						{nowPlaying
							.map(movie => (
								<MovieCard
									key={`actor-${movie.id}`}
									movie={movie}
									size='large'
								/>
							))
							.slice(0, 5)}
					</div>
				)}
			</Section>

			<Section
				icon='Clapperboard'
				className='mt-16 md:mt-24'
				title='Coming up next'
			>
				{isMovieResponse(upcoming) && (
					<div className='flex flex-wrap justify-start gap-4 relative mx-auto max-w-7xl'>
						{upcoming
							.map(movie => (
								<MovieCard
									key={`actor-${movie.id}`}
									movie={movie}
									size='large'
								/>
							))
							.slice(0, 5)}
					</div>
				)}
			</Section>

			<Section
				icon='Star'
				className='mt-16 md:mt-24 mb-24'
				title='Best of the best'
			>
				{isMovieResponse(topRated) && (
					<div className='flex flex-wrap justify-start gap-4 relative mx-auto max-w-7xl'>
						{topRated
							.map(movie => (
								<MovieCard
									key={`actor-${movie.id}`}
									movie={movie}
									size='large'
								/>
							))
							.slice(0, 5)}
					</div>
				)}
			</Section>
		</>
	);
};

// export const getStaticProps: GetStaticProps = async () => {
// 	const { data: popularActors } = await getPopularActors();
// 	const { data: topRatedMovies } = await getTopRatedMovies();
// 	const { data: nowPlayingMovies } = await getNowPlayingMovies();
// 	const { data: upcomingMovies } = await getUpcomingMovies();
// 	const { data: popularMovies } = await getPopularMovies();

export default Home;
