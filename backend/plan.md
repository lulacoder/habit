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

