import Link from "next/link"
import { linksUser } from "../constants"
import { useState } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../lib/dataFetching";


const LinksUser = () => {
  const [second, setSecond] = useState(false);
  
  const logoutMutation = useMutation({
    mutationFn: logout,
  });
  
  const handleLogout = () => {
    logoutMutation.mutate();
    setSecond(false);
  };

  return (
    <div className="relative">
      <Image
        src={"/assets/avatar.png"}
        alt="avatar"
        width={35}
        height={35}
        className="cursor-pointer"
        onClick={() => setSecond(!second)}
      />
      <ul
        className={`${
          second ? "flex" : "hidden"
        } flex-col gap-4 bg-white p-4 rounded-md shadow-lg absolute top-12 right-0`}
      >
        {linksUser.map((link, i) =>
          link.title === "Logout" ? (
            <li key={i}>
              <Link
                className="block size-full text-gray-500 hover:text-gray-800 transition-all duration-300"
                href={link.link}
                onClick={handleLogout}
              >
                {link.title}
              </Link>
            </li>
          ) : (
            <li key={i}>
              <Link
                className="block size-full text-gray-500 hover:text-gray-800 transition-all duration-300"
                href={link.link}
                onClick={() => setSecond(false)}
              >
                {link.title}
              </Link>
            </li>
          )
        )}
        <li></li>
      </ul>
    </div>
  );
}

export default LinksUser
