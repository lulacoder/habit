"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, X, Calendar } from "lucide-react";
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
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#111118]/95 shadow-2xl shadow-black/50 backdrop-blur-xl animate-slide-up">
        {/* Gradient line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${habit.color}80, transparent)` }}
        />

        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${habit.color}20` }}
              >
                <Calendar className="h-6 w-6" style={{ color: habit.color }} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{habit.title}</h2>
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
        </div>

        <div className="px-6 pb-6">
          {/* Month Navigation */}
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="rounded-xl p-2.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <h3 className="font-semibold text-white">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <button
                type="button"
                onClick={goToToday}
                className="text-xs font-medium transition hover:text-opacity-80"
                style={{ color: habit.color }}
              >
                Go to today
              </button>
            </div>
            <button
              type="button"
              onClick={goToNextMonth}
              className="rounded-xl p-2.5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="mb-5">
            {/* Day Headers */}
            <div className="mb-2 grid grid-cols-7 gap-1">
              {DAYS_OF_WEEK.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-xs font-semibold text-zinc-500"
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
                    className={`relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition ${future
                        ? "text-zinc-700"
                        : completed
                          ? "text-white shadow-lg"
                          : "text-zinc-400 hover:bg-white/5"
                      } ${todayDate && !completed ? "ring-2 ring-white/30" : ""}`}
                    style={{
                      backgroundColor: completed && !future ? habit.color : "transparent",
                      boxShadow: completed && !future ? `0 4px 15px ${habit.color}40` : undefined,
                    }}
                  >
                    {date.getDate()}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-white">{stats.completed}</p>
                <p className="text-xs text-zinc-500 mt-1">Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
                <p className="text-xs text-zinc-500 mt-1">Days</p>
              </div>
              <div>
                <p className="text-3xl font-bold" style={{ color: habit.color }}>
                  {stats.percentage}%
                </p>
                <p className="text-xs text-zinc-500 mt-1">Success</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${stats.percentage}%`,
                  backgroundColor: habit.color,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
