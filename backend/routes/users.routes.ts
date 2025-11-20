import { Router } from "express";
import type { Request, Response } from "express";
import { getUserHandler } from "../controllers/users.controller";
import jwtMiddleware from "../middleware/jwtMiddleware";

const usersRoutes = Router();

usersRoutes.get("/:id", jwtMiddleware, async (req: Request, res: Response) => {
  await getUserHandler(req, res);
});

export default usersRoutes;
