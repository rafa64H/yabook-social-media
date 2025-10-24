import type { Knex } from "knex";
import "dotenv/config";
const getEnv = (key: string): string | number => {
  const value = process.env[key];

  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`);
  }

  if (value === "PG_PORT") {
    if (typeof value !== "number")
      throw Error(`Wrong environment variable value for ${key}`);

    const numberValue = Number(value);
    return numberValue;
  }

  return value;
};

export const PG_HOST = getEnv("PG_HOST") as string;
export const PG_USER = getEnv("PG_USER") as string;
export const PG_DATABASE = getEnv("PG_DATABASE") as string;
export const PG_PASSWORD = getEnv("PG_PASSWORD") as string;
export const PG_PORT = getEnv("PG_PORT") as number;

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: PG_HOST,
      port: PG_PORT,
      user: PG_USER,
      database: PG_DATABASE,
      password: PG_PASSWORD,
    },
    pool: {
      min: 2,
      max: 2,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "migrations",
    },
  },
};

export default config;
