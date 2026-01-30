"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LandingPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [router, session]);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-10 px-6 py-20 text-center">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
          Habit tracking, simplified
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Build Better Habits
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-300">
          Track the small routines that add up. Stay consistent with simple
          streaks, reminders, and weekly insights.
        </p>
      </section>
      <section className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/register"
          className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
        >
          Sign In
        </Link>
      </section>
    </main>
  );
}
