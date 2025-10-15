"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const connectDB_1 = require("./db/connectDB");
const app = (0, express_1.default)();
const PORT = 5000;
app.get("/", async (req, res) => {
    res.send("hola");
});
app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
    console.log(connectDB_1.connectionData);
    connectDB_1.postgresClient
        .connect()
        .then(() => {
        console.log("connected psql");
    })
        .catch((error) => console.log(error));
});
