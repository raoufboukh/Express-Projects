"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { enqueueSnackbar } from "notistack";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentsCount } from "@/lib/data-fetching";

interface DatePickerProps {
  date: Date;
  setInfo: (info: any) => void;
  unavailableDates?: Record<string, boolean>;
  isLoading?: boolean;
}

const MAX_APPOINTMENTS_PER_DAY = 1;

export function DatePickerDemo({
  date,
  setInfo,
  isLoading = false,
}: DatePickerProps) {
  const { data: appointmentCounts } = useQuery({
    queryKey: ["appointmentCounts"],
    queryFn: getAppointmentsCount,
  });

  const [unavailableDates, setUnavailableDates] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (appointmentCounts) {
      const unavailable: Record<string, boolean> = {};
      appointmentCounts.forEach((item: any) => {
        const dateKey = new Date(item.date).toISOString().split("T")[0];
        if (item.count >= MAX_APPOINTMENTS_PER_DAY) {
          unavailable[dateKey] = true;
        }
      });
      setUnavailableDates(unavailable);
    }
  }, [appointmentCounts]);

  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isUnavailableDate = (date: Date): boolean => {
    const dateKey = format(date, "yyyy-MM-dd");
    return unavailableDates[dateKey];
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    if (isPastDate(selectedDate)) {
      enqueueSnackbar("Please select a date in the future", {
        variant: "error",
      });
      return;
    }
    if (isUnavailableDate(selectedDate)) {
      enqueueSnackbar(
        "This date is fully booked. Please select another date.",
        {
          variant: "error",
        }
      );
      return;
    }
    setInfo(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[240px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date instanceof Date ? date : new Date(date), "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {isLoading ? (
          <div className="p-4">
            <Skeleton className="h-[240px] w-[280px]" />
          </div>
        ) : (
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            modifiers={{
              past: isPastDate,
              unavailable: isUnavailableDate,
            }}
            modifiersStyles={{
              past: {
                opacity: 0.3,
                textDecoration: "line-through",
              },
              unavailable: {
                opacity: 0.3,
                textDecoration: "line-through",
              },
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
