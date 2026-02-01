import { QuizModule } from "@/components/dashboard/QuizModule";
import { PlayerStats } from "@/components/dashboard/PlayerStats";
import { GameRecommendations } from "@/components/dashboard/GameRecommendations";

export default function DashboardPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Section 1 - Archetype Quiz */}
        <QuizModule />

        {/* Section 2 - Player Stats */}
        <PlayerStats />

        {/* Section 3 - Game Recommendations */}
        <GameRecommendations />
      </div>
    </main>
  );
}
