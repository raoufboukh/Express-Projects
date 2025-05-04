import {
  acceptNotification,
  deleteNotification,
  rejectNotification,
} from "@/lib/data-fetching";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MdDelete, MdCheck, MdClose } from "react-icons/md";

interface Props {
  item: any;
  fetchUserData: () => void;
}

const AppointmentNotification = ({ item, fetchUserData }: Props) => {
  const queryClient = useQueryClient();
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const { mutate, isPending } = useMutation({
    mutationKey: ["notifications"],
    mutationFn: () => {
      if (message === "Accepter") {
        return acceptNotification(id);
      } else if (message === "Refuser") {
        return rejectNotification(id);
      } else {
        return deleteNotification(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
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
        <div className="">
          {item.appointment.status === "pending" ? (
            <div className="flex justify-between mt-5">
              <button
                type="button"
                className="text-primary px-2 py-1 rounded-md cursor-pointer transition-all duration-300 hover:text-primary/40 disabled:opacity-50"
                onClick={() => {
                  setId(item._id);
                  setMessage("Accepter");
                  mutate();
                }}
                disabled={isPending}
              >
                <MdCheck className="text-lg" />
              </button>
              <button
                type="button"
                className="text-red-500 px-2 py-1 rounded-md cursor-pointer transition-all duration-300 hover:text-red-500/40"
                onClick={() => {
                  setId(item._id);
                  setMessage("Refuser");
                  mutate();
                }}
                disabled={isPending}
              >
                <MdClose className="text-lg" />
              </button>
            </div>
          ) : (
            <div>
              <p className="text-green-500">{item.appointment.status}</p>
              <button
                className="text-red-500 px-2 py-1 rounded-md cursor-pointer  block w-fit mx-auto transition-all duration-300 hover:text-red-500/40"
                onClick={() => {
                  setId(item._id);
                  setMessage("Delete");
                  mutate();
                }}
              >
                <MdDelete className="text-lg" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentNotification;
