"use client";
import React from "react";
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

interface DatePickerProps {
  date: Date;
  setInfo: (info: any) => void;
  unavailableDates?: Record<string, boolean>;
  isLoading?: boolean;
}

export function DatePickerDemo({
  date,
  setInfo,
  unavailableDates = {},
  isLoading = false,
}: DatePickerProps) {
  const normalizeDate = (date: Date | null | undefined): Date => {
    if (!date) return new Date();
    const normalizedDate = new Date(date);
    return normalizedDate;
  };

  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    const normalized = normalizeDate(date);
    return normalized < today;
  };

  const isUnavailableDate = (date: Date): boolean => {
    const dateKey = date.toISOString().split("T")[0];
    return unavailableDates[dateKey];
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const normalizedDate = normalizeDate(selectedDate);
    if (isPastDate(normalizedDate)) {
      enqueueSnackbar("Please select a date in the future", {
        variant: "error",
      });
      return;
    }
    if (isUnavailableDate(normalizedDate)) {
      enqueueSnackbar(
        "This date is fully booked. Please select another date.",
        {
          variant: "error",
        }
      );
      return;
    }
    setInfo((prev: any) => ({ ...prev, date: normalizedDate }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[240px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
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
            onSelect={handleSelect}
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
