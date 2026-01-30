# Architecture

## Overview
This backend follows a layered architecture:

1. Config layer: database and auth initialization.
2. Middleware layer: authentication guard and request validation.
3. Data access layer: Mongoose schema and repository methods.
4. Business logic layer: controllers using repository methods only.
5. Routing layer: thin Express routers wiring controllers and middleware.
6. Server integration: Express app wiring and route mounting.

## Data Flow
Request -> Auth middleware -> Validation -> Controller -> Repository -> MongoDB

## Key Decisions
- Repository pattern isolates data access from controllers.
- Validation uses Zod to ensure predictable payloads.
- Better Auth handlers are mounted before JSON parsing.
