import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routers/auth.routers.ts";
import userRouter from "./routers/user.routers.ts";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/auth", router);
app.use("/users", userRouter);

const port = process.env.PORT || 5000;

const connectionUrl = process.env.CONNECTION_URL;
if (!connectionUrl) {
  throw new Error("CONNECTION_URL is not defined in the environment variables");
}

mongoose.connect(connectionUrl).then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
