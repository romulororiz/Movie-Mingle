import { createClient } from '@/lib/supabase/server';

// Database types based on Supabase tables
export interface DbUser {
	id: string;
	email: string | null;
	name: string | null;
	email_verified: string | null;
	image: string | null;
	created_at?: string;
	updated_at?: string;
}

export interface DbBookmark {
	id: string;
	created_at: string;
	user_id: string;
	movie_id: string;
	title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	original_lang: string;
	release_date: string;
	vote_average: number;
	original_title: string;
}

export interface DbBookmarkGenre {
	id: string;
	bookmark_id: string;
	genre_id: number;
	name: string;
}

export interface BookmarkWithGenres extends DbBookmark {
	genres: DbBookmarkGenre[];
}

// Review types
export interface DbReview {
	id: string;
	user_id: string;
	movie_id: string;
	movie_title: string;
	movie_poster: string | null;
	rating: number; // 1-5 stars
	content: string;
	created_at: string;
	updated_at: string;
}

export interface ReviewWithUser extends DbReview {
	user: {
		id: string;
		name: string | null;
		image: string | null;
	};
}

// Friend request types
export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

export interface DbFriendRequest {
	id: string;
	requester_id: string;
	addressee_id: string;
	status: FriendRequestStatus;
	created_at: string;
	updated_at: string;
}

export interface FriendRequestWithUser extends DbFriendRequest {
	requester: {
		id: string;
		name: string | null;
		image: string | null;
	};
	addressee: {
		id: string;
		name: string | null;
		image: string | null;
	};
}

export interface PublicUser {
	id: string;
	name: string | null;
	image: string | null;
	created_at: string;
	review_count: number;
	bookmark_count: number;
}

/**
 * Get Supabase client for database operations
 */
export async function getSupabaseDb() {
	return await createClient();
}

/**
 * Sync Supabase auth user with users table
 * Creates or updates user record when they sign in
 */
export async function syncUser(userId: string, email: string | null, metadata: any) {
	const supabase = await getSupabaseDb();

	const userData = {
		id: userId,
		email: email,
		name: metadata?.full_name || email?.split('@')[0] || null,
		image: metadata?.picture || metadata?.avatar_url || null,
		updated_at: new Date().toISOString(),
	};

	// Upsert user (insert or update)
	const { error } = await supabase
		.from('users')
		.upsert(userData, {
			onConflict: 'id',
		});

	if (error) {
		console.error('Error syncing user:', error);
	}
}

/**
 * Get all bookmarks for a user with genres
 */
export async function getUserBookmarks(userId: string): Promise<BookmarkWithGenres[]> {
	const supabase = await getSupabaseDb();

	const { data: bookmarks, error } = await supabase
		.from('bookmarks')
		.select('*, bookmark_genres(*)')
		.eq('user_id', userId)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching bookmarks:', error);
		throw error;
	}

	// Transform to match expected format
	return (bookmarks || []).map((bookmark: any) => ({
		...bookmark,
		genres: bookmark.bookmark_genres || [],
	}));
}

/**
 * Check if a movie is bookmarked by user
 */
export async function isMovieBookmarked(userId: string, movieId: string): Promise<boolean> {
	const supabase = await getSupabaseDb();

	const { data, error } = await supabase
		.from('bookmarks')
		.select('id')
		.eq('user_id', userId)
		.eq('movie_id', movieId)
		.single();

	if (error && error.code !== 'PGRST116') {
		// PGRST116 is "not found" error, which is expected
		console.error('Error checking bookmark:', error);
	}

	return !!data;
}

/**
 * Create a bookmark with genres
 */
