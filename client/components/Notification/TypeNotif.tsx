import { acceptAccountType, rejectAccountType } from "@/lib/data-fetching";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  item: any;
  fetchUserData: () => void;
}

const TypeNotification = ({ item, fetchUserData }: Props) => {
  const [message, setMessage] = useState("");
  const [id, setId] = useState("");
  const { mutate, isPending } = useMutation({
    mutationKey: ["notifications"],
    mutationFn: () => {
      if (message === "Accepter") {
        return acceptAccountType(id);
      } else {
        return rejectAccountType(id);
      }
    },
    onSuccess: () => {
      fetchUserData();
      setId("");
    },
  });
  return (
    <div
      key={item._id}
      className="text-white bg-gray-800 p-4 rounded-md shadow-md flex flex-col justify-between px-10 sm:text-base text-sm"
    >
      <p>
        <span className="text-gray-300">Message: </span>
        {item.message}
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
  );
};

export default TypeNotification;
