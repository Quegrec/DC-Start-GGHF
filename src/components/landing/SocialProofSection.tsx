"use client";

import { Users, Award, Heart, Star, TrendingUp, Shield } from "lucide-react";

export function SocialProofSection() {
  const stats = [
    { value: "1 200+", label: "Joueurs actifs", icon: Users },
    { value: "50K+", label: "Tests complétés", icon: TrendingUp },
    { value: "4.9/5", label: "Satisfaction", icon: Star },
  ];

  const badges = [
    {
      icon: Award,
      name: "Premier Quiz",
      description: "Découvrez votre archétype",
      color: "#FFD700",
    },
    {
      icon: Heart,
      name: "Entraide",
      description: "Aidez 10 joueurs",
      color: "#EC4899",
    },
    {
      icon: Shield,
      name: "Persévérance",
      description: "7 jours de progression",
      color: "#10B981",
    },
    {
      icon: Star,
      name: "Maîtrise",
      description: "Terminez un guide",
      color: "#00D1FF",
    },
  ];

  return (
    <section id="community" className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1FF]/20 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/20 mb-6">
            <Users className="w-4 h-4 text-[#00D1FF]" />
            <span className="text-sm text-[#00D1FF]">Communauté</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Rejoignez la{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] to-[#10B981]">
              guilde
            </span>
          </h2>

          <p className="text-xl text-white/50 leading-relaxed">
            Collectionnez l&apos;invisible. Gagnez des badges d&apos;XP non pas pour
            vos victoires, mais pour votre{" "}
            <span className="text-white/70">persévérance</span> et votre{" "}
            <span className="text-white/70">entraide</span>.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#00D1FF]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-[#00D1FF]" />
                </div>
                <div className="text-4xl font-bold text-[#00D1FF] mb-2">
                  {stat.value}
                </div>
                <div className="text-white/50">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Badges showcase */}
        <div className="relative">
          <h3 className="text-2xl font-semibold text-center mb-10">
            Badges à débloquer
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300 text-center"
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${badge.color}10 0%, transparent 70%)`,
                    }}
                  />

                  {/* Badge icon */}
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${badge.color}15`,
                      boxShadow: `0 0 30px ${badge.color}20`,
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: badge.color }} />
                  </div>

                  {/* Badge info */}
                  <h4 className="relative font-semibold mb-1">{badge.name}</h4>
                  <p className="relative text-sm text-white/40">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
