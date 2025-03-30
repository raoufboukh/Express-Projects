"use client";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { testimonials } from "../constants";

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative w-full py-20">
      <div className="absolute size-full top-0 left-0 bg-black opacity-40 z-10"></div>
      <Image
        src="/assets/h1.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="z-0"
        unoptimized
      />
      <div className="relative z-20">
        <div className="relative text-center px-6 sm:w-150 mx-auto">
          <h2 className="text-white text-4xl sm:text-5xl font-bold mb-4">
            Advanced & Reliable Medical Imaging Services
          </h2>
          <p className="text-white">
            Our laboratory offers state-of-the-art imaging solutions, including
            MRI, CT scans, X-rays, and ultrasounds, ensuring precise diagnostics
            for various medical conditions.
          </p>
        </div>

        <div className="relative flex flex-col justify-center md:flex-row max-w-4xl mx-auto w-full p-6 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 text-center md:text-left">
            <h4 className="text-secondary font-semibold">Who We Are</h4>
            <h3 className="text-2xl font-bold mt-2 text-gray-900">
              Leaders in Medical Imaging
            </h3>
            <p className="text-gray-600 mt-4">
              We provide accurate and high-quality imaging services with
              cutting-edge technology and expert radiologists.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="bg-secondary hover:bg-blue-800 text-white px-6 py-3 rounded-full transition duration-300 block mx-auto w-fit"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="bg-secondary text-white p-6 rounded-lg shadow-lg w-full md:w-1/2 relative text-center flex flex-col">
            <p className="text-xl italic">
              "{testimonials[currentIndex].text}"
            </p>
            <div className="flex items-center justify-between mt-auto">
              <FaChevronLeft
                className="cursor-pointer hover:text-primary/50 duration-300 transition-all"
                onClick={prevTestimonial}
              />
              <div className="mt-4 font-semibold">
                <p>{testimonials[currentIndex].name}</p>
                <p className="text-sm opacity-75">
                  {testimonials[currentIndex].position}
                </p>
              </div>
              <FaChevronRight
                className="cursor-pointer hover:text-primary/50 duration-300 transition-all"
                onClick={nextTestimonial}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
