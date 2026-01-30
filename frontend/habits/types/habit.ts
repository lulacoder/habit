export type Frequency = "daily" | "weekly" | "weekdays" | "weekends";

export interface Habit {
  _id: string;
  userId: string;
  title: string;
  description: string;
  frequency: Frequency;
  category: string;
  color: string;
  completedDates: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateHabitInput {
  title: string;
  description: string;
  frequency: Frequency;
  category: string;
  color: string;
}

export interface UpdateHabitInput extends Partial<CreateHabitInput> {}

export const FREQUENCY_OPTIONS: { value: Frequency; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
];

export const PRESET_COLORS = [
  "#10b981", // emerald
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#f59e0b", // amber
  "#ef4444", // red
  "#06b6d4", // cyan
  "#84cc16", // lime
];

export const CATEGORY_SUGGESTIONS = [
  "Health",
  "Fitness",
  "Productivity",
  "Learning",
  "Mindfulness",
  "Social",
  "Finance",
  "Creative",
];
