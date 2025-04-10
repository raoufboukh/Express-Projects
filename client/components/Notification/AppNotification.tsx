import { acceptNotification, rejectNotification } from "@/lib/data-fetching";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  item: any;
  fetchUserData: () => void;
}

const AppointmentNotification = ({ item, fetchUserData }: Props) => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const { mutate, isPending } = useMutation({
    mutationKey: ["notifications"],
    mutationFn: () => {
      if (message === "Accepter") {
        return acceptNotification(id);
      } else {
        return rejectNotification(id);
      }
    },
    onSuccess: () => {
      fetchUserData();
      setId("");
    },
  });
  return (
    <>
      <div
        key={item._id}
        className="text-white bg-gray-800 p-4 rounded-md shadow-md flex flex-col justify-between px-10 sm:text-base text-sm"
      >
        <p>
          <span className="text-gray-300">Message: </span>
          {item.message}
        </p>
        <p>
          <span className="text-gray-300">FirstName: </span>
          {item.appointment.firstName}
        </p>
        <p>
          <span className="text-gray-300">LastName: </span>
          {item.appointment.lastName}
        </p>
        <p>
          <span className="text-gray-300">Number: </span>
          {item.appointment.number}
        </p>
        <p>
          <span className="text-gray-300">Time: </span>
          {item.appointment.time}
        </p>
        <p>
          <span className="text-gray-300">date: </span>
          {item.appointment.date.slice(0, 10)}
        </p>
        <div className="flex justify-between mt-5">
          <button
            type="button"
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
            type="button"
            className="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-500/80"
            onClick={() => {
              setId(item._id);
              setMessage("Refuser");
              mutate();
            }}
            disabled={isPending}
          >
            Refuser
          </button>
        </div>
      </div>
    </>
  );
};

export default AppointmentNotification;
