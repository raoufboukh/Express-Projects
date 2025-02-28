'use client';
import Image from "next/image"
import { links } from "../constants"
import Link from "next/link"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";


const Navbar = () => {
    const [scroll, setScroll] = useState(0);
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          setScroll(window.scrollY);
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    },[])
  return (
    <header
      className={`w-full z-50 ${
        scroll > 150
          ? `fixed py-2.5 bg-black`
          : `md:absolute md:pt-10 fixed md:bg-transparent bg-black py-2.5`
      }`}
    >
      <div className="container overflow-x-hidden flex justify-between items-center w-full mx-auto px-4 lg:px-28">
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={170}
          height={170}
          className=""
        />
        <AiOutlineMenu
          className="lg:hidden text-3xl text-[#1cffd9] cursor-pointer"
          onClick={() => setMenu(!menu)}
        />
        <nav
          className={`absolute lg:relative top-0 lg:block lg:right-0 transition-all duration-500
            bg-gray-900 lg:bg-transparent lg:w-fit lg:h-fit w-52 h-screen ${
              menu ? "right-0" : "-right-96"
            }`}
        >
          <div className="lg:hidden flex justify-end px-3">
            <AiOutlineClose
              className=" text-3xl text-[#1cffd9] cursor-pointer my-2"
              onClick={() => setMenu(!menu)}
            />
          </div>
          <ul className="lg:flex lg:mt-0 mt-8 items-center gap-10">
            {links.map((link, i) =>
              link.title !== "Login" ? (
                <li key={i}>
                  <Link
                    className="text-lg font-semibold text-white/70 hover:text-white transition-all duration-300 py-3 block px-5 lg:border-none border-t border-gray-800 lg:px-0 lg:my-0"
                    href={link.link}
                    onClick={() => setMenu(false)}
                  >
                    {link.title}
                  </Link>{" "}
                </li>
              ) : (
                <li key={i}>
                  <Link
                    className="text-lg font-semibold text-[#1cffd9]/70 hover:text-[#1cffd9] transition-all duration-300 py-3 lg:border-none border-y border-gray-800 block px-5 lg:px-0 lg:my-0"
                    href={link.link}
                  >
                    {link.title}
                  </Link>{" "}
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar
