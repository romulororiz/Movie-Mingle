-- =====================================================
-- MOVIE MINGLE - SOCIAL FEATURES DATABASE MIGRATION
-- Run this ENTIRE script in your Supabase SQL Editor
-- =====================================================

-- ==================== REVIEWS TABLE ====================

CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    movie_id TEXT NOT NULL,
    movie_title TEXT NOT NULL,
    movie_poster TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, movie_id)
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_movie_id ON reviews(movie_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- ==================== FRIEND REQUESTS TABLE ====================

CREATE TABLE IF NOT EXISTS friend_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    addressee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(requester_id, addressee_id),
    CHECK (requester_id != addressee_id)
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_friend_requests_requester ON friend_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_friend_requests_addressee ON friend_requests(addressee_id);
CREATE INDEX IF NOT EXISTS idx_friend_requests_status ON friend_requests(status);

-- ==================== ENABLE RLS ====================

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;

-- ==================== RLS POLICIES FOR REVIEWS ====================

-- Drop existing policies if they exist (to avoid errors on re-run)
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
DROP POLICY IF EXISTS "Users can create own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;

-- Anyone can read reviews (public)
CREATE POLICY "Reviews are viewable by everyone"
ON reviews FOR SELECT
USING (true);

-- Users can insert their own reviews
CREATE POLICY "Users can create own reviews"
ON reviews FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews"
ON reviews FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
ON reviews FOR DELETE
USING (auth.uid() = user_id);

-- ==================== RLS POLICIES FOR FRIEND REQUESTS ====================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own friend requests" ON friend_requests;
DROP POLICY IF EXISTS "Users can send friend requests" ON friend_requests;
DROP POLICY IF EXISTS "Addressee can update friend requests" ON friend_requests;
DROP POLICY IF EXISTS "Users can delete own friend requests" ON friend_requests;

-- Users can see friend requests they're involved in
CREATE POLICY "Users can view own friend requests"
ON friend_requests FOR SELECT
USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- Users can send friend requests
CREATE POLICY "Users can send friend requests"
ON friend_requests FOR INSERT
WITH CHECK (auth.uid() = requester_id);

-- Only addressee can update (accept/reject) friend requests
CREATE POLICY "Addressee can update friend requests"
ON friend_requests FOR UPDATE
USING (auth.uid() = addressee_id)
WITH CHECK (auth.uid() = addressee_id);

-- Users can delete friend requests they're involved in
CREATE POLICY "Users can delete own friend requests"
ON friend_requests FOR DELETE
USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- ==================== UPDATE USERS TABLE RLS ====================
-- Make sure users table is readable by everyone (for showing reviewer names)

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Public users are viewable by everyone" ON users;

-- Allow public read of user profiles
CREATE POLICY "Public users are viewable by everyone"
ON users FOR SELECT
USING (true);

-- ==================== VERIFICATION ====================
-- Run these to verify tables were created:

-- SELECT * FROM reviews LIMIT 1;
-- SELECT * FROM friend_requests LIMIT 1;

-- Check RLS is enabled:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename IN ('reviews', 'friend_requests');
