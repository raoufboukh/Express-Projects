import mongoose from "mongoose";

const appointments = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const scanResults = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  aiAnalysis: {
    type: String,
    required: true,
  },
  labId: {
    type: String,
    required: true,
  },
});

const Result = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  dateAppointment: {
    type: Date,
    required: true,
  },
});

const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  appointment: {
    type: Object,
  },
  senderId: {
    type: String,
  },
});

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    appointments: {
      type: [appointments],
    },
    accountType: {
      type: String,
      default: "basic",
    },
    accountTypeExpire: {
      type: Date,
      default: null,
    },
    statusType: {
      type: String,
      default: null,
    },
    scanResults: {
      type: [scanResults],
    },
    results: {
      type: [Result],
    },
    notifications: {
      type: [NotificationSchema],
    },
    region: {
      type: String,
      required: true,
    },
    commune: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", user);
