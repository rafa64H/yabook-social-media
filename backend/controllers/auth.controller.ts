import type { Request, Response } from "express";
import { postgresClient } from "../db/connectDB";
export async function createUserHandler(req: Request, res: Response) {
  const { name, username, email, password } = req.body as {
    name: string;
    username: string;
    email: string;
    password: string;
  };

  const result = await postgresClient
    .table("users")
    .insert({ name, username, email, password });

  console.log(result);

  res.sendStatus(201);
}
