import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import Work from "@/components/Work/Work";
import Plans from "@/components/Plans"
import TimeWork from "@/components/Work/TimeWork";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Services />
      <Work />
      <Plans/>
      <TimeWork/>
    </div>
  );
}
