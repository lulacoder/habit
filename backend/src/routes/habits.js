import { Router } from "express";
import { habitController } from "./controllers.js";
import { validators } from "../middleware/validation.js";

const router = Router();

router.get("/", habitController.getHabits);
router.post("/", validators.habit, habitController.createHabit);
router.get("/:id", habitController.getHabit);
router.put("/:id", validators.habit, habitController.updateHabit);
router.delete("/:id", habitController.deleteHabit);

router.get("/:id/completions", habitController.getCompletions);
router.post(
	"/:id/completions",
	validators.completion,
	habitController.addCompletion
);
router.delete("/:id/completions/:date", habitController.removeCompletion);

export default router;
