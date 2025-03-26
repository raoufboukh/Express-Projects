import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "@/lib/data-fetching";
import { IoMdClose } from "react-icons/io";

function AddUser({ setShow }: { setShow: (show: boolean) => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("doctor");
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
    mutation.mutate({ username, email, password, role });
  };

  return (
    <div className="fixed top-0 left-0 z-50 size-full flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 relative">
        <IoMdClose
          className="absolute right-2 text-2xl top-2 cursor-pointer"
          onClick={() => setShow(false)}
        />
        <h2 className="text-3xl text-center">Create New User!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="user">Username</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type="text"
              id="user"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="em">Email</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type="text"
              id="em"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pass">Password</label>
            <input
              className="border border-gray-300 rounded-md px-2 py-1"
              type="password"
              id="pass"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="role">Role</label>
            <select
              className="border border-gray-300 rounded-md px-2 py-1"
              name="role"
              id="role"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value="doctor">Doctor</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <button type="submit" disabled={mutation.isPending} className="bg-primary text-white p-2 rounded-md cursor-pointer">
              {mutation.isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
