// src/config/mysql.datasource.ts
import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const MySQLDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "app_db",
  entities: [User],
  synchronize: true,
});