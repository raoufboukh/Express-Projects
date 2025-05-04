import { enqueueSnackbar } from "notistack";
import { axiosInstance } from "./axios";

export async function classifyImage(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axiosInstance.post("/model/classify", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    enqueueSnackbar("Image classified successfully", {
      variant: "success",
    });
    return response.data;
  } catch (error: any) {
    console.error("Image classification failed:", error);
    throw error;
  }
}
