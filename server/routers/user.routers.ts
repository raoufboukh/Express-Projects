import express from "express";
import {
  acceptAppointment,
  addScan,
  addUser,
  bookAppointment,
  cancelAppointment,
  deleteUser,
  getDoctors,
  getOneDoctor,
  getOneUser,
  getUsers,
  modifyAppointment,
  rejectAppointment,
  updateAccountType,
} from "../controllers/user.controllers.ts";
import { ProtectRoute } from "../middleware/middleware.ts";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", ProtectRoute, addUser);
userRouter.get("/doctors", getDoctors);
userRouter.get("/:id", getOneUser);
userRouter.get("/doctors/:id", getOneDoctor);
userRouter.post("/scan", ProtectRoute, addScan);
userRouter.post("/appointment", ProtectRoute, bookAppointment);
userRouter.delete("/appointment/:id", ProtectRoute, cancelAppointment);
userRouter.delete("/:id", ProtectRoute, deleteUser);
userRouter.put("/update/:id", ProtectRoute, modifyAppointment);
userRouter.put("/account-type", ProtectRoute, updateAccountType);
userRouter.put("/rejectNotification/:id", ProtectRoute, rejectAppointment);
userRouter.put("/acceptNotification/:id", ProtectRoute, acceptAppointment);

export default userRouter;
