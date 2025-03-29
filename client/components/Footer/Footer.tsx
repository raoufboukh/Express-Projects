import Link from "next/link";
import Image from "next/image";
import React from "react";
import { companyFooter, helpFooter } from "../constants";
import { MdOutlineArrowRightAlt } from "react-icons/md";

import AllRights from "../all-rights";

function Footer() {
  return (
    <>
      <footer className="my-20">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex justify-center md:justify-between flex-wrap lg:gap-0 gap-8 lg:ml-20">
            <div className="lg:basis-1/3 md:basis-[45%] basis-full text-center md:text-left">
              <Image
                src="/assets/home_clinic3_pic9.png"
                alt="beclinic"
                width={1000}
                height={1000}
                className="w-40 h-10 mb-5 mx-auto md:mx-0"
              />

              <h5 className="text-gray-400">Phone Number</h5>
              <p className="text-primary text-2xl">+61 (0) 3 8376 6284</p>

              <h5 className="text-gray-400 mt-4">Email</h5>
              <p className="text-gray-300 mb-3">support@clinic.com</p>

              <div className="flex justify-center md:justify-start gap-3 mt-2">
                <a
                  href="https://facebook.com"
                  className="hover:opacity-75 transition"
                >
                  <Image
                    src="/assets/home_clinic3_pic6.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://whatsapp.com"
                  className="hover:opacity-75 transition"
                >
                  <Image
                    src="/assets/home_clinic3_pic24.png"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://linkedin.com"
                  className="hover:opacity-75 transition"
                >
                  <Image
                    src="/assets/home_clinic3_pic25.png"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://instagram.com"
                  className="hover:opacity-75 transition"
                >
                  <Image
                    src="/assets/home_clinic3_pic23.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
              </div>
            </div>

            <div className="lg:basis-1/3 md:basis-1/2 basis-full text-center md:text-left">
              <h4 className="text-2xl mb-5">Company</h4>
              <ul className="flex flex-col gap-2">
                {companyFooter.map((comp, i) => (
                  <li key={i} className="text-lg font-[300] text-gray-500">
                    <Link
                      href={comp.link}
                      className="flex items-center gap-2 w-fit hover:text-primary hover:translate-x-0.5 transition-all duration-300"
                    >
                      <MdOutlineArrowRightAlt className="text-sm" />{" "}
                      {comp.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:basis-1/3 md:basis-1/2 basis-full text-center md:text-left">
              <h4 className="text-2xl mb-5">Help</h4>
              <ul className="flex flex-col gap-2">
                {helpFooter.map((help, i) => (
                  <li key={i} className="text-lg font-[300] text-gray-500">
                    <Link
                      href={help.link}
                      className="flex items-center w-fit gap-2 hover:text-primary hover:translate-x-0.5 transition-all duration-300"
                    >
                      <MdOutlineArrowRightAlt className="text-sm" />{" "}
                      {help.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <AllRights />
    </>
  );
}

export default Footer;
