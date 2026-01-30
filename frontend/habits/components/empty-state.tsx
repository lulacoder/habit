"use client";

import { Sparkles, Plus } from "lucide-react";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.02] px-8 py-16 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/5">
        <Sparkles className="h-10 w-10 text-emerald-400" />
      </div>

      {/* Text */}
      <h3 className="mb-2 text-xl font-semibold text-white">
        No habits yet
      </h3>
      <p className="mb-8 max-w-sm text-sm text-zinc-400">
        Start building better routines by creating your first habit. 
        Small steps lead to big changes.
      </p>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onCreateClick}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 hover:shadow-emerald-500/40"
      >
        <Plus className="h-4 w-4" />
        Create Your First Habit
      </button>

      {/* Decorative Elements */}
      <div className="mt-10 flex gap-2">
        {[0.2, 0.4, 0.6, 0.4, 0.2].map((opacity, i) => (
          <div
            key={i}
            className="h-1.5 w-6 rounded-full bg-emerald-400"
            style={{ opacity }}
          />
        ))}
      </div>
    </div>
  );
}
