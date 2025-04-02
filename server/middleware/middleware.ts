import jwt from "jsonwebtoken";
import { User } from "../models/auth.models.ts";

export const ProtectRoute = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Unauthorized - No token" });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || typeof decoded === "string")
      return res
        .status(401)
        .json({ message: "Unauthorized - Token verification failed" });

    const user = await User.findById((decoded as jwt.JwtPayload).id).select(
      "-password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
