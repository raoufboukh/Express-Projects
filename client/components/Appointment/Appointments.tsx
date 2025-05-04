import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { cancelAppointment, check } from "@/lib/data-fetching";
import Modify from "./modify-app";
import { Search, XCircle, Pencil, CheckCircle } from "lucide-react";
import LoadingSpinner from "../Spinner";

function Appointments() {
  const queryClient = useQueryClient();
  const [id, setId] = useState<string>("");
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

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
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      fetchUserData();
      setId("");
    },
  });

  const filteredAppointments =
    user.appointments?.filter((item: any) => {
      const term = searchTerm.toLowerCase();
      const isNameMatch =
        item.firstName.toLowerCase().includes(term) ||
        item.lastName.toLowerCase().includes(term) ||
        item.number.toString().includes(term);
      const isDateMatch = selectedDate
        ? item.date.slice(0, 10) === selectedDate
        : true;
      const isTimeMatch = selectedTime ? item.time === selectedTime : true;
      return isNameMatch && isDateMatch && isTimeMatch;
    }) || [];

  const dates: string[] = Array.from(
    new Set<string>(
      user.appointments?.map((item: any) => item.date.slice(0, 10)) || []
    )
  );
  const times: string[] = Array.from(
    new Set<string>(user.appointments?.map((item: any) => item.time) || [])
  );

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : user.appointments && user.appointments.length !== 0 ? (
        <>
          <div className="relative w-full mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="text-gray-400 w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search by name or number..."
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
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-white"
            >
              <option value="">Select Time</option>
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {String(time)}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto scrollbar-custom">
            <table className="min-w-full bg-gray-800 text-white border border-gray-700">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left">Full Name</th>
                  <th className="py-2 px-4 text-left">Phone Number</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Time</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((item: any, i: number) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td className="py-2 px-4">{`${item.firstName} ${item.lastName}`}</td>
                    <td className="py-2 px-4">{`0${item.number}`}</td>
                    <td className="py-2 px-4">{item.date.slice(0, 10)}</td>
                    <td className="py-2 px-4">{item.time}</td>
                    <td
                      className={`py-2 px-4 ${
                        item.status === "pending"
                          ? "text-orange-500"
                          : item.status === "accepted"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            setId(item._id);
                            mutate();
                          }}
                          disabled={
                            (item.status === "accepted" &&
                              new Date() <= new Date(item.date)) ||
                            isPending
                          }
                          title="Cancel"
                        >
                          <XCircle
                            className={`w-5 h-5 hover:text-red-500 transition ${
                              isPending && id === item._id ? "animate-spin" : ""
                            }`}
                          />
                        </button>

                        <button
                          onClick={() => {
                            setId(item._id);
                            setShow(true);
                            setItem(item);
                          }}
                          title="Modify"
                        >
                          <Pencil className="w-5 h-5 hover:text-yellow-400 transition" />
                        </button>

                        <button title="Finish">
                          <CheckCircle className="w-5 h-5 hover:text-green-400 transition" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          No Appointment Found.
        </div>
      )}

      {show && (
        <Modify
          id={id}
          setShow={setShow}
          data={item}
          fetchUserData={fetchUserData}
        />
      )}
    </div>
  );
}

export default Appointments;
