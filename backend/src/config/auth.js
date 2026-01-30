import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "./db.js";

let authInstancePromise = null;

export async function initAuth() {
	const db = await connectDB();
	return betterAuth({
		database: mongodbAdapter(db),
		emailAndPassword: {
			enabled: true,
			autoSignInAfterRegistration: true,
		},
		baseURL: process.env.BETTER_AUTH_BASE_URL,
		secret: process.env.BETTER_AUTH_SECRET,
		trustedOrigins: [process.env.FRONTEND_URL],
		advanced: {
			defaultCookieAttributes: {
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				httpOnly: true,
				path: "/",
			},
		},
	});
}

export async function getAuth() {
	if (!authInstancePromise) {
		authInstancePromise = initAuth();
	}
	return authInstancePromise;
}
