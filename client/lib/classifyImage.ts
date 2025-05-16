import { axiosInstance } from "./axios";
import { enqueueSnackbar } from "notistack";

export async function classifyImage(
  image: File,
  isPremiumOnly: boolean = false
) {
  const formData = new FormData();
  formData.append("image", image);

  try {
    // Choose endpoint based on premium status
    const endpoint = isPremiumOnly
      ? "/model/classify/multiclass"
      : "/model/classify";

    const response = await axiosInstance.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data && !isPremiumOnly) {
      enqueueSnackbar("Image classified successfully!", { variant: "success" });
    }

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 403) {
      enqueueSnackbar("This feature requires a premium account", {
        variant: "warning",
      });
    } else {
      console.error("Image classification failed:", error);
      enqueueSnackbar("Classification failed", { variant: "error" });
    }
    throw error;
  }
}

// Function specifically for binary classification (free tier)
export async function classifyImageBinary(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await axiosInstance.post(
      "/model/classify/binary",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Binary classification failed:", error);
    throw error;
  }
}
