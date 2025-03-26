/* eslint-disable @typescript-eslint/no-explicit-any */
import { check } from "@/lib/dataFetching";
import { useQuery } from "@tanstack/react-query";

const Scans = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["scans"],
    queryFn: check,
  });
  return (
    <div>
      {isLoading ? (
        <div className="text-white text-3xl">Chargement...</div>
      ) : data.scanResults.length !== 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 overflow-y-clip">
          {data.map((item: any, i: number) => (
            <div
              key={i}
              className="text-white bg-gray-800 p-4 rounded-md shadow-md flex flex-col justify-between px-10 sm:text-base text-sm"
            >
              <p>
                <span className="text-gray-300">Date </span>
                {item.date}
              </p>
              <p>
                <span className="text-gray-300">Result: </span>
                {item.result}
              </p>
              <p>
                <span className="text-gray-300">AiAnalysis: </span>
                {item.aiAnalysis}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          No scans
        </div>
      )}
    </div>
  );
};

export default Scans;
