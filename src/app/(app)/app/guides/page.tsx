"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  TrendingUp,
  Play,
  Search,
} from "lucide-react";
import { Card, Badge, ProgressBar, StatCard, SectionHeader } from "@/components/common";
import { getAllGuides, type Guide } from "@/data/guides";

// Récupérer les guides depuis le fichier de données
const allGuides = getAllGuides();

export default function GuidesPage() {
  const [filter, setFilter] = useState<"all" | "inProgress" | "completed" | "new">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = allGuides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.game.toLowerCase().includes(searchQuery.toLowerCase());

    switch (filter) {
      case "inProgress":
        return matchesSearch && guide.progress > 0 && guide.progress < 100;
      case "completed":
        return matchesSearch && guide.progress === 100;
      case "new":
        return matchesSearch && guide.progress === 0;
      default:
        return matchesSearch;
    }
  });

  const stats = {
    total: allGuides.length,
    completed: allGuides.filter((g) => g.progress === 100).length,
    inProgress: allGuides.filter((g) => g.progress > 0 && g.progress < 100).length,
    totalHours: Math.round(
      allGuides.reduce((acc, g) => acc + parseInt(g.duration), 0) / 60
    ),
  };

  const getDifficultyVariant = (difficulty: Guide["difficulty"]) => {
    switch (difficulty) {
      case "Débutant":
        return "success" as const;
      case "Intermédiaire":
        return "warning" as const;
      case "Avancé":
        return "danger" as const;
    }
  };

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* En-tête */}
        <div className="mb-10">
          <SectionHeader
            icon={BookOpen}
            badge="Bibliothèque"
            title="Mes Guides"
            description="Progressez à votre rythme avec des guides adaptés à votre archétype"
          />
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={BookOpen}
            value={stats.total}
            label="Guides disponibles"
            color="#00D1FF"
          />
          <StatCard
            icon={CheckCircle2}
            value={stats.completed}
            label="Terminés"
            color="#10B981"
          />
          <StatCard
            icon={TrendingUp}
            value={stats.inProgress}
            label="En cours"
            color="#F59E0B"
          />
          <StatCard
            icon={Clock}
            value={`${stats.totalHours}h`}
            label="Temps total"
            color="#8B5CF6"
          />
        </div>

        {/* Filtres et recherche */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Recherche */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Rechercher un guide ou un jeu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D1FF]/50 transition-colors"
            />
          </div>

          {/* Onglets de filtre */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
            {[
              { key: "all", label: "Tous" },
              { key: "inProgress", label: "En cours" },
              { key: "completed", label: "Terminés" },
              { key: "new", label: "À découvrir" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as typeof filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === tab.key
                    ? "bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des guides */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} hover className="p-6">
              {/* En-tête */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                    {guide.gameLogo}
                  </div>
                  <div>
                    <p className="text-sm text-white/60">{guide.game}</p>
                    <Badge variant={getDifficultyVariant(guide.difficulty)}>
                      {guide.difficulty}
                    </Badge>
                  </div>
                </div>
                {guide.progress === 100 && (
                  <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  </div>
                )}
              </div>

              {/* Titre et description */}
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#00D1FF] transition-colors">
                {guide.title}
              </h3>
              <p className="text-sm text-white/50 mb-4 line-clamp-2">
                {guide.description}
              </p>

              {/* Méta-informations */}
              <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {guide.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {guide.completedSteps}/{guide.totalSteps} étapes
                </span>
              </div>

              {/* Progression */}
              <ProgressBar
                value={guide.progress}
                color={guide.progress === 100 ? "#10B981" : "#00D1FF"}
              />

              {/* Bouton d'action */}
              <Link
                href={`/app/guides/${guide.id}`}
                className={`mt-4 w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                  guide.progress === 100
                    ? "bg-white/5 text-white/60 hover:bg-white/10"
                    : guide.progress > 0
                    ? "bg-[#00D1FF]/20 text-[#00D1FF] hover:bg-[#00D1FF]/30"
                    : "bg-[#00D1FF] text-black hover:bg-[#00D1FF]/90"
                }`}
              >
                <Play className="w-4 h-4" />
                {guide.progress === 100
                  ? "Revoir le guide"
                  : guide.progress > 0
                  ? "Continuer"
                  : "Commencer"}
              </Link>
            </Card>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Aucun guide trouvé</h3>
            <p className="text-white/50">
              Essayez de modifier vos filtres de recherche
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
