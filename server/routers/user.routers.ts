import express from "express";
import {
  acceptAppointment,
  acceptNotification,
  addResult,
  addScan,
  addUser,
  bookAppointment,
  cancelAppointment,
  deleteNotification,
  deleteUser,
  getDoctors,
  getOneDoctor,
  getOneUser,
  getUsers,
  modifyAppointment,
  rejectAppointment,
  rejectNotification,
  updateAccountType,
} from "../controllers/user.controllers.ts";
import { checkPrimaryExpire, ProtectRoute } from "../middleware/middleware.ts";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", ProtectRoute, addUser);
userRouter.get("/doctors", getDoctors);
userRouter.get("/:id", getOneUser);
userRouter.get("/doctors/:id", getOneDoctor);
userRouter.post("/scan", ProtectRoute, checkPrimaryExpire, addScan);
userRouter.post(
  "/appointment",
  ProtectRoute,
  checkPrimaryExpire,
  bookAppointment
);
userRouter.post("/add-result/:id", ProtectRoute, addResult);
userRouter.delete("/appointment/:id", ProtectRoute, cancelAppointment);
userRouter.delete("/:id", ProtectRoute, deleteUser);
userRouter.put("/update/:id", ProtectRoute, modifyAppointment);
userRouter.put(
  "/account-type",
  ProtectRoute,
  checkPrimaryExpire,
  updateAccountType
);
userRouter.put("/rejectNotification/:id", ProtectRoute, rejectAppointment);
userRouter.put("/acceptNotification/:id", ProtectRoute, acceptAppointment);
userRouter.put(
  "/acceptAccountType/:id",
  ProtectRoute,
  checkPrimaryExpire,
  acceptNotification
);
userRouter.put(
  "/rejectAccountType/:id",
  ProtectRoute,
  checkPrimaryExpire,
  rejectNotification
);
userRouter.put("/deleteNotification/:id", ProtectRoute, deleteNotification);

export default userRouter;
