import { Client } from "pg";
import "dotenv/config";
import {
  PG_USER,
  PG_HOST,
  PG_DATABASE,
  PG_PASSWORD,
  PG_PORT,
} from "../constants/env";

export const connectionData = {
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
};

export const postgresClient = new Client(connectionData);
