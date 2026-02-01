"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D1FF] to-[#00D1FF]/50 flex items-center justify-center shadow-lg shadow-[#00D1FF]/20 group-hover:shadow-[#00D1FF]/40 transition-all duration-300">
            <span className="font-bold text-sm">GG</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">
            GGHF<span className="text-[#00D1FF]">.</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#archetype"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Le Test
          </a>
          <a
            href="#features"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Fonctionnalités
          </a>
          <a
            href="#community"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Communauté
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/app"
            className="hidden sm:block text-sm text-white/60 hover:text-white transition-colors"
          >
            Se connecter
          </Link>
          <Link
            href="/app"
            className="px-5 py-2.5 rounded-xl bg-[#00D1FF] text-black font-semibold text-sm hover:bg-[#00D1FF]/90 hover:shadow-lg hover:shadow-[#00D1FF]/25 transition-all duration-300"
          >
            Commencer
          </Link>
        </div>
      </div>
    </header>
  );
}
