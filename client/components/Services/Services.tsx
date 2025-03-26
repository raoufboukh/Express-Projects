import Image from "next/image";
import Link from "next/link";
import React from "react";

import { services } from "../constants";

function Services() {
  return (
    <section className="bg-white">
      <div className="container px-4 mx-auto lg:px-28">
<<<<<<< HEAD
        <h2 
            className='text-6xl font-bold my-20 text-center'
        >
            Services Takes good care of you
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 mb-10'>
        {services.map((service, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center text-center"
            >
              <Image 
                src={service.image} 
                alt={service.title} 
                width={100} 
                height={100} 
                className="mb-4"
              />
              <h3 className='text-2xl font-semibold mb-2'>{service.title}</h3>
              <p className='text-gray-500'>{service.description}</p>
            </div>
          ))}
        </div>
        <Link href='/services' className='block w-fit mx-auto px-20 my-20 py-2 rounded-full transition duration-300 bg-secondary text-white'>View All</Link>
=======
        <h2
          className="text-6xl font-bold my-20"
        >
          Services Takes good
          {" "}
          <br />
          {" "}
          care of you
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 mb-10">
          {services.map(service => (
            <div key={service.title}>
              <Image src={service.image} alt={service.title} width={100} height={100} />
              <h3 className="text-2xl my-5">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
        <Link href="/services" className="block w-fit mx-auto px-20 my-20 py-2 bg-black/80 text-white">View All</Link>
>>>>>>> b836dc806465c779d881e38ff25b9f6b7bb45b5c
      </div>
    </section>
  );
}

export default Services;
