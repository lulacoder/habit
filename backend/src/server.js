import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { initAuth } from "./config/auth.js";
import { requireAuth } from "./middleware/requireAuth.js";
import habitRoutes from "./routes/habits.js";

dotenv.config();

const app = express();

async function startServer() {
	const auth = await initAuth();

	app.use(
		cors({
			origin: process.env.FRONTEND_URL,
			credentials: true,
		})
	);

	app.use("/api/auth", toNodeHandler(auth));
	app.use(express.json());

	app.use("/api/habits", requireAuth(auth), habitRoutes);

	app.get("/health", (req, res) => res.json({ status: "ok" }));

	const port = process.env.PORT || 3001;
	app.listen(port, () => {
		console.log(`Server listening on port ${port}`);
	});
}

startServer().catch((error) => {
	console.error("Failed to start server", error);
	process.exit(1);
});
