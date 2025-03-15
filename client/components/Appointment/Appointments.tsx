"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cancelAppointment, check } from "@/lib/dataFetching";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Appointments = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const data = await check();
      setUser(data);
    } catch (err) {
      console.error("Error during auth check:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const { mutate, isPending } = useMutation({
    mutationKey: ["appointments"],
    mutationFn: () => cancelAppointment(id),
    onSuccess: () => {
      fetchUserData();
      setId("");
    },
  });

  return (
    <div>
      {isLoading ? (
        <div className="text-white text-3xl">Chargement...</div>
      ) : user.appointments && user?.appointments?.length !== 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 overflow-y-clip">
          {user.appointments.map((item: any, i: number) => (
            <div
              key={i}
              className="text-white bg-gray-800 p-4 rounded-md shadow-md flex flex-col justify-between px-10 sm:text-base text-sm"
            >
              <p>
                <span className="text-gray-300">date: </span>
                {item.date.slice(0, 10)}
              </p>
              <p
                className={
                  item.status === "pending"
                    ? "text-orange-500"
                    : item.status === "accepted"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                <span className="text-gray-300">Status: </span>
                {item.status}
              </p>
              <button
                className="cursor-pointer block bg-primary px-2 py-1 mt-5 rounded-sm transition-all duration-300 hover:bg-primary/80 disabled:opacity-50"
                onClick={() => {
                  setId(item._id);
                  mutate();
                }}
                disabled={item.status === "accepted" || isPending}
              >
                {isPending && id === item._id
                  ? "Annulation..."
                  : "Cancel Appointment"}
              </button>
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
