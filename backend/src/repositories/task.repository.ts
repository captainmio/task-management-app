import { Task } from './../entities/Task';
import { MySQLDataSource } from "../config/mysql.datasource";

export const TaskRepository = MySQLDataSource.getRepository(Task);