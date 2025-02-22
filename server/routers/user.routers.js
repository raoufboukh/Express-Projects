import express from "express";
import { acceptAppointment, addScan, bookAppointment, getNotifications, getScan, getUsers, rejectAppointment, updateAccountType } from "../controllers/user.controllers.js";
import { ProtectRoute } from "../middleware/middleware.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/scan",ProtectRoute ,getScan);
userRouter.post("/scan",ProtectRoute ,addScan);
userRouter.post("/appointment",ProtectRoute ,bookAppointment);
userRouter.put("/account-type", ProtectRoute, updateAccountType);
userRouter.get("/notifications", ProtectRoute, getNotifications);
userRouter.put("/rejectNotification/:id", ProtectRoute, rejectAppointment);
userRouter.put("/acceptNotification/:id", ProtectRoute, acceptAppointment);

export default userRouter;