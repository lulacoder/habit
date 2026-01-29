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