export async function createBookmark(
	userId: string,
	movieData: {
		movieId: string;
		title: string;
		overview: string;
		posterPath: string | null;
		backdropPath: string | null;
		originalLang: string;
		releaseDate: Date;
		voteAverage: number;
		originalTitle: string;
		genres: { id: number; name: string }[];
	}
): Promise<BookmarkWithGenres> {
	const supabase = await getSupabaseDb();

	// Insert bookmark
	const { data: bookmark, error: bookmarkError } = await supabase
		.from('bookmarks')
		.insert({
			user_id: userId,
			movie_id: movieData.movieId,
			title: movieData.title,
			overview: movieData.overview,
			poster_path: movieData.posterPath,
			backdrop_path: movieData.backdropPath,
			original_lang: movieData.originalLang,
			release_date: movieData.releaseDate.toISOString(),
			vote_average: movieData.voteAverage,
			original_title: movieData.originalTitle,
		})
		.select()
		.single();

	if (bookmarkError) {
		console.error('Error creating bookmark:', bookmarkError);
		throw bookmarkError;
	}

	// Insert genres
	if (movieData.genres.length > 0) {
		const genresToInsert = movieData.genres.map((genre) => ({
			bookmark_id: bookmark.id,
			genre_id: genre.id,
			name: genre.name,
		}));

		const { error: genresError } = await supabase
			.from('bookmark_genres')
			.insert(genresToInsert);

		if (genresError) {
			console.error('Error creating bookmark genres:', genresError);
			// Don't throw - bookmark is created, genres are optional
		}
	}

	// Fetch complete bookmark with genres
	const { data: completeBookmark } = await supabase
		.from('bookmarks')
		.select('*, bookmark_genres(*)')
		.eq('id', bookmark.id)
		.single();

	return {
		...completeBookmark,
		genres: completeBookmark?.bookmark_genres || [],
	};
}

/**
 * Delete a bookmark and its genres
 */
export async function deleteBookmark(userId: string, movieId: string): Promise<boolean> {
	const supabase = await getSupabaseDb();

	// Supabase will automatically delete related bookmark_genres due to CASCADE
	const { error } = await supabase
		.from('bookmarks')
		.delete()
		.eq('user_id', userId)
		.eq('movie_id', movieId);

	if (error) {
		console.error('Error deleting bookmark:', error);
		throw error;
	}

	return true;
}

// ==================== REVIEWS ====================

/**
 * Get all reviews for a movie
 */
export async function getMovieReviews(movieId: string): Promise<ReviewWithUser[]> {
	const supabase = await getSupabaseDb();

	const { data, error } = await supabase
		.from('reviews')
		.select(`
			*,
			user:users(id, name, image)
		`)
		.eq('movie_id', movieId)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching reviews:', error);
		throw error;
	}

	return (data || []) as ReviewWithUser[];
}

/**
 * Get user's review for a movie
 */
export async function getUserMovieReview(userId: string, movieId: string): Promise<DbReview | null> {
	const supabase = await getSupabaseDb();

	const { data, error } = await supabase
		.from('reviews')
		.select('*')
		.eq('user_id', userId)
		.eq('movie_id', movieId)
		.single();

	if (error && error.code !== 'PGRST116') {
		console.error('Error fetching user review:', error);
	}

	return data || null;
}

/**
 * Create or update a review
 */
export async function upsertReview(
	userId: string,
	movieId: string,
	movieTitle: string,
	moviePoster: string | null,
	rating: number,
	content: string
): Promise<DbReview> {
	const supabase = await getSupabaseDb();

	const reviewData = {
		user_id: userId,
		movie_id: movieId,
		movie_title: movieTitle,
		movie_poster: moviePoster,
		rating,
		content,
		updated_at: new Date().toISOString(),
	};

	// Check if review exists
	const existing = await getUserMovieReview(userId, movieId);

	if (existing) {
		// Update existing review
		const { data, error } = await supabase
			.from('reviews')
			.update(reviewData)
			.eq('id', existing.id)
			.select()
			.single();

		if (error) {
			console.error('Error updating review:', error);
			throw error;
		}

		return data;
	} else {
		// Create new review
		const { data, error } = await supabase
			.from('reviews')
			.insert(reviewData)
			.select()
			.single();

		if (error) {
			console.error('Error creating review:', error);
			throw error;
		}

		return data;
	}
}

/**
 * Delete a review
 */
export async function deleteReview(userId: string, reviewId: string): Promise<boolean> {
	const supabase = await getSupabaseDb();

	const { error } = await supabase
		.from('reviews')
		.delete()
		.eq('id', reviewId)
		.eq('user_id', userId);

	if (error) {
		console.error('Error deleting review:', error);
		throw error;
	}

	return true;
}

/**
 * Get reviews by a user
 */
export async function getUserReviews(userId: string): Promise<DbReview[]> {
	const supabase = await getSupabaseDb();

	const { data, error } = await supabase
		.from('reviews')
		.select('*')
		.eq('user_id', userId)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching user reviews:', error);
		throw error;
	}

	return data || [];
}

