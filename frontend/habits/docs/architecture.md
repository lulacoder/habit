# Architecture

## Overview
This frontend is a Next.js App Router application with client-only pages for authentication, routing, and stateful UI. The layout is server-rendered, while most pages are client components for session access and browser APIs.

## Structure Layers
1. Layout & Shell
   - Root layout provides HTML/Body shell and persistent navigation.
2. Routing & Pages
   - App Router pages under `app/` define user journeys.
3. Auth & Session
   - Better Auth client is configured once and consumed via hooks.
4. UI Components
   - Shared components live under `components/`.
5. Styling
   - Tailwind v4 is loaded in globals and processed via PostCSS.

## Data Flow
Navigation or form submission -> Better Auth client -> Backend API -> Session updates -> UI and redirects

## Key Decisions
- Root redirect is client-side to allow localStorage and session inspection.
- Auth state is derived from `authClient.useSession()` in client components.
- Shared UI elements are isolated in `components/` for reuse and consistency.
