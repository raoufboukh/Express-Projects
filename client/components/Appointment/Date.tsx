"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { enqueueSnackbar } from "notistack";

interface DatePickerProps {
  date: Date;
  setInfo: (info: any) => void;
}

export function DatePickerDemo({ date, setInfo }: DatePickerProps) {
  const normalizeDate = (date: Date | null | undefined): Date => {
    if (!date) return new Date();
    const normalizedDate = new Date(date);
    normalizedDate.setHours(12, 0, 0, 0);
    return normalizedDate;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            const normalizedDate = normalizeDate(selectedDate);
            if (normalizedDate < new Date()) {
              enqueueSnackbar("Please select a date in the future", {
                variant: "error",
              });
              return;
            }
            setInfo((prev: any) => ({ ...prev, date: normalizedDate }));
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
