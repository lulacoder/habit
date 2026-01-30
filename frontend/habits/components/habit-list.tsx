"use client";

import { HabitCard } from "./habit-card";
import type { Habit } from "@/types/habit";

interface HabitListProps {
  habits: Habit[];
  onUpdate: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
  onShowCalendar: (habit: Habit) => void;
}

export function HabitList({
  habits,
  onUpdate,
  onDelete,
  onShowCalendar,
}: HabitListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onShowCalendar={onShowCalendar}
        />
      ))}
    </div>
  );
}

export function HabitListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-5"
          style={{ borderLeftWidth: "4px", borderLeftColor: "#3b3b3b" }}
        >
          {/* Title skeleton */}
          <div className="mb-3">
            <div className="h-5 w-3/4 rounded bg-white/10" />
            <div className="mt-2 h-4 w-full rounded bg-white/5" />
          </div>

          {/* Tags skeleton */}
          <div className="mb-4 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-white/10" />
            <div className="h-6 w-20 rounded-full bg-white/5" />
          </div>

          {/* Footer skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 rounded bg-white/10" />
            <div className="h-10 w-28 rounded-xl bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
