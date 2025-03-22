import mongoose from "mongoose";
import { User } from "../models/auth.models.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role)
      return res.status(400).json({
        message: `${
          !username
            ? "username is required"
            : !email
            ? "email is required"
            : !password
            ? "password is required"
            : "role is required"
        }`,
      });
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{5,}\.[a-zA-Z]{2,}/.test(email))
      return res.status(400).json({ message: "Invalid email" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPass, role });
    if (user) {
      await user.save();
    }
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneDoctor = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id).select("-password");
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addScan = async (req, res) => {
  try {
    const { date, result, aiAnalysis } = req.body;
    if (!date) return res.status(400).json({ message: "Date required" });
    if (!result) return res.status(400).json({ message: "Result required" });
    if (!aiAnalysis)
      return res.status(400).json({ message: "AI Analysis required" });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          scanResults: {
            date,
            result,
            aiAnalysis,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Add Scan Successeful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { firstName, lastName, number, time, date } = req.body;
    if (!date || !firstName || !lastName || !number || !time)
      return res.status(400).json({
        message: `${
          !firstName
            ? "FirstName is required"
            : !lastName
            ? "LastName is required"
            : !number
            ? "Number is required"
            : !time
            ? "Time is required"
            : "Date is required"
        }`,
      });

      if (
        req.user.accountType === "basic" &&
        req.user.appointments.length >= 1 &&
        req.user.role !== "admin"
      )
        return res
          .status(400)
          .json({ message: "You can only book one appointment at a time" });

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          appointments: {
            firstName,
            lastName,
            number,
            time,
            date,
          },
        },
      },
      { new: true }
    );

    admins.forEach(async (admin) => {
      await User.findByIdAndUpdate(admin._id, {
        $push: {
          notifications: {
            message: `book appointment from ${
              user.username.charAt(0).toUpperCase() + user.username.slice(1)
            }`,
            appointment: {
              _id: user.appointments[user.appointments.length - 1]._id,
              firstName,
              lastName,
              number,
              time,
              date,
            },
            senderId: user._id,
          },
        },
      });
    });
    res.status(200).json({ message: "Booking Done" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Appointment ID required" });
    const appointmentId = new mongoose.Types.ObjectId(id);
    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          appointments: { _id: appointmentId },
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Updated User Appointments:", user.appointments);
    await Promise.all(
      admins.map(async (admin) => {
        const updatedAdmin = await User.findByIdAndUpdate(
          admin._id,
          {
            $pull: {
              notifications: { "appointment._id": appointmentId },
            },
          },
          { new: true }
        );
      })
    );

    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAccountType = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        accountType: "premium",
      },
      { new: true }
    );
    setTimeout(async () => {
      await User.findByIdAndUpdate(req.user._id, {
        accountType: "basic",
      });
    }, 30 * 24 * 60 * 60 * 1000);
    res.status(200).json({ message: "Updated Account Successeful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Notification ID required" });

    const notification = await User.findOne(
      { _id: req.user._id, "notifications._id": id },
      { "notifications.$": 1 }
    );

    if (!notification || !notification.notifications[0])
      return res.status(404).json({ message: "Notification not found" });

    const senderId = notification.notifications[0].senderId;
    const appointmentId = notification.notifications[0].appointment._id;
    const userSender = await User.findOneAndUpdate(
      {
        _id: senderId,
        "appointments._id": appointmentId,
      },
      {
        $set: {
          "appointments.$.status": "rejected",
        },
      },
      { new: true }
    );
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          notifications: {
            _id: id,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({
      notifications: user.notifications,
      appointments: userSender.appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const acceptAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Notification ID required" });

    const notification = await User.findOne(
      { _id: req.user._id, "notifications._id": id },
      { "notifications.$": 1 }
    );

    if (!notification || !notification.notifications[0])
      return res.status(404).json({ message: "Notification not found" });

    const senderId = notification.notifications[0].senderId;
    const appointmentId = notification.notifications[0].appointment._id;
    const userSender = await User.findOneAndUpdate(
      {
        _id: senderId,
        "appointments._id": appointmentId,
      },
      {
        $set: {
          "appointments.$.status": "accepted",
        },
      },
      { new: true }
    );
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          notifications: {
            _id: id,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({
      notifications: user.notifications,
      appointments: userSender.appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
