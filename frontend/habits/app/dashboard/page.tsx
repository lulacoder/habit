"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, RefreshCw } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { habitsApi } from "@/lib/api";
import { Spinner } from "@/components/spinner";
import { HabitList, HabitListSkeleton } from "@/components/habit-list";
import { CreateHabitModal } from "@/components/create-habit-modal";
import { HabitCalendar } from "@/components/habit-calendar";
import { EmptyState } from "@/components/empty-state";
import type { Habit } from "@/types/habit";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();

  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarHabit, setCalendarHabit] = useState<Habit | null>(null);

  const fetchHabits = useCallback(async () => {
    try {
      setError(null);
      const data = await habitsApi.getAll();
      setHabits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load habits");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isSessionPending && !session) {
      router.replace("/login");
    }
  }, [router, isSessionPending, session]);

  // Fetch habits when authenticated
  useEffect(() => {
    if (session) {
      fetchHabits();
    }
  }, [session, fetchHabits]);

  const handleHabitCreated = (habit: Habit) => {
    setHabits((prev) => [habit, ...prev]);
  };

  const handleHabitUpdate = (updatedHabit: Habit) => {
    setHabits((prev) =>
      prev.map((h) => (h._id === updatedHabit._id ? updatedHabit : h))
    );
    // Also update calendar habit if it's open
    if (calendarHabit?._id === updatedHabit._id) {
      setCalendarHabit(updatedHabit);
    }
  };

  const handleHabitDelete = (habitId: string) => {
    setHabits((prev) => prev.filter((h) => h._id !== habitId));
    if (calendarHabit?._id === habitId) {
      setCalendarHabit(null);
    }
  };

  // Loading session state
  if (isSessionPending) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <Spinner />
          <p className="text-sm text-zinc-400">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  // Not authenticated
  if (!session) {
    return null;
  }

  // Get today's date for display
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", dateOptions);

  // Calculate today's stats
  const todayString = today.toDateString();
  const completedToday = habits.filter((h) =>
    h.completedDates.some((d) => new Date(d).toDateString() === todayString)
  ).length;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12">
      {/* Header Section */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
            {formattedDate}
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Welcome back, {session.user?.name ?? "there"}
          </h1>
          <p className="text-sm text-zinc-400">
            {habits.length === 0
              ? "Start building your daily routine"
              : `${completedToday} of ${habits.length} habits completed today`}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 hover:shadow-emerald-500/40 sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          New Habit
        </button>
      </header>

      {/* Progress Bar (if habits exist) */}
      {habits.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Today's Progress</span>
            <span className="font-medium text-white">
              {Math.round((completedToday / habits.length) * 100)}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
              style={{
                width: `${(completedToday / habits.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Content Section */}
      <section>
        {isLoading ? (
          <HabitListSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <p className="text-red-400">{error}</p>
            <button
              type="button"
              onClick={fetchHabits}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/5"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        ) : habits.length === 0 ? (
          <EmptyState onCreateClick={() => setIsModalOpen(true)} />
        ) : (
          <HabitList
            habits={habits}
            onUpdate={handleHabitUpdate}
            onDelete={handleHabitDelete}
            onShowCalendar={setCalendarHabit}
          />
        )}
      </section>

      {/* Modals */}
      <CreateHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleHabitCreated}
      />

      {calendarHabit && (
        <HabitCalendar
          habit={calendarHabit}
          isOpen={!!calendarHabit}
          onClose={() => setCalendarHabit(null)}
        />
      )}
    </main>
  );
}
