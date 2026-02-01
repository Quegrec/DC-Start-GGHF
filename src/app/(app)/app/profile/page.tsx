import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { TrophyRoom } from "@/components/profile/TrophyRoom";
import { GamingDNA } from "@/components/profile/GamingDNA";
import { LearningTracker } from "@/components/profile/LearningTracker";
import { PersonalityArchetype } from "@/components/profile/PersonalityArchetype";

export default function ProfilePage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Top Section - User Identity & Gamification */}
        <section className="space-y-6">
          <ProfileHeader />
          <TrophyRoom />
        </section>

        {/* Middle Section - Preferences & Tracking */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GamingDNA />
          <LearningTracker />
        </section>

        {/* Bottom Section - Personality Archetype */}
        <section>
          <PersonalityArchetype />
        </section>
      </div>
    </main>
  );
}
