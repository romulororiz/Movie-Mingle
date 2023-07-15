interface SearchPageProps {
	params: {
		slug: string;
	};
}

const SearchPage = ({ params }: SearchPageProps) => {
	const { slug } = params;

	return <div>page</div>;
};

export default SearchPage;
