# Controllers

## File
- src/routes/controllers.js

## Responsibility
- Handle HTTP requests using repository methods only.
- Always scopes queries by req.userId.
- Wraps all handlers in try/catch and returns 500 on errors.

## Methods
- getHabits
- createHabit
- getHabit
- updateHabit
- deleteHabit
- getCompletions
- addCompletion
- removeCompletion

## Responses
- 200 for successful reads and updates
- 201 for create
- 404 for not found
- 500 for unexpected errors
