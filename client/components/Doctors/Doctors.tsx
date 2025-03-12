/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDoctors } from "@/lib/dataFetching";
import { useQuery } from "@tanstack/react-query";

const Doctors = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  return (
    <div>
      {isLoading ? (
        <div className="text-white text-3xl">Chargement...</div>
      ) : data.length !== 0 ? (
        <div className="grid grid-cols-1 gap-2 overflow-y-clip">
          {data.map((item: any, i: number) => (
            <div
              key={i}
              className="text-white bg-gray-800 p-4 rounded-md shadow-md flex flex-col justify-between px-10"
            >
              <p>
                <span className="text-gray-300">Username: </span>
                {item.username.charAt(0).toUpperCase() + item.username.slice(1)}
              </p>
              <p>
                <span className="text-gray-300">Email: </span>
                {item.email}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          Aucun doctor trouvé
        </div>
      )}
    </div>
  );
};

export default Doctors;
