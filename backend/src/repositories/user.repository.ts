import { MySQLDataSource } from "../config/mysql.datasource";
import { User } from "../entities/User";

export const UserRepository = MySQLDataSource.getRepository(User);