frontend/habits
├── app/
│   ├── layout.tsx          # Server layout: HTML + AuthProvider + Navbar
│   ├── page.tsx            # Client: Smart redirector (landing/login/dashboard)
│   ├── landing/
│   │   └── page.tsx        # Marketing page (redirects if logged in)
│   ├── login/
│   │   └── page.tsx        # Login form + back to landing button
│   ├── register/
│   │   └── page.tsx        # Register form + back to landing button
│   └── dashboard/
│       └── page.tsx        # Protected: Main app view
├── components/
│   ├── navbar.tsx          # Client: Auth-aware navigation
│   ├── auth-provider.tsx   # Client: Better Auth context wrapper
│   └── spinner.tsx         # Reusable emerald loading spinner
├── lib/
│   └── auth-client.ts      # Better Auth client configuration
└── .env.local              # Frontend env vars

Ensure project uses Next.js App Router structure (app/ directory exists).
Install required npm packages:
bash
Copy
npm install better-auth @better-auth/react lucide-react
Create .env.local in project root with:
Copy
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
Verify app/globals.css contains Tailwind v4 import at the top:
css
Copy
@import "tailwindcss";
Critical Rule: Any file using hooks (useState, useEffect, useSession) or browser APIs (localStorage) must have "use client" at the very top. Layouts are Server Components by default and must not have "use client".
Acceptance Criteria: npm run dev starts the server without errors. better-auth is in package.json.


Phase 2: Better Auth Client Configuration
Objective: Create the typed Better Auth client instance that connects to your Express backend.
File: lib/auth-client.ts
Import createAuthClient from "better-auth/react"
Export the result of createAuthClient({ baseURL: process.env.NEXT_PUBLIC_API_URL })
This creates authClient object containing signIn, signUp, signOut, useSession, and AuthProvider
Code Structure:
TypeScript
Copy
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Points to Express backend
});

Phase 3: Reusable Loading Spinner
Objective: Create the emerald-themed loading component used during auth checks.
File: components/spinner.tsx
Create a functional component named Spinner
Accept optional className prop for sizing/container control
Use Tailwind classes: animate-spin, rounded-full, border-4, border-emerald-200, border-t-emerald-500
Default size: h-8 w-8
Acceptance Criteria: Component renders a spinning emerald circle when used.
Phase 4: Authentication Provider Wrapper
Objective: Create the Client Component that provides Better Auth session context to the entire app.
File: components/auth-provider.tsx
Must include "use client" at top
Import authClient from @/lib/auth-client
Import ReactNode from react
Export component AuthProvider that receives { children }: { children: ReactNode }
Return <authClient.AuthProvider>{children}</authClient.AuthProvider>
Acceptance Criteria: This component wraps the app body in Phase 6 without errors.

Phase 5: Navigation Bar (Client Component)
Objective: Build the persistent navbar that shows Login/Register or My Habits/Logout based on session.
File: components/navbar.tsx
Must include "use client"
Import authClient from @/lib/auth-client
Import Link from next/link
Import useRouter from next/navigation
Get session: const { data: session, isPending } = authClient.useSession();
Get router: const router = useRouter();
Layout: Flex container with Logo (linked to /) on left, buttons on right.
Logged-out State (isPending or no session): Show "Login" and "Register" links (styled as buttons with emerald borders/fill).
Logged-in State (session exists): Show "My Habits" (link to /dashboard), "Profile", and "Logout" button.
Logout Handler: Create handleLogout async function calling await authClient.signOut() then router.push("/login").
Acceptance Criteria: Navbar shows correct buttons when user is logged in vs out. Logout button works.


Phase 7: Landing Page (Marketing)
Objective: Create the marketing page accessible at /landing URL.
File: app/landing/page.tsx
Must include "use client"
Import authClient from @/lib/auth-client
Import useRouter from next/navigation
Import Link from next/link
Get session: const { data: session } = authClient.useSession();
Effect: useEffect(() => { if (session) router.replace("/dashboard"); }, [session]);
UI: Centered layout with:
Large headline: "Build Better Habits"
Subheadline text about habit tracking
Two buttons: "Get Started" (links to /register, emerald bg) and "Sign In" (links to /login, outlined).
Acceptance Criteria: Visiting /landing shows marketing copy. If logged in, automatically redirects to /dashboard.
Phase 8: Login Page
Objective: Create the login form using Better Auth.
File: app/login/page.tsx
Must include "use client"
Import authClient, useRouter, Link, Spinner (optional for loading state)
State: email, password, error, isLoading
Submit Handler: Prevent default, set loading true, call:
TypeScript
Copy
const { error } = await authClient.signIn.email({ email, password });
If error: set error state to display
If success: router.push("/dashboard") and router.refresh()
UI: Centered card with inputs (email, password), submit button ("Sign In"), error message display (red text), and a "Back to home page" link (to /landing).
Acceptance Criteria: Valid credentials log user in and redirect to /dashboard. Invalid credentials show error. "Back to home" link works.
Phase 9: Register Page
Objective: Create the registration form.
File: app/register/page.tsx
Must include "use client"
Similar structure to Login page
Additional State: name (full name)
Submit Handler: Call authClient.signUp.email({ email, password, name })
On success: redirect to /dashboard
UI: Form fields for Name, Email, Password. Submit button "Create Account". Link to Login page. "Back to home page" link to /landing.
Acceptance Criteria: New user can register and is redirected to dashboard upon success.


Phase 10: Dashboard (Protected Route)
Objective: Create the authenticated home page.
File: app/dashboard/page.tsx
Must include "use client"
Import authClient, useRouter, Spinner
Get session: const { data: session, isPending } = authClient.useSession();
Effect: If not pending and no session: router.replace("/login");
Loading State: If pending, return centered Spinner
Content (if session exists): Welcome message using session.user.name or session.user.email, basic placeholder UI for habits list.
Acceptance Criteria: Unauthenticated users are redirected to /login. Authenticated users see welcome message.


Phase 11: Root Page - Smart Redirector
Objective: Implement the / route logic that decides where to send users based on localStorage and auth state.
File: app/page.tsx
Must include "use client"
Import authClient, useRouter, useEffect, useState, Spinner
Constant: const VISITED_KEY = "habit-tracker-visited";
State: hasCheckedStorage (boolean, starts false), isFirstVisit (boolean | null, starts null)
Session Hook: const { data: session, isPending: isSessionPending } = authClient.useSession();
Effect 1 (LocalStorage Check): On mount, check localStorage.getItem(VISITED_KEY).
If null: localStorage.setItem(VISITED_KEY, "true"), set isFirstVisit(true), set hasCheckedStorage(true)
If exists: set isFirstVisit(false), set hasCheckedStorage(true)
Effect 2 (Redirect Logic): Trigger when hasCheckedStorage, isSessionPending, or session changes.
Only run if hasCheckedStorage is true AND isSessionPending is false.
If isFirstVisit is true: router.replace("/landing")
Else if session exists: router.replace("/dashboard")
Else: router.replace("/login")
Render: If !hasCheckedStorage || isSessionPending, return centered full-screen Spinner with emerald-500. Otherwise return null (since we're redirecting).
Acceptance Criteria:
First visit to / shows spinner briefly then lands on /landing.
Subsequent visits logged out redirect to /login.
Subsequent visits logged in redirect to /dashboard.
localStorage key habit-tracker-visited persists.
