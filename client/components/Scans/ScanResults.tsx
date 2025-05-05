import { handleAddScan } from "@/lib/handleScan";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef } from "react";

interface ScanResultProps {
  result: any;
  setNumber: (number: number) => void;
  image: File | null;
  setImage: (image: File | null) => void;
}

const ScanResult = ({
  result,
  setNumber,
  image,
  setImage,
}: ScanResultProps) => {
  const isScanAdded = useRef(false);
  useEffect(() => {
    const AllResults = async () => {
      try {
        if (!result || !image || isScanAdded.current) {
          return;
        }
        isScanAdded.current = true;
        const date = new Date();
        const classResults = result.predicted_class;
        const prediction =
          result.predictions && result.predictions[0]
            ? Math.max(...result.predictions[0]) * 100
            : 0;
        const aiAnalysis = prediction.toFixed(2);

        await handleAddScan({
          date,
          image,
          result: classResults,
          aiAnalysis,
        });
      } catch (error: any) {
        console.error("Error adding scan:", error);
        enqueueSnackbar(error.response?.data?.message || "Failed to add scan", {
          variant: "error",
        });
      }
    };

    AllResults();
  }, [result, image]);

  const maxProbability =
    result?.predictions && result.predictions[0]
      ? Math.max(...result.predictions[0]) * 100
      : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl text-gray-800">
      <h3 className="text-2xl font-semibold mb-4 text-blue-700">
        Prediction Results
      </h3>

      <p className="text-lg">
        <span className="font-medium">Predicted Class:</span>{" "}
        <span
          className={`${
            result?.predicted_class === "Normal"
              ? "text-green-600"
              : "text-red-600"
          } font-semibold`}
        >
          {result?.predicted_class || "Unknown"}
        </span>
      </p>

      <div className="mt-4">
        <h4 className="font-medium text-lg mb-2">
          Probability: {maxProbability.toFixed(2)}%
        </h4>
      </div>

      <button
        className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        onClick={() => {
          setNumber(0);
          setImage(null);
        }}
      >
        Upload Another Image
      </button>
    </div>
  );
};

export default ScanResult;
