# Server

## File
- src/server.js

## Responsibilities
- Load environment variables.
- Initialize Better Auth.
- Configure CORS.
- Mount auth and habit routes in the correct order.
- Provide health check endpoint.

## Route Mounting Order
1. /api/auth (Better Auth handler)
2. express.json()
3. /api/habits (protected by auth middleware)

## Health Check
- GET /health returns { "status": "ok" }

## Port
- Uses PORT from environment or defaults to 3001.
