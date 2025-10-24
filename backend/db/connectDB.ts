import "dotenv/config";
import knex from "knex";
import config from "./knexfile";

export const postgresClient = knex(config.development);
