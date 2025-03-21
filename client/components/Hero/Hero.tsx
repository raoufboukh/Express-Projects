import Link from "next/link";

function Hero() {
  return (
    <section className="bg-hero bg-fixed bg-center bg-cover lg:bg-[length:120%] bg-no-repeat h-screen md:h-[110vh]">
      <div className="container relative h-full flex items-center px-4 mx-auto lg:px-28">
        <div className="">
          <h1 className="text-5xl md:text-7xl leading-tight font-semibold text-white/90">
            Welcome to
            {" "}
            <br />
            {" "}
            the
            <span className="text-primary"> medical clinic</span>
          </h1>
          <p className="text-lg text-white/70">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
          <button className="bg-primary/70 hover:bg-primary transition-all duration-300 cursor-pointer text-black/90  mt-5 rounded-md">
            <Link className="block size-full px-5 py-2.5" href="/about">
              More
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
