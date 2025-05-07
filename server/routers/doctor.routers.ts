import { addDoctor, getDoctors } from "controllers/user.controllers.ts";
import express from "express";

const doctorRouter = express.Router();

doctorRouter.get("/", getDoctors);
doctorRouter.post("/", addDoctor);

export default doctorRouter;
