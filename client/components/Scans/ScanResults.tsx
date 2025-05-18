import { handleAddScan } from "@/lib/handleScan";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { check } from "@/lib/data-fetching";

interface ScanResultProps {
  result: any;
  setNumber: (number: number) => void;
  image: File | string | null;
  setImage: (image: File | null) => void;
  saveCompleted?: boolean;
}

const ScanResult = ({
  result,
  setNumber,
  image,
  setImage,
  saveCompleted = false,
}: ScanResultProps) => {
  const isScanAdded = useRef(false);
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

  useEffect(() => {
    const AllResults = async () => {
      try {
        if (!result || !image || isScanAdded.current) return;
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
  }, [result, image, saveCompleted]);

  const getPredictedClass = () => {
    if (!result) return "Unknown";

    if (result.predictions && result.predictions.predicted_class) {
      return result.predictions.predicted_class;
    } else if (result.predicted_class) {
      return result.predicted_class;
    }
    return "Unknown";
  };

  const getMaxProbability = () => {
    if (!result) return 0;

    let predictions;

    if (result.predictions && result.predictions.predictions) {
      predictions = result.predictions.predictions[0];
    } else if (result.predictions && Array.isArray(result.predictions[0])) {
      predictions = result.predictions[0];
    } else {
      return 0;
    }

    return predictions ? Math.max(...predictions) * 100 : 0;
  };

  const predictedClass = getPredictedClass();
  const maxProbability = getMaxProbability();

  const getStatusColor = () => {
    switch (result?.predicted_class) {
      case "Normal":
        return "bg-green-100 border-green-400";
      case "Disease":
        return "bg-red-100 border-red-400";
      case "Pneumonia":
      case "Viral Pneumonia":
        return "bg-red-100 border-red-400";
      case "Lung Opacity":
        return "bg-orange-100 border-orange-400";
      default:
        return "bg-gray-100";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getHealthTip = (predictedClass: string) => {
    switch (predictedClass) {
      case "Normal":
        return "Keep up the good work! Maintain a healthy lifestyle with regular exercise, clean air, and periodic check-ups.";
      case "Disease":
        return "The AI has detected abnormalities in your X-ray. Please consult with a healthcare provider for a detailed diagnosis.";
      case "Pneumonia":
        return "Pneumonia can be serious. Stay hydrated, rest, and consult your doctor for proper treatment and possible antibiotics.";
      case "Lung Opacity":
        return "Lung opacity can indicate various conditions. Please follow up with a healthcare provider for a comprehensive diagnosis.";
      case "Viral Pneumonia":
        return "Viral pneumonia requires rest and sometimes antiviral treatment. Stay isolated, monitor symptoms, and see a doctor soon.";
      default:
        return "If you're feeling unwell, consult a medical professional for accurate guidance and next steps.";
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`p-8 rounded-xl shadow-2xl w-full max-w-2xl border-2 ${getStatusColor()} transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold text-gray-800">
          Scan Analysis Results
        </h3>
        <div
          className={`px-4 py-2 rounded-full ${
            predictedClass === "Normal"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          } font-semibold`}
        >
          {predictedClass || "Unknown"}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            Confidence Level
          </h4>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${
                predictedClass === "Normal" ? "bg-green-500" : "bg-red-500"
              } transition-all duration-1000`}
              style={{ width: `${maxProbability}%` }}
            ></div>
          </div>
          <p className="text-right mt-1 text-gray-600">
            {maxProbability.toFixed(2)}% confident
          </p>
        </div>

        {predictedClass && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg shadow-sm">
            <h4 className="text-md font-semibold text-blue-800 mb-2">
              Health Tip
            </h4>
            <p className="text-sm text-blue-700">
              {getHealthTip(predictedClass)}
            </p>
          </div>
        )}

        {!isPremium && predictedClass === "Disease" && (
          <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-lg shadow-sm">
            <h4 className="text-md font-semibold text-amber-800 mb-2">
              Premium Account Feature
            </h4>
            <p className="text-sm text-amber-700">
              Upgrade to a premium account to get detailed classification of the
              specific condition detected.
            </p>
            <button
              className="mt-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm"
              onClick={() => (window.location.href = "/pricing")}
            >
              Upgrade Now
            </button>
          </div>
        )}

        {saveCompleted && (
          <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-lg text-green-700 text-sm">
            This result has been saved to your scan history.
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
          onClick={() => {
            setNumber(0);
            setImage(null);
          }}
        >
          Analyze Another Scan
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ScanResult;
