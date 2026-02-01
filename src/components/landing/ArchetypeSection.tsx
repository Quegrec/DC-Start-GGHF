"use client";

import { Heart, Crosshair, Zap, Brain, Sparkles } from "lucide-react";
import Link from "next/link";

export function ArchetypeSection() {
  const archetypes = [
    {
      icon: Heart,
      name: "Le Medic",
      color: "#10B981",
      trait: "Empathie & Esprit d'équipe",
      description:
        "Votre empathie et votre esprit d'équipe font de vous le pilier de la survie. Vous brillez dans les rôles de support.",
    },
    {
      icon: Crosshair,
      name: "Le Sniper",
      color: "#00D1FF",
      trait: "Perfectionnisme & Calme",
      description:
        "Votre perfectionnisme et votre calme olympien vous destinent à la précision absolue. Patience et timing sont vos armes.",
    },
    {
      icon: Zap,
      name: "L'Assassin",
      color: "#8B5CF6",
      trait: "Réactivité & Audace",
      description:
        "Votre réactivité et votre audace font de vous un prédateur de l'ombre. L'élément de surprise est votre allié.",
    },
  ];

  return (
    <section id="archetype" className="relative py-32 px-6">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00D1FF]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/20 mb-6">
            <Brain className="w-4 h-4 text-[#00D1FF]" />
            <span className="text-sm text-[#00D1FF]">La Solution</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Une analyse{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/70">
              psychologique
            </span>
            , pas technique
          </h2>

          <p className="text-xl text-white/50 leading-relaxed">
            Notre algorithme ne se contente pas de regarder votre précision. Il
            évalue votre <span className="text-[#00D1FF]">Empathie</span>, votre{" "}
            <span className="text-[#10B981]">Résilience</span> et votre{" "}
            <span className="text-[#8B5CF6]">Vision Stratégique</span> à travers
            des mises en situation réelles.
          </p>
        </div>

        {/* Archetype cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {archetypes.map((archetype, index) => {
            const Icon = archetype.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${archetype.color}15 0%, transparent 50%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                  style={{
                    backgroundColor: `${archetype.color}15`,
                    border: `1px solid ${archetype.color}30`,
                  }}
                >
                  <Icon
                    className="w-8 h-8 transition-transform group-hover:scale-110"
                    style={{ color: archetype.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold mb-2">
                  {archetype.name}
                </h3>
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: archetype.color }}
                >
                  {archetype.trait}
                </p>
                <p className="relative text-white/50 leading-relaxed">
                  {archetype.description}
                </p>

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

        {/* Secret callout */}
        <div className="relative max-w-3xl mx-auto">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#00D1FF]/10 via-[#00D1FF]/5 to-[#00D1FF]/10 border border-[#00D1FF]/20 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00D1FF]/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-[#00D1FF]" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#00D1FF] mb-2">
                  Le secret
                </h4>
                <p className="text-white/70 leading-relaxed">
                  Vos traits de caractère définissent votre style de jeu. Nous
                  les révélons pour vous orienter vers les classes et les titres
                  où vous{" "}
                  <span className="text-white font-medium">
                    excellerez naturellement
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/app"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#00D1FF] text-black font-semibold text-lg hover:shadow-2xl hover:shadow-[#00D1FF]/25 transition-all duration-300"
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
