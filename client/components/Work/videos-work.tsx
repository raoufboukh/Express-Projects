import Image from "next/image";
import React from "react";

function VideosWork() {
  return (
    <div className="py-24 border-t-2 border-gray-200">
      <h3 className="text-4xl md:text-6xl font-semibold mb-10">
        BeClinic video
      </h3>
      <div className="flex flex-wrap justify-center gap-3 md:gap-0">
        <div className="basis-full sm:basis-3/4 md:basis-1/2 bg-vid1 bg-[length:130%] py-44 px-10 lg:px-20 flex flex-col justify-center gap-10 lg:h-[650px]">
          <div className="relative flex gap-10 cursor-pointer">
            <Image
              className="hover-hide transition-all duration-500"
              src="/assets/home_clinic3_pic7.png"
              width={80}
              height={80}
              alt="vid1"
            />
            <Image
              className="hover-show transition-all duration-500"
              src="/assets/home_clinic3_pic8.png"
              width={80}
              height={80}
              alt="vid2"
            />
          </div>
          <h3 className="text-white text-4xl md:text-6xl font-medium">
            Our Clinic
          </h3>
          <p>Lorem ipsum dolor sit amet</p>
        </div>
        <div className="basis-full sm:basis-3/4 md:basis-1/2 lg:-mt-24 lg:h-[700px] bg-vid2 bg-[length:145%] py-44 px-10 lg:px-40 flex flex-col justify-center gap-10">
          <div className="relative flex items-center gap-10 cursor-pointer">
            <Image
              className="hover-hide transition-all duration-300"
              src="/assets/home_clinic3_pic7.png"
              width={80}
              height={80}
              alt="vid3"
            />
            <Image
              className="hover-show transition-all duration-300"
              src="/assets/home_clinic3_pic8.png"
              width={80}
              height={80}
              alt="vid4"
            />
          </div>
          <h3 className="text-white text-4xl md:text-6xl font-medium">
            How we work?
          </h3>
          <p>Fusce ut velit laoreet tempus</p>
        </div>
      </div>
    </div>
  );
}

export default VideosWork;
