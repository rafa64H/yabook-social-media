import { Request, Response, NextFunction } from "express";
import { RequestError } from "../types/types";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export default async function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  if (typeof error === "object" && error !== null && "code" in error) {
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
  }

  if (error instanceof RequestError) {
    if (error.validationErrors) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        validationErrors: error.validationErrors,
      });
    }
    return res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }

  if (error instanceof TokenExpiredError) {
    return res.status(401).json({ success: false, message: "jwt expired" });
  }
  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ success: false, message: "jwt not valid" });
  }

  return res.status(500);
}

function isDatabaseError(error: unknown) {
  if (typeof error === "object" && error !== null && "code" in error) {
    return true;
  }
}
