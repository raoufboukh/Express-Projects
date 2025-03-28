import Image from "next/image";
import React from "react";
import { about } from "@/components/constants";
import Link from "next/link";
import {machines} from "@/components/constants";
import { motion } from "framer-motion";





function About() {
  return (
    <section>
      <div className="pages">
        <div className="container mx-auto lg:px-20 px-4">
          <h2 className="h2">About Us</h2>
        </div>
      </div>

      <div className="container mx-auto lg:px-20 px-4 my-20">
        <div className="flex justify-between gap-10 flex-wrap mb-10">
          <div className="lg:basis-[45%] basis-full">
            <div>
              <h3 className="font-bold text-6xl mt-4">
                A Leading Network in <br /> <span className="text-primary">Medical Imaging</span>
              </h3>
              <p className="text-gray-800 text-lg leading-relaxed mt-4">
              Founded with a vision to provide cutting-edge diagnostic imaging,
               our laboratory has grown into a trusted name in medical radiology. 
               From a small team of passionate specialists, we have expanded to include 
               a network of expert radiologists, skilled technicians, and dedicated healthcare professionals, 
               all committed to delivering accurate and timely diagnoses.
              Today, our facility is equipped with state-of-the-art imaging technology,
               offering services such as MRI, CT scans, X-rays, and ultrasounds. 
               With a team of highly trained radiologists and medical staff, 
               we ensure that every scan is conducted with precision and care, 
               helping patients and doctors make informed medical decisions.     </p>
            
            </div>

            <div className="mt-20">
              <h3 className="font-bold text-6xl my-4">Our Expert Radiologists</h3>
              <p className="text-gray-800 text-lg leading-relaxed">
              Our team of expert radiologists is dedicated to providing accurate and high-quality diagnostic imaging services. 
              With extensive experience and advanced training, they ensure precise interpretations and reliable results. Committed to excellence
              , innovation, and patient care, our radiologists work collaboratively to support better healthcare outcomes. </p>
              <Link href={"/team"} className="bg-black text-white block w-fit py-2 px-3 mt-5">
                Meet Our Team

              </Link>
            </div>
          </div>
        

   <div className="lg:basis-[45%] basis-full">
            <Image
              src={"/assets/h.JPG"}
              alt="medical imaging"

              width={1000}
              height={1000}
              className="w-full rounded-lg shadow-md"
            />

            </div>
            </div>  
            <div className="flex justify-center items-center mt-16">
  <div className="bg-primary px-16 py-12 w-full max-w-3xl text-center rounded-lg shadow-lg">
    <h3 className="text-4xl font-bold py-3 text-white">Book Online</h3>
    <p className="text-xl text-white">Easy & Quick Appointments</p>
    <Link
      href={"/dashboard"}
      className="bg-black text-white px-6 py-3 mt-5 rounded-md inline-block hover:bg-gray-800 transition"
    >
      Book Now
    </Link>
  </div>
</div>

       <div className="my-20">
  <h3 className="text-4xl font-bold text-center mb-10 text-[#002D62]">
    Conditions & Technologies Used
  </h3>

  <div className="flex flex-col gap-12">
    {machines.map((machine, index) => (
      <div
        key={index}
        className={`flex flex-col md:flex-row items-center gap-8 max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6 border ${
          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={machine.image}
            alt={machine.name}
            className="w-full h-auto max-h-[250px] object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-2/3 text-center md:text-left">
          <h4 className="text-2xl font-semibold text-[#002D62]">{machine.name}</h4>
          <p className="text-lg text-gray-600 mt-2">{machine.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  <div className="container mx-auto lg:px-20 px-4">
    <div className="bg-[#0A1F44] text-white rounded-lg p-10 shadow-md flex flex-col items-center">

      <h3 className="text-4xl font-bold mb-6 text-center">Why Choose Us?</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Expert Radiologists", value: 95, description: "Highly trained professionals ensuring accurate diagnoses.", color: "#FFD700" },
          { label: "Advanced Technology", value: 90, description: "Modern imaging machines provide high-quality results.", color: "#1E90FF" },
          { label: "Fast & Reliable", value: 92, description: "AI-powered analysis ensures quick and precise reports.", color: "#FF4500" },
          { label: "Comprehensive Care", value: 88, description: "Personalized assistance and patient-friendly procedures.", color: "#32CD32" }
        ].map(({ label, value, description, color }, index) => {
          const radius = 35;
          const strokeWidth = 6;
          const circumference = 2 * Math.PI * radius; 
          const strokeDashoffset = circumference - (value / 100) * circumference; 

          return (
            <div key={index} className="flex flex-col items-center text-center">
              <svg width="90" height="90">

                <circle cx="45" cy="45" r={radius} stroke="rgba(255,255,255,0.3)" strokeWidth={strokeWidth} fill="none"/>

                <circle
                  cx="45" cy="45"
                  r={radius}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
                />
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="16px" fill={color} fontWeight="bold">
                  {value}%
                </text>
              </svg>
              <p className="mt-2 font-semibold">{label}</p>
              <p className="text-sm opacity-75">{description}</p>
            </div>
          );
        })}
      </div>

    </div>
  </div>
<div className="container mx-auto lg:px-20 px-4 my-20">
  <div className="flex flex-col md:flex-row justify-center items-center gap-10">
    
    <div className="bg-white shadow-lg rounded-xl p-8 text-center w-full md:w-1/3">
      <div className="flex justify-center mb-4">
        <Image src="/assets/localisation-icon.png" alt="Location" width={90} height={90} />
      </div>
      <h3 className="text-lg font-semibold">Beclinic</h3>
      <p className="text-gray-600">Localisation</p>
      <p className="text-gray-600">Loc</p>
    </div>

    <div className="bg-white shadow-lg rounded-xl p-8 text-center w-full md:w-1/3">
      <div className="flex justify-center mb-4">
        <Image src="/assets/call-icon.png" alt="Phone" width={90} height={90} />
      </div>
      <p className="text-lg font-bold text-black">Ultra-Sound : <span className="font-normal"></span></p>
      <p className="text-lg font-bold text-black">IRM : <span className="font-normal"></span></p>
      <p className="text-lg font-bold text-black">SCANNER : <span className="font-normal"></span></p>
    </div>

  </div>
</div>


</div>



    </section>
   
  );
};


export default About;
