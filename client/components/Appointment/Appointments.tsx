"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { cancelAppointment, check } from "@/lib/data-fetching";

function Appointments() {
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
        <div
          className={`${
            user.appointments.length > 2 && "h-96"
          } grid grid-cols-1 lg:grid-cols-2 gap-2 overflow-y-auto scrollbar-custom`}
        >
          {user.appointments.map((item: any, i: number) => (
            <div
              key={i}
              className="text-white bg-gray-800 p-4 rounded-md shadow-md flex flex-col justify-between px-10 sm:text-base text-sm"
            >
              <p>
                <span className="text-gray-300">FirstName: </span>
                {item.firstName}
              </p>
              <p>
                <span className="text-gray-300">LastName: </span>
                {item.lastName}
              </p>
              <p>
                <span className="text-gray-300">Number: </span>0{item.number}
              </p>
              <p>
                <span className="text-gray-300">Date: </span>
                {item.date.slice(0, 10)}
              </p>
              <p>
                <span className="text-gray-300">Time: </span>
                {item.time}
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
                type="button"
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
}

export default Appointments;
