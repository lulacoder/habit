# Middleware

## Auth Guard
File: src/middleware/requireAuth.js

- Higher-order middleware: requireAuth(auth)
- Validates session with auth.api.getSession
- On success: sets req.userId
- On failure: returns 401 { error: "Unauthorized" }

## Validation
File: src/middleware/validation.js

### Schemas
- habitSchema
  - title: string, 1-100
  - description: string, min 1
  - frequency: enum daily | weekly | weekdays | weekends
  - category: string, min 1
  - color: hex string (#RGB or #RRGGBB)
- completionSchema
  - date: ISO datetime string

### validate(schema)
- Parses req.body using Zod
- 400 on validation error with Zod error payload
- Sanitizes req.body to parsed values

### validators
- validators.habit
- validators.completion
