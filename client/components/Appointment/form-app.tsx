import { bookAppointment } from "@/lib/data-fetching";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Form = () => {
    const [Form, setForm] = useState({
        firstName: "",
        lastName: "",
        number: "",
        time: "",
        date: new Date(),
    });
    const { mutate, isPending } = useMutation({
        mutationKey: ["bookAppointment"],
        mutationFn: () => {
            if (Form) {
                return bookAppointment(Form);
            }
            throw new Error("All fields are required");
        },
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!Form){
            enqueueSnackbar("All fields are required", {
                variant: "error",
            });
        }else{
            mutate();
        }
    }  
  return (
    <form action="" className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="user" className="w-fit">FirstName</label>
        <input
          value={Form.firstName}
          onChange={(e) => setForm({ ...Form, firstName: e.target.value })}
          className="border border-gray-300 rounded-md px-2 py-1"
          type="text"
          id="user"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="em" className="w-fit">LastName</label>
        <input
          value={Form.lastName}
          onChange={(e) => setForm({ ...Form, lastName: e.target.value })}
          className="border border-gray-300 rounded-md px-2 py-1"
          type="text"
          id="em"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="pass" className="w-fit">Number</label>
        <input
          value={Form.number}
          onChange={(e) => setForm({ ...Form, number: e.target.value })}
          className="border border-gray-300 rounded-md px-2 py-1"
          type="tel"
          id="pass"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="role" className="w-fit">Time</label>
        <input
          value={Form.time}
          onChange={(e) => setForm({ ...Form, time: e.target.value })}
          type="time"
          className="border border-gray-300 rounded-md px-2 py-1"
          name="role"
          id="role"
        />
      </div>
      <div className="mt-5 mx-auto w-fit">
        <DatePicker
          selected={Form.date}
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
              if (newDate > new Date()) setForm({...Form, date: newDate});
              else
                enqueueSnackbar("You can't book an appointment in the past", {
                  variant: "error",
                });
            }
          }}
          inline
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-5 rounded-md cursor-pointer block w-fit mx-auto mt-5"
          onClick={handleSubmit}
          disabled={isPending}
        >
            {isPending ? "Booking..." : "Book"}
        </button>
      </div>
    </form>
  );
}

export default Form
