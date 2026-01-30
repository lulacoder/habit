"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Target, Flame, Calendar, BarChart3, ArrowRight, Sparkles, Zap, TrendingUp, CheckCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const FEATURES = [
  {
    icon: Target,
    title: "Track Daily Habits",
    description: "Set up habits with custom frequencies - daily, weekly, or specific days.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Flame,
    title: "Build Streaks",
    description: "Stay motivated by maintaining streaks and watching your consistency grow.",
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: Calendar,
    title: "Calendar View",
    description: "Visualize your progress with a beautiful calendar showing your completion history.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "See your success rate and identify patterns in your habit-building journey.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
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
    <main className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-20 px-6 py-20 text-center overflow-hidden">
      {/* Hero Section */}
      <section className="relative space-y-8 animate-fade-in">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm text-emerald-400 backdrop-blur-sm animate-float">
          <Sparkles className="h-4 w-4" />
          <span>Start building better habits today</span>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Build Better Habits,
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            One Day at a Time
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400">
          Track the small routines that add up to big changes. Stay consistent with
          visual streaks, daily reminders, and insights that help you understand your patterns.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 pt-6 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative flex items-center gap-2">
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
          >
            Sign In
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 pt-4 text-sm text-zinc-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-yellow-400" />
            Setup in 2 minutes
          </span>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full space-y-12">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white">
            Everything you need to <span className="text-emerald-400">build lasting habits</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Simple, focused tools that actually help you stay consistent
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 text-left backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <div className="relative">
                <div className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3.5 ${feature.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-10 backdrop-blur-sm">
          {/* Decorative glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

          <div className="grid gap-10 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">21 days</p>
              </div>
              <p className="text-sm text-zinc-500">Average to form a habit</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-white">Simple</p>
              <p className="text-sm text-zinc-500">No bloat, just tracking</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Free</p>
              <p className="text-sm text-zinc-500">No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">
          Ready to transform your daily routine?
        </h2>
        <Link
          href="/register"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-bold text-zinc-900 transition-all hover:bg-zinc-100 hover:scale-105 shadow-xl shadow-white/10"
        >
          Create Your Free Account
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </main>
  );
}
