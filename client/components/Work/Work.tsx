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
    <div className="relative w-full py-90">
      <div className="absolute inset-0 bg-black opacity-50"></div>
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

      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center px-6">
        <h2 className="text-white text-4xl sm:text-5xl font-bold mb-4">
          Advanced & Reliable Medical Imaging Services
        </h2>
        <p className="text-white max-w-2xl ">
          Our laboratory offers state-of-the-art imaging solutions, including
          MRI, CT scans, X-rays, and ultrasounds, ensuring precise diagnostics
          for various medical conditions.
        </p>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row max-w-4xl w-full p-6 gap-8">
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
              className="bg-secondary hover:bg-blue-800 text-white px-6 py-3 rounded-full transition duration-300 inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="bg-secondary text-white p-6 rounded-lg shadow-lg w-full md:w-1/2 relative text-center">
          <FaChevronLeft
            className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-blue-300"
            onClick={prevTestimonial}
          />
          <p className="text-lg italic">"{testimonials[currentIndex].text}"</p>
          <div className="mt-4 font-semibold">
            <p>{testimonials[currentIndex].name}</p>
            <p className="text-sm opacity-75">
              {testimonials[currentIndex].position}
            </p>
          </div>
          <FaChevronRight
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-blue-300"
            onClick={nextTestimonial}
          />
        </div>
      </div>
    </div>
  );
};

export default Work;
