import { addScan } from "@/lib/data-fetching";
import { enqueueSnackbar } from "notistack";

export const handleAddScan = async (data: {
  date: Date;
  image: File;
  result: string;
  aiAnalysis: string;
}) => {
  try {
    const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    const base64Image = await convertToBase64(data.image);

    const payload = {
      date: data.date,
      image: base64Image,
      result: data.result,
      aiAnalysis: data.aiAnalysis,
    };

    const response = await addScan(payload);
    return response.data;
  } catch (error: any) {
    console.error("Error adding scan:", error);
    enqueueSnackbar(error.response?.data?.message || "Failed to add scan", {
      variant: "error",
    });
  }
};
