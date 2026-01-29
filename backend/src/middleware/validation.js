import { z } from "zod";

export const habitSchema = z
	.object({
		title: z.string().min(1).max(100),
		description: z.string().min(1),
		frequency: z.enum(["daily", "weekly", "weekdays", "weekends"]),
		category: z.string().min(1),
		color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
	})
	.strict();

export const completionSchema = z
	.object({
		date: z.string().datetime(),
	})
	.strict();

export const validate = (schema) => (req, res, next) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		return res.status(400).json({ error: result.error });
	}

	req.body = result.data;
	return next();
};

export const validators = {
	habit: validate(habitSchema),
	completion: validate(completionSchema),
};
