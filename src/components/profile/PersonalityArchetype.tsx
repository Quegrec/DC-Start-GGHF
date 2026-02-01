"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Lightbulb } from "lucide-react";

export function PersonalityArchetype() {
  const personalityData = [
    { trait: "Empathy", value: 88, fullMark: 100 },
    { trait: "Team Spirit", value: 76, fullMark: 100 },
    { trait: "Perfectionism", value: 91, fullMark: 100 },
    { trait: "Strategic Focus", value: 84, fullMark: 100 },
    { trait: "Resilience", value: 72, fullMark: 100 },
    { trait: "Communication", value: 79, fullMark: 100 },
  ];

  // Find highest traits
  const sortedTraits = [...personalityData].sort((a, b) => b.value - a.value);
  const topTrait = sortedTraits[0];
  const secondTrait = sortedTraits[1];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-10 backdrop-blur-xl relative overflow-hidden">
      {/* Top Glow with stronger effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#00D1FF]/10 to-transparent pointer-events-none" />

      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold mb-3">Personality Archetype</h2>
        <p className="text-white/60">The soul of your playstyle</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Hex Grid Chart with Glow */}
        <div className="relative">
          {/* Cyber Blue Glow Background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 rounded-full bg-[#00D1FF]/5 blur-3xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-60 h-60 rounded-full bg-[#00D1FF]/10 blur-2xl" />
          </div>

          {/* Chart */}
          <div className="relative h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={personalityData}>
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <PolarGrid
                  stroke="#00D1FF40"
                  strokeWidth={1.5}
                  gridType="polygon"
                />
                <PolarAngleAxis
                  dataKey="trait"
                  tick={{ fill: "#ffffff", fontSize: 13, fontWeight: 600 }}
                  stroke="#00D1FF50"
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "#00D1FF80", fontSize: 10 }}
                  stroke="#00D1FF30"
                />
                <Radar
                  name="Personality Traits"
                  dataKey="value"
                  stroke="#00D1FF"
                  fill="#00D1FF"
                  fillOpacity={0.3}
                  strokeWidth={3}
                  filter="url(#glow)"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Center Label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <div className="text-sm text-white/60 mb-1">Your Soul</div>
            <div className="text-2xl font-bold text-[#00D1FF]">
              {topTrait.trait}
            </div>
          </div>
        </div>

        {/* Personality Breakdown */}
        <div className="space-y-6">
          {/* Trait Scores */}
          <div className="space-y-3">
            {personalityData.map((item) => {
              const isTop =
                item.trait === topTrait.trait ||
                item.trait === secondTrait.trait;

              return (
                <div key={item.trait}>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-medium ${
                        isTop ? "text-[#00D1FF]" : "text-white/80"
                      }`}
                    >
                      {item.trait}
                    </span>
                    <span
                      className={`font-semibold ${
                        isTop ? "text-[#00D1FF]" : "text-white/60"
                      }`}
                    >
                      {item.value}%
                    </span>
                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isTop
                          ? "bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/60 shadow-lg shadow-[#00D1FF]/30"
                          : "bg-gradient-to-r from-white/40 to-white/20"
                      }`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Insight Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00D1FF]/10 to-[#00D1FF]/5 border border-[#00D1FF]/30 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D1FF]/5 to-transparent pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#00D1FF]/20 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-[#00D1FF]" />
                </div>
                <h3 className="font-semibold text-[#00D1FF]">
                  Personality Insight
                </h3>
              </div>

              <p className="text-sm text-white/80 leading-relaxed">
                Your{" "}
                <span className="font-semibold text-[#00D1FF]">
                  {topTrait.trait.toLowerCase()}
                </span>{" "}
                score ({topTrait.value}%) aligns you with the{" "}
                <span className="font-semibold text-[#00D1FF]">Sniper</span>{" "}
                path, while your high{" "}
                <span className="font-semibold text-[#00D1FF]">
                  {secondTrait.trait.toLowerCase()}
                </span>{" "}
                ({secondTrait.value}%) makes you a natural{" "}
                <span className="font-semibold text-[#00D1FF]">Medic</span>. This
                unique combination suggests you excel at precision teamwork and
                supportive strategies.
              </p>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-[#00D1FF] mb-1">
                {topTrait.value}%
              </div>
              <div className="text-xs text-white/60">Highest Trait</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-[#00D1FF] mb-1">
                {Math.round(
                  personalityData.reduce((sum, item) => sum + item.value, 0) /
                    personalityData.length
                )}
                %
              </div>
              <div className="text-xs text-white/60">Average Score</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-[#00D1FF] mb-1">6</div>
              <div className="text-xs text-white/60">Core Traits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
