import { User } from "../models/auth.models.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json(user);
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
    res.status(200).json(user.scanResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { date } = req.body;
    if (!date) return res.status(400).json({ message: "Date required" });

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          appointments: {
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
              user.name.charAt(0).toUpperCase() + user.name.slice(1)
            }`,
            appointment: {
              date,
            },
            senderId: user._id,
          },
        },
      });
    });
    res.status(200).json(user.appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: "Appointment ID required" });

    const admins = await User.find({ role: "admin" });
    if (admins.length === 0)
      return res.status(404).json({ message: "No admins found" });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          appointments: {
            _id: id,
          },
        },
      },
      { new: true }
    );

    admins.forEach(async (admin) => {
      await User.findByIdAndUpdate(admin._id, {
        $pull: {
          notifications: {
            "appointment._id": id,
          },
        },
      });
    });
    res.status(200).json({ message: "Appointment cancelled" });
  } catch (error) {
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
    res.status(200).json(user.accountType);
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
    const userSender = await User.findByIdAndUpdate(
      senderId,
      {
        $push: {
          appointments: {
            status: "rejected",
          },
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
    const userSender = await User.findByIdAndUpdate(
      senderId,
      {
        $push: {
          appointments: {
            status: "accepted",
          },
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
