"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Lightbulb, Loader2 } from "lucide-react";
import { Card, SectionHeader, StatCard } from "@/components/common";
import { Brain, TrendingUp, Sparkles } from "lucide-react";
import { getCurrentUser, type UserProfile } from "@/data/user";

const traitAffinities: Record<string, Record<string, number>> = {
  guardian: { Empathie: 95, Patience: 90, "Esprit d'équipe": 95, Curiosite: 60, Creativite: 70, Competition: 40 },
  explorer: { Empathie: 65, Patience: 85, "Esprit d'équipe": 55, Curiosite: 100, Creativite: 80, Competition: 45 },
  architect: { Empathie: 55, Patience: 95, "Esprit d'équipe": 60, Curiosite: 75, Creativite: 100, Competition: 50 },
  challenger: { Empathie: 40, Patience: 60, "Esprit d'équipe": 55, Curiosite: 50, Creativite: 45, Competition: 100 },
  storyteller: { Empathie: 90, Patience: 80, "Esprit d'équipe": 50, Curiosite: 85, Creativite: 90, Competition: 35 },
  socializer: { Empathie: 85, Patience: 65, "Esprit d'équipe": 100, Curiosite: 70, Creativite: 60, Competition: 55 },
};

export function PersonalityArchetype() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Erreur chargement archetype personality:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const personalityData = useMemo(() => {
    const archetypeId = user?.archetype?.id;
    const source = (archetypeId && traitAffinities[archetypeId]) || traitAffinities.socializer;
    return Object.entries(source).map(([trait, value]) => ({ trait, value, fullMark: 100 }));
  }, [user?.archetype?.id]);

  // Trouver les traits les plus forts
  const sortedTraits = [...personalityData].sort((a, b) => b.value - a.value);
  const topTrait = sortedTraits[0];
  const secondTrait = sortedTraits[1];

  if (loading) {
    return (
      <Card glow glowColor="#00D1FF" className="p-10">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#00D1FF]" />
        </div>
      </Card>
    );
  }

  return (
    <Card glow glowColor="#00D1FF" className="p-10 relative overflow-hidden">
      {/* Effet de lumière subtil en haut */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-[#00D1FF]/10 to-transparent pointer-events-none" />

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
                          ? "bg-linear-to-r from-[#00D1FF] to-[#00D1FF]/60 shadow-lg shadow-[#00D1FF]/30"
                          : "bg-linear-to-r from-white/40 to-white/20"
                      }`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carte d'analyse */}
          <div className="p-6 rounded-2xl bg-linear-to-br from-[#00D1FF]/10 to-[#00D1FF]/5 border border-[#00D1FF]/30 relative overflow-hidden">
            {/* Lueur subtile */}
            <div className="absolute inset-0 bg-linear-to-br from-[#00D1FF]/5 to-transparent pointer-events-none" />

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
                Votre profil est aligné sur l&apos;archétype{" "}
                <span className="font-semibold text-[#00D1FF]">
                  {user?.archetype?.name ?? "détecté"}
                </span>{" "}
                avec une dominante en{" "}
                <span className="font-semibold text-[#00D1FF]">
                  {secondTrait.trait.toLowerCase()}
                </span>{" "}
                ({secondTrait.value}%) et un pic sur{" "}
                <span className="font-semibold text-[#00D1FF]">{topTrait.trait.toLowerCase()}</span>.
                Le radar reflète directement votre résultat de quiz sauvegardé sur votre profil.
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
