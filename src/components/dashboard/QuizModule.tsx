"use client";

import { useState } from "react";
import Image from "next/image";
import { Crosshair, Zap, Heart, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface QuizResponse {
  id: number;
  text: string;
  archetype: "Sniper" | "Assassin" | "Medic" | "Tank";
  icon: LucideIcon;
}

export function QuizModule() {
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);

  const question =
    "You're in a 5v5 firefight and your team is down 2 players. What's your instinct?";

  const responses: QuizResponse[] = [
    {
      id: 1,
      text: "Find high ground and pick off enemies from distance",
      archetype: "Sniper",
      icon: Crosshair,
    },
    {
      id: 2,
      text: "Flank around and eliminate their weakest link quickly",
      archetype: "Assassin",
      icon: Zap,
    },
    {
      id: 3,
      text: "Fall back and heal/revive remaining teammates",
      archetype: "Medic",
      icon: Heart,
    },
    {
      id: 4,
      text: "Push forward and absorb damage to create space",
      archetype: "Tank",
      icon: Shield,
    },
  ];

  return (
    <section className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold mb-3">Discover Your Archetype</h1>
        <p className="text-white/60">
          Answer a few questions to unlock personalized recommendations
        </p>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 overflow-hidden backdrop-blur-xl">
        {/* Media Placeholder */}
        <div className="relative aspect-video bg-gradient-to-br from-[#00D1FF]/10 to-[#121212] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1748443992821-913d6166c18b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWN0aWNhbCUyMHNob290ZXIlMjB0cmFpbmluZyUyMG1pbGl0YXJ5fGVufDF8fHx8MTc2OTkyNDUzNHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Tactical scenario"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />

          {/* Question Number Badge */}
          <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-[#00D1FF]/90 backdrop-blur-sm border border-[#00D1FF]/30">
            <span className="text-sm font-semibold">Question 3 of 10</span>
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">{question}</h2>

          {/* Response Cards */}
          <div className="grid grid-cols-2 gap-4">
            {responses.map((response) => {
              const Icon = response.icon;
              const isSelected = selectedResponse === response.id;

              return (
                <button
                  key={response.id}
                  onClick={() => setSelectedResponse(response.id)}
                  className={`
                    group relative p-6 rounded-2xl border-2 text-left transition-all duration-300
                    ${
                      isSelected
                        ? "bg-[#00D1FF]/10 border-[#00D1FF] shadow-lg shadow-[#00D1FF]/20"
                        : "bg-white/5 border-white/10 hover:border-[#00D1FF]/50 hover:bg-white/10"
                    }
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                    w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all duration-300
                    ${
                      isSelected
                        ? "bg-[#00D1FF]/20 text-[#00D1FF]"
                        : "bg-white/10 text-white/60 group-hover:bg-[#00D1FF]/10 group-hover:text-[#00D1FF]"
                    }
                  `}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Response Text */}
                  <p
                    className={`
                    transition-colors duration-300
                    ${isSelected ? "text-white" : "text-white/80 group-hover:text-white"}
                  `}
                  >
                    {response.text}
                  </p>

                  {/* Archetype Label */}
                  <div
                    className={`
                    mt-4 text-xs font-medium transition-colors duration-300
                    ${isSelected ? "text-[#00D1FF]" : "text-white/40 group-hover:text-[#00D1FF]/70"}
                  `}
                  >
                    {response.archetype} Archetype
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#00D1FF] flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            disabled={!selectedResponse}
            className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/80 text-white font-semibold hover:shadow-lg hover:shadow-[#00D1FF]/30 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
