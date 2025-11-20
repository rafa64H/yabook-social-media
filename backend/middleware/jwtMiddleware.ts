import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestError } from "../types/types";
import { ACCESS_TOKEN_SECRET } from "../constants/env";

export default async function jwtMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader)
    throw new RequestError("No authorization header received", 400);

  const splitAuthorizationString = authorizationHeader.split(" ");

  if (
    !(
      splitAuthorizationString[0] === "Bearer" ||
      splitAuthorizationString[0] === "bearer"
    )
  )
    throw new RequestError("Authorization header wrong", 400);

  const accessToken = splitAuthorizationString[1];

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

  next();
}
