"use client";

import { Shield, Compass, Hammer, Sword, BookOpen, Users, Sparkles, Brain } from "lucide-react";
import Link from "next/link";

export function ArchetypeSection() {
  const archetypes = [
    {
      icon: Shield,
      name: "Le Gardien",
      color: "#10B981",
      trait: "Protection & Altruisme",
      description:
        "Vous prenez soin des autres et créez des espaces sûrs. Que ce soit en soignant, guidant ou protégeant, vous êtes le pilier de l'équipe.",
    },
    {
      icon: Compass,
      name: "L'Explorateur",
      color: "#8B5CF6",
      trait: "Curiosité & Découverte",
      description:
        "Chaque recoin inexploré est une invitation. Secrets, easter eggs, lore caché... vous vivez pour le mystère et l'aventure.",
    },
    {
      icon: Hammer,
      name: "L'Architecte",
      color: "#F59E0B",
      trait: "Création & Planification",
      description:
        "Bâtir, optimiser, créer. Que ce soit des bases, des fermes automatisées ou des empires, vous transformez vos idées en réalités.",
    },
  ];

  return (
    <section id="archetype-test" className="relative py-32 px-6">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00D1FF]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/20 mb-6">
            <Brain className="w-4 h-4 text-[#00D1FF]" />
            <span className="text-sm text-[#00D1FF]">Votre profil de joueur</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Découvrez{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/70">
              qui vous êtes
            </span>{" "}
            vraiment en jeu
          </h2>

          <p className="text-lg md:text-xl text-white/50 leading-relaxed">
            Que vous soyez fan de <span className="text-[#00D1FF]">MMO</span>, de{" "}
            <span className="text-[#10B981]">jeux solo narratifs</span>, de{" "}
            <span className="text-[#8B5CF6]">construction</span> ou de{" "}
            <span className="text-[#F59E0B]">compétition</span>, notre test révèle
            votre véritable style de jeu.
          </p>
        </div>

        {/* Archetype cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
          {archetypes.map((archetype, index) => {
            const Icon = archetype.icon;
            return (
              <div
                key={index}
                className="group relative p-5 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${archetype.color}15 0%, transparent 50%)`,
                  }}
                />

                {/* Mobile: Layout horizontal */}
                <div className="relative flex items-start gap-4 md:block">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 md:mb-6"
                    style={{
                      backgroundColor: `${archetype.color}15`,
                      border: `1px solid ${archetype.color}30`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6 md:w-8 md:h-8"
                      style={{ color: archetype.color }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
                      {archetype.name}
                    </h3>
                    <p
                      className="text-xs md:text-sm font-medium mb-2 md:mb-4"
                      style={{ color: archetype.color }}
                    >
                      {archetype.trait}
                    </p>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed">
                      {archetype.description}
                    </p>
                  </div>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${archetype.color}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* More archetypes teaser */}
        <div className="flex justify-center gap-4 mb-12">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Sword className="w-4 h-4 text-[#EF4444]" />
            <span className="text-sm text-white/60">Le Challenger</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <BookOpen className="w-4 h-4 text-[#EC4899]" />
            <span className="text-sm text-white/60">Le Conteur</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Users className="w-4 h-4 text-[#00D1FF]" />
            <span className="text-sm text-white/60">Le Social</span>
          </div>
        </div>

        {/* Secret callout */}
        <div className="relative max-w-3xl mx-auto">
          <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#00D1FF]/10 via-[#00D1FF]/5 to-[#00D1FF]/10 border border-[#00D1FF]/20 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00D1FF]/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#00D1FF]" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-semibold text-[#00D1FF] mb-2">
                  Pour tous les joueurs
                </h4>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">
                  RPG, survie, simulation, aventure, puzzle, action... Nos archétypes
                  s&apos;adaptent à{" "}
                  <span className="text-white font-medium">
                    tous les genres de jeux
                  </span>
                  . Pas besoin d&apos;être un pro pour trouver votre place.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            href="/app/quiz"
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full md:rounded-2xl bg-[#00D1FF] text-black font-semibold text-base md:text-lg hover:shadow-2xl hover:shadow-[#00D1FF]/25 transition-all duration-300"
          >
            Découvrir mon Archétype
            <span className="text-[#00D1FF]/60 bg-black/20 px-2 py-0.5 rounded text-sm">
              Gratuit
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
