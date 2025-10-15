"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PG_PORT = exports.PG_PASSWORD = exports.PG_DATABASE = exports.PG_USER = exports.PG_HOST = void 0;
const getEnv = (key) => {
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
exports.PG_HOST = getEnv("PG_HOST");
exports.PG_USER = getEnv("PG_USER");
exports.PG_DATABASE = getEnv("PG_DATABASE");
exports.PG_PASSWORD = getEnv("PG_PASSWORD");
exports.PG_PORT = getEnv("PG_PORT");
