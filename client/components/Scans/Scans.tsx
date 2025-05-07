import { useQuery } from "@tanstack/react-query";
import { check } from "@/lib/data-fetching";
import Image from "next/image";
import LoadingSpinner from "../Spinner";

function Scans() {
  const { data, isLoading } = useQuery({
    queryKey: ["scans"],
    queryFn: check,
  });

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : data.scanResults.length !== 0 ? (
        <div
          className={`${
            data.scanResults.length >= 2
              ? "h-[calc(100vh-1px)]"
              : "lg:h-fit h-[calc(100vh-1px)]"
          } flex flex-wrap gap-4 justify-start`}
        >
          {[...data.scanResults].reverse().map((item: any) => (
            <div
              key={item._id}
              className="lg:basis-[23%] md:basis-[30%] sm:basis-[45%] basis-full text-white bg-gray-800 rounded-md shadow-md text-sm overflow-hidden h-fit"
            >
              <div className="w-full relative h-36">
                <Image
                  src={item.image}
                  alt={item.image}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-md"
                />
              </div>
              <div className="p-2 space-y-1">
                <p>
                  <span className="text-gray-400">Date:</span>{" "}
                  {item.date.slice(0, 10)}
                </p>
                <p>
                  <span className="text-gray-400">Time:</span>{" "}
                  {new Date(new Date(item.date).getTime() + 60 * 60 * 1000)
                    .toISOString()
                    .slice(11, 16)}
                </p>
                <p>
                  <span className="text-gray-400">Result:</span> {item.result}
                </p>
                <p>
                  <span className="text-gray-400">AiAnalysis:</span>{" "}
                  {item.aiAnalysis}%
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          No Result Found.
        </div>
      )}
    </div>
  );
}

export default Scans;
