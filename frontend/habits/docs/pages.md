# Routing & Pages

## Routes Overview
- `/` -> Root smart redirector
- `/landing` -> Marketing page
- `/login` -> Sign-in page
- `/register` -> Sign-up page
- `/dashboard` -> Protected dashboard
- `/api/health` -> Health check endpoint

## Root Redirector (`app/page.tsx`)
Purpose: Decide initial destination based on first visit and auth state.
- First visit -> `/landing`
- Returning & authed -> `/dashboard`
- Returning & not authed -> `/login`
- Uses localStorage key `habit-tracker-visited`.
- Displays spinner while session or storage checks are pending.

## Landing (`app/landing/page.tsx`)
Purpose: Marketing entry. Redirects to `/dashboard` if session exists.

## Login (`app/login/page.tsx`)
Purpose: Email/password sign-in.
- Calls `authClient.signIn.email()`.
- On success, navigates to `/dashboard` and refreshes.
- Shows error feedback on failure.

## Register (`app/register/page.tsx`)
Purpose: Account creation.
- Calls `authClient.signUp.email()`.
- On success, navigates to `/dashboard` and refreshes.
- Shows error feedback on failure.

## Dashboard (`app/dashboard/page.tsx`)
Purpose: Protected area for authenticated users.
- Redirects to `/login` if no session.
- Shows loading spinner while session is pending.

## Health Endpoint (`app/api/health/route.ts`)
Purpose: Dev tooling and monitoring endpoint that returns 200 OK.
