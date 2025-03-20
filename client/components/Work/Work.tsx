import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import TimeWork from './TimeWork';
import VideosWork from './VideosWork';

const Work = () => {
  return (
    <section>
      <div className="container mx-auto lg:px-20 px-4">
        <div className="flex items-center justify-center flex-wrap gap-3 md:gap-0 mb-3 lg:mb-0">
          <div className="bg-work md:bg-[length:(120%)] bg-cover md:min-h-[650px] h-[500px] py-32 basis-full md:basis-2/3 flex flex-col gap-3 justify-center px-10 md:px-20">
            <h3 className="text-4xl sm:text-6xl leading-[1.1] font-semibold">
              Great working conditions.
            </h3>
            <p className="text-xl sm:text-2xl">Lorem ipsum dolor sit</p>
            <Link
              href="/about"
              className="bg-primary/70 hover:bg-primary transition-all duration-300 cursor-pointer text-black/90 mt-5 rounded-md w-fit px-5 py-2.5"
            >
              More
            </Link>
          </div>
          <div className="bg-cta h-[550px] py-32 basis-full md:basis-1/3 flex items-center justify-center">
            <div className="flex flex-col gap-5 px-12">
              <Image
                src="/assets/home_clinic3_pic5.png"
                alt="healthcare"
                width={50}
                height={50}
              />
              <h3 className="text-white text-4xl font-medium">
                Health is the only way to be happy
              </h3>
              <Link
                href="/team"
                className={`uppercase text-white backdrop-blur-sm w-fit px-4 py-2 relative before:absolute before:bottom-0 before:left-0 before:content-[""] before:w-full before:h-0.5 before:bg-primary before:opacity-0 hover:before:opacity-100 before:transition-all after:absolute after:top-2 after:left-0 after:content-[""] after:w-full after:h-0.5 after:bg-primary after:opacity-0 hover:after:top-0 hover:after:opacity-100 after:transition-all after:duration-300 after:delay-75`}
              >
                our team
              </Link>
            </div>
          </div>
        </div>
        <TimeWork />
        <VideosWork />
      </div>
    </section>
  );
}

export default Work
