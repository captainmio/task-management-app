import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { getProjects } from "../controllers/project.controller";


const router = express.Router();
router.get("/:userId", authenticateToken, getProjects)

export default router;