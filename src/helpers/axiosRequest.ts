import { tmdb } from '@/lib/tmdb';
import { GenreResponse, MovieData, MovieQuery } from '@/types/tmdb';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { z } from 'zod';

export async function axiosRequest(
	method: AxiosRequestConfig['method'],
	url: string,
	config?: AxiosRequestConfig<MovieQuery>
): Promise<{
	data: MovieData | GenreResponse | null;
	error: Error | null;
}> {
	try {
		const response: AxiosResponse = await tmdb({
			method,
			url,
			...config,
		});
		return { data: response.data, error: null };
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(error.message);
		} else if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error(`Error fetching ${url}`);
		}
	}
}
