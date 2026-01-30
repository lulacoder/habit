# Environment Variables

This project loads environment variables using dotenv. Keep secrets out of source control.

## Required Variables
- PORT: Server port (defaults to 3001)
- MONGODB_URI: MongoDB connection string
- BETTER_AUTH_SECRET: Secret key for Better Auth
- BETTER_AUTH_BASE_URL: Base URL used by Better Auth (e.g., http://localhost:3001)
- FRONTEND_URL: Frontend origin for CORS (e.g., http://localhost:3000)
- NODE_ENV: development or production
