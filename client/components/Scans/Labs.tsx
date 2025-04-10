"use client";
import { useEffect, useState } from "react";
import { labs } from "../constants";
import { check } from "@/lib/data-fetching";

interface LabsProps {
  id: number;
  setId: (id: number) => void;
}

const Labs: React.FC<LabsProps> = ({ id, setId }) => {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await check();
        if (!data) {
          setUser({});
        } else {
          setUser(data);
        }
      } catch (error) {
        console.error("Error during auth check:", error);
      }
    };
    checkAuth();
  }, []);
  return (
    <div
      className={`grid lg:grid-cols-2 gap-4 lg:h-fit h-96 overflow-y-auto scrollbar-custom`}
    >
      {labs.map((lab, i) => (
        <button
          key={i}
          className={`${
            id === lab.id && "border border-gray-300"
          } cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed bg-gray-800 p-4 rounded-md shadow-md relative `}
          onClick={() => setId(lab.id)}
          disabled={lab.id > 1 && user.accountType !== "premium"}
        >
          <div className="absolute top-2 left-2 size-4 rounded-full bg-white flex items-center justify-center">
            <span
              className={`${lab.id === id && "bg-primary"} size-3 rounded-full`}
            ></span>
          </div>
          <div className="flex flex-col justify-between px-10">
            <p className="flex items-center gap-3 text-white">
              <span className="text-gray-300">Lab Name: </span>
              {lab.title}
            </p>
            <p className="flex items-center gap-3 text-white">
              <span className="text-gray-300">Location: </span>
              {lab.address}
            </p>
            <p className="flex items-center gap-3 text-white">
              <span className="text-gray-300">Phone: </span>
              {lab.phone}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Labs;
