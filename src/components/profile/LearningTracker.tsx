import { useState } from 'react';
import { CheckCircle2, Clock, BookOpen, TrendingUp } from 'lucide-react';

interface Guide {
  id: number;
  title: string;
  game: string;
  progress: number;
  category: string;
  icon: typeof BookOpen;
}

export function LearningTracker() {
  const [activeTab, setActiveTab] = useState<'completed' | 'inProgress'>('inProgress');

  const completedGuides: Guide[] = [
    {
      id: 1,
      title: "Advanced Movement Techniques",
      game: "Neon Nexus",
      progress: 100,
      category: "Mechanics",
      icon: TrendingUp
    },
    {
      id: 2,
      title: "Map Awareness Mastery",
      game: "Stellar Conquest",
      progress: 100,
      category: "Strategy",
      icon: BookOpen
    },
    {
      id: 3,
      title: "Team Communication Guide",
      game: "Realm of Legends",
      progress: 100,
      category: "Social",
      icon: CheckCircle2
    }
  ];

  const inProgressGuides: Guide[] = [
    {
      id: 4,
      title: "Precision Aiming Drills",
      game: "Neon Nexus",
      progress: 75,
      category: "Mechanics",
      icon: TrendingUp
    },
    {
      id: 5,
      title: "Economy Management",
      game: "Stellar Conquest",
      progress: 45,
      category: "Strategy",
      icon: BookOpen
    },
    {
      id: 6,
      title: "Support Role Fundamentals",
      game: "Realm of Legends",
      progress: 20,
      category: "Tactics",
      icon: Clock
    }
  ];

  const guides = activeTab === 'completed' ? completedGuides : inProgressGuides;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 backdrop-blur-xl relative overflow-hidden">
      {/* Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent" />
      
      <div>
        <h2 className="text-xl font-semibold mb-6">Learning Tracker</h2>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('inProgress')}
            className={`
              flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300
              ${activeTab === 'inProgress'
                ? 'bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30 shadow-lg shadow-[#00D1FF]/10'
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }
            `}
          >
            In Progress
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`
              flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300
              ${activeTab === 'completed'
                ? 'bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30 shadow-lg shadow-[#00D1FF]/10'
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }
            `}
          >
            Completed
          </button>
        </div>
        
        {/* Guide Cards */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {guides.map((guide) => {
            const Icon = guide.icon;
            const remainingProgress = 100 - guide.progress;
            
            return (
              <div
                key={guide.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00D1FF]/30 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                    ${guide.progress === 100
                      ? 'bg-[#10B981]/20 text-[#10B981]'
                      : 'bg-[#00D1FF]/10 text-[#00D1FF]'
                    }
                  `}>
                    {guide.progress === 100 ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 group-hover:text-[#00D1FF] transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-white/50 mb-2">{guide.game} • {guide.category}</p>
                    
                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/60">
                          {guide.progress === 100 ? 'Completed' : `${remainingProgress}% remaining`}
                        </span>
                        <span className={`font-semibold ${
                          guide.progress === 100 ? 'text-[#10B981]' : 'text-[#00D1FF]'
                        }`}>
                          {guide.progress}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            guide.progress === 100
                              ? 'bg-gradient-to-r from-[#10B981] to-[#10B981]/60 shadow-lg shadow-[#10B981]/30'
                              : 'bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/60 shadow-lg shadow-[#00D1FF]/30'
                          }`}
                          style={{ width: `${guide.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
