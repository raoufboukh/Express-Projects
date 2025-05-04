// filepath: /Users/macbook/Developer/Express-Projects/server/routers/model.routers.ts
import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data"; // Import the form-data library

const router = express.Router();
const upload = multer();

router.post("/classify", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Create a FormData instance using the form-data library
    const formData = new FormData();
    formData.append("image", req.file.buffer, req.file.originalname);

    // Send the request to the Django service
    const response = await axios.post(
      "http://127.0.0.1:8000/api/classify/",
      formData,
      {
        headers: formData.getHeaders(), // Include the correct headers
      }
    );

    res.json(response.data); // Forward the response from the Django service
  } catch (error) {
    console.error("Error forwarding request to Django service:", error);
    res.status(500).json({ error: "Failed to classify image" });
  }
});

export default router;
