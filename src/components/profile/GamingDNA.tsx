import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Gamepad2, Monitor } from 'lucide-react';

export function GamingDNA() {
  const consoles = [
    { name: 'PS5', icon: '🎮', active: true },
    { name: 'PC', icon: '💻', active: true },
    { name: 'Xbox', icon: '🎯', active: false },
  ];

  const genres = [
    { name: 'FPS', active: true },
    { name: 'RPG', active: true },
    { name: 'Strategy', active: true },
    { name: 'MOBA', active: false },
    { name: 'Battle Royale', active: true },
  ];

  const topGames = [
    {
      id: 1,
      title: "Neon Nexus",
      coverUrl: "https://images.unsplash.com/photo-1604145422773-47497d131f05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBnYW1lJTIwY292ZXIlMjBuZW9ufGVufDF8fHx8MTc2OTkyMjY2MHww&ixlib=rb-4.1.0&q=80&w=1080",
      hours: 248
    },
    {
      id: 2,
      title: "Stellar Conquest",
      coverUrl: "https://images.unsplash.com/photo-1627645812426-67ce7b0a7a81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbWUlMjBzY2ktZml8ZW58MXx8fHwxNzY5OTIyNjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      hours: 192
    },
    {
      id: 3,
      title: "Realm of Legends",
      coverUrl: "https://images.unsplash.com/photo-1765606290905-b9d377ea4d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZ2FtZSUyMG1lZGlldmFsJTIwd2FycmlvcnxlbnwxfHx8fDE3Njk5MjI2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      hours: 156
    }
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 backdrop-blur-xl relative overflow-hidden">
      {/* Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent" />
      
      <div>
        <h2 className="text-xl font-semibold mb-6">Gaming DNA</h2>
        
        <div className="space-y-6">
          {/* My Consoles */}
          <div>
            <h3 className="text-sm text-white/60 mb-3 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              My Consoles
            </h3>
            <div className="flex flex-wrap gap-3">
              {consoles.map((console) => (
                <div
                  key={console.name}
                  className={`
                    px-4 py-2 rounded-xl border transition-all duration-300
                    ${console.active
                      ? 'bg-[#00D1FF]/10 border-[#00D1FF]/30 text-[#00D1FF]'
                      : 'bg-white/5 border-white/10 text-white/40'
                    }
                  `}
                >
                  <span className="mr-2">{console.icon}</span>
                  <span className="font-medium">{console.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Favorite Genres */}
          <div>
            <h3 className="text-sm text-white/60 mb-3">Favorite Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre.name}
                  className={`
                    px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300
                    ${genre.active
                      ? 'bg-white/10 border border-white/20 text-white'
                      : 'bg-white/5 border border-white/10 text-white/40'
                    }
                  `}
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          
          {/* Top 3 Games */}
          <div>
            <h3 className="text-sm text-white/60 mb-3">Top 3 Games</h3>
            <div className="grid grid-cols-3 gap-3">
              {topGames.map((game, index) => (
                <div key={game.id} className="group relative">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 hover:border-[#00D1FF]/50 transition-all duration-300">
                    <ImageWithFallback
                      src={game.coverUrl}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                    
                    {/* Rank Badge */}
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-[#00D1FF]/90 backdrop-blur-sm border border-[#00D1FF]/30 flex items-center justify-center">
                      <span className="font-bold text-sm">#{index + 1}</span>
                    </div>
                    
                    {/* Hours Played */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs font-semibold mb-1 truncate">{game.title}</p>
                      <p className="text-xs text-white/60">{game.hours}h played</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
