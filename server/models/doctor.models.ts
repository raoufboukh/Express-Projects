import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    commune: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    startDay: {
      type: String,
      required: true,
    },
    endDay: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
