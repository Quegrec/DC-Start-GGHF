"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Brain, User, BookOpen, Users, Home } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
}

interface NavbarProps {
  variant: "landing" | "app";
}

// Logo réutilisable - style épuré
function Logo() {
  return (
    <Link href="/" className="group flex items-center">
      <div className="relative flex items-center">
        {/* Carré lumineux */}
        <div className="w-10 h-10 rounded-xl bg-[#00D1FF] flex items-center justify-center shadow-lg shadow-[#00D1FF]/30 group-hover:shadow-[#00D1FF]/50 transition-all duration-300">
          <span className="font-black text-base text-black tracking-tight">GG</span>
        </div>
        {/* Texte HF à côté */}
        <span className="ml-1.5 text-lg font-bold text-white/90 tracking-tight">
          HF<span className="text-[#00D1FF]">.</span>
        </span>
      </div>
    </Link>
  );
}

// Navigation pour la landing page
function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { href: "#archetype", label: "Le Test" },
    { href: "#features", label: "Fonctionnalités" },
    { href: "#community", label: "Communauté" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-black/40 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          <Logo />

          {/* Navigation centrale */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white rounded-full hover:bg-white/[0.08] transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <Link
              href="/app"
              className="hidden sm:block text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/app/quiz"
              className="px-6 py-2.5 rounded-full bg-[#00D1FF] text-black font-semibold text-sm hover:bg-white hover:shadow-xl hover:shadow-[#00D1FF]/20 transition-all duration-300"
            >
              Commencer
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Navigation pour l'app
function AppNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { href: "/app", label: "Accueil", icon: Home },
    { href: "/app/quiz", label: "Test", icon: Brain },
    { href: "/app/guides", label: "Guides", icon: BookOpen },
    { href: "/app/community", label: "Communauté", icon: Users },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/50 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/20"
          : "bg-black/20 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between gap-8">
          <Logo />

          {/* Navigation principale - style fluide */}
          <nav className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/app" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "text-[#00D1FF]"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {/* Fond actif avec animation */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/20" />
                    )}
                    <span className="relative flex items-center gap-2">
                      {Icon && <Icon className="w-4 h-4" />}
                      <span className="hidden sm:inline">{item.label}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-3">
            {/* Recherche */}
            {searchOpen ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                  className="w-52 h-10 pl-4 pr-4 rounded-full bg-white/[0.08] border border-white/[0.12] text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D1FF]/40 focus:bg-white/[0.12] transition-all"
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-300"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Profil */}
            <Link
              href="/app/profile"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                pathname === "/app/profile"
                  ? "bg-[#00D1FF]/15 text-[#00D1FF] border border-[#00D1FF]/30"
                  : "bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15]"
              }`}
            >
              <User className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Composant principal exporté
export function Navbar({ variant }: NavbarProps) {
  if (variant === "landing") {
    return <LandingNav />;
  }
  return <AppNav />;
}
