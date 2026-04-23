import * as dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata";


import { MySQLDataSource } from "./config/mysql.datasource";
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.route';
import taskRoutes from './routes/task.route';
import projectRoutes from './routes/project.route';

import http from "http";


export const initDatabases = async () => {
  try {
    await MySQLDataSource.initialize();
    console.log("MySQL connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

const app = express()
app.use(express.json())
app.use(cors())


const server = http.createServer(app);



const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);

app.listen(3000, async () => {
  await initDatabases();

  console.log("server is running on port " + PORT);
})


