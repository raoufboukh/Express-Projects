import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers, getScanResults } from "@/lib/data-fetching";
import { useEffect, useRef, useState } from "react";
import AddUser from "./AddUser";
import { enqueueSnackbar } from "notistack";
import UploadFile from "./UploadFile";
import {
  MdFileUpload,
  MdDelete,
  MdAdd,
  MdSearch,
  MdClose,
} from "react-icons/md";
import LoadingSpinner from "../Spinner";
import Image from "next/image";

function Users({ info }: any) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [id, setId] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [file, setFile] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<any[]>([]);
  // New state for managing the scan results
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [resultsLoading, setResultsLoading] = useState(false);

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

  // New function to handle user click
  const handleUserClick = async (user: any) => {
    try {
      setResultsLoading(true);
      setSelectedUser(user);
      console.log("user", user);

      const results = await getScanResults(user._id);
      setScanResults(results);
      console.log("scanResults", results);
    } catch (error) {
      console.error("Error fetching scan results:", error);
      setScanResults([]);
    } finally {
      setResultsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : data.length !== 0 ? (
        <>
          <div className="flex justify-center flex-wrap md:justify-between items-center text-white mb-2">
            <h3 className="text-2xl text-center md:mb-0 mb-5 md:w-fit w-76">
              • All Users
            </h3>
            <div className="realtive flex items-center gap-2 w-76">
              <input
                type="text"
                placeholder="Search by name or email..."
                className="placeholder:text-white p-2 border-2 outline-none border-gray-600 bg-gray-800 rounded-md w-full"
                onChange={(e) => {
                  if (!data) return;
                  if (e.target.value === "") {
                    setUsers(data);
                    return;
                  }
                  const value = e.target.value.toLowerCase();
                  const filteredData = data.filter(
                    (item: any) =>
                      item.username.toLowerCase().includes(value) ||
                      item.email.toLowerCase().includes(value)
                  );
                  setUsers(filteredData);
                }}
              />
              <MdSearch className="text-gray-600 text-2xl cursor-pointer" />
            </div>
          </div>
          <div
            className={`${
              users.length > 3
                ? "h-[calc(100vh - 1px)]"
                : "lg:h-fit h-[calc(100vh - 1px)]"
            } flex flex-col gap-2`}
          >
            {users.map((item: any, i: number) => (
              <div
                key={i}
                className="text-white bg-gray-800 p-4 rounded-md shadow-md flex md:justify-between justify-center items-center gap-5 flex-wrap sm:px-10 sm:text-base text-sm cursor-pointer hover:bg-gray-700 transition-all"
                onClick={() => handleUserClick(item)}
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
                <div
                  className="flex gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
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
          No User Found
        </div>
      )}

      {!isLoading && info && info.role === "admin" && (
        <button
          className="bg-primary/70 hover:bg-primary/50 cursor-pointer text-white px-4 py-2 rounded-md transition-all duration-300 sticky bottom-4 left-1/2 transform -translate-x-1/2"
          onClick={() => setShow(!show)}
        >
          <MdAdd className="text-xl" />
        </button>
      )}
      {show && <AddUser setShow={setShow} />}

      {/* Scan Results Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedUser.username.charAt(0).toUpperCase() +
                  selectedUser.username.slice(1)}
                's Scan Results
              </h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setSelectedUser(null)}
              >
                <MdClose size={24} />
              </button>
            </div>

            {resultsLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner />
              </div>
            ) : scanResults.length > 0 ? (
              <div
                className={`${
                  scanResults.length >= 2
                    ? "h-[calc(100vh-1px)]"
                    : "lg:h-fit h-[calc(100vh-1px)]"
                } flex flex-wrap gap-4 justify-start`}
              >
                {scanResults.map((scan, index) => (
                  <div
                    key={scan._id}
                    className="lg:basis-[23%] md:basis-[30%] sm:basis-[45%] basis-full text-white bg-gray-800 rounded-md shadow-md text-sm overflow-hidden h-fit"
                  >
                    <div className="w-full relative h-36">
                      <Image
                        src={scan.image}
                        alt={scan.image}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-md"
                      />
                    </div>
                    <div className="p-2 space-y-1">
                      <p>
                        <span className="text-gray-400">Date:</span>{" "}
                        {scan.date.slice(0, 10)}
                      </p>
                      <p>
                        <span className="text-gray-400">Time:</span>{" "}
                        {new Date(
                          new Date(scan.date).getTime() + 60 * 60 * 1000
                        )
                          .toISOString()
                          .slice(11, 16)}
                      </p>
                      <p>
                        <span className="text-gray-400">Result:</span>{" "}
                        {scan.result}
                      </p>
                      <p>
                        <span className="text-gray-400">AiAnalysis:</span>{" "}
                        {scan.aiAnalysis}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                No scan results found for this user.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