// ==================== FRIEND REQUESTS ====================

/**
 * Get public user profile
 */
export async function getPublicUser(userId: string): Promise<PublicUser | null> {
	const supabase = await getSupabaseDb();

	const { data: user, error: userError } = await supabase
		.from('users')
		.select('id, name, image, created_at')
		.eq('id', userId)
		.single();

	if (userError) {
		console.error('Error fetching user:', userError);
		return null;
	}

	// Get review count
	const { count: reviewCount } = await supabase
		.from('reviews')
		.select('*', { count: 'exact', head: true })
		.eq('user_id', userId);

	// Get bookmark count
	const { count: bookmarkCount } = await supabase
		.from('bookmarks')
		.select('*', { count: 'exact', head: true })
		.eq('user_id', userId);

	return {
		...user,
		review_count: reviewCount || 0,
		bookmark_count: bookmarkCount || 0,
	};
}

/**
 * Send friend request
 */
export async function sendFriendRequest(requesterId: string, addresseeId: string): Promise<DbFriendRequest> {
	const supabase = await getSupabaseDb();

	// Check if request already exists
	const { data: existing } = await supabase
		.from('friend_requests')
		.select('*')
		.or(`and(requester_id.eq.${requesterId},addressee_id.eq.${addresseeId}),and(requester_id.eq.${addresseeId},addressee_id.eq.${requesterId})`)
		.single();

	if (existing) {
		throw new Error('Friend request already exists');
	}

	const { data, error } = await supabase
		.from('friend_requests')
		.insert({
			requester_id: requesterId,
			addressee_id: addresseeId,
			status: 'pending',
		})
		.select()
		.single();

	if (error) {
		console.error('Error sending friend request:', error);
		throw error;
	}

	return data;
}

/**
 * Update friend request status
 */
export async function updateFriendRequest(
	requestId: string,
	userId: string,
	status: FriendRequestStatus
): Promise<DbFriendRequest> {
	const supabase = await getSupabaseDb();

	const { data, error } = await supabase
		.from('friend_requests')
		.update({ status, updated_at: new Date().toISOString() })
		.eq('id', requestId)
		.eq('addressee_id', userId) // Only addressee can update
		.select()
		.single();

	if (error) {
		console.error('Error updating friend request:', error);
		throw error;
	}

	return data;
}

/**
 * Get friend requests for a user
 */
export async function getFriendRequests(userId: string): Promise<FriendRequestWithUser[]> {
	const supabase = await getSupabaseDb();

	const { data, error } = await supabase
		.from('friend_requests')
		.select(`
			*,
			requester:users!friend_requests_requester_id_fkey(id, name, image),
			addressee:users!friend_requests_addressee_id_fkey(id, name, image)
		`)
		.or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching friend requests:', error);
		throw error;
	}

	return (data || []) as FriendRequestWithUser[];
}

/**
 * Get friendship status between two users
 */
export async function getFriendshipStatus(
	userId: string,
	otherUserId: string
): Promise<{ status: FriendRequestStatus | 'none'; request?: DbFriendRequest; isRequester: boolean }> {
	const supabase = await getSupabaseDb();

	const { data } = await supabase
		.from('friend_requests')
		.select('*')
		.or(`and(requester_id.eq.${userId},addressee_id.eq.${otherUserId}),and(requester_id.eq.${otherUserId},addressee_id.eq.${userId})`)
		.single();

	if (!data) {
		return { status: 'none', isRequester: false };
	}

	return {
		status: data.status,
		request: data,
		isRequester: data.requester_id === userId,
	};
}

/**
 * Get accepted friends for a user
 */
export async function getUserFriends(userId: string): Promise<PublicUser[]> {
	const supabase = await getSupabaseDb();

	const { data, error } = await supabase
		.from('friend_requests')
		.select(`
			requester:users!friend_requests_requester_id_fkey(id, name, image, created_at),
			addressee:users!friend_requests_addressee_id_fkey(id, name, image, created_at)
		`)
		.eq('status', 'accepted')
		.or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);

	if (error) {
		console.error('Error fetching friends:', error);
		throw error;
	}

	// Extract the friend (the other user) from each request
	const friends = (data || []).map((request: any) => {
		const friend = request.requester.id === userId ? request.addressee : request.requester;
		return {
			...friend,
			review_count: 0,
			bookmark_count: 0,
		};
	});

	return friends;
}

