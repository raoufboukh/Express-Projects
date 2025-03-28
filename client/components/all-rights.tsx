"use client";

import { FaChevronUp } from "react-icons/fa6";

function AllRights() {
  return (
    <div className="container mx-auto px-4 lg:px-20 flex flex-col items-center text-gray-400 text-sm mt-10 py-3 border-t border-gray-300">
      <p>&copy; 2025 Betheme by BeClinic | All Rights Reserved</p>
      <FaChevronUp
        className="cursor-pointer mt-2"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      />
    </div>
  );
}

export default AllRights;
