import React from "react";
import { communes, wilayas } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modifyInformation } from "@/lib/data-fetching";

const Settings = ({ user }: any) => {
  const queryClient = useQueryClient();
  const [info, setInfo] = React.useState({
    username: user?.username,
    email: user?.email,
    password: "",
    region: user?.region,
    commune: user?.commune,
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["modifyInformation"],
    mutationFn: () => modifyInformation(info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="text-white sm:w-100 mx-auto flex flex-col gap-2"
    >
      <div className=" flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={info.username}
          onChange={(e) => setInfo({ ...info, username: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded-md"
        />
      </div>

      <div className=" flex flex-col gap-2">
        <label htmlFor="em">Email</label>
        <input
          type="text"
          name="username"
          id="em"
          value={info.email}
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded-md"
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label htmlFor="pass">Password</label>
        <input
          type="password"
          name="username"
          id="pass"
          value={info.password}
          onChange={(e) => setInfo({ ...info, password: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded-md"
        />
      </div>
      <div className="">
        <label htmlFor="reg" className="block text-gray-400 my-1">
          Region
        </label>
        <select
          id="reg"
          value={info.region}
          onChange={(e) => setInfo({ ...info, region: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded-md"
        >
          {wilayas.map((wilaya, i) => (
            <option key={i} value={wilaya} className="text-black">
              {i + 1}-{wilaya}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <label htmlFor="com" className="block text-gray-400 my-1">
          Commune
        </label>
        <select
          id="com"
          value={info.commune}
          onChange={(e) => setInfo({ ...info, commune: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded-md"
        >
          <option value="" className="text-black">
            Select a commune
          </option>
          {communes
            .filter((com) => com.wilaya_name === info.region)
            .flatMap((com) =>
              com.communes.map((communeName, i) => (
                <option key={i} value={communeName} className="text-black">
                  {i + 1} - {communeName}
                </option>
              ))
            )}
        </select>
      </div>
      <div>
        <button
          className="bg-primary/70 px-3 py-1 hover:bg-primary transition-all duration-300 cursor-pointer rounded-md text-black mx-auto w-fit block disabled:opacity-50"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default Settings;
