"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-32 px-6">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D1FF]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* CTA Card */}
        <div className="relative rounded-[2.5rem] overflow-hidden">
          {/* Border gradient */}
          <div className="absolute inset-0 rounded-[2.5rem] p-px bg-gradient-to-b from-[#00D1FF]/30 via-[#00D1FF]/10 to-transparent">
            <div className="w-full h-full rounded-[2.5rem] bg-[#0a0a0a]" />
          </div>

          {/* Content */}
          <div className="relative p-12 md:p-16 text-center">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/20 mb-8">
              <Sparkles className="w-4 h-4 text-[#00D1FF]" />
              <span className="text-sm text-[#00D1FF]">
                Prêt à vous découvrir ?
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Devenez le joueur que vous êtes{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] to-[#10B981]">
                vraiment
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10">
              En moins de 5 minutes, découvrez votre archétype et recevez vos
              premières recommandations personnalisées.
            </p>

            {/* CTA Button */}
            <Link
              href="/app"
              className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/80 text-black font-semibold text-lg hover:shadow-2xl hover:shadow-[#00D1FF]/30 transition-all duration-300"
            >
              Commencer le test gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Trust note */}
            <p className="mt-6 text-sm text-white/30">
              Aucune carte bancaire requise • Résultats instantanés
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-8 left-8 w-2 h-2 bg-[#00D1FF] rounded-full opacity-50" />
          <div className="absolute top-12 right-12 w-3 h-3 bg-[#10B981] rounded-full opacity-30" />
          <div className="absolute bottom-16 left-16 w-2 h-2 bg-[#8B5CF6] rounded-full opacity-40" />
        </div>
      </div>
    </section>
  );
}
