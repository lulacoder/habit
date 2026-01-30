"use client";

import { useState } from "react";
import { Check, Flame, Calendar, Trash2, MoreHorizontal } from "lucide-react";
import { habitsApi, isCompletedToday, calculateStreak } from "@/lib/api";
import { FREQUENCY_OPTIONS, type Habit } from "@/types/habit";

interface HabitCardProps {
  habit: Habit;
  onUpdate: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
  onShowCalendar: (habit: Habit) => void;
}

export function HabitCard({
  habit,
  onUpdate,
  onDelete,
  onShowCalendar,
}: HabitCardProps) {
  const [isToggling, setIsToggling] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const completed = isCompletedToday(habit);
  const streak = calculateStreak(habit);
  const frequencyLabel = FREQUENCY_OPTIONS.find(
    (f) => f.value === habit.frequency
  )?.label;

  const handleToggleCompletion = async () => {
    if (isToggling) return;
    setIsToggling(true);

    try {
      const today = new Date();
      let result;

      if (completed) {
        result = await habitsApi.removeCompletion(habit._id, today);
      } else {
        result = await habitsApi.addCompletion(habit._id, today);
      }

      onUpdate({
        ...habit,
        completedDates: result.completedDates,
      });
    } catch (error) {
      console.error("Failed to toggle completion:", error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await habitsApi.delete(habit._id);
      onDelete(habit._id);
    } catch (error) {
      console.error("Failed to delete habit:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
      style={{
        borderLeftWidth: "4px",
        borderLeftColor: habit.color,
      }}
    >
      {/* Card Content */}
      <div className="p-5">
        {/* Header Row */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold text-white">
              {habit.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
              {habit.description}
            </p>
          </div>

          {/* Menu Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="rounded-lg p-1.5 text-zinc-500 opacity-0 transition hover:bg-white/10 hover:text-white group-hover:opacity-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-xl border border-white/10 bg-zinc-900 py-1 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      onShowCalendar(habit);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5"
                  >
                    <Calendar className="h-4 w-4" />
                    View Calendar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      handleDelete();
                    }}
                    disabled={isDeleting}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 transition hover:bg-white/5"
                  >
                    <Trash2 className="h-4 w-4" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tags Row */}
        <div className="mb-4 flex flex-wrap gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-medium"
            style={{
              backgroundColor: `${habit.color}20`,
              color: habit.color,
            }}
          >
            {frequencyLabel}
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-zinc-300">
            {habit.category}
          </span>
        </div>

        {/* Footer Row */}
        <div className="flex items-center justify-between">
          {/* Streak */}
          <div className="flex items-center gap-1.5">
            <Flame
              className={`h-4 w-4 ${
                streak > 0 ? "text-orange-400" : "text-zinc-600"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                streak > 0 ? "text-orange-400" : "text-zinc-500"
              }`}
            >
              {streak} day{streak !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Completion Toggle */}
          <button
            type="button"
            onClick={handleToggleCompletion}
            disabled={isToggling}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              completed
                ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                : "bg-white/10 text-zinc-300 hover:bg-white/20"
            } ${isToggling ? "cursor-wait opacity-70" : ""}`}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors ${
                completed
                  ? "border-emerald-400 bg-emerald-500"
                  : "border-zinc-500"
              }`}
            >
              {completed && <Check className="h-3 w-3 text-white" />}
            </div>
            {completed ? "Done" : "Mark Done"}
          </button>
        </div>
      </div>

      {/* Completion Animation Overlay */}
      {completed && (
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: `linear-gradient(135deg, ${habit.color}00 0%, ${habit.color}40 100%)`,
          }}
        />
      )}
    </div>
  );
}
