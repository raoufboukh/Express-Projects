import { useQuery } from "@tanstack/react-query";

import { check } from "@/lib/data-fetching";

function Scans() {
  const { data, isLoading } = useQuery({
    queryKey: ["scans"],
    queryFn: check,
  });
  return (
    <div>
<<<<<<< HEAD
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
=======
      {isLoading
        ? (
            <div className="text-white text-3xl">Chargement...</div>
          )
        : data.scanResults.length !== 0
          ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 overflow-y-clip">
                {data.map((item: any) => (
                  <div
                    key={item.id}
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
            )
          : (
              <div className="text-white bg-gray-800 p-4 rounded-md">
                Aucune scans
              </div>
            )}
>>>>>>> b836dc806465c779d881e38ff25b9f6b7bb45b5c
    </div>
  );
}

export default Scans;
