import { MySQLDataSource } from './../config/mysql.datasource';
// controllers/task.controller.ts
import { Request, Response } from "express";
import { TaskRepository } from '../repositories/task.repository';

const repo = TaskRepository;

type getTaskReq = {
  projectId: number;
}

export const getTasks = async (req: Request, res: Response) => {
  const { projectId } = req.params as unknown as getTaskReq;
  const tasks = await repo.find({
    where: { projectId: projectId },
  });

  res.json({
    success: true,
    data: tasks,
  });
};

export const updateTask = async (req: any, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = await repo.findOneBy({ id });
  if (!task) return res.status(404).json({ message: "Not found" });

  if (task.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  task.status = status;
  await repo.save(task);

  req.io.to(`user_${task.userId}`).emit("taskUpdated", task);

  res.json(task);
};

export const createTask = async (req: any, res: Response) => {
  const { title } = req.body;

  const task = repo.create({
    title,
    status: "todo",
    userId: req.user.id,
  });

  await repo.save(task);

  req.io.to(`user_${task.userId}`).emit("taskCreated", task);

  res.json(task);
};