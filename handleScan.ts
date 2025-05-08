import { axiosInstance } from "./axios";
import { enqueueSnackbar } from "notistack";

const convertToBase64 = (file: File | string): Promise<string> => {
  // If file is already a string (URL), return it directly
  if (typeof file === "string") {
    return Promise.resolve(file);
  }

  // Otherwise convert File to base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const handleAddScan = async ({
  date,
  image,
  result,
  aiAnalysis,
}: {
  date: Date;
  image: File | string;
  result: string;
  aiAnalysis: string;
}): Promise<any> => {
  try {
    // Convert image to base64 if it's a File
    const base64Image = await convertToBase64(image);

    // Create request data
    const requestData = {
      date,
      file: base64Image,
      result,
      aiAnalysis,
    };

    // Send request to backend
    const response = await axiosInstance.post("/users/scan", requestData);
    enqueueSnackbar("Scan saved successfully!", { variant: "success" });
    return response.data;
  } catch (error: any) {
    console.error("Error in handleAddScan:", error);
    const errorMessage =
      error.response?.data?.message || "Failed to add scan results";
    enqueueSnackbar(errorMessage, { variant: "error" });
    throw error;
  }
};
