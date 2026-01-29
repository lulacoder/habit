backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection setup
│   │   └── auth.js               # Better Auth instance & configuration
│   ├── middleware/
│   │   ├── requireAuth.js        # Better Auth session verification
│   │   └── validation.js         # Zod schemas & validation middleware
│   ├── models/
│   │   ├── Habit.js              # Mongoose schema definition
│   │   └── habit.repository.js   # Data Access Layer (all DB queries)
│   ├── routes/
│   │   ├── habits.js             # Route definitions (thin layer)
│   │   └── controllers.js        # Business logic / request handlers
│   └── server.js                 # Entry point & server setup
├── .env                          # Environment variables
└── package.json                  # Dependencies & scripts

Stack: Node.js (ES Modules) + Express + MongoDB (Mongoose) + Better Auth + Zod
Architecture: 3-Layer (Routes → Controllers → Repository) with Config/Middleware separation
Phase 1: Project Initialization
Objective: Initialize project with ES modules and install dependencies.
Instructions for Codex:
Create folder structure backend/ with src/ subdirectory
Run npm init -y and add "type": "module" to package.json
Install dependencies:
bash
Copy
npm install express mongoose mongodb better-auth zod cors dotenv
npm install --save-dev nodemon
Create .env.example with:
Copy
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/habit-tracker
BETTER_AUTH_SECRET=generate-a-32-char-min-secret-key-here
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
Add scripts to package.json:
JSON
Copy
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
Acceptance Criteria: npm install completes without errors. Folder structure exists.


Phase 2: Configuration Layer (Config Folder)
Objective: Database connection and Better Auth initialization.
File: src/config/db.js
Export async function connectDB() that:
Uses mongoose.connect(process.env.MONGODB_URI)
Returns mongoose.connection.db (native DB instance) for Better Auth adapter
Includes basic error handling and console.log on success
Use ES module imports (not require)
File: src/config/auth.js
Import betterAuth from better-auth
Import mongodbAdapter from better-auth/adapters/mongodb
Import connectDB from ./db.js
Export async function initAuth() that:
Awaits connectDB() to get DB instance
Returns betterAuth({...}) configured with:
database: mongodbAdapter(db)
emailAndPassword: { enabled: true, autoSignInAfterRegistration: true }
secret: process.env.BETTER_AUTH_SECRET
advanced.defaultCookieAttributes: { secure: process.env.NODE_ENV === 'production', sameSite: 'lax', httpOnly: true, path: '/' }
Export a lazy getter (e.g., getAuth()) that caches the initAuth() promise for server.js to use
Acceptance Criteria: initAuth() can be called and returns configured auth object without errors.

Phase 3: Middleware Layer
Objective: Authentication guard and request validation.
File: src/middleware/requireAuth.js
Export higher-order function (auth) => async (req, res, next)
Inside handler:
Call await auth.api.getSession({ headers: req.headers })
If no session: return 401 JSON { error: "Unauthorized" }
If session: set req.userId = session.user.id and call next()
Ensure it handles async errors properly (doesn't crash server)
File: src/middleware/validation.js
Import zod
Create habitSchema with strict Zod validation:
title: string, min 1, max 100
description: string, min 1
frequency: enum ["daily", "weekly", "weekdays", "weekends"]
category: string, min 1
color: string matching regex ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
Create completionSchema:
date: string in ISO datetime format (use z.string().datetime())
Export validate(schema) middleware factory:
Parses req.body with schema
On fail: return 400 with Zod error details
On success: call next()
Export validators object containing habit and completion (pre-wrapped with validate)
Acceptance Criteria: Middleware functions can be imported and used in Express routes.

Phase 4: Data Access Layer (Models)
Objective: Mongoose schema and Repository pattern implementation.
File: src/models/Habit.js
Import mongoose
Define schema with fields:
userId: String, required, indexed (for query performance)
title: String, required, trimmed, max 100 chars
description: String, required, trimmed
frequency: String, enum ["daily", "weekly", "weekdays", "weekends"], required
category: String, required, trimmed
color: String, required, validated with hex regex
completedDates: [Date] (array of dates, default empty)
timestamps: true (createdAt, updatedAt)
Export const Habit = mongoose.model('Habit', habitSchema)
File: src/models/habit.repository.js
Import Habit from ./Habit.js
Export habitRepository object with these exact method signatures:
JavaScript
Copy
findAllByUser(userId) -> Returns lean array, sorted by createdAt desc, excludes completedDates
findById(id, userId) -> Returns single habit (lean) excluding completedDates, or null
create(data) -> Creates and saves new habit, returns document
update(id, userId, data) -> Finds and updates, returns updated doc excluding completedDates
delete(id, userId) -> Finds and deletes, returns deleted doc
getCompletions(id, userId) -> Returns only { completedDates } array
addCompletion(id, userId, date) -> Uses $addToSet to add date, returns doc with dates
removeCompletion(id, userId, date) -> Uses $pull to remove date, returns doc with dates
Implementation rules:
Use .lean() for read operations (performance)
Use .select('-completedDates') where specified
Handle MongoDB ObjectId vs String correctly (mongoose handles this)
Acceptance Criteria: Repository methods can be called and perform CRUD operations on MongoDB.