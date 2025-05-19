import { Doctor } from "models/doctor.models.ts";

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

export const getDoctors = async (req: any, res: any) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDoctor = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id is required" });
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
