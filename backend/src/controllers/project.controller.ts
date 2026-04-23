import { ProjectRepository } from "../repositories/project.repository";
import { Request, Response } from "express";

const repo = ProjectRepository;

type getProjectsType = {
    userId?: number;
}

export const getProjects = async (req: Request, res: Response) => {
    const { userId } = req.params as getProjectsType;



    const projects = await repo.find({
        where: { userId: userId },
    });

    res.json({
        success: true,
        data: projects,
    });
}