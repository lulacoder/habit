"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/spinner";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [router, isPending, session]);

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <Spinner />
          <p className="text-sm text-zinc-400">Loading your dashboard…</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
          Your habits
        </p>
        <h1 className="text-3xl font-semibold text-white">
          Welcome, {session.user?.name ?? session.user?.email ?? "friend"}
        </h1>
        <p className="text-sm text-zinc-400">
          This protected area will show your habit list and streaks.
        </p>
      </header>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm text-zinc-300">
          No habits yet. Start by creating your first habit in phase two.
        </p>
      </section>
    </main>
  );
}
