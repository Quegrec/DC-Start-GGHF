import { ProfileHeader } from './profile/ProfileHeader';
import { TrophyRoom } from './profile/TrophyRoom';
import { GamingDNA } from './profile/GamingDNA';
import { LearningTracker } from './profile/LearningTracker';
import { PersonalityArchetype } from './profile/PersonalityArchetype';

export function ExtendedProfile() {
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
