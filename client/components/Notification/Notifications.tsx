"use client";
import { useEffect, useState } from "react";

import { check } from "@/lib/data-fetching";
import TypeNotification from "./TypeNotif";
import AppointmentNotification from "./AppNotification";

function Notifications() {
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

  return (
    <div>
      {isLoading ? (
        <div className="text-white text-3xl">Chargement...</div>
      ) : data && data.length !== 0 ? (
        <div
          className={`${
            data.length > 2 && "h-96"
          } grid grid-cols-1 lg:grid-cols-2 gap-2 overflow-y-auto scrollbar-custom`}
        >
          {data.map((item: any, i: number) =>
            item.appointment?.firstName ? (
              <AppointmentNotification
                key={i}
                item={item}
                fetchUserData={fetchUserData}
              />
            ) : (
              <TypeNotification
                key={i}
                item={item}
                fetchUserData={fetchUserData}
              />
            )
          )}
        </div>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          Aucune notification
        </div>
      )}
    </div>
  );
}

export default Notifications;
