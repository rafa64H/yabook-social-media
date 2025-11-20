import type { Request, Response } from "express";
import { postgresClient } from "../db/connectDB";
import { createUserSchema, loginUserSchema } from "../utils/inputValidation";
import hashPassword from "../utils/hashPassword";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants/env";
import jwt from "jsonwebtoken";
import { RequestError } from "../types/types";

export const createUserHandler = async (req: Request, res: Response) => {
  const { email, username, name, password } = req.body;
  const { error, value } = createUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const validationErrorMessages = error.details.map(
      (errorDetails) => errorDetails.message
    );
    throw new RequestError("Validation failed", 400, validationErrorMessages);
  }

  const {
    name: userDataName,
    username: userDataUsername,
    email: userDataEmail,
    password: userDataPassword,
  } = value;

  const hashedPassword = await hashPassword(userDataPassword);

  const [newUser] = await postgresClient("users")
    .insert({
      name: userDataName,
      username: userDataUsername,
      email: userDataEmail,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning(["id", "username", "email", "name", "created_at", "updated_at"]);

  const tokenPayload = { id: newUser.id, username: newUser.username };

  const accessToken = jwt.sign(tokenPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(tokenPayload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    message: "User created successfully",
    user: newUser,
    accessToken,
  });
};

export const loginUserHandler = async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;

  const { error, value } = loginUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const validationErrorMessages = error.details.map(
      (errorDetails) => errorDetails.message
    );
    throw new RequestError("Validation failed", 400, validationErrorMessages);
  }

  const userLogin = await postgresClient("users")
    .select("id", "email", "username", "name", "created_at", "updated_at")
    .where({ email: emailOrUsername });

  if (!userLogin[0]) {
    throw new RequestError("User not found", 404);
  }

  const tokenPayload = { id: userLogin[0].id, username: userLogin[0].username };

  const accessToken = jwt.sign(tokenPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(tokenPayload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json({ success: true, user: userLogin[0], accessToken });
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const decodedRefreshToken = jwt.verify(
    req.cookies.refreshToken,
    REFRESH_TOKEN_SECRET
  );
};
