import express from "express";
import {
  acceptAppointment,
  addScan,
  bookAppointment,
  cancelAppointment,
  getDoctors,
  getNotifications,
  getOneDoctor,
  getOneUser,
  getScan,
  getUsers,
  rejectAppointment,
  updateAccountType,
} from "../controllers/user.controllers.js";
import { ProtectRoute } from "../middleware/middleware.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/", getDoctors);
userRouter.get("/:id", getOneUser);
userRouter.get("/:id", getOneDoctor);
userRouter.get("/scan", ProtectRoute, getScan);
userRouter.post("/scan", ProtectRoute, addScan);
userRouter.post("/appointment", ProtectRoute, bookAppointment);
userRouter.post("/appointment/:id", ProtectRoute, cancelAppointment);
userRouter.put("/account-type", ProtectRoute, updateAccountType);
userRouter.get("/notifications", ProtectRoute, getNotifications);
userRouter.put("/rejectNotification/:id", ProtectRoute, rejectAppointment);
userRouter.put("/acceptNotification/:id", ProtectRoute, acceptAppointment);

export default userRouter;