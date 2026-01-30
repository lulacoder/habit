# Models

## Habit Model
File: src/models/Habit.js

### Fields
- userId: String, required, indexed
- title: String, required, trimmed, max 100
- description: String, required, trimmed
- frequency: String, enum daily|weekly|weekdays|weekends
- category: String, required, trimmed
- color: String, required, hex validation
- completedDates: [Date], default []

### Metadata
- timestamps: true
