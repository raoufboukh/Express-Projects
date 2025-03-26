<<<<<<< HEAD:client/components/Work/TimeWork.tsx
import Link from 'next/link';
import React from 'react';
=======
import Image from "next/image";
import Link from "next/link";
import React from "react";
>>>>>>> b836dc806465c779d881e38ff25b9f6b7bb45b5c:client/components/Work/time-work.tsx

function TimeWork() {
  return (
    <div className="flex justify-center items-center mb-20 flex-wrap">
<<<<<<< HEAD:client/components/Work/TimeWork.tsx
      <div className="bg-primary flex flex-col gap-4 px-10 md:px-32 py-16 text-white w-full md:w-auto">
        <h3 className="text-2xl sm:text-4xl font-medium">Book Online Now</h3>
        <p className="text-xl sm:text-2xl">Skip the wait and get your scan scheduled instantly.</p>
        <p className="text-sm sm:text-lg text-gray-100 leading-relaxed">
          Enjoy hassle-free appointments and secure your slot at your convenience.
=======
      <div className="bg-primary flex flex-col gap-2 px-10 md:px-32 py-16">
        <h3 className="text-2xl sm:text-4xl font-medium">Book online now</h3>
        <p className="text-white text-xl sm:text-2xl">
          Maecenas eget arcu venenatis
>>>>>>> b836dc806465c779d881e38ff25b9f6b7bb45b5c:client/components/Work/time-work.tsx
        </p>
        <Link
          href="/book"
          className="bg-white hover:bg-black transition-all duration-300 w-fit text-primary px-5 py-2.5 rounded-md mt-5"
        >
          Read More
        </Link>
      </div>

      <div className="flex flex-col gap-5 px-20 py-10">
<<<<<<< HEAD:client/components/Work/TimeWork.tsx
        <h3 className="uppercase text-xl text-gray-400">Opening Time</h3>
        <p className="font-semibold text-gray-700">Sunday - Thursday</p>
        <p className="font-semibold pb-3 border-b-2 border-gray-300 text-gray-500">8:00 - 16:00</p>
=======
        <h3 className="uppercase text-xl text-gray-400">opening time</h3>
        <p className="font-semibold text-gray-700">Monday - Friday</p>
        <p className="font-semibold pb-3 border-b-2 border-gray-300 text-gray-500">
          8:00 - 17:00
        </p>
        <Link href="/contact" className="w-fit">
          <Image
            src="/assets/home_clinic3_pic6.png"
            alt="fb"
            width={20}
            height={20}
          />
        </Link>
>>>>>>> b836dc806465c779d881e38ff25b9f6b7bb45b5c:client/components/Work/time-work.tsx
      </div>
    </div>
  );
};

export default TimeWork;
