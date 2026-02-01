"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#00D1FF 1px, transparent 1px), linear-gradient(90deg, #00D1FF 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#00D1FF] rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-[#00D1FF]/50 rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-[#10B981] rounded-full animate-pulse delay-500" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-[#00D1FF]" />
          <span className="text-sm text-white/70">
            +1 200 joueurs ont déjà trouvé leur voie
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
          <span className="block">Ne jouez plus jamais</span>
          <span className="block mt-2">
            par{" "}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/70">
                défaut
              </span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#00D1FF]/20 -z-0 rounded" />
            </span>
            .
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          <span className="text-white/80">GGHF</span> est le premier compagnon
          intelligent qui décode votre{" "}
          <span className="text-[#00D1FF]">ADN de joueur</span>. Découvrez votre
          archétype, surmontez la frustration et maîtrisez vos jeux préférés.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/app"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/80 text-black font-semibold text-lg hover:shadow-2xl hover:shadow-[#00D1FF]/25 transition-all duration-300 flex items-center gap-3"
          >
            Découvrir mon Archétype
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button className="group px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Play className="w-4 h-4 ml-0.5" />
            </div>
            Voir la démo
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-white/30 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>100% Gratuit</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>RGPD Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            <span>Lightweight & Fast</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
