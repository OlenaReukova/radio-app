import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error:", err);

  if (err instanceof Error) {
    res.status(500).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: "Server error",
    });
  }
}
