import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import { ProtectRoute } from "middleware/middleware.ts";

const router = express.Router();
const upload = multer();

const forwardClassificationRequest = async (endpoint: any, file: any) => {
  const formData = new FormData();
  formData.append("image", file.buffer, file.originalname);

  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/${endpoint}`,
      formData,
      {
        headers: formData.getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error classifying with ${endpoint}:`, error);
    throw error;
  }
};

router.post(
  "/classify",
  ProtectRoute,
  upload.single("image"),
  async (req: any, res: any) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const user = req.user;
      const isPremium = user && user.accountType === "premium";

      const formData = new FormData();
      formData.append("image", req.file.buffer, req.file.originalname);
      formData.append("is_premium", isPremium ? "true" : "false");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/classify/",
        formData,
        {
          headers: formData.getHeaders(),
        }
      );

      res.json(response.data);
    } catch (error: any) {
      console.error("Error in classification:", error);
      res.status(500).json({
        error: "Classification failed",
        message: error.message,
      });
    }
  }
);

// Binary classification endpoint (free tier)
router.post(
  "/classify/binary",
  upload.single("image"),
  async (req: any, res: any) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const result = await forwardClassificationRequest(
        "classify/binary/",
        req.file
      );
      res.json(result);
    } catch (error: any) {
      console.error("Error in binary classification:", error);
      res.status(500).json({
        error: "Binary classification failed",
        message: error.message,
      });
    }
  }
);

router.post(
  "/classify/multiclass",
  ProtectRoute,
  upload.single("image"),
  async (req: any, res: any) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const user = req.user;
      if (!user || user.accountType !== "premium") {
        return res.status(403).json({
          error: "Premium account required",
          message: "Multiclass classification requires a premium account",
        });
      }

      const result = await forwardClassificationRequest(
        "classify/multiclass/",
        req.file
      );
      res.json(result);
    } catch (error: any) {
      console.error("Error in multiclass classification:", error);
      res.status(500).json({
        error: "Multiclass classification failed",
        message: error.message,
      });
    }
  }
);

export default router;
