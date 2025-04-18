import { useQuery } from "@tanstack/react-query";

import { check } from "@/lib/data-fetching";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";

function Scans() {
  const { data, isLoading } = useQuery({
    queryKey: ["scans"],
    queryFn: check,
  });
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

  return (
    <div>
      {isLoading ? (
        <div className="text-white text-3xl">Chargement...</div>
      ) : data.results.length !== 0 ? (
        <div
          className={`${
            data.results.length >= 2 && "h-96"
          } grid lg:grid-cols-2 gap-2 overflow-y-auto scrollbar-custom lg:h-fit`}
        >
          {data.results.map((item: any) => (
            <div
              key={item._id}
              className="text-white bg-gray-800 rounded-md shadow-md flex flex-col sm:text-base text-sm overflow-hidden h-fit"
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
                  height={1000}
                />
              </div>
              <div className="p-4">
                <p>
                  <span className="text-gray-300">Date: </span>
                  {item.date.slice(0, 10)}
                </p>
                <p>
                  <span className="text-gray-300">Time: </span>
                  {item.date.slice(item.date.indexOf("T") + 1, 16)}
                </p>
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

export default Scans;
