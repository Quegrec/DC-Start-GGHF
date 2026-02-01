"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Gamepad2, Loader2 } from "lucide-react";
import { Card, SectionHeader, Badge } from "@/components/common";
import { getGamingDNA, type GamingDNAAttribute } from "@/data/user";
import { getPlayerGames, type PlayerGame } from "@/data/games";

export function GamingDNA() {
  const [dna, setDna] = useState<GamingDNAAttribute[]>([]);
  const [playerGames, setPlayerGames] = useState<PlayerGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dnaData, gamesData] = await Promise.all([
          getGamingDNA(),
          getPlayerGames(),
        ]);
        setDna(dnaData);
        setPlayerGames(gamesData);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Card glow glowColor="#00D1FF" className="p-6">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 animate-spin text-[#00D1FF]" />
        </div>
      </Card>
    );
  }

  // Top 3 jeux par heures jouées
  const topGames = [...playerGames]
    .sort((a, b) => b.hoursPlayed - a.hoursPlayed)
    .slice(0, 3);

  // Extraire les plateformes uniques
  const platforms = Array.from(
    new Set(playerGames.flatMap((pg) => pg.game.platform))
  ).map((p) => ({
    name: p,
    icon: p === "PC" ? "💻" : p === "PlayStation" ? "🎮" : p === "Xbox" ? "🎯" : "📱",
    active: true,
  }));

  // Extraire les genres
  const allGenres = playerGames.map((pg) => pg.game.genre);
  const genreCounts = allGenres.reduce((acc, genre) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const genres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name], i) => ({ name, active: i < 3 }));

  return (
    <Card glow glowColor="#00D1FF" className="p-6">
      <div>
        <SectionHeader title="ADN Gaming" />

        <div className="space-y-6 mt-6">
          {/* Traits de personnalité gaming */}
          <div>
            <h3 className="text-sm text-white/60 mb-3">Profil de joueur</h3>
            <div className="grid grid-cols-2 gap-3">
              {dna.slice(0, 4).map((trait) => (
                <div
                  key={trait.name}
                  className="p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{trait.name}</span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: trait.color }}
                    >
                      {trait.value}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${trait.value}%`,
                        backgroundColor: trait.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mes plateformes */}
          <div>
            <h3 className="text-sm text-white/60 mb-3 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              Mes plateformes
            </h3>
            <div className="flex flex-wrap gap-3">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="px-4 py-2 rounded-xl border transition-all duration-300 bg-[#00D1FF]/10 border-[#00D1FF]/30 text-[#00D1FF]"
                >
                  <span className="mr-2">{platform.icon}</span>
                  <span className="font-medium">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Genres favoris */}
          <div>
            <h3 className="text-sm text-white/60 mb-3">Genres favoris</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge
                  key={genre.name}
                  variant={genre.active ? "info" : "default"}
                  size="md"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Top 3 des jeux */}
          <div>
            <h3 className="text-sm text-white/60 mb-3">Top 3 des jeux</h3>
            <div className="grid grid-cols-3 gap-3">
              {topGames.map((pg, index) => (
                <div key={pg.game.id} className="group relative">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 hover:border-[#00D1FF]/50 transition-all duration-300">
                    <Image
                      src={pg.game.coverImage}
                      alt={pg.game.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 33vw, 150px"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />

                    {/* Badge de rang */}
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-[#00D1FF]/90 backdrop-blur-sm border border-[#00D1FF]/30 flex items-center justify-center">
                      <span className="font-bold text-sm">#{index + 1}</span>
                    </div>

                    {/* Heures jouées */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs font-semibold mb-1 truncate">
                        {pg.game.name}
                      </p>
                      <p className="text-xs text-white/60">{pg.hoursPlayed}h jouées</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
