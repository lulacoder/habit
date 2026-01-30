# Frontend Documentation

Welcome to the frontend documentation. This folder is modular, with each major concern documented in its own file.

## Contents
- [Architecture](architecture.md)
- [Routing & Pages](pages.md)
- [Auth & Sessions](auth.md)
- [Components](components.md)
- [Styling](styling.md)
- [Environment Variables](env.md)
- [Public Assets](public.md)
- [Scripts & Dependencies](scripts.md)
- [Troubleshooting](troubleshooting.md)

## Quick Start
1. Configure environment variables as described in env.md.
2. Install dependencies with npm install.
3. Start the dev server with npm run dev.

## Notes
- The app uses the Next.js App Router (`app/` directory).
- Auth routes are handled by the backend at `/api/auth`.
- The root route (`/`) is a smart redirector based on localStorage and session state.
