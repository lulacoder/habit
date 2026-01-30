# Troubleshooting

## 403 Forbidden on Sign Up / Sign In
Cause: Backend does not trust the frontend origin.
Fix:
- Set backend `FRONTEND_URL` to the frontend origin (e.g. `http://localhost:3000`).
- Ensure Better Auth `trustedOrigins` includes the same origin.
- Restart the backend server after changing env/config.

## Missing Styles
Cause: Tailwind not compiling or PostCSS misconfigured.
Fix:
- Ensure `app/globals.css` includes `@import "tailwindcss";` at the top.
- Ensure `postcss.config.mjs` exists and uses `@tailwindcss/postcss`.
- Restart the frontend dev server.

## 404 for `manifest.json`, `sw.js`, or `perf.js`
Cause: Dev tooling requests missing files.
Fix:
- Keep placeholders in `public/` for these files.

## White Screen / No Redirect
Cause: Auth pending or localStorage not available.
Fix:
- Confirm `app/page.tsx` is a client component with `"use client"`.
- Verify browser console for localStorage access errors.
