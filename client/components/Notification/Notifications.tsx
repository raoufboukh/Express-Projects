"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  acceptNotification,
  check,
  rejectNotification,
} from "@/lib/dataFetching";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Notifications = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const data = await check();
      setData(data.notifications);
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
    mutationKey: ["notifications"],
    mutationFn: () => {
      if (message === "Accepter") {
        return acceptNotification(id);
      } else {
        return rejectNotification(id);
      }
    },
  });
  return (
    <div>
      {isLoading ? (
        <div className="text-white text-3xl">Chargement...</div>
      ) : data && data.length !== 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 overflow-y-clip">
          {data &&
            data.map((item: any, i: number) => (
              <div
                key={i}
                className="text-white bg-gray-800 p-4 rounded-md shadow-md flex flex-col justify-between px-10 sm:text-base text-sm"
              >
                <p>
                  <span className="text-gray-300">Message: </span>
                  {item.message}
                </p>
                <p>
                  <span className="text-gray-300">date: </span>
                  {item.appointment.date.slice(0, 10)}
                </p>
                <div className="flex justify-between mt-5">
                  <button
                    className="bg-primary text-white px-2 py-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-primary/80 disabled:opacity-50"
                    onClick={() => {
                      setId(item._id);
                      setMessage("Accepter");
                      mutate();
                    }}
                    disabled={isPending}
                  >
                    Accepter
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-500/80"
                    onClick={() => {
                      setId(item.id);
                      setMessage("Refuser");
                      mutate();
                    }}
                    disabled={isPending}
                  >
                    Refuser
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          Aucune notification
        </div>
      )}
    </div>
  );
};

export default Notifications;
