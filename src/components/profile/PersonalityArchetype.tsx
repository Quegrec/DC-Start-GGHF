"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Lightbulb } from "lucide-react";
import { Card, SectionHeader, StatCard } from "@/components/common";
import { Brain, TrendingUp, Sparkles } from "lucide-react";

export function PersonalityArchetype() {
  const personalityData = [
    { trait: "Empathie", value: 88, fullMark: 100 },
    { trait: "Esprit d'équipe", value: 76, fullMark: 100 },
    { trait: "Perfectionnisme", value: 91, fullMark: 100 },
    { trait: "Vision stratégique", value: 84, fullMark: 100 },
    { trait: "Résilience", value: 72, fullMark: 100 },
    { trait: "Communication", value: 79, fullMark: 100 },
  ];

  // Trouver les traits les plus forts
  const sortedTraits = [...personalityData].sort((a, b) => b.value - a.value);
  const topTrait = sortedTraits[0];
  const secondTrait = sortedTraits[1];

  return (
    <Card glow glowColor="#00D1FF" className="p-10 relative overflow-hidden">
      {/* Effet de lumière subtil en haut */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#00D1FF]/10 to-transparent pointer-events-none" />

      <div className="text-center mb-8">
        <SectionHeader
          title="Archétype de Personnalité"
          description="L'âme de votre style de jeu"
          centered
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Graphique Radar avec effet lumineux */}
        <div className="relative">
          {/* Fond lumineux cyan */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 rounded-full bg-[#00D1FF]/5 blur-3xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-60 h-60 rounded-full bg-[#00D1FF]/10 blur-2xl" />
          </div>

          {/* Graphique */}
          <div className="relative h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={personalityData}>
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <PolarGrid
                  stroke="#00D1FF40"
                  strokeWidth={1.5}
                  gridType="polygon"
                />
                <PolarAngleAxis
                  dataKey="trait"
                  tick={{ fill: "#ffffff", fontSize: 11, fontWeight: 600 }}
                  stroke="#00D1FF50"
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "#00D1FF80", fontSize: 10 }}
                  stroke="#00D1FF30"
                />
                <Radar
                  name="Traits de personnalité"
                  dataKey="value"
                  stroke="#00D1FF"
                  fill="#00D1FF"
                  fillOpacity={0.3}
                  strokeWidth={3}
                  filter="url(#glow)"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Label central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <div className="text-sm text-white/60 mb-1">Votre essence</div>
            <div className="text-xl font-bold text-[#00D1FF]">
              {topTrait.trait}
            </div>
          </div>
        </div>

        {/* Détail de la personnalité */}
        <div className="space-y-6">
          {/* Scores des traits */}
          <div className="space-y-3">
            {personalityData.map((item) => {
              const isTop =
                item.trait === topTrait.trait ||
                item.trait === secondTrait.trait;

              return (
                <div key={item.trait}>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-medium ${
                        isTop ? "text-[#00D1FF]" : "text-white/80"
                      }`}
                    >
                      {item.trait}
                    </span>
                    <span
                      className={`font-semibold ${
                        isTop ? "text-[#00D1FF]" : "text-white/60"
                      }`}
                    >
                      {item.value}%
                    </span>
                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isTop
                          ? "bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/60 shadow-lg shadow-[#00D1FF]/30"
                          : "bg-gradient-to-r from-white/40 to-white/20"
                      }`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carte d'analyse */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00D1FF]/10 to-[#00D1FF]/5 border border-[#00D1FF]/30 relative overflow-hidden">
            {/* Lueur subtile */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/5 to-transparent pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#00D1FF]/20 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-[#00D1FF]" />
                </div>
                <h3 className="font-semibold text-[#00D1FF]">
                  Analyse de personnalité
                </h3>
              </div>

              <p className="text-sm text-white/80 leading-relaxed">
                Votre score de{" "}
                <span className="font-semibold text-[#00D1FF]">
                  {topTrait.trait.toLowerCase()}
                </span>{" "}
                ({topTrait.value}%) vous oriente vers le profil{" "}
                <span className="font-semibold text-[#00D1FF]">Sniper</span>,
                tandis que votre forte{" "}
                <span className="font-semibold text-[#00D1FF]">
                  {secondTrait.trait.toLowerCase()}
                </span>{" "}
                ({secondTrait.value}%) fait de vous un{" "}
                <span className="font-semibold text-[#00D1FF]">Medic</span> naturel.
                Cette combinaison unique suggère que vous excellez dans le travail
                d&apos;équipe précis et les stratégies de soutien.
              </p>
            </div>
          </div>

          {/* Résumé des stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              icon={Brain}
              value={`${topTrait.value}%`}
              label="Trait dominant"
              color="#00D1FF"
            />
            <StatCard
              icon={TrendingUp}
              value={`${Math.round(
                personalityData.reduce((sum, item) => sum + item.value, 0) /
                  personalityData.length
              )}%`}
              label="Score moyen"
              color="#10B981"
            />
            <StatCard
              icon={Sparkles}
              value="6"
              label="Traits analysés"
              color="#8B5CF6"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
