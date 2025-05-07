import { getDoctors } from "controllers/user.controllers.ts";
import express from "express";

const doctorRouter = express.Router();

doctorRouter.get("/", getDoctors);
doctorRouter.post("/", getDoctors);

export default doctorRouter;
