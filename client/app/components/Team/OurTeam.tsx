import Image from "next/image"
import { team } from "../constants"


const OurTeam = () => {
  return (
    <div>
      <h3 className="text-5xl font-bold mb-10">Our Family Team</h3>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        {team.map((member, i) => (
          <div key={i}>
            <Image
              src={member.image}
              alt={member.title}
              width={200}
              height={0}
              className="w-full"
            />
            <h3 className="text-2xl mt-5">{member.title}</h3>
            <h4 className="mb-5 mt-1 text-gray-500">{member.role}</h4>
            <p className="text-gray-400 my-5">{member.description}</p>
            <p className="text-gray-400">{member.footer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurTeam
