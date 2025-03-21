import ContactTeam from "@/components/Team/contact-team";
import OurTeam from "@/components/Team/our-team";
import Image from "next/image";

function Team() {
  return (
    <section>
      <div className="pages">
        <div className="container mx-auto lg:px-20 px-4">
          <h2 className="h2">Team</h2>
        </div>
      </div>
      <div className="container lg:px-20 px-4 gap-10 my-20 mx-auto">
        <div className="grid lg:grid-cols-2 mb-24">
          <div>
            <Image
              src="/assets/home_clinic3_pic5.png"
              alt="healthcare"
              width={40}
              height={40}
            />
            <h3 className="text-6xl font-bold my-7">
              Great people, Great specialists
            </h3>
            <h4 className="text-2xl my-7">
              Vestibulum vehicula tempor nulla sed
            </h4>
            <p className="text-gray-400 leading-relaxed">
              Mauris rhoncus orci in imperdiet placerat. Vestibulum euismod nisl
              suscipit ligula volutpat, a feugiat urna maximus. Cras massa nibh,
              tincidunt ut eros a, vulputate consequat odio. Vestibulum vehicula
              tempor nulla, sed hendrerit urna interdum in.
            </p>
          </div>
          <div className="mx-auto">
            <Image
              src="/assets/home_clinic3_pic18.jpg"
              alt="doctors"
              width={450}
              height={0}
            />
          </div>
        </div>
        <OurTeam />
      </div>
      <ContactTeam />
    </section>
  );
}

export default Team;
