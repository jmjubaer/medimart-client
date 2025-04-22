import HeroSection from "@/components/pages/about/HeroSection";
import ImpactSection from "@/components/pages/about/ImpactSection";
import JourneySection from "@/components/pages/about/JourneySection";
import MissionSection from "@/components/pages/about/MissionSection";
import TeamSection from "@/components/pages/about/TeamSection";
import ValuesSection from "@/components/pages/about/ValuesSection";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <JourneySection />
      <TeamSection />
      <ImpactSection />
    </main>
  );
};

export default AboutPage;
