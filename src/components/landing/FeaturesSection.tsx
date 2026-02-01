"use client";

import { Rocket, Shield, Bot, Zap, Target, Users } from "lucide-react";

export function FeaturesSection() {
  const mainFeatures = [
    {
      icon: Rocket,
      title: "Des Guides qui s'adaptent à vous",
      description:
        "Fini les tutoriels génériques de 45 minutes. GGHF découpe votre progression en micro-étapes interactives basées sur votre niveau réel.",
      color: "#00D1FF",
      badge: "Progression",
    },
    {
      icon: Shield,
      title: "Le Safe Space Dashboard",
      description:
        "Un tableau de bord au design épuré pour suivre vos succès, vos badges et votre montée en compétence. Un environnement sain, pensé pour le plaisir de progresser.",
      color: "#10B981",
      badge: "Bien-être",
    },
    {
      icon: Bot,
      title: "Recommandations Intelligentes",
      description:
        "Grâce à notre moteur prédictif, recevez des suggestions de jeux et de consoles basées sur votre profil psychologique. Ne passez plus à côté de votre prochain coup de cœur.",
      color: "#8B5CF6",
      badge: "IA",
    },
  ];

  const secondaryFeatures = [
    {
      icon: Zap,
      title: "Performance optimisée",
      description: "Plateforme légère et rapide, aucun ralentissement.",
    },
    {
      icon: Target,
      title: "Objectifs personnalisés",
      description: "Des défis adaptés à votre rythme et vos envies.",
    },
    {
      icon: Users,
      title: "Communauté bienveillante",
      description: "Rejoignez des joueurs qui partagent vos valeurs.",
    },
  ];

  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/20 mb-6">
            <Rocket className="w-4 h-4 text-[#00D1FF]" />
            <span className="text-sm text-[#00D1FF]">Fonctionnalités</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tout ce qu&apos;il vous faut pour{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] to-[#10B981]">
              progresser
            </span>
          </h2>

          <p className="text-xl text-white/50 leading-relaxed">
            Une suite d&apos;outils pensée pour votre épanouissement gaming, pas
            pour vous rendre accro.
          </p>
        </div>

        {/* Main features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${feature.color}10 0%, transparent 60%)`,
                  }}
                />

                {/* Border */}
                <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors" />

                {/* Content */}
                <div className="relative p-6 md:p-8">
                  {/* Badge - visible uniquement sur desktop */}
                  <div
                    className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-6"
                    style={{
                      backgroundColor: `${feature.color}15`,
                      color: feature.color,
                    }}
                  >
                    {feature.badge}
                  </div>

                  {/* Mobile: Icône + Titre alignés */}
                  <div className="flex items-center gap-4 mb-4 md:mb-0 md:flex-col md:items-start">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 md:mb-6"
                      style={{
                        backgroundColor: `${feature.color}15`,
                        border: `1px solid ${feature.color}30`,
                      }}
                    >
                      <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: feature.color }} />
                    </div>

                    {/* Title - À côté de l'icône sur mobile */}
                    <div className="flex-1 md:flex-none">
                      <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
                      {/* Badge mobile sous le titre */}
                      <span
                        className="inline-flex md:hidden text-xs font-medium mt-1"
                        style={{ color: feature.color }}
                      >
                        {feature.badge}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary features - déjà bien alignées */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {secondaryFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-center md:items-start gap-4 p-5 md:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00D1FF]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#00D1FF]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-0.5 md:mb-1">{feature.title}</h4>
                  <p className="text-sm text-white/50 hidden md:block">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
