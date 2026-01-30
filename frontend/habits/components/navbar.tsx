"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, LogOut, LayoutDashboard, Sparkles } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
      {/* Gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-lg font-bold text-white transition hover:text-emerald-400"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 transition-all group-hover:from-emerald-500/30 group-hover:to-teal-500/30 group-hover:scale-110">
            <Flame className="h-5 w-5" />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-md opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">Habits</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3 text-sm">
          {isPending ? (
            // Loading state
            <div className="flex gap-2">
              <div className="h-10 w-20 animate-pulse rounded-full bg-white/10" />
              <div className="h-10 w-24 animate-pulse rounded-full bg-white/10" />
            </div>
          ) : !isAuthed ? (
            // Logged out state
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:scale-105"
              >
                <Sparkles className="h-4 w-4" />
                Get Started
              </Link>
            </>
          ) : (
            // Logged in state
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
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
