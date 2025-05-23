import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDoctor, getDoctors } from "@/lib/data-fetching";
import { useEffect, useState } from "react";
import ListDoctors from "./ListDoctors";
import DoctorsCommune from "./DoctorsCommune";
import { MdAdd, MdSearch } from "react-icons/md";
import LoadingSpinner from "../Spinner";
import AddDoctorModal from "./AddDoctorModal";

function Doctors({ user }: any) {
  const [show, setShow] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ id }: { id: any }) => deleteDoctor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
  useEffect(() => {
    if (data) {
      setDoctors(data);
    }
  }, [data]);
  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : data.length !== 0 ? (
        <>
          {user && user.role !== "admin" ? (
            <div className="flex flex-wrap justify-center md:justify-between items-center text-white mb-2">
              <h3 className="text-white text-2xl w-76 text-center md:w-fit md:mb-0 mb-5">
                • The doctors in {user.region}:
              </h3>
              <div className="realtive flex items-center gap-2 w-76">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="placeholder:text-white p-2 border-2 outline-none border-gray-600 bg-gray-800 rounded-md w-full"
                  onChange={(e) => {
                    if (!data) return;
                    if (e.target.value === "") {
                      setDoctors(data);
                      return;
                    }
                    const value = e.target.value.toLowerCase();
                    const filteredData = data.filter((item: any) =>
                      item.username.toLowerCase().includes(value)
                    );
                    setDoctors(filteredData);
                  }}
                />
                <MdSearch className="text-gray-600 text-2xl cursor-pointer" />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center md:justify-between items-center text-white mb-2">
              <h3 className="text-white text-2xl w-76 text-center md:w-fit md:mb-0 mb-5">
                • All doctors
              </h3>
              <div className="realtive flex items-center gap-2 w-76">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="placeholder:text-white p-2 border-2 outline-none border-gray-600 bg-gray-800 rounded-md w-full"
                  onChange={(e) => {
                    if (!data) return;
                    if (e.target.value === "") {
                      setDoctors(data);
                      return;
                    }
                    const value = e.target.value.toLowerCase();
                    const filteredData = data.filter((item: any) =>
                      item.username.toLowerCase().includes(value)
                    );
                    setDoctors(filteredData);
                  }}
                />
                <MdSearch className="text-gray-600 text-2xl cursor-pointer" />
              </div>
            </div>
          )}
          <div
            className={`${
              doctors.length > 3
                ? "h-[calc(100vh - 1px)]"
                : "lg:h-fit h-[calc(100vh - 1px)]"
            } flex flex-col gap-2`}
          >
            {doctors.map((item: any, i: number) =>
              user.role !== "admin" ? (
                <DoctorsCommune i={i} key={i} item={item} user={user} />
              ) : (
                <ListDoctors
                  i={i}
                  item={item}
                  user={user}
                  mutate={mutate}
                  key={i}
                />
              )
            )}
          </div>
        </>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          Aucun doctor trouvé
        </div>
      )}
      {!isLoading && user && user.role === "admin" && (
        <button
          className="bg-primary/70 hover:bg-primary/50 cursor-pointer text-white px-4 py-2 rounded-md transition-all duration-300 sticky bottom-4 left-1/2 transform -translate-x-1/2"
          onClick={() => setShow(!show)}
        >
          <MdAdd className="text-lg" />
        </button>
      )}
      {show && <AddDoctorModal setShow={setShow} />}
    </div>
  );
}

export default Doctors;
