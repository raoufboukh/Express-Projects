import Image from 'next/image'
import React from 'react'
import { companyFooter, helpFooter } from '../constants';
import { MdOutlineArrowRightAlt } from "react-icons/md";
import AllRights from '../AllRights';

const Footer = () => {
  return (
    <>
      <footer className="my-20">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex justify-center md:justify-between flex-wrap md:gap-0 gap-8">
            <div className="lg:basis-1/3 md:basis-1/2 basis-full text-center md:text-left mx-auto">
              <Image
                src={"/assets/home_clinic3_pic9.png"}
                alt="beclinic"
                width={1000}
                height={1000}
                className="w-40 h-10 mb-5 mx-auto md:mx-0"
              />
              <h5 className="text-gray-400">Phone Number</h5>
              <p className="text-primary text-2xl">+61 (0) 3 8376 6284</p>
            </div>
            <div className="lg:basis-1/3 md:basis-1/2 basis-full text-center md:text-left mx-auto">
              <h4 className="text-2xl mb-5">Company</h4>
              <ul className="">
                {companyFooter.map((comp, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-lg font-[300] md:justify-normal justify-center hover:text-primary hover:translate-x-0.5 transition-all duration-300 cursor-pointer text-gray-500"
                  >
                    <MdOutlineArrowRightAlt className="text-sm" /> {comp.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:basis-1/3 md:basis-1/2 basis-full text-center md:text-left mx-auto">
              <h4 className="text-2xl mb-5">Help</h4>
              <ul className="">
                {helpFooter.map((help, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-lg font-[300] md:justify-normal justify-center hover:text-primary hover:translate-x-0.5 transition-all duration-300 cursor-pointer text-gray-500"
                  >
                    <MdOutlineArrowRightAlt className="text-sm" /> {help.title}
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

export default Footer
