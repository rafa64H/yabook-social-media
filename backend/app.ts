import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import errorHandler from "./middleware/errorHandler";
import usersRoutes from "./routes/users.routes";

export const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = 5000;

app.get("/", async (req, res) => {
  res.send("hola");
});

app.use("/auth", authRoutes);

app.use("/api/users/", usersRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log("Server listening on port", PORT);

  //  const result = await postgresClient.select("*").from("customer");
});
