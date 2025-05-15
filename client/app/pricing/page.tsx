"use client";
import PaymentMethod from "@/components/Pricing/Payment";
import Plans from "@/components/Pricing/Plans";
import { useState } from "react";

const Pricing = () => {
  const [number, setNumber] = useState(0);
  return (
    <div className="w-full bg-gray-950 py-24 min-h-screen">
      {number === 0 ? <Plans setNumber={setNumber} /> : <PaymentMethod />}
    </div>
  );
};

export default Pricing;
