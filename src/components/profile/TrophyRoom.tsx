import { Award, Shield, Brain, Target, Star, Users } from 'lucide-react';

interface Trophy {
  id: number;
  title: string;
  description: string;
  icon: typeof Award;
  color: string;
  glowColor: string;
  earned: boolean;
}

export function TrophyRoom() {
  const trophies: Trophy[] = [
    {
      id: 1,
      title: "First Guide Completed",
      description: "Finished your first learning path",
      icon: Award,
      color: "#FFD700",
      glowColor: "#FFD70060",
      earned: true
    },
    {
      id: 2,
      title: "Safe Space Guardian",
      description: "Reported 5 toxic behaviors",
      icon: Shield,
      color: "#10B981",
      glowColor: "#10B98160",
      earned: true
    },
    {
      id: 3,
      title: "Master Strategist",
      description: "Achieved 90%+ in Strategy",
      icon: Brain,
      color: "#8B5CF6",
      glowColor: "#8B5CF660",
      earned: true
    },
    {
      id: 4,
      title: "Sniper Elite",
      description: "100 precision eliminations",
      icon: Target,
      color: "#00D1FF",
      glowColor: "#00D1FF60",
      earned: true
    },
    {
      id: 5,
      title: "Rising Star",
      description: "Reached Level 25",
      icon: Star,
      color: "#F59E0B",
      glowColor: "#F59E0B60",
      earned: false
    },
    {
      id: 6,
      title: "Team Player",
      description: "Joined 10 squad matches",
      icon: Users,
      color: "#EC4899",
      glowColor: "#EC489960",
      earned: false
    }
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 backdrop-blur-xl relative overflow-hidden">
      {/* Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent" />
      
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-1">Trophy Room</h2>
          <p className="text-white/60">Your achievements and milestones</p>
        </div>
        
        <div className="grid grid-cols-6 gap-4">
          {trophies.map((trophy) => {
            const Icon = trophy.icon;
            
            return (
              <div key={trophy.id} className="group relative">
                <div 
                  className={`
                    relative w-full aspect-square rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all duration-300
                    ${trophy.earned
                      ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-white/40 hover:scale-105'
                      : 'bg-white/5 border-white/10 opacity-40 hover:opacity-60'
                    }
                  `}
                  style={{
                    boxShadow: trophy.earned ? `0 8px 24px ${trophy.glowColor}` : 'none'
                  }}
                >
                  <Icon 
                    className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" 
                    style={{ color: trophy.earned ? trophy.color : '#ffffff40' }}
                  />
                  
                  {trophy.earned && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00D1FF] border-2 border-[#121212] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <div className="bg-[#0a0a0a] border border-white/20 rounded-xl px-4 py-3 shadow-xl min-w-[200px] backdrop-blur-xl">
                    <p className="font-semibold mb-1" style={{ color: trophy.color }}>{trophy.title}</p>
                    <p className="text-xs text-white/60">{trophy.description}</p>
                    {!trophy.earned && (
                      <p className="text-xs text-white/40 mt-2 italic">Not yet earned</p>
                    )}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/20" />
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
