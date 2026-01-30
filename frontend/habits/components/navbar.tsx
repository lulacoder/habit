"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
    <header className="border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          Habits
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          {isPending || !isAuthed ? (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/40"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 font-semibold text-black transition hover:bg-emerald-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-white/40"
              >
                My Habits
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 font-semibold text-black transition hover:bg-emerald-300"
              >
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
