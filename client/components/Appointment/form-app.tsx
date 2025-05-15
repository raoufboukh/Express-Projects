import { bookAppointment } from "@/lib/data-fetching";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { format } from "date-fns";
import { DatePickerDemo } from "./Date";

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

  const { mutate, isPending } = useMutation({
    mutationKey: ["bookAppointment"],
    mutationFn: (formData: typeof form) => {
      return bookAppointment({
        ...formData,
        date: format(formData.date, "yyyy-MM-dd"),
      });
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
        date: date,
        message: "",
      });
      enqueueSnackbar("Appointment booked successfully!", {
        variant: "success",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      ...form,
    });
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto p-6">
      <div className="flex-1">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 text-white md:w-110 mx-auto"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="w-fit text-sm font-medium">
              First Name
            </label>
            <input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="border border-gray-600 rounded-lg px-4 py-2.5 bg-gray-800 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              type="text"
              id="firstName"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="w-fit text-sm font-medium">
              Last Name
            </label>
            <input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="border border-gray-600 rounded-lg px-4 py-2.5 bg-gray-800 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              type="text"
              id="lastName"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="number" className="w-fit text-sm font-medium">
              Phone Number
            </label>
            <input
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              className="border border-gray-600 rounded-lg px-4 py-2.5 bg-gray-800 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              type="tel"
              id="number"
              maxLength={10}
              minLength={10}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="w-fit text-sm font-medium">
              Time{" "}
              <span className="text-gray-400 text-xs">
                (select time from 8:00 to 17:00)
              </span>
            </label>
            <input
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              type="time"
              className="border border-gray-600 rounded-lg px-4 py-2.5 bg-gray-800 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              name="time"
              id="time"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="w-fit text-sm font-medium">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="border border-gray-600 rounded-lg px-4 py-2.5 min-h-[120px] bg-gray-800 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              name="message"
              id="message"
            />
          </div>

          <div className="w-full text-center text-black">
            <div className="bg-gray-800 border border-gray-200 rounded-lg p-4 sticky top-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-400 mb-2">
                Select Appointment Date
              </h2>
              <p className="text-gray-300 mb-4">
                <span className="font-medium">Selected:</span>{" "}
                {format(form.date, "PPP")}
              </p>

              <div className="mb-4 border-b border-gray-200"></div>

              <DatePickerDemo
                date={form.date}
                setInfo={(selectedDate: Date) =>
                  setForm({ ...form, date: selectedDate })
                }
              />
            </div>
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
    </div>
  );
};

export default Form;
