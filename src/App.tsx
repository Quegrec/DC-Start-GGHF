import { TopNavigation } from './components/TopNavigation';
import { QuizModule } from './components/QuizModule';
import { PlayerStats } from './components/PlayerStats';
import { GameRecommendations } from './components/GameRecommendations';
import { ExtendedProfile } from './components/ExtendedProfile';
import { useState } from 'react';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('dashboard');

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Sticky Top Navigation */}
      <TopNavigation onViewChange={setCurrentView} currentView={currentView} />
      
      {/* Main Content */}
      {currentView === 'dashboard' ? (
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
      ) : (
        <ExtendedProfile />
      )}
    </div>
  );
}