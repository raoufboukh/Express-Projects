"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getDoctors } from "@/lib/data-fetching";
import { useState } from "react";
import AddUser from "../Users/AddUser";
import ListDoctors from "./ListDoctors";
import DoctorsCommune from "./DoctorsCommune";

function Doctors({ user }: any) {
  const [show, setShow] = useState(false);
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
  return (
    <div>
      {isLoading ? (
        <div className="text-white text-3xl">Chargement...</div>
      ) : data.length !== 0 ? (
        <>
          {user && user.role !== "admin" ? (
            <h3 className="text-white text-2xl mb-2">
              - The doctors in {user.commune}:
            </h3>
          ) : (
            <h3 className="text-white text-2xl mb-2">- All doctors</h3>
          )}
          <div className="flex flex-col gap-2 overflow-y-auto h-96 scrollbar-custom">
            {data.map((item: any, i: number) =>
              user.role !== "admin" ? (
                <DoctorsCommune item={item} user={user} />
              ) : (
                <ListDoctors item={item} user={user} mutate={mutate} key={i} />
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
