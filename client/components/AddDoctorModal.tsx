import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoctor } from "@/lib/data-fetching";
import { IoMdClose } from "react-icons/io";
import { communes, wilayas } from "./constants";

function AddDoctorModal({ setShow }: { setShow: (show: boolean) => void }) {
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [region, setRegion] = useState(wilayas[0]);
  const [commune, setCommune] = useState("");
  const [startDay, setStartDay] = useState("Monday");
  const [endDay, setEndDay] = useState("Friday");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      setShow(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      username,
      number,
      region,
      commune,
      startDay,
      endDay,
      startTime,
      endTime,
    });
  };

  // Array of weekdays for the day selectors
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="fixed top-0 left-0 z-50 size-full flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 relative">
        <IoMdClose
          className="absolute right-2 text-2xl top-2 cursor-pointer"
          onClick={() => setShow(false)}
        />
        <h2 className="text-3xl text-center">Create New Doctor!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Full Name</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="em">Phone Number</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type="text"
              id="number"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
          </div>
          <div className="">
            <label htmlFor="reg" className="block mb-1">
              Region
            </label>
            <select
              id="reg"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-md"
            >
              {wilayas.map((wilaya, i) => (
                <option key={i} value={wilaya}>
                  {i + 1}-{wilaya}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="com" className="block mb-1">
              Commune
            </label>
            <select
              id="com"
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              className="w-full p-2  border border-gray-200 rounded-md"
            >
              <option value="" disabled>
                Select a commune
              </option>
              {communes.map(
                (com) =>
                  com.wilaya_name === region &&
                  com.communes.map((com, i) => (
                    <option key={i} value={com}>
                      {i + 1}-{com}
                    </option>
                  ))
              )}
            </select>
          </div>

          {/* Work Days - Two in same line */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="startDay" className="block mb-1">
                Start Day
              </label>
              <select
                id="startDay"
                value={startDay}
                onChange={(e) => setStartDay(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md"
              >
                {weekdays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="endDay" className="block mb-1">
                End Day
              </label>
              <select
                id="endDay"
                value={endDay}
                onChange={(e) => setEndDay(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md"
              >
                {weekdays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Work Hours - Two in same line */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="startTime" className="block mb-1">
                Start Time
              </label>
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endTime" className="block mb-1">
                End Time
              </label>
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-primary text-white p-2 rounded-md cursor-pointer disabled:opacity-60 disabled:cursor-auto block w-fit mx-auto"
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDoctorModal;
