import habitRepository from "../models/habit.repository.js";

export const habitController = {
	async getHabits(req, res) {
		try {
			const habits = await habitRepository.findAllByUser(req.userId);
			return res.status(200).json(habits);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async createHabit(req, res) {
		try {
			const habit = await habitRepository.create({
				...req.body,
				userId: req.userId,
			});
			return res.status(201).json(habit);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async getHabit(req, res) {
		try {
			const habit = await habitRepository.findById(req.params.id, req.userId);

			if (!habit) {
				return res.status(404).json({ error: "Habit not found" });
			}

			return res.status(200).json(habit);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async updateHabit(req, res) {
		try {
			const habit = await habitRepository.update(
				req.params.id,
				req.userId,
				req.body
			);

			if (!habit) {
				return res.status(404).json({ error: "Habit not found" });
			}

			return res.status(200).json(habit);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async deleteHabit(req, res) {
		try {
			const habit = await habitRepository.delete(req.params.id, req.userId);

			if (!habit) {
				return res.status(404).json({ error: "Habit not found" });
			}

			return res.status(200).json({ message: "Habit deleted" });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async getCompletions(req, res) {
		try {
			const result = await habitRepository.getCompletions(
				req.params.id,
				req.userId
			);

			if (!result) {
				return res.status(404).json({ error: "Habit not found" });
			}

			return res.status(200).json({ completedDates: result.completedDates });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async addCompletion(req, res) {
		try {
			const date = new Date(req.body.date);
			const result = await habitRepository.addCompletion(
				req.params.id,
				req.userId,
				date
			);

			if (!result) {
				return res.status(404).json({ error: "Habit not found" });
			}

			return res.status(200).json({ completedDates: result.completedDates });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	async removeCompletion(req, res) {
		try {
			const date = new Date(req.params.date);
			const result = await habitRepository.removeCompletion(
				req.params.id,
				req.userId,
				date
			);

			if (!result) {
				return res.status(404).json({ error: "Habit not found" });
			}

			return res.status(200).json({ completedDates: result.completedDates });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
