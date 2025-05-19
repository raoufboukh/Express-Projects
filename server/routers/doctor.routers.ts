import {
  addDoctor,
  deleteDoctor,
  getDoctors,
} from "controllers/doctor.controllers.ts";
import express from "express";

const doctorRouter = express.Router();

doctorRouter.get("/", getDoctors);
doctorRouter.post("/", addDoctor);
doctorRouter.delete("/delete/:id", deleteDoctor);

export default doctorRouter;
