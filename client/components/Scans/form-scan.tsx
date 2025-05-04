import { classifyImage } from "@/lib/classifyImage";
import { useState } from "react";

const ScanForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Generate a preview of the uploaded image
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      const response = await classifyImage(image);
      setResult(response.predictions); // Update to store the nested predictions object
    } catch (error) {
      console.error("Error classifying image:", error);
      alert("Failed to classify image");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Upload an X-ray Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {preview && (
        <div className="w-64 h-64 border rounded-md overflow-hidden">
          <img
            src={preview}
            alt="Uploaded Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Classify Image
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded-md bg-gray-100 w-full max-w-md">
          <h3 className="text-lg font-bold">Prediction Results</h3>
          <p className="mt-2">
            <strong>Predicted Class:</strong> {result.predicted_class}
          </p>
          <div className="mt-2">
            <strong>Probabilities:</strong>
            <ul className="list-disc ml-6">
              {result.predictions[0].map(
                (probability: number, index: number) => (
                  <li key={index}>
                    Class {index + 1}: {(probability * 100).toFixed(2)}%
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanForm;
