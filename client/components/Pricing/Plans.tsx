"use client";
import { useEffect, useState } from "react";
import { pricingPlans } from "../constants";
import { useQueryClient } from "@tanstack/react-query";
import { check } from "@/lib/data-fetching";
import { useRouter } from "next/navigation";

const Plans = ({ setNumber }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const checkAuth = async () => {
      const data = await check();
      if (!data) {
        router.push("/");
      } else {
        setUser(data);
      }
    };
    checkAuth();
  }, []);
  return (
    <div className=" flex justify-center items-center">
      <div className="container mx-auto lg:px-20 px-4">
        <h3 className="text-4xl font-bold text-center text-gray-700 mb-16">
          Choose Your Premium Plan
        </h3>
        <div className="relative flex justify-center flex-wrap items-center gap-6">
          {pricingPlans.map((plan, i) =>
            i !== 1 ? (
              <div
                key={i}
                className="bg-white rounded-lg shadow-lg px-4 py-6 text-center xl:basis-1/4 transform xl:scale-95 xl:opacity-95 xl:h-[450px] h-[450px] basis-full sm:basis-[70%] md:basis-[40%] flex flex-col justify-between"
              >
                <h4 className={`text-2xl font-bold ${plan.color}`}>
                  {plan.title}
                </h4>
                <p className="text-gray-500">{plan.description}</p>
                <ul className="mt-4 space-y-2 text-gray-700">
                  {plan.features.map((feature, j) => (
                    <li key={j}>
                      <span className="text-green-500 text-[23px] mr-2">•</span>{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-3xl font-bold mt-6">
                  {plan.price}
                  <span className="text-gray-500 text-base">/{plan.duree}</span>
                </p>
                <button
                  className="mt-6 bg-blue-600 text-white py-3 px-10 rounded-lg text-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={user.accountType === "premium"}
                  onClick={() => setNumber(1)}
                >
                  {user.accountType === "premium"
                    ? "You have premium account"
                    : "Upgrade Now"}
                </button>
              </div>
            ) : (
              <div
                key={i}
                className="relative bg-white rounded-lg shadow-2xl px-4 py-6 xl:px-8 xl:py-10 text-center xl:basis-1/3 border-2 border-yellow-400 transform xl:scale-105 z-10 xl:h-[500px] h-[450px] basis-full sm:basis-[70%] md:basis-[40%] flex flex-col justify-between"
              >
                <span className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </span>
                <h4 className={`xl:text-3xl text-2xl font-bold ${plan.color}`}>
                  {plan.title}
                </h4>
                <p className="text-gray-500">{plan.description}</p>
                <ul className="mt-4 space-y-2 text-gray-700">
                  {plan.features.map((feature, j) => (
                    <li key={j}>
                      <span className="text-green-500 text-[25px] mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-3xl font-bold mt-6">
                  {plan.price}
                  <span className="text-gray-500 text-base">/{plan.duree}</span>
                </p>
                <button
                  className="mt-6 bg-blue-600 text-white py-3 px-10 rounded-lg text-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={user.accountType === "premium"}
                  onClick={() => setNumber(1)}
                >
                  {user.accountType === "premium"
                    ? "You have premium account"
                    : "Upgrade Now"}
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Plans;
