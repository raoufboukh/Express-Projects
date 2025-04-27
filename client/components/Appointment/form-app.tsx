import { bookAppointment, getAppointmentsCount } from "@/lib/data-fetching";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { DatePickerDemo } from "./Date";

const MAX_APPOINTMENTS_PER_DAY = 1;

const Form = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const queryClient = useQueryClient();
  const [Form, setForm] = useState({
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
      if (!Form.firstName || !Form.lastName || !Form.number || !Form.time) {
        throw new Error("Please fill in all required fields");
      }
      const dateKey = new Date(Form.date).toISOString().split("T")[0];
      if (unavailableDates[dateKey]) {
        throw new Error(
          "This date is fully booked. Please select another date."
        );
      }
      return bookAppointment(Form);
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

  return (
    <form action="" className="flex flex-col gap-5 text-white">
      <div className="flex flex-col gap-2">
        <label htmlFor="user" className="w-fit">
          FirstName
        </label>
        <input
          value={Form.firstName}
          onChange={(e) => setForm({ ...Form, firstName: e.target.value })}
          className="border border-gray-300 rounded-md px-2 py-1"
          type="text"
          id="user"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="em" className="w-fit">
          LastName
        </label>
        <input
          value={Form.lastName}
          onChange={(e) => setForm({ ...Form, lastName: e.target.value })}
          className="border border-gray-300 rounded-md px-2 py-1"
          type="text"
          id="em"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="pass" className="w-fit">
          Number
        </label>
        <input
          value={Form.number}
          onChange={(e) => setForm({ ...Form, number: e.target.value })}
          className="border border-gray-300 rounded-md px-2 py-1"
          type="tel"
          id="pass"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="time" className="w-fit">
          Time
        </label>
        <input
          value={Form.time}
          onChange={(e) => setForm({ ...Form, time: e.target.value })}
          type="time"
          className="border border-gray-300 rounded-md px-2 py-1"
          name="time"
          id="time"
          required
        />
      </div>

      <div className="mt-5 mx-auto w-fit">
        <DatePickerDemo
          date={Form.date}
          setInfo={setForm}
          unavailableDates={unavailableDates}
          isLoading={isLoading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="w-fit">
          Message
        </label>
        <textarea
          value={Form.message}
          onChange={(e) => setForm({ ...Form, message: e.target.value })}
          className="border border-gray-300 rounded-md px-2 py-1 min-h-[100px]"
          name="message"
          id="message"
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-5 rounded-md cursor-pointer block w-fit mx-auto mt-5 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Booking..." : "Book"}
        </button>
      </div>
    </form>
  );
};

export default Form;
