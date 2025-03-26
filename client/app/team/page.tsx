import Image from 'next/image';
import OurTeam from "@/components/Team/OurTeam";
import ContactTeam from "@/components/Team/ContactTeam";

const Team = () => {
  return (
    <section>
      <div className="pages">
        <div className="container mx-auto lg:px-20 px-4">
          <h2 className="h2">Team</h2>
        </div>
      </div>
      <div className="container lg:px-20 px-4 gap-10 my-20 mx-auto">
        
        <OurTeam />
      </div>
      <ContactTeam />
    </section>
  );
}

export default Team
