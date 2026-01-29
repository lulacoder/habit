import mongoose from "mongoose";

const { Schema } = mongoose;

const habitSchema = new Schema(
	{
		userId: { type: String, required: true, index: true },
		title: { type: String, required: true, trim: true, maxlength: 100 },
		description: { type: String, required: true, trim: true },
		frequency: {
			type: String,
			required: true,
			enum: ["daily", "weekly", "weekdays", "weekends"],
		},
		category: { type: String, required: true, trim: true },
		color: {
			type: String,
			required: true,
			validate: {
				validator: (value) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value),
				message: "Color must be a valid hex value",
			},
		},
		completedDates: { type: [Date], default: [] },
	},
	{ timestamps: true }
);

export const Habit = mongoose.model("Habit", habitSchema);
