import type { Request, Response } from "express";
import { postgresClient } from "../db/connectDB";
import { createUserSchema } from "../utils/inputValidation";
import hashPassword from "../utils/hashPassword";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../constants/env";
import jwt from "jsonwebtoken";

export const createUserHandler = async (req: Request, res: Response) => {
  const { email, username, name, password } = req.body;
  const { error, value } = createUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((d) => d.message),
    });
  }

  const {
    name: userDataName,
    username: userDataUsername,
    email: userDataEmail,
    password: userDataPassword,
  } = value;

  try {
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
      .returning([
        "id",
        "username",
        "email",
        "name",
        "created_at",
        "updated_at",
      ]);

    if (!newUser) {
      throw new Error("Failed to create user name");
    }

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
  } catch (error: any) {
    console.log(error);
    if (error.code) {
      if (error.code === "23505") {
        let stringToConcatenate = `${
          error.detail.includes("username") ? "username " : ""
        }${error.detail.includes("email") ? "email " : ""}`;

        return res
          .status(400)
          .json({ message: `${stringToConcatenate}are already in use` });
      }
    }

    return res
      .status(500)
      .json({ message: "Internal server error during user creation." });
  }
};
