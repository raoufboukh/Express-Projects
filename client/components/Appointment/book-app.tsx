"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import { bookAppointment, check } from "@/lib/data-fetching";

import "react-datepicker/dist/react-datepicker.css"; // Ajout des styles CSS pour le DatePicker

function BookApp() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await check();
        setUser(data);
      }
      catch (err) {
        console.error("Error during auth check:", err);
      }
    };
    checkAuth();
  }, [user]);
  const { mutate, isPending } = useMutation({
    mutationKey: ["bookAppointment"],
    mutationFn: () => {
      if (startDate) {
        return bookAppointment(startDate);
      }
      throw new Error("Start date is null");
    },
  });
  return (
    <div className="text-white">
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => {
          if (date) {
            const newDate = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              12,
              0,
              0
            );
            setStartDate(newDate);
          }
        }}
        inline
      />
      <button
        className="cursor-pointer block bg-primary px-2 py-1 rounded-sm transition-all duration-300 hover:bg-primary/80"
        onClick={() => {
          if (startDate) {
            mutate();
          }
        }}
        disabled={isPending}
      >
        Book
      </button>
      {isPending && <p>Loading...</p>}
      {user.appointments && user?.appointments[0]?.date && (
        <p>You are booking at {user.appointments[0].date.slice(0, 10)}</p>
      )}
    </div>
  );
}

export default BookApp;
