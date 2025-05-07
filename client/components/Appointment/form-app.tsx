import { bookAppointment, getAppointmentsCount } from "@/lib/data-fetching";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";

const MAX_APPOINTMENTS_PER_DAY = 20;

const Form = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    number: "",
    time: "",
    date: date,
    message: "",
  });

  const { data: appointmentCounts, isLoading } = useQuery({
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

  const { mutate, isPending } = useMutation({
    mutationKey: ["bookAppointment"],
    mutationFn: () => {
      const dateKey = new Date(form.date).toISOString().split("T")[0];
      if (unavailableDates[dateKey]) {
        throw new Error(
          "This date is fully booked. Please select another date."
        );
      }
      return bookAppointment(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["appointmentCounts"],
      });
      setForm({
        firstName: "",
        lastName: "",
        number: "",
        time: "",
        date: (() => {
          const d = new Date();
          d.setDate(d.getDate() + 1);
          d.setHours(0, 0, 0, 0);
          return d;
        })(),
        message: "",
      });
      enqueueSnackbar("Appointment booked successfully!", {
        variant: "success",
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(error.message || "Failed to book appointment", {
        variant: "error",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isUnavailableDate = (date: Date): boolean => {
    const dateKey = date.toISOString().split("T")[0];
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
    
    setForm({ ...form, date: selectedDate });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto p-6">
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-white">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="w-fit text-sm font-medium">
              First Name
            </label>
            <input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="border border-gray-600 rounded-lg px-4 py-2.5 bg-gray-800 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              type="text"
              id="firstName"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="w-fit text-sm font-medium">
              Last Name
            </label>
            <input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="border border-gray-600 rounded-lg px-4 py-2.5 bg-gray-800 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              type="text"
              id="lastName"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="number" className="w-fit text-sm font-medium">
              Phone Number
            </label>
            <input
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              className="border border-gray-600 rounded-lg px-4 py-2.5 bg-gray-800 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              type="tel"
              id="number"
              maxLength={10}
              minLength={10}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="w-fit text-sm font-medium">
              Time
            </label>
            <input
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              type="time"
              className="border border-gray-600 rounded-lg px-4 py-2.5 bg-gray-800 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              name="time"
              id="time"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="w-fit text-sm font-medium">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="border border-gray-600 rounded-lg px-4 py-2.5 min-h-[120px] bg-gray-800 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              name="message"
              id="message"
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-5 rounded-lg cursor-pointer w-full mt-4 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>

      <div className="w-full md:w-[30%]">
    <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Select Appointment Date
      </h2>
      <p className="text-gray-700 mb-4">
        <span className="font-medium">Selected:</span> {format(form.date, "PPP")}
      </p>
      
      <div className="mb-4 border-b border-gray-200"></div>

      {isLoading ? (
        <Skeleton className="h-[280px] w-full rounded-lg" />
      ) : (
        <div className="mb-4">
          <Calendar
            mode="single"
            selected={form.date}
            onSelect={handleDateSelect}
            initialFocus
            className="text-gray-900 [&_.rdp-day_selected]:bg-blue-500 [&_.rdp-day_selected]:text-white"
            modifiers={{
              past: isPastDate,
              unavailable: isUnavailableDate,
            }}
            modifiersStyles={{
              past: {
                color: "#9CA3AF",
                textDecoration: "line-through",
              },
              unavailable: {
                color: "#9CA3AF",
                textDecoration: "line-through",
              },
            }}
            styles={{
              caption: { 
                color: "inherit",
                marginBottom: "0.75rem",
                fontSize: "0.9rem",
              },
              caption_label: { 
                fontSize: "0.9rem",
                fontWeight: "500",
              },
              head_cell: { 
                color: "#6B7280",
                fontSize: "0.75rem",
                fontWeight: "500",
              },
              cell: {
                padding: "0.2rem 0",
              },
              day: { 
                fontSize: "0.875rem",
                margin: "0.1rem",

              },
            }}
          />
        </div>
      )}
      
     
    </div>
      </div>
    </div>
  );
};

export default Form;