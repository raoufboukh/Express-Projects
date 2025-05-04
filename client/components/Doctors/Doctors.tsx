import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getDoctors } from "@/lib/data-fetching";
import { useEffect, useState } from "react";
import AddUser from "../Users/AddUser";
import ListDoctors from "./ListDoctors";
import DoctorsCommune from "./DoctorsCommune";
import { MdAdd, MdSearch } from "react-icons/md";
import LoadingSpinner from "../Spinner";

function Doctors({ user }: any) {
  const [show, setShow] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ id, role }: { id: any; role: string }) =>
      deleteUser(id, role),
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
                - The doctors in {user.commune}:
              </h3>
              <div className="realtive flex items-center gap-2 w-76">
                <input
                  type="text"
                  placeholder="Search by username..."
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
                - All doctors
              </h3>
              <div className="realtive flex items-center gap-2 w-76">
                <input
                  type="text"
                  placeholder="Search by username..."
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
          <div className="flex flex-col gap-2 overflow-y-auto h-96 scrollbar-custom">
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
          className="bg-primary/70 hover:bg-primary/50 block w-fit mx-auto cursor-pointer text-white px-4 py-2 rounded-md mt-4 transition-all duration-300"
          onClick={() => setShow(!show)}
        >
          <MdAdd className="text-lg" />
        </button>
      )}
      {show && <AddUser setShow={setShow} />}
    </div>
  );
}

export default Doctors;
