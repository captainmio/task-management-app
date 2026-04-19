import express from "express";
import { updateTask, createTask, getTasks } from "../controllers/task.controller";


const router = express.Router();
router.get("/:projectId/tasks", getTasks)
router.post("/", createTask);
router.put("/:id", updateTask);

export default router;