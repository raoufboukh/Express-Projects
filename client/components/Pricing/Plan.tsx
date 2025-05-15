import React from "react";
import { pricingPlans } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccountType } from "@/lib/data-fetching";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const Plan = ({ user, setActiveItem }: any) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["pricing"],
    mutationFn: updateAccountType,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["pricing"] });
    },
  });
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg px-4 py-6 text-center transform xl:scale-95 xl:opacity-95 xl:h-[450px] h-[450px] sm:w-100 mx-auto flex flex-col justify-between">
        <h4 className={`text-2xl font-bold ${pricingPlans[0].color}`}>
          {pricingPlans[0].title}
        </h4>
        <p className="text-gray-500">{pricingPlans[0].description}</p>
        <ul className="mt-4 space-y-2 text-gray-700">
          {pricingPlans[0].features.map((feature, j) => (
            <li key={j}>
              <span className="text-green-500 text-[23px] mr-2">•</span>{" "}
              {feature}
            </li>
          ))}
        </ul>
        <p className="text-3xl font-bold mt-6">
          {pricingPlans[0].price}
          <span className="text-gray-500 text-base">
            /{pricingPlans[0].duree}
          </span>
        </p>
        <button
          className="mt-6 bg-blue-600 text-white py-3 px-10 rounded-lg text-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isPending || user.accountType === "premium"}
          onClick={() => {
            setActiveItem("upgrade");
            // mutate();
          }}
        >
          {isPending
            ? "Loading..."
            : user.accountType === "premium"
            ? "You have premium account"
            : "Upgrade Now"}
        </button>
      </div>
      <Link
        className="text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-3 py-2 rounded-lg cursor-pointer mt-4 mx-auto w-fit block"
        href="/pricing"
      >
        For More Offers <MdArrowOutward className="inline" />
      </Link>
    </>
  );
};

export default Plan;
