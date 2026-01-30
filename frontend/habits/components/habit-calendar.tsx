"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Habit } from "@/types/habit";

interface HabitCalendarProps {
  habit: Habit;
  isOpen: boolean;
  onClose: () => void;
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function HabitCalendar({ habit, isOpen, onClose }: HabitCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const completedSet = useMemo(() => {
    return new Set(
      habit.completedDates.map((d) => new Date(d).toDateString())
    );
  }, [habit.completedDates]);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  }, [currentDate]);

  const stats = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let completedCount = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      if (completedSet.has(date.toDateString())) {
        completedCount++;
      }
    }

    const today = new Date();
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
    const daysToCount = isCurrentMonth ? today.getDate() : daysInMonth;

    return {
      completed: completedCount,
      total: daysToCount,
      percentage: Math.round((completedCount / daysToCount) * 100),
    };
  }, [currentDate, completedSet]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  if (!isOpen) return null;

  const today = new Date();
  const isToday = (date: Date) => date.toDateString() === today.toDateString();
  const isFuture = (date: Date) => date > today;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/95 p-6 shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: habit.color }}
            />
            <div>
              <h2 className="text-lg font-semibold text-white">{habit.title}</h2>
              <p className="text-sm text-zinc-400">Completion History</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Month Navigation */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h3 className="font-medium text-white">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={goToToday}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition"
            >
              Go to today
            </button>
          </div>
          <button
            type="button"
            onClick={goToNextMonth}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="mb-4">
          {/* Day Headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-medium text-zinc-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const completed = completedSet.has(date.toDateString());
              const todayDate = isToday(date);
              const future = isFuture(date);

              return (
                <div
                  key={date.toISOString()}
                  className={`relative flex aspect-square items-center justify-center rounded-lg text-sm transition ${
                    future
                      ? "text-zinc-700"
                      : completed
                      ? "font-medium text-white"
                      : "text-zinc-400"
                  } ${todayDate ? "ring-2 ring-white/30" : ""}`}
                  style={{
                    backgroundColor: completed && !future ? habit.color : "transparent",
                  }}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{stats.completed}</p>
              <p className="text-xs text-zinc-500">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-zinc-500">Days</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: habit.color }}>
                {stats.percentage}%
              </p>
              <p className="text-xs text-zinc-500">Success</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
