"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { check } from "@/lib/data-fetching";
import AppointmentNotification from "./AppNotification";
import LoadingSpinner from "../Spinner";

function Notifications() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

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

  const filteredNotifications =
    data?.filter((item: any) => {
      const term = searchTerm.toLowerCase();
      const searchableText = item.appointment
        ? `${item.appointment.firstName} ${item.appointment.lastName} ${item.message}`.toLowerCase()
        : item.message.toLowerCase();

      const isTextMatch = searchableText.includes(term);

      const isDateMatch = selectedDate
        ? (item.appointment &&
            item.appointment.date.slice(0, 10) === selectedDate) ||
          !selectedDate
        : true;

      const isStatusMatch = selectedStatus
        ? (item.appointment && item.appointment.status === selectedStatus) ||
          !selectedStatus
        : true;

      return isTextMatch && isDateMatch && isStatusMatch;
    }) || [];

  const dates: string[] = Array.from(
    new Set<string>(
      data
        ?.filter((item: any) => item.appointment)
        .map((item: any) => item.appointment.date.slice(0, 10)) || []
    )
  );

  const statuses: string[] = Array.from(
    new Set<string>(
      data
        ?.filter((item: any) => item.appointment)
        .map((item: any) => item.appointment.status) || []
    )
  );

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : data && data.length !== 0 ? (
        <>
          <div className="relative w-full mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="text-gray-400 w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search by name or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 py-2 pr-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-white"
            >
              <option value="">Select Date</option>
              {dates.map((date, index) => (
                <option key={index} value={date}>
                  {String(date)}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-white"
            >
              <option value="">Select Status</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`${
              filteredNotifications.length > 2
                ? "h-[calc(100vh - 1px)]"
                : "lg:h-fit h-[calc(100vh - 1px)]"
            } grid grid-cols-1 lg:grid-cols-2 gap-2`}
          >
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(
                (item: any, i: number) =>
                  item.appointment?.firstName && (
                    <AppointmentNotification
                      key={i}
                      item={item}
                      fetchUserData={fetchUserData}
                    />
                  )
              )
            ) : (
              <div className="lg:col-span-2 text-white bg-gray-800 p-4 rounded-md">
                No notifications match your search criteria.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          No Notification Found.
        </div>
      )}
    </div>
  );
}

export default Notifications;
