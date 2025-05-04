interface ScanResultProps {
  result: any;
  setNumber: (number: number) => void;
  setImage: (image: File | null) => void;
}

const ScanResult = ({ result, setNumber, setImage }: ScanResultProps) => {
  if (!result) return null;

  return (
    <>
      <div className="mt-6 p-4 border rounded-md bg-gray-100 w-full max-w-md">
        <h3 className="text-lg font-bold">Prediction Results</h3>
        <p className="mt-2">
          <strong>Predicted Class:</strong> {result.predicted_class}
        </p>
        <div className="mt-2">
          <strong>Probabilities:</strong>
          <ul className="list-disc ml-6">
            {result.predictions[0].map((probability: number, index: number) => (
              <li key={index}>
                Class {index + 1}: {(probability * 100).toFixed(2)}%
              </li>
            ))}
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
