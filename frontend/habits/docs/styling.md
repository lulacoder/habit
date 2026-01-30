# Styling

## Tailwind v4
- Global import is defined at the top of `app/globals.css`:
  - `@import "tailwindcss";`
- PostCSS config is defined in `postcss.config.mjs` using `@tailwindcss/postcss`.

## Global Styles
- Base background and foreground colors are set using CSS variables.
- Dark mode variables are provided via `prefers-color-scheme`.

## Utility Usage
- Pages and components use utility classes for spacing, typography, colors, and layout.
- Emerald palette is used as the primary brand accent.
