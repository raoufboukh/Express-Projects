"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="bg-black h-screen pb-5 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-lg shadow-white">
        <div className="flex justify-center">
          <Image
            src={"/assets/Home_clinic3_pic9.png"}
            alt="login"
            className="w-32 mb-3"
            width={1000}
            height={1000}
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg">Welcome!</h3>
          <p className="text-gray-400">Create New Account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="username" className="block text-gray-400">
              Email
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-200 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-4">
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
          <div className="my-4">
            <label htmlFor="password" className="block text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-200 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md"
            >
              Create Account
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
};

export default Login;
