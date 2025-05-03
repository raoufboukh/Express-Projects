import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getDoctors } from "@/lib/data-fetching";
import { useState } from "react";
import AddUser from "../Users/AddUser";
import ListDoctors from "./ListDoctors";
import DoctorsCommune from "./DoctorsCommune";
import { Search } from "lucide-react";

function Doctors({ user }: any) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(""); 

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

  const filteredDoctors =
    data?.filter(
      (item: any) =>
        item.username.toLowerCase().includes(search.toLowerCase()) ||
        item.commune.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div>
      <div className="mb-4 relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        <input
          type="text"
          placeholder="Find a doctor by name or commune..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading ? (
        <div className="text-white text-3xl">Loading...</div>
      ) : filteredDoctors.length !== 0 ? (
        <div className="flex flex-col gap-2 overflow-y-auto h-[490px] scrollbar-custom">
          {filteredDoctors.map((item: any, i: number) =>
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
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          No Doctor Found.
        </div>
      )}

      {!isLoading && user && user.role === "admin" && (
        <button
          className="bg-primary hover:bg-primary/80 block w-fit mx-auto cursor-pointer text-white px-4 py-2 rounded-md mt-4"
          onClick={() => setShow(!show)}
        >
          Add
        </button>
      )}
      {show && <AddUser setShow={setShow} />}
    </div>
  );
}

export default Doctors;
