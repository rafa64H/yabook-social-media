import { Router } from "express";
import type { Request, Response } from "express";
import { createUserHandler } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/create-user", async (req: Request, res: Response) => {
  await createUserHandler(req, res);
});

export default authRoutes;
