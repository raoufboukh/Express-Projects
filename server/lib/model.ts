// filepath: /Users/macbook/Developer/Express-Projects/server/lib/model.ts
import * as tf from "@tensorflow/tfjs-node";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

let model: tf.GraphModel;

export const loadModel = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const modelPath = path.resolve(__dirname, "../tfjs_model/model.json");
    const fileUrl = `file://${modelPath}`;
    console.log("Attempting to load model from:", fileUrl);

    if (!fs.existsSync(modelPath)) {
      throw new Error(`Model file not found at ${modelPath}`);
    }

    model = await tf.loadGraphModel(fileUrl);
    console.log("Model loaded successfully");
  } catch (error) {
    console.error("Error loading model:", error);
    throw error;
  }
};

export const classifyImage = async (imageBuffer: Buffer) => {
  const tensor = tf.node
    .decodeImage(imageBuffer)
    .resizeBilinear([224, 224])
    .expandDims(0);
  const predictions = model.predict(tensor) as tf.Tensor;
  return predictions.arraySync();
};
