import type { Habit, CreateHabitInput, UpdateHabitInput } from "@/types/habit";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Request failed: ${response.status}`);
  }

  return response.json();
}

export const habitsApi = {
  // Get all habits for the current user
  getAll: () => fetchWithAuth<Habit[]>("/api/habits"),

  // Get a single habit by ID
  getById: (id: string) => fetchWithAuth<Habit>(`/api/habits/${id}`),

  // Create a new habit
  create: (data: CreateHabitInput) =>
    fetchWithAuth<Habit>("/api/habits", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update an existing habit
  update: (id: string, data: UpdateHabitInput) =>
    fetchWithAuth<Habit>(`/api/habits/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete a habit
  delete: (id: string) =>
    fetchWithAuth<{ message: string }>(`/api/habits/${id}`, {
      method: "DELETE",
    }),

  // Get completion dates for a habit
  getCompletions: (id: string) =>
    fetchWithAuth<{ completedDates: string[] }>(`/api/habits/${id}/completions`),

  // Add a completion date
  addCompletion: (id: string, date: Date) =>
    fetchWithAuth<{ completedDates: string[] }>(
      `/api/habits/${id}/completions`,
      {
        method: "POST",
        body: JSON.stringify({ date: date.toISOString() }),
      }
    ),

  // Remove a completion date
  removeCompletion: (id: string, date: Date) =>
    fetchWithAuth<{ completedDates: string[] }>(
      `/api/habits/${id}/completions/${date.toISOString()}`,
      {
        method: "DELETE",
      }
    ),
};

// Utility functions for habit data
export function isCompletedToday(habit: Habit): boolean {
  const today = new Date().toDateString();
  return habit.completedDates.some(
    (date) => new Date(date).toDateString() === today
  );
}

export function calculateStreak(habit: Habit): number {
  if (habit.completedDates.length === 0) return 0;

  const sortedDates = [...habit.completedDates]
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if the most recent completion is today or yesterday
  const mostRecent = new Date(sortedDates[0]);
  mostRecent.setHours(0, 0, 0, 0);

  if (mostRecent.getTime() !== today.getTime() && mostRecent.getTime() !== yesterday.getTime()) {
    return 0; // Streak broken
  }

  let currentDate = mostRecent;
  for (const date of sortedDates) {
    const completedDate = new Date(date);
    completedDate.setHours(0, 0, 0, 0);

    if (completedDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (completedDate.getTime() < currentDate.getTime()) {
      // Check if it's the previous day
      const expectedPrev = new Date(currentDate);
      expectedPrev.setDate(expectedPrev.getDate() - 1);
      if (completedDate.getTime() === expectedPrev.getTime()) {
        streak++;
        currentDate = completedDate;
      } else {
        break; // Gap in streak
      }
    }
  }

  return streak;
}

export function getCompletionRate(habit: Habit, days: number = 30): number {
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - days);

  const completionsInRange = habit.completedDates.filter((date) => {
    const d = new Date(date);
    return d >= startDate && d <= now;
  });

  return Math.round((completionsInRange.length / days) * 100);
}
