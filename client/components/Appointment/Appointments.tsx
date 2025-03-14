/* eslint-disable @typescript-eslint/no-explicit-any */
import { check } from "@/lib/dataFetching";
import { useQuery } from "@tanstack/react-query";

const Appointments = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: check,
  });
  return (
    <div>
      {isLoading ? (
        <div className="text-white text-3xl">Chargement...</div>
      ) : data.appointments.length !== 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 overflow-y-clip">
          {data.map((item: any, i: number) => (
            <div
              key={i}
              className="text-white bg-gray-800 p-4 rounded-md shadow-md flex flex-col justify-between px-10 sm:text-base text-sm"
            >
              <p>
                <span className="text-gray-300">date: </span>
                {item.date}
              </p>
              <p className={item.status === "pending" ? "text-orange-500" : item.status === "accepted" ? "text-green-500" : "text-red-500"}>
                <span className="text-gray-300">Status: </span>
                {item.status}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          Aucune Appointments
        </div>
      )}
    </div>
  );
};

export default Appointments;
