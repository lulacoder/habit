import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "./db.js";

let authInstancePromise = null;

// this is the auth config file
export async function initAuth() {
	const db = await connectDB(); // connect to the database
	return betterAuth({
		database: mongodbAdapter(db), // use the database adapter
		emailAndPassword: {
			enabled: true,
			autoSignInAfterRegistration: true,
		},
		baseURL: process.env.BETTER_AUTH_BASE_URL, // the base url for the auth server
		secret: process.env.BETTER_AUTH_SECRET, // the secret for the auth server
		trustedOrigins: [process.env.FRONTEND_URL], // the trusted origins for the auth server
		advanced: {
			defaultCookieAttributes: {
				secure: process.env.NODE_ENV === "production", // whether to use secure cookies
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
