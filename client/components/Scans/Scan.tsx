import { useState } from "react";
import ScanForm from "./form-scan";
import ScanResult from "./ScanResults";
import { classifyImage } from "@/lib/classifyImage";
import { enqueueSnackbar } from "notistack";

function Scan() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [number, setNumber] = useState(0);

  const handleClassifyImage = async () => {
    if (!image) {
      enqueueSnackbar("Please upload a valid image file first", {
        variant: "error",
      });
      return;
    }
    setNumber((prev) => prev + 1);
    try {
      const response = await classifyImage(image);
      setResult(response.predictions);
    } catch (error) {
      console.error("Error classifying image:", error);
      enqueueSnackbar("Failed to classify image", { variant: "error" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {number === 0 ? (
        <ScanForm
          image={image}
          setImage={setImage}
          classifyImage={handleClassifyImage}
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <ScanResult
            result={result}
            setNumber={setNumber}
            image={image}
            setImage={setImage}
          />
        </div>
      )}
    </div>
  );
}

export default Scan;
