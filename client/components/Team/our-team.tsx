import Image from "next/image";
import { radiologists } from "../constants";

function OurTeam() {
  return (
    <div className="container mx-auto px-4 lg:px-20 my-20">
      <h3 className="text-5xl font-bold text-center mb-10">
        Meet Our Expert Radiologists
      </h3>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto  text-center">
        Our team of experienced doctors is dedicated to providing accurate,
        timely diagnoses through advanced imaging techniques. With their
        expertise and commitment to patient care, you can trust that you’re in
        the best hands for all your medical needs.
      </p>


      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-20">
        {radiologists.map((doc, i) => (
          <div key={i} className="text-center">
            <Image
              src={doc.image}
              alt={doc.name}
              width={150}
              height={150}
              className="rounded-full mx-auto border-4 border-secondary shadow-lg"
            />
            <h3 className="text-2xl mt-5 font-semibold">{doc.name}</h3>
            <h4 className="text-gray-500">{doc.role}</h4>
            <p className="text-gray-600">{doc.location}</p>
            <p className="text-gray-400 italic">{doc.timing}</p>
          </div>
        ))}
      </div>

     
    </div>
  );
}

export default OurTeam;
