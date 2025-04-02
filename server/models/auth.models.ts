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
        required: true
    },
    result: {
        type: String,
        required: true
    },
    aiAnalysis: {
        type: String,
        required: true
    }
})

const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  appointment: {
    type: Object,
  },
  senderId: {
    type: String,
  }
});

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    appointments: {
        type: [appointments],
    },
    accountType: {
        type: String,
        default: "basic"
    },
    scanResults: {
        type: [scanResults],
    },
    notifications: {
        type: [NotificationSchema],
    }

}, {timestamps: true})


export const User = mongoose.model("User", user);