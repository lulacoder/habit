# Auth & Sessions

## File
- src/config/auth.js

## Initialization
- Initializes Better Auth with MongoDB adapter.
- Uses BETTER_AUTH_SECRET for signing.
- Uses BETTER_AUTH_BASE_URL for base URL.

## Session Validation
- Sessions are validated in middleware via auth.api.getSession({ headers }).

## Auth Routes
- Mounted at /api/auth.
- Must be mounted before express.json().

## Notes
- If base URL is missing, Better Auth will warn and callbacks may fail.
