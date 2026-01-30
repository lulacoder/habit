"use client";

import { Sparkles, Plus, Target, Flame, Calendar } from "lucide-react";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/20 bg-gradient-to-br from-white/[0.03] to-transparent px-8 py-20 text-center backdrop-blur-sm">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-emerald-500/10 blur-2xl" />
      <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-purple-500/10 blur-2xl" />

      {/* Floating icons */}
      <div className="absolute top-12 right-16 animate-float" style={{ animationDelay: '0s' }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
          <Flame className="h-5 w-5" />
        </div>
      </div>
      <div className="absolute bottom-16 left-16 animate-float" style={{ animationDelay: '1s' }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <Calendar className="h-5 w-5" />
        </div>
      </div>
      <div className="absolute top-1/2 right-12 animate-float" style={{ animationDelay: '2s' }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <Target className="h-5 w-5" />
        </div>
      </div>

      {/* Main icon */}
      <div className="relative mb-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 shadow-lg shadow-emerald-500/10">
          <Sparkles className="h-12 w-12 text-emerald-400" />
        </div>
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 blur-xl animate-pulse-slow" />
      </div>

      {/* Text */}
      <h3 className="mb-3 text-2xl font-bold text-white">
        No habits yet
      </h3>
      <p className="mb-10 max-w-md text-base text-zinc-400">
        Start building better routines by creating your first habit.
        Small steps lead to big changes—let's begin your journey today.
      </p>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onCreateClick}
        className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105"
      >
        <Plus className="h-5 w-5" />
        Create Your First Habit
      </button>

      {/* Decorative dots */}
      <div className="mt-12 flex gap-2">
        {[0.3, 0.5, 0.8, 1, 0.8, 0.5, 0.3].map((opacity, i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-emerald-400"
            style={{ opacity }}
          />
        ))}
      </div>
    </div>
  );
}
