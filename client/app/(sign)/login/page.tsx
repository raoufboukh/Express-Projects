"use client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

import { check, login } from "@/lib/data-fetching";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await check();
        if (data) {
          router.push("/");
        }
      }
      catch (err) {
        console.error("Error during auth check:", err);
      }
    };
    checkAuth();
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (err) => {
      console.error("Login failed", err);
      setErrorMessage(
        err.message
        || "Erreur de connexion. Veuillez vérifier vos identifiants.",
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    try {
      mutate();
    }
    catch (err) {
      console.error("Error during form submission:", err);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-lg shadow-white">
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
          <h3 className="text-lg">Welcome</h3>
          <p className="text-gray-400">Login to your account</p>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="email" className="block text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-200 rounded-md"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="my-4">
            <label htmlFor="password" className="block text-gray-400">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                id="password"
                className="w-full p-2 border border-gray-200 rounded-md"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
          <div className="my-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md disabled:bg-blue-300"
              disabled={isPending}
            >
              {isPending ? "Connexion en cours..." : "Login"}
            </button>
          </div>
        </form>
        <p>
          Don&apos;t have an account?
          {" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
