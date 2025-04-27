"use client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

import { check, register } from "@/lib/data-fetching";
import { FaArrowLeft } from "react-icons/fa6";
import { communes, wilayas } from "@/components/constants";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState(wilayas[0]);
  const [commune, setCommune] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await check();
        if (data) {
          router.push("/");
        }
      } catch (err) {
        console.error("Error during auth check:", err);
      }
    };
    checkAuth();
  });

  const { mutate, error, isPending } = useMutation({
    mutationFn: () => register(username, email, password, region, commune),
    onSuccess: () => {
      setTimeout(() => {
        router.push("/dashboard");
      }, 200);
    },
    onError: (err) => {
      console.error("Login failed", err);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  return (
    <div className="bg-black h-screen pb-5 flex justify-center items-center relative">
      <FaArrowLeft
        className="absolute top-5 left-5 text-lg cursor-pointer text-white"
        onClick={() => router.back()}
      />
      <div className="bg-white px-8 py-6 rounded-md shadow-lg shadow-white">
        <div className="flex justify-center">
          <Image
            src="/assets/Home_clinic3_pic9.png"
            alt="login"
            className="w-32 mb-3"
            width={1000}
            height={1000}
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg">Welcome!</h3>
          <p className="text-gray-400">Create New Account</p>
          {error && <p className="text-red-500">Erreur de connexion</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label htmlFor="username" className="block text-gray-400">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-200 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="email" className="block text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-200 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label htmlFor="password" className="block text-gray-400">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                id="password"
                className="w-full p-2 border border-gray-200 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <LuEyeClosed
                onClick={() => setShow(true)}
                className={`absolute right-4 top-4 text-gray-400 cursor-pointer ${
                  show ? "hidden" : ""
                }`}
              />
              <LuEye
                onClick={() => setShow(false)}
                className={`absolute right-4 top-4 text-gray-400 cursor-pointer ${
                  show ? "" : "hidden"
                }`}
              />
            </div>
          </div>
          <div className="my-2">
            <label htmlFor="reg" className="block text-gray-400">
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
          <div className="my-2">
            <label htmlFor="com" className="block text-gray-400">
              Commune
            </label>
            <select
              id="com"
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-md"
            >
              <option value="" disabled>
                Select a commune
              </option>
              {communes
                .filter((com) => com.wilaya_name === region)
                .flatMap((com) =>
                  com.communes.map((communeName, i) => (
                    <option key={i} value={communeName}>
                      {i + 1} - {communeName}
                    </option>
                  ))
                )}
            </select>
          </div>
          <div className="my-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md cursor-pointer disabled:opacity-60 disabled:cursor-auto"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
