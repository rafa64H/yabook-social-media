"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresClient = exports.connectionData = void 0;
const pg_1 = require("pg");
require("dotenv/config");
const env_1 = require("../constants/env");
exports.connectionData = {
    user: env_1.PG_USER,
    host: env_1.PG_HOST,
    database: env_1.PG_DATABASE,
    password: env_1.PG_PASSWORD,
    port: env_1.PG_PORT,
};
exports.postgresClient = new pg_1.Client(exports.connectionData);
