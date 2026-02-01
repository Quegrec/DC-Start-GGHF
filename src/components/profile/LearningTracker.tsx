"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, BookOpen, TrendingUp, Loader2, Play } from "lucide-react";
import { Card, SectionHeader, ProgressBar } from "@/components/common";
import { getAllGuides, type Guide } from "@/data/guides";
import { getLearningProgress, type LearningProgress } from "@/data/user";

export function LearningTracker() {
  const [activeTab, setActiveTab] = useState<"completed" | "inProgress">("inProgress");
  const [guides, setGuides] = useState<Guide[]>([]);
  const [progress, setProgress] = useState<LearningProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [guidesData, progressData] = await Promise.all([
          Promise.resolve(getAllGuides()),
          getLearningProgress(),
        ]);
        setGuides(guidesData);
        setProgress(progressData);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Card glow glowColor="#00D1FF" className="p-6">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 animate-spin text-[#00D1FF]" />
        </div>
      </Card>
    );
  }

  const completedGuides = guides.filter((g) => g.progress === 100);
  const inProgressGuides = guides.filter((g) => g.progress > 0 && g.progress < 100);

  const displayGuides = activeTab === "completed" ? completedGuides : inProgressGuides;

  const getIcon = (category: string) => {
    switch (category) {
      case "Mécanique":
        return TrendingUp;
      case "Stratégie":
        return BookOpen;
      case "Social":
        return CheckCircle2;
      default:
        return Clock;
    }
  };

  return (
    <Card glow glowColor="#00D1FF" className="p-6">
      <div>
        <SectionHeader title="Suivi d'apprentissage" />

        {/* Résumé par catégorie */}
        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          {progress.map((cat) => (
            <div
              key={cat.category}
              className="p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/60">{cat.category}</span>
                <span className="text-xs font-medium" style={{ color: cat.color }}>
                  {cat.completedLessons}/{cat.totalLessons}
                </span>
              </div>
              <ProgressBar value={cat.progress} color={cat.color} size="sm" />
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-2 my-4 p-1 bg-white/5 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab("inProgress")}
            className={`
              flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300
              ${
                activeTab === "inProgress"
                  ? "bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30 shadow-lg shadow-[#00D1FF]/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }
            `}
          >
            En cours ({inProgressGuides.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`
              flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300
              ${
                activeTab === "completed"
                  ? "bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30 shadow-lg shadow-[#00D1FF]/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }
            `}
          >
            Terminés ({completedGuides.length})
          </button>
        </div>

        {/* Cartes de guides */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {displayGuides.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              {activeTab === "completed"
                ? "Aucun guide terminé"
                : "Aucun guide en cours"}
            </div>
          ) : (
            displayGuides.map((guide) => {
              const Icon = getIcon(guide.category);

              return (
                <Link
                  href={`/app/guides/${guide.id}`}
                  key={guide.id}
                  className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00D1FF]/30 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    {/* Icône */}
                    <div
                      className={`
                      w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${
                        guide.progress === 100
                          ? "bg-[#10B981]/20 text-[#10B981]"
                          : "bg-[#00D1FF]/10 text-[#00D1FF]"
                      }
                    `}
                    >
                      {guide.progress === 100 ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 group-hover:text-[#00D1FF] transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-white/50 mb-2">
                        {guide.game} • {guide.category}
                      </p>

                      {/* Barre de progression */}
                      <ProgressBar
                        value={guide.progress}
                        color={guide.progress === 100 ? "#10B981" : "#00D1FF"}
                        size="sm"
                      />
                    </div>

                    {/* Bouton action */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-lg bg-[#00D1FF]/20 flex items-center justify-center">
                        <Play className="w-4 h-4 text-[#00D1FF]" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </Card>
  );
}
