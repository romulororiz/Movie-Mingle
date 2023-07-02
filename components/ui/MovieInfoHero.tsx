import { Icon } from '@/components/Icon';
import { MovieResponse } from '@/types/tmdb';
import { createSlug, formatDate } from '@/lib/utils';
import { Ratings, SeeMore, Heading, Paragraph } from '@/components/ui';

interface MovieInfoHeroProps {
	movie: MovieResponse;
}

const MovieInfoHero = ({ movie }: MovieInfoHeroProps) => {
	return (
		<div className='gap-2 text-slate-200 absolute md:max-w-7xl inset-x-0 md:container md:top-[22%] flex flex-col justify-between h-fit md:min-h-min w-auto z-50'>
			<Heading
				element='h1'
				title={movie.title}
				className='text-lg md:text-xl lg:text-3xl font-semibold text-accent-primary'
			/>
			<div className='flex flex-col max-w-lg md:gap-1 font-light'>
				<Paragraph className='text-justify font-normal line-clamp-3' size='sm'>
					{movie.overview}
				</Paragraph>
				<div className='flex mt-2'>
					<div className='flex md:gap-1 items-center w-[200px]'>
						<span className='flex items-center gap-1 font-normal text-sm md:text-md w-[100px]'>
							<Icon name='Calendar' size={16} />
							{formatDate(movie.release_date.toString())}
						</span>
						<Ratings movie={movie} className='flex items-center gap-2' />
					</div>
					<SeeMore
						isSection={false}
						icon={true}
						route={createSlug(movie) || '/'}
					/>
				</div>
			</div>
		</div>
	);
};

export default MovieInfoHero;
