import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { check, classifyScan } from "@/lib/data-fetching"; // Assume classifyScan is your API call
import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import LoadingSpinner from "../Spinner";
import ScanResult from "./ScanResults";
import { classifyImage } from "@/lib/classifyImage";

function Xray() {
  const { data, isLoading } = useQuery({
    queryKey: ["scans"],
    queryFn: check,
  });

  const [selectedScan, setSelectedScan] = useState<any>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [loadingResult, setLoadingResult] = useState(false);

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const filename = imageUrl.split("/").pop() || "image.jpg";
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleClassify = async (item: any) => {
    setLoadingResult(true);
    setSelectedScan(item);
    try {
      // Fetch the image as a Blob
      const response = await fetch(item.image);
      if (!response.ok) throw new Error("Image fetch failed");
      const blob = await response.blob();
      // Convert Blob to File
      const file = new File([blob], "scan.jpg", { type: blob.type });
      // Use classifyImage (which expects a File)
      const result = await classifyImage(file);
      setScanResult(result);
    } catch (err) {
      setScanResult({ error: "Classification failed." });
    }
    setLoadingResult(false);
  };

  // Show ScanResult if a scan is selected and result is available
  if (selectedScan && scanResult) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <ScanResult
          result={scanResult}
          setNumber={() => {
            setSelectedScan(null);
            setScanResult(null);
          }}
          image={selectedScan.image} // If you want to pass the image file, adjust accordingly
          setImage={() => {}}
        />
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : data.results.length !== 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 justify-between">
          {data.results.map((item: any) => (
            <div
              key={item._id}
              className=" text-white bg-gray-800 rounded-md shadow-md flex flex-col sm:text-base text-sm overflow-hidden h-fit"
            >
              <div className="w-full relative">
                <div className="absolute top-3 right-5">
                  <FiDownload
                    className="size-7 cursor-pointer bg-primary rounded-full p-1"
                    onClick={() => handleDownload(item.image)}
                  />
                </div>
                <Image
                  src={item.image}
                  alt={item.image}
                  width={1000}
                  height={100}
                  className="w-full h-40 rounded-t-md"
                />
              </div>
              <div className="p-4">
                <p>
                  <span className="text-gray-300">Date: </span>
                  {item.date.slice(0, 10)}
                </p>
                <p>
                  <span className="text-gray-300">Time: </span>
                  {new Date(new Date(item.date).getTime() + 60 * 60 * 1000)
                    .toISOString()
                    .slice(11, 16)}
                </p>
                <p>
                  <span className="text-gray-300">Date-Appointment: </span>
                  {item.dateAppointment.slice(0, 10)}
                </p>
                <button
                  className="bg-primary/60 hover:bg-primary/70 transition-all duration-300 px-3 py-2 my-2  rounded-lg cursor-pointer"
                  onClick={() => handleClassify(item)}
                  disabled={loadingResult}
                >
                  {loadingResult && selectedScan?._id === item._id
                    ? "Classifying..."
                    : "Classify Image"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          Aucune Results
        </div>
      )}
    </div>
  );
}

export default Xray;
