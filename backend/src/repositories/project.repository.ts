import { Project } from './../entities/Project';
import { MySQLDataSource } from "../config/mysql.datasource";

export const ProjectRepository = MySQLDataSource.getRepository(Project);