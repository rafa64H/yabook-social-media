import express from "express";
import "dotenv/config";
import { connectionData, postgresClient } from "./db/connectDB.js";

const app = express();

const PORT = 5000;

app.get("/", async (req, res) => {
  res.send("hola");
});

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
  console.log(connectionData);

  postgresClient
    .connect()
    .then(() => {
      console.log("connected psql");
    })
    .catch((error) => console.log(error));
});
