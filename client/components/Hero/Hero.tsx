import Link from "next/link";

function Hero() {
  return (
    <section className="bg-hero bg-fixed bg-center bg-cover lg:bg-[length:120%] bg-no-repeat h-screen md:h-[110vh]">
      <div className="container relative h-full flex items-center px-4 mx-auto lg:px-28">
        <div className="">
          <h1 className="text-5xl md:text-7xl leading-tight font-semibold text-white/90">
<<<<<<< HEAD
            Your Health, <br />
            <span className="text-primary">Our Priority</span>
=======
            Welcome to
            {" "}
            <br />
            {" "}
            the
            <span className="text-primary"> medical clinic</span>
>>>>>>> b836dc806465c779d881e38ff25b9f6b7bb45b5c
          </h1>
          <p className="text-lg text-white/80 max-w-lg mt-3">
            Experience cutting-edge medical imaging and AI-powered diagnostics, all in a comfortable and professional environment.
          </p>
          <button className="bg-primary/70 hover:bg-primary transition-all duration-300 cursor-pointer text-black/90 mt-5 rounded-md">
            <Link className="block size-full px-5 py-2.5" href="/about">
              Learn More
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
