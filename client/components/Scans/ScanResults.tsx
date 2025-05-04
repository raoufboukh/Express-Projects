import { handleAddScan } from "@/lib/handleScan";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

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
  useEffect(() => {
    const AllResults = async () => {
      try {
        if (!result || !image) {
          enqueueSnackbar("No results or image available", {
            variant: "error",
          });
          return;
        }

        const date = new Date();
        const classResults = result.predicted_class;
        const prediction = Math.max(...result.predictions[0]) * 100;
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

  return (
    <>
      <div className="mt-6 p-4 border rounded-md bg-gray-100 w-full max-w-md">
        <h3 className="text-lg font-bold">Prediction Results</h3>
        <p className="mt-2">
          <strong>Predicted Class:</strong> {result?.predicted_class}
        </p>
        <div className="mt-2">
          <strong>Probabilities:</strong>
          <ul className="list-disc ml-6">
            {result?.predictions[0]?.map(
              (probability: number, index: number) => (
                <li key={index}>
                  Class {index + 1}: {(probability * 100).toFixed(2)}%
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <button
        className="bg-gray-500 rounded-md px-3 py-2 cursor-pointer text-white mt-4 hover:bg-gray-600 transition-all duration-300"
        onClick={() => {
          setNumber(0);
          setImage(null);
        }}
      >
        Upload Another Image
      </button>
    </>
  );
};

export default ScanResult;
