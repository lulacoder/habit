# Routes

## File
- src/routes/habits.js

## Habits API
Base path: /api/habits

- GET / -> getHabits
- POST / -> validators.habit, createHabit
- GET /:id -> getHabit
- PUT /:id -> validators.habit, updateHabit
- DELETE /:id -> deleteHabit

## Completions API
- GET /:id/completions -> getCompletions
- POST /:id/completions -> validators.completion, addCompletion
- DELETE /:id/completions/:date -> removeCompletion
