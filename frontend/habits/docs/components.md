# Components

## Navbar
File: `components/navbar.tsx`
- Client component with auth-aware links.
- Shows Login/Register when unauthenticated.
- Shows My Habits + Logout when authenticated.

## Spinner
File: `components/spinner.tsx`
- Emerald loading spinner.
- Supports `className` for sizing.

## Auth Provider
File: `components/auth-provider.tsx`
- Client component that can wrap the app for auth context if needed.
- Currently returns children directly (no provider wrapper).
