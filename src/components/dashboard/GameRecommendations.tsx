"use client";

import Image from "next/image";
import { Star, Sparkles } from "lucide-react";
import { SectionHeader, Badge } from "@/components/common";

interface Game {
  id: number;
  title: string;
  coverUrl: string;
  matchScore: number;
  archetype: string;
  platforms: string[];
  rating?: number;
}

export function GameRecommendations() {
  const tacticalGames: Game[] = [
    {
      id: 1,
      title: "Neon Nexus",
      coverUrl:
        "https://images.unsplash.com/photo-1604145422773-47497d131f05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBnYW1lJTIwY292ZXIlMjBuZW9ufGVufDF8fHx8MTc2OTkyMjY2MHww&ixlib=rb-4.1.0&q=80&w=1080",
      matchScore: 94,
      archetype: "Sniper",
      platforms: ["PC", "PS5"],
      rating: 4.8,
    },
    {
      id: 2,
      title: "Realm of Legends",
      coverUrl:
        "https://images.unsplash.com/photo-1765606290905-b9d377ea4d5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwZ2FtZSUyMG1lZGlldmFsJTIwd2FycmlvcnxlbnwxfHx8fDE3Njk5MjI2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      matchScore: 89,
      archetype: "Sniper",
      platforms: ["PC", "Xbox"],
      rating: 4.6,
    },
    {
      id: 3,
      title: "Stellar Conquest",
      coverUrl:
        "https://images.unsplash.com/photo-1627645812426-67ce7b0a7a81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbWUlMjBzY2ktZml8ZW58MXx8fHwxNzY5OTIyNjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      matchScore: 92,
      archetype: "Sniper",
      platforms: ["PC"],
      rating: 4.9,
    },
  ];

  const ps5Games: Game[] = [
    {
      id: 4,
      title: "Velocity Rush",
      coverUrl:
        "https://images.unsplash.com/photo-1759820940963-5b4b34512409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBnYW1lJTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc2OTkwMzQyNXww&ixlib=rb-4.1.0&q=80&w=1080",
      matchScore: 78,
      archetype: "Medic",
      platforms: ["PS5"],
      rating: 4.4,
    },
    {
      id: 5,
      title: "Shadow's Edge",
      coverUrl:
        "https://images.unsplash.com/photo-1769013649595-81e2c6aad1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBnYW1lJTIwZGFyayUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzY5OTIyNjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      matchScore: 71,
      archetype: "Medic",
      platforms: ["PS5", "Xbox"],
      rating: 4.7,
    },
    {
      id: 6,
      title: "Wild Frontiers",
      coverUrl:
        "https://images.unsplash.com/photo-1765706729543-348de9e073b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBnYW1lJTIwbmF0dXJlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2OTkyMjY2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      matchScore: 86,
      archetype: "Medic",
      platforms: ["PS5", "PC"],
      rating: 4.5,
    },
  ];

  const GameCard = ({ game }: { game: Game }) => (
    <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#00D1FF]/50 transition-all duration-300 cursor-pointer">
      {/* Couverture du jeu */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={game.coverUrl}
          alt={game.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Dégradé de superposition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent" />

        {/* Badge de notation */}
        {game.rating && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-sm border border-white/20 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">{game.rating}</span>
          </div>
        )}

        {/* Score de compatibilité - Mis en avant */}
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-[#00D1FF]/90 backdrop-blur-sm border border-[#00D1FF]/30 shadow-lg shadow-[#00D1FF]/30">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">{game.matchScore}%</span>
          </div>
        </div>
      </div>

      {/* Informations du jeu */}
      <div className="p-4">
        <h3 className="font-semibold mb-2 group-hover:text-[#00D1FF] transition-colors">
          {game.title}
        </h3>

        {/* Description de la compatibilité */}
        <p className="text-xs text-white/50 mb-3">
          {game.matchScore}% de compatibilité avec votre archétype{" "}
          <span className="text-[#00D1FF]">{game.archetype}</span>
        </p>

        {/* Tags de plateforme */}
        <div className="flex flex-wrap gap-2">
          {game.platforms.map((platform) => (
            <Badge key={platform} variant="default" size="sm">
              {platform}
            </Badge>
          ))}
        </div>
      </div>

      {/* Effet de survol lumineux */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg shadow-[#00D1FF]/10" />
    </div>
  );

  return (
    <section>
      <div className="mb-8 text-center">
        <SectionHeader
          title="Jeux recommandés"
          description="Sélectionnés selon votre profil d'archétype"
          centered
        />
      </div>

      {/* Sélections tactiques pour Snipers */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">Sélections tactiques pour Snipers</h3>
            <p className="text-sm text-white/50 mt-1">
              Gameplay de haute précision qui correspond à votre style
            </p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:border-[#00D1FF]/50 hover:text-white transition-all duration-300">
            Voir tout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tacticalGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>

      {/* Top sur PS5 */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">Populaires sur PS5</h3>
            <p className="text-sm text-white/50 mt-1">
              Les titres les plus appréciés sur PlayStation 5
            </p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:border-[#00D1FF]/50 hover:text-white transition-all duration-300">
            Voir tout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ps5Games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}
