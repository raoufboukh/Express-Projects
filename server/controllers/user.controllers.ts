import mongoose from "mongoose";
import { User } from "../models/auth.models.ts";
import bcrypt from "bcrypt";
import cloudinary from "lib/cloudinary.ts";
import { Doctor } from "models/doctor.models.ts";

export const getUsers = async (req: any, res: any) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctors = async (req: any, res: any) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
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

export const addScan = async (req: any, res: any) => {
  try {
    const { date, image, result, aiAnalysis } = req.body;

    if (!date || !image || !result || !aiAnalysis) {
      return res.status(400).json({
        message: `${
          !date
            ? "Date is required"
            : !image
            ? "Image is required"
            : !result
            ? "Result is required"
            : "AI Analysis is required"
        }`,
      });
    }

    const cloudImage = await cloudinary.uploader.upload(image, {
      folder: "scans",
    });

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          scanResults: {
            date,
            image: cloudImage.secure_url,
            result,
            aiAnalysis,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Scan added successfully" });
  } catch (error: any) {
    console.error("Error adding scan:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getScanResults = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("scanResults");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.scanResults);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addDoctor = async (req: any, res: any) => {
  try {
    const {
      username,
      number,
      region,
      commune,
      startDay,
      endDay,
      startTime,
      endTime,
    } = req.body;
    if (
      !username ||
      !region ||
      !commune ||
      !startDay ||
      !endDay ||
      !startTime ||
      !number ||
      !endTime
    )
      return res.status(400).json({
        message: `${
          !username
            ? "username is required"
            : !region
            ? "region is required"
            : !commune
            ? "commune is required"
            : !startDay
            ? "startDay is required"
            : !endDay
            ? "endDay is required"
            : !startTime
            ? "startTime is required"
            : !number
            ? "number is required"
            : "endTime is required"
        }`,
      });
    const user = new Doctor({
      username,
      number,
      region,
      commune,
      startDay,
      endDay,
      startTime,
      endTime,
    });
    if (user) {
      await user.save();
    }
    res.status(201).json({ message: "Doctor added successfully" });
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
    let { firstName, lastName, number, time, date, message } = req.body;

    // Convert the date to UTC if it's not already
    date = new Date(date);
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    if (!utcDate || !firstName || !lastName || !number || !time || !message)
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
            : !utcDate
            ? "Date is required"
            : "Message is required"
        }`,
      });

    // Proceed with booking the appointment
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
            date: utcDate, // Store the UTC date in the database
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
            $each: [
              {
                message: `${
                  message.charAt(0).toUpperCase() + message.slice(1)
                } from ${
                  user &&
                  user.username.charAt(0).toUpperCase() + user.username.slice(1)
                }`,
                appointment: {
                  _id: user?.appointments[
                    user.appointments.toObject().length - 1
                  ]._id,
                  firstName,
                  lastName,
                  number,
                  time,
                  date: utcDate, // Store the UTC date in the notification
                  status:
                    user?.appointments[user.appointments.toObject().length - 1]
                      .status,
                },
                senderId: user?._id,
              },
            ],
            $position: 0,
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
    const user = await User.findOneAndUpdate(
      {
        _id: req.user._id,
        "appointments._id": appointmentId,
      },
      {
        $set: {
          "appointments.$.firstName": firstName,
          "appointments.$.lastName": lastName,
          "appointments.$.number": number,
          "appointments.$.time": time,
          "appointments.$.date": date,
          "appointments.$.message": message,
          "appointments.$.status": "pending",
        },
      },
      { new: true }
    );

    admins.forEach(async (admin: any) => {
      await User.findByIdAndUpdate(admin._id, {
        $pull: {
          notifications: { "appointment._id": appointmentId },
        },
      });
      await User.findByIdAndUpdate(admin._id, {
        $push: {
          notifications: {
            message: `${message} from ${
              (user?.username || "").charAt(0).toUpperCase() +
              (user?.username || "").slice(1)
            }`,
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

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

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

    if (req.user.role !== "admin") {
      admins.forEach(async (admin) => {
        await User.findByIdAndUpdate(admin._id, {
          $pull: {
            notifications: { _id: id },
          },
          $push: {
            appointments: {
              _id: appointmentId,
              firstName: notification.notifications[0].appointment.firstName,
              lastName: notification.notifications[0].appointment.lastName,
              number: notification.notifications[0].appointment.number,
              time: notification.notifications[0].appointment.time,
              date: notification.notifications[0].appointment.date,
              status: "accepted",
            },
          },
        });
      });
    } else {
      admins.forEach(async (admin) => {
        await User.findOneAndUpdate(
          {
            _id: admin._id,
            "notifications._id": id,
          },
          {
            $pull: {
              notifications: { _id: id },
            },
            $set: {
              "appointments.$.status": "accepted",
            },
          }
        );
      });
    }
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

export const getAppointmentsCount = async (req: any, res: any) => {
  try {
    const counts = await User.aggregate([
      { $unwind: "$appointments" },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$appointments.date",
              timezone: "UTC",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $project: { _id: 0, date: "$_id", count: 1 } },
    ]);

    res.status(200).json(counts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
