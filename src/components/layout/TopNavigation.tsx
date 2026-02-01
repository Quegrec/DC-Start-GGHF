"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, RotateCcw, User } from "lucide-react";

export function TopNavigation() {
  const pathname = usePathname();

  const isProfile = pathname === "/profile";
  const isDashboard = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00D1FF] to-[#00D1FF]/50 flex items-center justify-center shadow-lg shadow-[#00D1FF]/30 cursor-pointer">
            <span className="font-bold">GG</span>
          </div>
          <span className="text-xl font-semibold cursor-pointer">GGHF</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              isDashboard
                ? "bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              isProfile
                ? "bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <User className="w-4 h-4" />
            Profile
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#00D1FF] transition-colors" />
            <input
              type="text"
              placeholder="Search games, archetypes, or strategies..."
              className="
                w-full h-12 pl-12 pr-4 rounded-2xl
                bg-white/5 border border-white/10
                text-white placeholder:text-white/40
                focus:outline-none focus:border-[#00D1FF]/50 focus:bg-white/10 focus:shadow-lg focus:shadow-[#00D1FF]/10
                transition-all duration-300
              "
            />
          </div>
        </div>

        {/* Retake Quiz Button */}
        <button className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#00D1FF]/20 to-[#00D1FF]/10 border border-[#00D1FF]/30 text-[#00D1FF] hover:from-[#00D1FF]/30 hover:to-[#00D1FF]/20 hover:shadow-lg hover:shadow-[#00D1FF]/20 transition-all duration-300 flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          <span className="whitespace-nowrap">Retake Archetype Quiz</span>
        </button>
      </div>
    </header>
  );
}
