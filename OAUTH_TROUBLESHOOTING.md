# OAuth Login Troubleshooting Guide

## 🔴 CRITICAL FIXES NEEDED

### 1. Fix NODE_ENV in Vercel (MOST IMPORTANT)

**Current Issue:** `NODE_ENV` is set to `development` in Vercel, but it should be `production`.

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Find `NODE_ENV`
3. Change the value from `development` to `production`
4. Save and redeploy

**Why this matters:**
- NextAuth debug mode is enabled when NODE_ENV=development
- Prisma client behavior changes
- Cookie security settings may be incorrect
- Production optimizations are disabled

### 2. Verify DATABASE_URL Format

Your `DATABASE_URL` should use the **Session Pooler** format:

```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Check:**
- ✅ Uses `pooler.supabase.com` (not `db...supabase.co`)
- ✅ Port is `6543` (not `5432`)
- ✅ Includes `?pgbouncer=true` at the end
- ✅ Username format: `postgres.[PROJECT-REF]` (not just `postgres`)

### 3. Verify Google OAuth Configuration

Your Google Cloud Console looks correct, but double-check:

**Authorized JavaScript origins:**
- ✅ `http://localhost:3000`
- ✅ `https://movie-mingle.vercel.app`

**Authorized redirect URIs:**
- ✅ `http://localhost:3000/api/auth/callback/google`
- ✅ `https://movie-mingle.vercel.app/api/auth/callback/google`

**Important:** Wait 5-10 minutes after making changes in Google Console for them to propagate.

## 🔍 Debugging Steps

### Step 1: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Deployment
2. Click **Functions** tab
3. Click on `/api/auth/[...nextauth]`
4. Check **Logs** for errors

Look for:
- Database connection errors
- OAuth callback errors
- Prisma adapter errors

### Step 2: Check Browser Console

1. Open your app in browser
2. Press F12 → Console tab
3. Try to log in
4. Look for errors

### Step 3: Check Network Tab

1. Press F12 → Network tab
2. Try to log in
3. Look for the `/api/auth/callback/google` request
4. Check the response - what error does it show?

### Step 4: Test Database Connection

The Prisma adapter needs to connect to your database. Verify:

1. Your Supabase database is active
2. The connection string is correct
3. Your IP is not blocked (if using direct connection)

## 🐛 Common Error Messages & Fixes

### "OAuthCallback" Error
**Cause:** OAuth callback failed
**Fix:**
- Verify Google redirect URI matches exactly
- Check NEXTAUTH_URL matches your domain
- Ensure NEXTAUTH_SECRET is set correctly

### "Database connection failed"
**Cause:** Prisma can't connect to Supabase
**Fix:**
- Verify DATABASE_URL uses Session Pooler format
- Check Supabase project is active
- Verify password is correct

### "Try signing in with a different account"
**Cause:** OAuth flow completed but user creation failed
**Fix:**
- Check Prisma adapter can write to database
- Verify database tables exist (run `prisma db push`)
- Check Vercel function logs for Prisma errors

### "Invalid credentials"
**Cause:** Google OAuth credentials mismatch
**Fix:**
- Verify GOOGLE_CLIENT_ID matches Google Console
- Verify GOOGLE_CLIENT_SECRET matches Google Console
- Check OAuth consent screen is configured

## ✅ Verification Checklist

After making changes, verify:

- [ ] `NODE_ENV` is set to `production` in Vercel
- [ ] `DATABASE_URL` uses Session Pooler format (port 6543)
- [ ] `NEXTAUTH_URL` is `https://movie-mingle.vercel.app` (no trailing slash)
- [ ] `NEXTAUTH_SECRET` is at least 32 characters
- [ ] Google OAuth redirect URI matches exactly
- [ ] All environment variables are set for **Production** environment
- [ ] Project has been redeployed after changes

## 🚀 Quick Fix Steps

1. **Change NODE_ENV to production** in Vercel
2. **Verify DATABASE_URL format** (Session Pooler)
3. **Redeploy** your project
4. **Clear browser cookies** for your domain
5. **Try logging in again**

## 📞 Still Not Working?

If it still doesn't work after these fixes:

1. Check Vercel function logs for specific error messages
2. Share the exact error message you see
3. Check if database tables exist (User, Account, Session)
4. Verify Prisma schema matches your database

The code now logs more detailed errors - check Vercel function logs after attempting to log in.

