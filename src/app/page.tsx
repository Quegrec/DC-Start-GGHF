import { HeroSection } from "@/components/landing/HeroSection";
import { PainPointsSection } from "@/components/landing/PainPointsSection";
import { ArchetypeSection } from "@/components/landing/ArchetypeSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { CTASection } from "@/components/landing/CTASection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00D1FF]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00D1FF]/3 rounded-full blur-[120px]" />
      </div>

      <Navbar variant="landing" />
      
      <main className="relative">
        <HeroSection />
        <PainPointsSection />
        <ArchetypeSection />
        <FeaturesSection />
        <SocialProofSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
