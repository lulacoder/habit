# Repository

## File
- src/models/habit.repository.js

## Methods
- findAllByUser(userId)
  - Returns lean array, sorted by createdAt desc, excludes completedDates
- findById(id, userId)
  - Returns lean habit, excludes completedDates
- create(data)
  - Creates and saves a habit document
- update(id, userId, data)
  - Returns updated habit, excludes completedDates
- delete(id, userId)
  - Deletes and returns habit document
- getCompletions(id, userId)
  - Returns { completedDates }
- addCompletion(id, userId, date)
  - $addToSet completedDates, returns { completedDates }
- removeCompletion(id, userId, date)
  - $pull completedDates, returns { completedDates }

## Notes
- Read operations use lean for performance.
- Controllers use repository for all database access.
