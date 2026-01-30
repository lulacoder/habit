"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Target, Flame, Calendar, BarChart3, ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const FEATURES = [
  {
    icon: Target,
    title: "Track Daily Habits",
    description: "Set up habits with custom frequencies - daily, weekly, or specific days.",
  },
  {
    icon: Flame,
    title: "Build Streaks",
    description: "Stay motivated by maintaining streaks and watching your consistency grow.",
  },
  {
    icon: Calendar,
    title: "Calendar View",
    description: "Visualize your progress with a beautiful calendar showing your completion history.",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "See your success rate and identify patterns in your habit-building journey.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [router, session]);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-16 px-6 py-16 text-center">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
          <Flame className="h-4 w-4" />
          Start building better habits today
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Build Better Habits,
          <br />
          <span className="text-gradient">One Day at a Time</span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400">
          Track the small routines that add up to big changes. Stay consistent with 
          visual streaks, daily reminders, and insights that help you understand your patterns.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 hover:shadow-emerald-500/40"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">
            Everything you need to build lasting habits
          </h2>
          <p className="text-zinc-400">
            Simple, focused tools that actually help you stay consistent
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400 transition group-hover:bg-emerald-500/20">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="w-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-3xl font-bold text-emerald-400">21 days</p>
            <p className="text-sm text-zinc-500">Average to form a habit</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">Simple</p>
            <p className="text-sm text-zinc-500">No bloat, just tracking</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">Free</p>
            <p className="text-sm text-zinc-500">No credit card required</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">
          Ready to transform your daily routine?
        </h2>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          Create Your Free Account
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
