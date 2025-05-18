import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { classifyImage } from "@/lib/classifyImage";
import ScanForm from "./form-scan";
import ScanResult from "./ScanResults";
import { check } from "@/lib/data-fetching";

function Scan() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [number, setNumber] = useState(0);
  const [accountType, setAccountType] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountType = async () => {
      try {
        const data = await check();
        setAccountType(data.accountType);
      } catch (error) {
        console.error("Error fetching account type:", error);
      }
    };

    fetchAccountType();
  }, []);

  const isPremium = accountType === "premium";

  const handleClassifyImage = async () => {
    if (!image) {
      enqueueSnackbar("Please upload a valid image file first", {
        variant: "error",
      });
      return;
    }
    setNumber((prev) => prev + 1);
    try {
      const response = await classifyImage(image, false);
      setResult(response.predictions);

      if (!isPremium) {
        enqueueSnackbar(
          "Free account: Basic classification provided. Upgrade for detailed analysis.",
          { variant: "info" }
        );
      }
    } catch (error) {
      console.error("Error classifying image:", error);
      setNumber(0);
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
        <ScanResult
          result={result}
          setNumber={setNumber}
          image={image}
          setImage={setImage}
        />
      )}
    </div>
  );
}

export default Scan;
