import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers } from "@/lib/data-fetching";
import { useRef, useState } from "react";
import AddUser from "./AddUser";
import { enqueueSnackbar } from "notistack";
import UploadFile from "./UploadFile";
import { Search } from "lucide-react"; 


function Users({ info }: any) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [id, setId] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [file, setFile] = useState<string | null>(null);
  const [search, setSearch] = useState<string>(""); 
  const ref = useRef<HTMLInputElement>(null);

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

  const filteredData =
    data?.filter(
      (item: any) =>
        item.username.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div>
     <div className="mb-4 relative w-full max-w-md">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
  <input
    type="text"
    placeholder="Search by username or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

      {isLoading ? (
        <div className="text-white text-3xl">Loading...</div>
      ) : filteredData.length !== 0 ? (
        <div className="flex flex-col gap-2 overflow-y-auto h-[490px] scrollbar-custom">
          {filteredData.map((item: any, i: number) => (
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
                  {item.username.charAt(0).toUpperCase() + item.username.slice(1)}
                </p>
                <p>
                  <span className="text-gray-300">Email: </span>
                  {item.email}
                </p>
                {item.appointments.length !== 0 ? (
                  <p className="text-gray-300">
                    <span>date: {item.appointments[0].date.slice(0, 10)}</span>
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
                  className="cursor-pointer bg-blue-500 text-white px-3 rounded-md py-2 disabled:opacity-65 disabled:cursor-not-allowed"
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
                  Upload
                </button>
                {info && info.role === "admin" && (
                  <button
                    className="cursor-pointer bg-red-500 text-white px-3 rounded-md py-2"
                    onClick={() => {
                      setId(item._id);
                      setRole(item.role);
                      mutate();
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          No User Found
        </div>
      )}

      {!isLoading && info && info.role === "admin" && (
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

export default Users;
