import mongoose from "mongoose";
import { User } from "../models/auth.models.ts";
import bcrypt from "bcrypt";
import cloudinary from "lib/cloudinary.ts";

export const getUsers = async (req: any, res: any) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addUser = async (req: any, res: any) => {
  try {
    const { username, email, password, role, region, commune } = req.body;
    if (!username || !email || !password || !role || !region || !commune)
      return res.status(400).json({
        message: `${
          !username
            ? "username is required"
            : !email
            ? "email is required"
            : !password
            ? "password is required"
            : !role
            ? "role is required"
            : !region
            ? "region is required"
            : "commune is required"
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
    const user = new User({
      username,
      email,
      password: hashedPass,
      role,
      region,
      commune,
    });
    if (user) {
      await user.save();
    }
    res.status(201).json({ message: "User added successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "User ID required" });
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctors = async (req: any, res: any) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.status(200).json(doctors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneDoctor = async (req: any, res: any) => {
  try {
    const doctor = await User.findById(req.params.id).select("-password");
    res.status(200).json(doctor);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addScan = async (req: any, res: any) => {
  try {
    const { date, result, aiAnalysis, labId } = req.body;
    if (!date || !result || !aiAnalysis)
      return res.status(400).json({
        message: `${
          !date
            ? "Date is required"
            : !result
            ? "Result is required"
            : "AI Analysis is required"
        }`,
      });
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          scanResults: {
            date,
            result,
            aiAnalysis,
            labId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Add Scan Successeful" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addResult = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { dateAppointment } = req.body;
    if (!id || !dateAppointment)
      return res
        .status(400)
        .json({ message: id ? "ID required" : "Date required" });
    const { image } = req.body;
    if (!image)
      return res.status(400).json({
        message: `${"Image is required"}`,
      });
    const cloudImage = await cloudinary.uploader.upload(image);
    const imageUrl = cloudImage.secure_url;
    await User.findByIdAndUpdate(
      id,
      {
        $push: {
          results: {
            date: new Date(),
            image: imageUrl,
            dateAppointment,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Add Result Successeful" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const bookAppointment = async (req: any, res: any) => {
  try {
    const { firstName, lastName, number, time, date, message } = req.body;
    if (!date || !firstName || !lastName || !number || !time || !message)
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
            : !date
            ? "Date is required"
            : "Message is required"
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
            message,
          },
        },
      },
      { new: true }
    );

    admins.forEach(async (admin) => {
      await User.findByIdAndUpdate(admin._id, {
        $push: {
          notifications: {
            message: `${
              message.charAt(0).toUpperCase() + message.slice(1)
            } from ${
              user &&
              user.username.charAt(0).toUpperCase() + user.username.slice(1)
            }`,
            appointment: {
              _id: user?.appointments[user.appointments.toObject().length - 1]
                ._id,
              firstName,
              lastName,
              number,
              time,
              date,
              status:
                user?.appointments[user.appointments.toObject().length - 1]
                  .status,
            },
            senderId: user?._id,
          },
        },
      });
    });
    res.status(200).json({ message: "Booking Done" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const modifyAppointment = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, number, time, date, message } = req.body;
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
            : !date
            ? "Date is required"
            : "Message is required"
        }`,
      });
    const appointmentId = new mongoose.Types.ObjectId(id);
    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(400).json({ message: "Aucun Admin trouve" });
    await User.findOneAndUpdate(
      {
        _id: req.user._id,
        "appointments._id": appointmentId,
      },
      {
        $set: {
          appointments: {
            _id: appointmentId,
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

    admins.forEach(async (admin: any) => {
      await User.findByIdAndUpdate(admin._id, {
        $set: {
          notifications: {
            message: message,
            appointment: {
              _id: appointmentId,
              firstName,
              lastName,
              number,
              time,
              date,
              status: "pending",
            },
            senderId: req.user._id,
          },
        },
      });
    });
    res.status(200).json({ message: "Appointment modified success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const cancelAppointment = async (req: any, res: any) => {
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
    await Promise.all(
      admins.map(async (admin) => {
        await User.findByIdAndUpdate(
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
  } catch (error: any) {
    console.error("error: any cancelling appointment:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAccountType = async (req: any, res: any) => {
  try {
    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          statusType: "pending",
        },
      },
      { new: true }
    );
    admins.forEach(async (admin) => {
      await User.findByIdAndUpdate(admin._id, {
        $push: {
          notifications: {
            message: `Update account type for premium from ${req.user.username}`,
            appointment: {},
            senderId: req.user._id,
          },
        },
      });
    });
    res.status(200).json({ message: "Updated Account Send to admins" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const acceptNotification = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Notification ID required" });
    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    const notification = await User.findOne(
      { _id: req.user._id, "notifications._id": id },
      { "notifications.$": 1 }
    );
    if (!notification || !notification.notifications[0])
      return res.status(404).json({ message: "Notification not found" });
    const senderId = notification.notifications[0].senderId;
    await User.findByIdAndUpdate(
      senderId,
      {
        $set: {
          statusType: "accepted",
          accountTypeExpire: expiry,
          accountType: "premium",
        },
      },
      { new: true }
    );
    admins.forEach(async (admin) => {
      await User.findByIdAndUpdate(admin._id, {
        $pull: {
          notifications: { _id: id },
        },
      });
    });
    res.status(200).json({
      message: "Account type updated successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectNotification = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Notification ID required" });
    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });
    const notification = await User.findOne(
      { _id: req.user._id, "notifications._id": id },
      { "notifications.$": 1 }
    );
    if (!notification || !notification.notifications[0])
      return res.status(404).json({ message: "Notification not found" });
    const senderId = notification.notifications[0].senderId;
    await User.findByIdAndUpdate(
      senderId,
      {
        $set: {
          accountTypeExpire: null,
          accountType: "basic",
          statusType: null,
        },
      },
      { new: true }
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectAppointment = async (req: any, res: any) => {
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
      notifications: user?.notifications,
      appointments: userSender?.appointments,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const acceptAppointment = async (req: any, res: any) => {
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
    await User.findOneAndUpdate(
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
    await User.findOneAndUpdate(
      {
        _id: req.user._id,
        "notifications._id": id,
      },
      {
        $set: {
          "notifications.$.appointment.status": "accepted",
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Appointment accept",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Notification ID required" });
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          notifications: { _id: id },
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Notification deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
