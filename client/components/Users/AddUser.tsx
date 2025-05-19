import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "@/lib/data-fetching";
import { IoMdClose } from "react-icons/io";
import { communes, wilayas } from "../constants";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { enqueueSnackbar } from "notistack";

function AddUser({ setShow }: { setShow: (show: boolean) => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState(wilayas[0]);
  const [commune, setCommune] = useState("");
  const [show, setSHow] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      setShow(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return enqueueSnackbar(
        !username.trim() ? "Username required" : "Password required",
        { variant: "error" }
      );
    }
    mutation.mutate({ username, email, password, region, commune });
  };

  return (
    <div className="fixed top-0 left-0 z-50 size-full flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 relative">
        <IoMdClose
          className="absolute right-2 text-2xl top-2 cursor-pointer"
          onClick={() => setShow(false)}
        />
        <h2 className="text-3xl text-center">Create New User!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="user">Username</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type="text"
              id="user"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="em">Email</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type="text"
              id="em"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="pass">Password</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type={show ? "text" : "password"}
              id="pass"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="absolute right-3 top-10 text-gray-400 cursor-pointer">
              <LuEyeClosed
                onClick={() => setSHow(true)}
                className={`${show ? "hidden" : ""}`}
              />
              <LuEye
                onClick={() => setSHow(false)}
                className={`${show ? "" : "hidden"}`}
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="reg" className="block mb-1">
              Region
            </label>
            <select
              id="reg"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-md"
            >
              {wilayas.map((wilaya, i) => (
                <option key={i} value={wilaya}>
                  {i + 1}-{wilaya}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="com" className="block mb-1">
              Commune
            </label>
            <select
              id="com"
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              className="w-full p-2  border border-gray-200 rounded-md"
            >
              <option value="" disabled>
                Select a commune
              </option>
              {communes.map(
                (com) =>
                  com.wilaya_name === region &&
                  com.communes.map((com, i) => (
                    <option key={i} value={com}>
                      {i + 1}-{com}
                    </option>
                  ))
              )}
            </select>
          </div>
          <div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-primary text-white p-2 rounded-md cursor-pointer disabled:opacity-60 disabled:cursor-auto block w-fit mx-auto"
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
