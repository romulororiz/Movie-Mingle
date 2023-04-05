import { Movie, Bookmark } from '@prisma/client';
import { ZodIssue } from 'zod';

export interface MovieData {
	error: string | ZodIssue[] | null;
	movie: Movie | null;
}

export interface BookmarkData {
	error: string | ZodIssue[] | null;
	bookmark: Bookmark | null;
}
