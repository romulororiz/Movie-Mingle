import { Icon } from '@/components/Icon';
import { MovieResponse } from '@/types/tmdb';
import { createSlug, formatDate, slugify } from '@/utils/formaters';
import { Ratings, SeeMore, Heading, Paragraph } from '@/components/ui';

interface MovieInfoHeroProps {
	movie: MovieResponse;
}

const MovieInfoHero = ({ movie }: MovieInfoHeroProps) => {
	return (
		<div className='gap-2 text-slate-100/80 absolute md:max-w-7xl left-0 right-0 md:container p-6 md:backdrop-blur-0 backdrop-blur-sm bg-dark-background/75 md:bg-transparent bottom-0 md:top-[25%] flex flex-col justify-between h-fit md:h-[230px] w-auto z-50'>
			<Heading
				element='h1'
				title={movie.title}
				className=' text-slate-100/80 text-lg md:text-xl lg:text-3xl font-semibold text-primaryAccent-default'
			/>
			<div className='flex flex-col max-w-lg md:gap-1 font-light md:font-normal'>
				<Paragraph
					className='text-justify line-clamp-3 md:line-clamp-4'
					size='sm'
				>
					{movie.overview}
				</Paragraph>
				<div className='flex justify-between md:justify-start gap-4 md:gap-8 mt-2'>
					<div className='flex gap-3 md:gap-5 items-center'>
						<span className='flex items-center gap-1 text-sm md:text-md'>
							<Icon name='Calendar' size={16} />
							{formatDate(movie.release_date.toString(), 'MMM yyyy')}
						</span>
						<Ratings movie={movie} className='flex items-center gap-2' />
					</div>
					<SeeMore
						isSection={false}
						route={createSlug(movie) || '/'}
						icon={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default MovieInfoHero;
