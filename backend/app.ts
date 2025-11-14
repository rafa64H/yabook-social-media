import express from "express";
import "dotenv/config";
import { postgresClient } from "./db/connectDB";
import authRoutes from "./routes/auth.routes";
import errorHandler from "./middleware/errorHandler";

export const app = express();
app.use(express.json());

const PORT = 5000;

app.get("/", async (req, res) => {
  res.send("hola");
});

app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log("Server listening on port", PORT);

  //  const result = await postgresClient.select("*").from("customer");
});
