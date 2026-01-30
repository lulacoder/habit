"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { ColorPicker } from "./color-picker";
import { habitsApi } from "@/lib/api";
import {
  FREQUENCY_OPTIONS,
  CATEGORY_SUGGESTIONS,
  PRESET_COLORS,
  type CreateHabitInput,
  type Habit,
} from "@/types/habit";

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (habit: Habit) => void;
}

export function CreateHabitModal({
  isOpen,
  onClose,
  onCreated,
}: CreateHabitModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateHabitInput>({
    title: "",
    description: "",
    frequency: "daily",
    category: "",
    color: PRESET_COLORS[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (formData.title.length > 100) {
      setError("Title must be 100 characters or less");
      return;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!formData.category.trim()) {
      setError("Category is required");
      return;
    }
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(formData.color)) {
      setError("Please select a valid color");
      return;
    }

    setIsSubmitting(true);
    try {
      const habit = await habitsApi.create(formData);
      onCreated(habit);
      // Reset form
      setFormData({
        title: "",
        description: "",
        frequency: "daily",
        category: "",
        color: PRESET_COLORS[0],
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create habit");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    field: keyof CreateHabitInput,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#111118]/95 shadow-2xl shadow-black/50 backdrop-blur-xl animate-slide-up">
        {/* Gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                <Sparkles className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Create New Habit</h2>
                <p className="text-sm text-zinc-400">Build consistency one habit at a time</p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-zinc-300">
              Habit Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g., Exercise for 30 minutes"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-zinc-500 transition-all focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 focus:bg-white/[0.07]"
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-zinc-300">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Why is this habit important to you?"
              rows={3}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-zinc-500 transition-all focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 focus:bg-white/[0.07]"
            />
          </div>

          {/* Frequency & Category Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Frequency */}
            <div className="space-y-2">
              <label htmlFor="frequency" className="text-sm font-medium text-zinc-300">
                Frequency
              </label>
              <select
                id="frequency"
                value={formData.frequency}
                onChange={(e) => handleChange("frequency", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white transition-all focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
              >
                {FREQUENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-zinc-900">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-zinc-300">
                Category
              </label>
              <input
                type="text"
                id="category"
                list="category-suggestions"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="e.g., Health"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-zinc-500 transition-all focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 focus:bg-white/[0.07]"
              />
              <datalist id="category-suggestions">
                {CATEGORY_SUGGESTIONS.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Accent Color
            </label>
            <ColorPicker
              value={formData.color}
              onChange={(color) => handleChange("color", color)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium text-zinc-300 transition hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Habit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
