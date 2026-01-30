# Environment Variables

Create `.env.local` in `frontend/habits`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Notes
- `NEXT_PUBLIC_API_URL` is required by the Better Auth client.
- `NEXT_PUBLIC_APP_URL` is used by Next.js and shared config if needed.
