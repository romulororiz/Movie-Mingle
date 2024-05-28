import {
	MovieResponse,
	PeopleResponse,
	SearchDataResponse,
	TvResponse,
} from '@/types/tmdb';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';

interface FilterProps {
	item: MovieResponse | PeopleResponse | TvResponse | SearchDataResponse | null;
}

const Filter = ({ item }: FilterProps) => {
	return <div>Filter</div>;
};

export default Filter;
