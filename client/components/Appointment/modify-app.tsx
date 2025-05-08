import { getAppointmentsCount, modifyAppointment } from "@/lib/data-fetching";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { DatePickerDemo } from "./Date";
import { enqueueSnackbar } from "notistack";

const MAX_APPOINTMENTS_PER_DAY = 1;

interface ModifyProps {
  id: string;
  setShow: (show: boolean) => void;
  data: any;
  fetchUserData: () => void;
}

const Modify: React.FC<ModifyProps> = ({
  id,
  setShow,
  data,
  fetchUserData,
}) => {
  const [info, setInfo] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    date: data.date,
    number: data.number,
    time: data.time,
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
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["modify-appointment"],
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      modifyAppointment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      fetchUserData();
      setShow(false);
    },
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (info.message.length < 10) {
      enqueueSnackbar("Message must be at least 10 characters", {
        variant: "error",
      });
      return;
    }

    mutate({
      id,
      data: {
        ...info,
      },
    });
  };

  return (
    <div className="fixed top-0 left-0 z-50 size-full flex items-center justify-center bg-black/40">
      <div className="bg-white text-black rounded-2xl p-8 relative sm:min-w-96">
        <IoMdClose
          className="absolute right-2 text-2xl top-2 cursor-pointer"
          onClick={() => setShow(false)}
        />
        <h2 className="text-2xl text-center">Change Appointment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="user">FirstName</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type="text"
              id="user"
              onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
              value={info.firstName}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="em">LastName</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type="text"
              id="em"
              onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
              value={info.lastName}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="num">Number</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type="tel"
              id="num"
              onChange={(e) => setInfo({ ...info, number: e.target.value })}
              value={info.number}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="date">Date</label>
            <DatePickerDemo date={info.date} setInfo={setInfo} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="pass">Time</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type="time"
              id="pass"
              onChange={(e) => setInfo({ ...info, time: e.target.value })}
              value={info.time}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="role">Message</label>
            <textarea
              className="border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
              name="role"
              id="role"
              placeholder="Any Excuse for this change..."
              onChange={(e) => setInfo({ ...info, message: e.target.value })}
              value={info.message}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-white p-2 rounded-md cursor-pointer"
            >
              {isPending ? "Changing..." : "Change"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modify;
