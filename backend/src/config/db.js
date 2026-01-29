import mongoose from "mongoose";

export async function connectDB() {
	const mongoUri = process.env.MONGODB_URI;
	if (!mongoUri) {
		throw new Error("MONGODB_URI is not set");
	}

	if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
		return mongoose.connection.db;
	}

	try {
		await mongoose.connect(mongoUri);
		console.log("MongoDB connected");
		if (!mongoose.connection.db) {
			throw new Error("MongoDB native db is not available");
		}
		return mongoose.connection.db;
	} catch (error) {
		console.error("MongoDB connection error", error);
		throw error;
	}
}
