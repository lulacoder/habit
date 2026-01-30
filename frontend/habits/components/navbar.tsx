"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, LogOut, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const isAuthed = Boolean(session?.user);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-lg font-semibold text-white transition hover:text-emerald-400"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 transition group-hover:bg-emerald-500/30">
            <Flame className="h-4 w-4" />
          </div>
          <span>Habits</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2 text-sm">
          {isPending ? (
            // Loading state
            <div className="flex gap-2">
              <div className="h-9 w-20 animate-pulse rounded-full bg-white/10" />
              <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
            </div>
          ) : !isAuthed ? (
            // Logged out state
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 hover:shadow-emerald-500/30"
              >
                Get Started
              </Link>
            </>
          ) : (
            // Logged in state
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/40 hover:bg-white/5"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium text-white transition hover:bg-white/20"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
