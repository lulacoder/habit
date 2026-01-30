"use client";

import { PRESET_COLORS } from "@/types/habit";
import { Check } from "lucide-react";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className="relative h-8 w-8 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-zinc-900"
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          >
            {value === color && (
              <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-md" />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="custom-color" className="text-xs text-zinc-400">
          Custom:
        </label>
        <input
          type="color"
          id="custom-color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-12 cursor-pointer rounded border border-white/10 bg-transparent"
        />
        <span className="text-xs text-zinc-500 font-mono">{value}</span>
      </div>
    </div>
  );
}
