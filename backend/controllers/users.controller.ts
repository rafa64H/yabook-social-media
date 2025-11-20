import type { Request, Response } from "express";

export async function getUserHandler(req: Request, res: Response) {
  res.sendStatus(200);
}
