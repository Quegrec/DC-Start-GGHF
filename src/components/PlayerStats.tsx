import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export function PlayerStats() {
  const archetypeData = [
    { archetype: 'Sniper', value: 75, fullMark: 100 },
    { archetype: 'Assassin', value: 82, fullMark: 100 },
    { archetype: 'Medic', value: 92, fullMark: 100 },
    { archetype: 'Tank', value: 68, fullMark: 100 },
    { archetype: 'Necromancer', value: 54, fullMark: 100 },
    { archetype: 'Support', value: 88, fullMark: 100 },
  ];

  // Find dominant archetype
  const dominantArchetype = archetypeData.reduce((max, item) => 
    item.value > max.value ? item : max
  );

  return (
    <section className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold mb-3">Your Player Archetype</h2>
        <p className="text-white/60">Based on your playstyle analysis</p>
      </div>
      
      <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-10 backdrop-blur-xl relative overflow-hidden">
        {/* Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hex Grid Chart */}
          <div className="relative">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={archetypeData}>
                  <PolarGrid 
                    stroke="#00D1FF30" 
                    strokeWidth={1.5}
                    gridType="polygon"
                  />
                  <PolarAngleAxis 
                    dataKey="archetype" 
                    tick={{ fill: '#ffffff', fontSize: 13, fontWeight: 500 }}
                    stroke="#00D1FF40"
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#ffffff60', fontSize: 11 }}
                    stroke="#00D1FF20"
                  />
                  <Radar 
                    name="Archetype Scores" 
                    dataKey="value" 
                    stroke="#00D1FF" 
                    fill="#00D1FF" 
                    fillOpacity={0.25}
                    strokeWidth={3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="text-4xl font-bold text-[#00D1FF] mb-1">{dominantArchetype.value}</div>
              <div className="text-sm text-white/60">Primary Score</div>
            </div>
          </div>
          
          {/* Stats Breakdown */}
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Archetype Breakdown</h3>
              <p className="text-white/60 text-sm">Your strongest archetype is <span className="text-[#00D1FF] font-semibold">{dominantArchetype.archetype}</span></p>
            </div>
            
            {archetypeData.map((item, index) => {
              const isDominant = item.archetype === dominantArchetype.archetype;
              
              return (
                <div key={item.archetype} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold
                        ${isDominant ? 'bg-[#00D1FF]/20 text-[#00D1FF]' : 'bg-white/10 text-white/60'}
                      `}>
                        {index + 1}
                      </div>
                      <span className={`font-medium ${isDominant ? 'text-[#00D1FF]' : 'text-white/80'}`}>
                        {item.archetype}
                      </span>
                    </div>
                    <span className={`font-semibold ${isDominant ? 'text-[#00D1FF]' : 'text-white/60'}`}>
                      {item.value}%
                    </span>
                  </div>
                  
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isDominant 
                          ? 'bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/60 shadow-lg shadow-[#00D1FF]/30' 
                          : 'bg-gradient-to-r from-white/40 to-white/20'
                      }`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              );
            })}
            
            {/* Info Card */}
            <div className="mt-8 p-5 rounded-2xl bg-[#00D1FF]/5 border border-[#00D1FF]/20">
              <h4 className="font-semibold text-[#00D1FF] mb-2">Medic Archetype</h4>
              <p className="text-sm text-white/70">
                You excel at supporting your team and keeping allies in the fight. Your strategic positioning and awareness make you invaluable in team scenarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
