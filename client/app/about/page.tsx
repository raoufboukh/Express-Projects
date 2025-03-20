import Image from "next/image";
import Link from "next/link";
import React from "react";

import { about } from "@/components/constants";
import VideosWork from "@/components/Work/videos-work";

function About() {
  return (
    <section className="">
      <div className="pages">
        <div className="container mx-auto lg:px-20 px-4">
          <h2 className="h2">About Us</h2>
        </div>
      </div>
      <div className="container mx-auto lg:px-20 px-4 my-20">
        <div className="flex justify-between gap-10 flex-wrap mb-10">
          <div className="lg:basis-[45%] basis-full">
            <div>
              <Image
                src="/assets/home_clinic3_pic5.png"
                alt="about"
                width={40}
                height={40}
              />
              <h3 className="font-bold text-6xl mt-4">
                Aliquam fringilla aliquam ex sit elementum.
              </h3>
              {about.map((item, i) => (
                <div key={i} className="my-5">
                  <h3 className="text-2xl my-6 font-normal text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-20">
              <Image
                src="/assets/home_clinic3_pic5.png"
                alt="about"
                width={40}
                height={40}
              />
              <h3 className="font-bold text-6xl my-4">
                Curabitur ut egestas justo molestie
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Sed ultrices nisl velit, eu ornare est ullamcorper a. Nunc quis
                nibh magna. Proin risus erat, fringilla vel purus sit amet,
                mattis porta enim. Duis fermentum faucibus est, sed vehicula
                velit sodales vitae.
              </p>
              <Link
                href="/team"
                className="bg-black text-white block w-fit py-2 px-3 mt-5"
              >
                Our Team
              </Link>
            </div>
          </div>
          <div className="lg:basis-[45%] basis-full">
            <Image
              src="/assets/home_clinic3_pic16.jpg"
              alt="doctor"
              width={1000}
              height={1000}
              className="w-full"
            />
            <div className="bg-primary px-8 py-10 w-1/2 text-center">
              <h3 className="text-4xl font-bold py-3">Book online</h3>
              <p className="text-xl">Fusce lobortis</p>
              <Link
                href="/book"
                className="bg-black mx-auto text-white px-4 block w-fit py-3 mt-3 rounded-md"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
        <VideosWork />
      </div>
    </section>
  );
}

export default About;
