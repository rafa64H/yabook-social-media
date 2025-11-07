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

export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET") as string;
export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET") as string;
