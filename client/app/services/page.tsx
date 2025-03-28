"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { scanSteps, servicesDetails } from "@/components/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServicesDetails: React.FC = () => {
  return (
    <section>
      <div className="pages">
        <div className="container mx-auto lg:px-20 px-4">
          <h2 className="h2">Services</h2>
        </div>
      </div>

      <div className="container mx-auto lg:px-20 px-4 my-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          How Our Scanning Process Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-center">
          Our streamlined process ensures accurate and efficient medical
          imaging.
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {scanSteps.map((step) => (
            <div
              key={step.id}
              className="bg-white shadow-md p-6 rounded-lg text-center transition duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {step.id}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto lg:px-20 px-4 my-20">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#002D62]">
          Our Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {servicesDetails.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-6 rounded-lg text-center transition duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <FontAwesomeIcon
                icon={service.icon}
                className="text-4xl text-blue-600 mb-4"
              />
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <h4 className="font-semibold mt-4">Procedure:</h4>
              <p className="text-gray-600">{service.procedure}</p>
              <h4 className="font-semibold mt-4">Preparation:</h4>
              <p className="text-gray-600">{service.preparation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto mt-16 flex flex-col md:flex-row items-center bg-white shadow-lg p-8 rounded-lg max-w-7xl">
        <div className="flex-1">
          <Image
            src="/assets/bookApp.png"
            alt="Book an Appointment"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Book Your Appointment Now
          </h2>
          <p className="text-gray-600 mb-6">
            Select a date and time that works for you. Our team is ready to
            assist you.
          </p>
          <a
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesDetails;
