import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers } from "@/lib/data-fetching";
import { useEffect, useRef, useState } from "react";
import AddUser from "./AddUser";
import { enqueueSnackbar } from "notistack";
import UploadFile from "./UploadFile";
import { MdFileUpload, MdDelete, MdAdd, MdSearch } from "react-icons/md";

function Users({ info }: any) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [id, setId] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [file, setFile] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<any[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => deleteUser(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const handleUpload = async () => {
    const file = ref.current?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      enqueueSnackbar("Please select an image file", { variant: "error" });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setFile(reader.result as string);
    };
    if (ref.current) ref.current.value = "";
  };
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);
  return (
    <div className="">
      {isLoading ? (
        <div className="text-white text-3xl">Chargement...</div>
      ) : data.length !== 0 ? (
        <>
          <div className="flex justify-between items-center text-white  mb-2">
            <h3 className="text-2xl">- All Users</h3>
            <div className="realtive flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="placeholder:text-white p-2 border-2 outline-none border-gray-600 bg-gray-800 rounded-md"
                onChange={(e) => {
                  if (!data) return;
                  if (e.target.value === "") {
                    setUsers(data);
                    return;
                  }
                  const value = e.target.value.toLowerCase();
                  const filteredData = data.filter((item: any) =>
                    item.username.toLowerCase().includes(value)
                  );
                  setUsers(filteredData);
                }}
              />
              <MdSearch className="text-gray-600 text-2xl cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto h-96 scrollbar-custom">
            {users.map((item: any, i: number) => (
              <div
                key={i}
                className="text-white bg-gray-800 p-4 rounded-md shadow-md flex md:justify-between justify-center items-center gap-5 flex-wrap sm:px-10 sm:text-base text-sm"
              >
                {file && (
                  <UploadFile
                    file={file}
                    setFile={setFile}
                    id={id}
                    setId={setId}
                    item={user}
                  />
                )}
                <div className="flex flex-col justify-between md:w-fit w-full">
                  <p>
                    <span className="text-gray-300">Username: </span>
                    {item.username.charAt(0).toUpperCase() +
                      item.username.slice(1)}
                  </p>
                  <p>
                    <span className="text-gray-300">Email: </span>
                    {item.email}
                  </p>
                  {item.appointments.length !== 0 ? (
                    <p className="text-gray-300">
                      <span>
                        date: {item.appointments[0].date.slice(0, 10)}
                      </span>
                      <span className="text-gray-300"> - </span>
                      <span>time: {item.appointments[0].time}</span>
                      <span className="text-gray-300"> - </span>
                      <span
                        className={`${
                          item.appointments[0].status === "pending"
                            ? "text-yellow-500"
                            : item.appointments[0].status === "accepted"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {item.appointments[0].status}
                      </span>
                    </p>
                  ) : (
                    <p className="text-gray-300">No appointments</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="file"
                    className="hidden"
                    ref={ref}
                    accept="image/*"
                    onChange={handleUpload}
                  />
                  <button
                    className="cursor-pointer text-blue-500 px-3 rounded-md py-2 disabled:opacity-30 disabled:cursor-auto transition-all duration-300 hover:text-blue-500/60"
                    disabled={
                      item.appointments.length === 0 ||
                      Date.now() <
                        new Date(item.appointments[0].date).getTime() ||
                      item.appointments[0].status === "pending" ||
                      item.appointments[0].status === "rejected"
                    }
                    onClick={() => {
                      ref.current?.click();
                      setUser(item);
                    }}
                  >
                    <MdFileUpload className="text-xl" />
                  </button>
                  {info && info.role === "admin" && (
                    <button
                      className="cursor-pointer text-red-500 px-3 rounded-md py-2 transition-all duration-300 hover:text-red-500/60"
                      onClick={() => {
                        setId(item._id);
                        setRole(item.role);
                        mutate();
                      }}
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          Aucun utilisateur trouvé
        </div>
      )}
      {!isLoading && info && info.role === "admin" && (
        <button
          className="bg-primary/70 hover:bg-primary/50 block w-fit mx-auto cursor-pointer text-white px-4 py-2 rounded-md mt-4 transition-all duration-300"
          onClick={() => setShow(!show)}
        >
          <MdAdd className="text-xl" />
        </button>
      )}
      {show && <AddUser setShow={setShow} />}
    </div>
  );
}

export default Users;
