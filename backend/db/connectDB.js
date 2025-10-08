import { Client } from "pg";
import "dotenv/config";

export const connectionData = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

export const postgresClient = new Client(connectionData);
