import { Router } from "express";
import type { Request, Response } from "express";
import { createUserHandler, loginUserHandler } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/create-user", async (req: Request, res: Response) => {
  await createUserHandler(req, res);
});

authRoutes.post("/login", async(req: Request, res: Response) => {
  await loginUserHandler(req,res)
})

export default authRoutes;
