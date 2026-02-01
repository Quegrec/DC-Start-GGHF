"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Card, SectionHeader, ProgressBar } from "@/components/common";
import { getUserTrophies, type Trophy } from "@/data/user";

export function TrophyRoom() {
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrophies() {
      try {
        const data = await getUserTrophies();
        setTrophies(data);
      } catch (error) {
        console.error("Erreur lors du chargement des trophées:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTrophies();
  }, []);

  const getRarityBorder = (rarity: Trophy["rarity"]) => {
    switch (rarity) {
      case "legendary":
        return "border-[#F59E0B]";
      case "epic":
        return "border-[#8B5CF6]";
      case "rare":
        return "border-[#00D1FF]";
      default:
        return "border-white/20";
    }
  };

  if (loading) {
    return (
      <Card glow glowColor="#00D1FF" className="p-8">
        <div className="flex items-center justify-center h-32">
          <Loader2 className="w-8 h-8 animate-spin text-[#00D1FF]" />
        </div>
      </Card>
    );
  }

  const earnedCount = trophies.filter((t) => t.earnedAt).length;

  return (
    <Card glow glowColor="#00D1FF" className="p-8">
      <div>
        <div className="mb-6 flex items-start justify-between">
          <SectionHeader
            title="Salle des Trophées"
            description="Vos réussites et jalons de progression"
          />
          <div className="text-sm text-white/60">
            {earnedCount}/{trophies.length} débloqués
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {trophies.map((trophy) => {
            const isEarned = !!trophy.earnedAt;
            const hasProgress = !isEarned && trophy.progress !== undefined && trophy.maxProgress;
            const progressPercent = hasProgress
              ? (trophy.progress! / trophy.maxProgress!) * 100
              : 0;

            return (
              <div key={trophy.id} className="group relative">
                <div
                  className={`
                    relative w-full aspect-square rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all duration-300
                    ${
                      isEarned
                        ? `bg-gradient-to-br from-white/10 to-white/5 ${getRarityBorder(trophy.rarity)} hover:scale-105`
                        : "bg-white/5 border-white/10 opacity-50 hover:opacity-70"
                    }
                  `}
                  style={{
                    boxShadow: isEarned ? `0 8px 24px ${trophy.color}40` : "none",
                  }}
                >
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                    {trophy.icon}
                  </span>

                  {isEarned && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] border-2 border-[#121212] flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Infobulle */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <div className="bg-[#0a0a0a] border border-white/20 rounded-xl px-4 py-3 shadow-xl min-w-[200px] backdrop-blur-xl">
                    <p className="font-semibold mb-1" style={{ color: trophy.color }}>
                      {trophy.name}
                    </p>
                    <p className="text-xs text-white/60 mb-2">{trophy.description}</p>

                    {isEarned && trophy.earnedAt && (
                      <p className="text-xs text-[#10B981]">
                        ✓ Obtenu le {new Date(trophy.earnedAt).toLocaleDateString("fr-FR")}
                      </p>
                    )}

                    {hasProgress && (
                      <div className="mt-2">
                        <ProgressBar value={progressPercent} size="sm" />
                        <p className="text-xs text-white/40 mt-1">
                          {trophy.progress}/{trophy.maxProgress}
                        </p>
                      </div>
                    )}

                    {!isEarned && !hasProgress && (
                      <p className="text-xs text-white/40 italic">Pas encore débloqué</p>
                    )}

                    {/* Badge de rareté */}
                    <div className="mt-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          trophy.rarity === "legendary"
                            ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                            : trophy.rarity === "epic"
                            ? "bg-[#8B5CF6]/20 text-[#8B5CF6]"
                            : trophy.rarity === "rare"
                            ? "bg-[#00D1FF]/20 text-[#00D1FF]"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {trophy.rarity === "legendary"
                          ? "Légendaire"
                          : trophy.rarity === "epic"
                          ? "Épique"
                          : trophy.rarity === "rare"
                          ? "Rare"
                          : "Commun"}
                      </span>
                    </div>
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
    </Card>
  );
}
