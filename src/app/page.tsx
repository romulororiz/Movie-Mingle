import Section from '@/components/layout/Section';
import ActorCard from '@/components/ui/ActorCard';
import { getPopularActors } from '@/helpers/tmdb';
import { isPeopleResponse } from '@/utils/typeGuards';
import { notFound } from 'next/navigation';
// create icons component

export default async function Home() {
	const { data: peopleData, error } = await getPopularActors();

	if (error) return <h1>error</h1>;

	if (!peopleData || !peopleData.results) return notFound();

	return (
		<main className='mx-auto max-w-7xl'>
			<Section
				icon='TrendingUp'
				size={32}
				className='mt-52'
				title='Trending Actors'
			>
				{isPeopleResponse(peopleData.results) && (
					<div className='grid grid-cols-6 gap-4 relative'>
						{peopleData.results
							.map(actor => (
								<ActorCard key={`actor-${actor.id}`} actor={actor} />
							))
							.slice(0, 6)}
					</div>
				)}
			</Section>
		</main>
	);
}
