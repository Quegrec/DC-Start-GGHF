"use client";

import Image from "next/image";
import { Settings, RotateCcw, Crown } from "lucide-react";

export function ProfileHeader() {
  const level = 42;
  const currentXP = 7350;
  const nextLevelXP = 10000;
  const xpProgress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 backdrop-blur-xl relative overflow-hidden">
      {/* Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent" />

      <div className="flex items-start gap-8">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#00D1FF]/30 shadow-lg shadow-[#00D1FF]/20 relative">
            <Image
              src="https://images.unsplash.com/photo-1656229181541-a42184b5625c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lciUyMGF2YXRhciUyMHBvcnRyYWl0JTIwaGVhZHNldHxlbnwxfHx8fDE3Njk5MjU4NzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="User Avatar"
              fill
              className="object-cover"
            />
          </div>

          {/* Level Badge */}
          <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D1FF] to-[#00D1FF]/60 flex items-center justify-center border-2 border-[#121212] shadow-lg shadow-[#00D1FF]/40">
            <div className="text-center">
              <Crown className="w-4 h-4 mx-auto mb-0.5" />
              <span className="text-xs font-bold">{level}</span>
            </div>
          </div>
        </div>

        {/* User Info & XP Progress */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold mb-1">ShadowStriker</h1>
              <p className="text-white/60">Medic Archetype • Member since 2024</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#00D1FF]/20 to-[#00D1FF]/10 border border-[#00D1FF]/30 text-[#00D1FF] hover:from-[#00D1FF]/30 hover:to-[#00D1FF]/20 hover:shadow-lg hover:shadow-[#00D1FF]/20 transition-all duration-300 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>

              <button className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#00D1FF]/50 transition-all duration-300">
                <Settings className="w-5 h-5 text-white/60" />
              </button>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Level {level} Progress</span>
              <span className="text-[#00D1FF] font-semibold">
                {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
              </span>
            </div>

            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/60 rounded-full transition-all duration-500 shadow-lg shadow-[#00D1FF]/30"
                style={{ width: `${xpProgress}%` }}
              />

              {/* Glow Effect */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent to-[#00D1FF]/40 rounded-full blur-sm"
                style={{ width: `${xpProgress}%` }}
              />
            </div>

            <p className="text-xs text-white/50">
              {(nextLevelXP - currentXP).toLocaleString()} XP to Level {level + 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
