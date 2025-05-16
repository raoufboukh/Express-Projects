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
      // Use the isPremium flag to determine which endpoint to use
      const response = await classifyImage(image, false); // Always use the main endpoint which routes based on user type
      setResult(response.predictions);

      // Show appropriate messages based on account type
      if (!isPremium) {
        enqueueSnackbar(
          "Free account: Basic classification provided. Upgrade for detailed analysis.",
          { variant: "info" }
        );
      }
    } catch (error) {
      console.error("Error classifying image:", error);
      setNumber(0); // Reset to show form again
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {number === 0 ? (
        <>
          <ScanForm
            image={image}
            setImage={setImage}
            classifyImage={handleClassifyImage}
          />
          {!isPremium && (
            <div className="text-center p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-md">
              <p className="text-amber-700 text-sm">
                <strong>Free Account:</strong> Your analysis will provide basic
                classification (Normal vs Disease).
              </p>
              <p className="text-amber-700 text-sm mt-2">
                <a href="/upgrade" className="underline font-medium">
                  Upgrade to Premium
                </a>{" "}
                for detailed disease classification and advanced analytics.
              </p>
            </div>
          )}
        </>
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
