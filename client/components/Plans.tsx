import React from "react";

const Plans = () => {
  return (
    <div className="w-full bg-white py-20 min-h-screen flex justify-center items-center">
      <div className="container mx-auto lg:px-20 px-4">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Choose Your Premium Plan
        </h3>

        <div className="relative flex justify-center items-end gap-6">

          <div className="bg-white rounded-lg shadow-lg p-6 text-center w-1/4 transform scale-95 opacity-95 h-[450px] flex flex-col justify-between">
            <h4 className="text-2xl font-bold">Monthly Plan</h4>
            <p className="text-gray-500">Best for individuals</p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>✔ AI scan analysis</li>
              <li>✔ Upload scans anytime</li>
              <li>✔ No need to visit the lab</li>
            </ul>
            <p className="text-3xl font-bold mt-6">
            2,000 DZD<span className="text-gray-500 text-sm">/month</span>
            </p>
          </div>

          <div className="relative bg-white rounded-lg shadow-2xl p-10 text-center w-1/3 border-2 border-yellow-400 transform scale-105 z-10 h-[500px] flex flex-col justify-between">
            <span className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
              Most Popular
            </span>
            <h4 className="text-3xl font-bold">Yearly Plan</h4>
            <p className="text-gray-500">Save with an annual subscription</p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>✔ AI scan analysis</li>
              <li>✔ Upload scans anytime</li>
              <li>✔ No need to visit the lab</li>
              <li>✔ 2 Months Free</li>
            </ul>
            <p className="text-4xl font-bold mt-6">
            16,000 DZD<span className="text-gray-500 text-sm">/year</span>
            </p>
            <button className="mt-6 bg-blue-600 text-white py-3 px-10 rounded-lg text-lg hover:bg-blue-700 transition">
              Upgrade Now
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center w-1/4 transform scale-95 opacity-95 h-[450px] flex flex-col justify-between">
            <h4 className="text-2xl font-bold">Team Plan</h4>
            <p className="text-gray-500">Share with friends & save</p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>✔ AI scan analysis</li>
              <li>✔ Upload scans anytime</li>
              <li>✔ No need to visit the lab</li>
              <li>✔ Includes 3 users</li>
            </ul>
            <p className="text-3xl font-bold mt-6">
            27,000<span className="text-gray-500 text-sm">/year</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Plans;
