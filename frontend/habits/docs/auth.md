# Auth & Sessions

## Client Configuration
File: `lib/auth-client.ts`
- Uses `createAuthClient` from `better-auth/react`.
- `baseURL` must point to the backend (e.g. `http://localhost:3001`).

## Session Access
- Use `authClient.useSession()` in client components.
- Returns `{ data, isPending }`.
- `data` includes `user` when authenticated.

## Sign In
- Triggered from `app/login/page.tsx`.
- Uses `authClient.signIn.email({ email, password })`.
- On success, redirect to `/dashboard` and refresh.

## Sign Up
- Triggered from `app/register/page.tsx`.
- Uses `authClient.signUp.email({ email, password, name })`.
- On success, redirect to `/dashboard` and refresh.

## Sign Out
- Triggered from `components/navbar.tsx`.
- Uses `authClient.signOut()` and navigates to `/login`.

## Root Redirect Session Behavior
- Waits for `isPending` to resolve before routing.
- Uses localStorage to detect first visit for `/landing`.

## Security Notes
- The backend must include the frontend origin in CORS and Better Auth `trustedOrigins`.
- For local dev, this is typically `http://localhost:3000`.
