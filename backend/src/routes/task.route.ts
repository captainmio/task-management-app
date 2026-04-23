import express from "express";
import { updateTask, createTask, getTasks } from "../controllers/task.controller";
import { authenticateToken } from "../middlewares/auth.middleware";


const router = express.Router();
router.get("/:projectId/tasks", authenticateToken, getTasks)
router.post("/", createTask);
router.put("/:id", updateTask);

export default router;