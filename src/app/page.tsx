import Section from '@/components/layout/Section';

export default function Home() {
	const popActors = [
		{
			name: 'Tom Cruise',
			image: 'https://image.tmdb.org/t/p/w500/3W0v956XxSG5xgm7LB6qu8ExYJ2.jpg',
			id: 500,
		},
		{
			name: 'Tom Hanks',
			image: 'https://image.tmdb.org/t/p/w500/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
			id: 819,
		},
		{
			name: 'Tom Hardy',
			image: 'https://image.tmdb.org/t/p/w500/1g3qJpbl8BlWzr4AcIoi9ZpCkKO.jpg',
			id: 1245,
		},
		{
			name: 'Tom Berenger',
			image: 'https://image.tmdb.org/t/p/w500/6JQXJZQY3q7ZQY4W4Q2K2Z1ZQ7u.jpg',
			id: 1246,
		},
		{
			name: 'Tom Wilkinson',
			image: 'https://image.tmdb.org/t/p/w500/6JQXJZQY3q7ZQY4W4Q2K2Z1ZQ7u.jpg',
			id: 1247,
		},
	];

	return (
		<main className='container max-w-7xl mt-60'>
			<Section className='bg-red-500'>POPULAR ACTORS</Section>
		</main>
	);
}
