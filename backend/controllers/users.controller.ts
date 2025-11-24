import type { Request, Response } from "express";
import { postgresClient } from "../db/connectDB";

export async function getUserHandler(req: Request, res: Response) {
  const user = await postgresClient("users")
    .select("id", "email", "username", "name", "created_at", "updated_at")
    .where({ id: Number(req.params.id) });

  res.status(200).json({ success: true, user: user[0] });
}
