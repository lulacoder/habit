import { Habit } from "./Habit.js";

export const habitRepository = {
	async findAllByUser(userId) {
		return Habit.find({ userId })
			.select("-completedDates")
			.sort({ createdAt: -1 })
			.lean();
	},

	async findById(id, userId) {
		return Habit.findOne({ _id: id, userId })
			.select("-completedDates")
			.lean();
	},

	async create(data) {
		const habit = new Habit(data);
		return habit.save();
	},

	async update(id, userId, data) {
		return Habit.findOneAndUpdate({ _id: id, userId }, data, {
			new: true,
		})
			.select("-completedDates")
			.lean();
	},

	async delete(id, userId) {
		return Habit.findOneAndDelete({ _id: id, userId });
	},

	async getCompletions(id, userId) {
		return Habit.findOne({ _id: id, userId }).select("completedDates").lean();
	},

	async addCompletion(id, userId, date) {
		return Habit.findOneAndUpdate(
			{ _id: id, userId },
			{ $addToSet: { completedDates: date } },
			{ new: true }
		).select("completedDates");
	},

	async removeCompletion(id, userId, date) {
		return Habit.findOneAndUpdate(
			{ _id: id, userId },
			{ $pull: { completedDates: date } },
			{ new: true }
		).select("completedDates");
	},
};
