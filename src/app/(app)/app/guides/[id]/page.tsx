"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  Play,
  ChevronRight,
  Target,
  Lightbulb,
  AlertCircle,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { Card, Badge, ProgressBar, SectionHeader } from "@/components/common";
import { getGuideById, type Guide, type GuideStep } from "@/data/guides";

export default function GuidePage() {
  const params = useParams();
  const guideId = parseInt(params.id as string, 10);
  
  const [guide, setGuide] = useState<Guide | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"content" | "steps">("content");

  useEffect(() => {
    const guideData = getGuideById(guideId);
    if (guideData) {
      setGuide(guideData);
      // Trouver la première étape non complétée
      const firstIncompleteIndex = guideData.steps.findIndex((s) => !s.completed);
      setCurrentStepIndex(firstIncompleteIndex >= 0 ? firstIncompleteIndex : guideData.steps.length - 1);
    }
  }, [guideId]);

  if (!guide) {
    return (
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white/30" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Chargement du guide...</h2>
          </div>
        </div>
      </main>
    );
  }

  const currentStep = guide.steps[currentStepIndex];
  const stepContent = currentStep.content;

  const getStepIcon = (type: GuideStep["type"]) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />;
      case "text":
        return <BookOpen className="w-4 h-4" />;
      case "practice":
        return <Target className="w-4 h-4" />;
    }
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < guide.steps.length) {
      setCurrentStepIndex(index);
    }
  };

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Retour */}
        <Link
          href="/app/guides"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux guides
        </Link>

        {/* En-tête du guide */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Image de couverture */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={guide.coverImage}
                alt={guide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Overlay infos */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{guide.gameLogo}</span>
                  <Badge
                    variant={
                      guide.difficulty === "Débutant"
                        ? "success"
                        : guide.difficulty === "Intermédiaire"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {guide.difficulty}
                  </Badge>
                  <Badge variant="default">
                    <Clock className="w-3 h-3 mr-1" />
                    {guide.duration}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
                <p className="text-white/60">{guide.longDescription}</p>
              </div>
            </div>
          </div>

          {/* Sidebar infos */}
          <div className="space-y-4">
            {/* Progression */}
            <Card className="p-5">
              <h3 className="font-semibold mb-4">Votre progression</h3>
              <ProgressBar value={guide.progress} size="lg" />
              <p className="text-sm text-white/50 mt-3">
                {guide.completedSteps} étapes sur {guide.totalSteps} complétées
              </p>
              <button
                onClick={() => goToStep(currentStepIndex)}
                className="w-full mt-4 py-3 rounded-xl bg-[#00D1FF] text-black font-semibold flex items-center justify-center gap-2 hover:bg-[#00D1FF]/90 transition-colors"
              >
                <Play className="w-4 h-4" />
                {guide.progress === 100 ? "Revoir" : guide.progress > 0 ? "Continuer" : "Commencer"}
              </button>
            </Card>

            {/* Auteur */}
            <Card className="p-5">
              <h3 className="font-semibold mb-3">Créé par</h3>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                  <Image
                    src={guide.author.avatar}
                    alt={guide.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{guide.author.name}</p>
                  <p className="text-sm text-white/50">Niveau {guide.author.level}</p>
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-5">
              <h3 className="font-semibold mb-3">Catégories</h3>
              <div className="flex flex-wrap gap-2">
                {guide.tags.map((tag) => (
                  <Badge key={tag} variant="info">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Zone de contenu */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs mobile */}
            <div className="flex gap-2 lg:hidden p-1 bg-white/5 rounded-xl border border-white/10">
              <button
                onClick={() => setActiveTab("content")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "content"
                    ? "bg-[#00D1FF]/15 text-[#00D1FF]"
                    : "text-white/60"
                }`}
              >
                Contenu
              </button>
              <button
                onClick={() => setActiveTab("steps")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "steps"
                    ? "bg-[#00D1FF]/15 text-[#00D1FF]"
                    : "text-white/60"
                }`}
              >
                Étapes
              </button>
            </div>

            {/* Contenu de l'étape */}
            <div className={activeTab === "content" ? "block" : "hidden lg:block"}>
              <Card className="overflow-hidden">
                {/* Vidéo/Image */}
                <div className="relative aspect-video">
                  <Image
                    src={stepContent?.videoUrl || stepContent?.imageUrl || guide.coverImage}
                    alt={currentStep.title}
                    fill
                    className="object-cover"
                  />
                  {currentStep.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <button className="w-20 h-20 rounded-full bg-[#00D1FF] flex items-center justify-center hover:scale-110 transition-transform shadow-2xl shadow-[#00D1FF]/30">
                        <Play className="w-8 h-8 text-black ml-1" />
                      </button>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Badge variant="info">
                      Étape {currentStepIndex + 1} sur {guide.totalSteps}
                    </Badge>
                    <Badge variant="default">
                      <Clock className="w-3 h-3 mr-1" />
                      {currentStep.duration}
                    </Badge>
                  </div>
                </div>

                {/* Texte */}
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">{currentStep.title}</h2>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/70 leading-relaxed mb-6">
                      {stepContent?.text || "Contenu à venir..."}
                    </p>

                    {/* Points clés */}
                    {stepContent?.keyPoints && stepContent.keyPoints.length > 0 && (
                      <>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Target className="w-5 h-5 text-[#00D1FF]" />
                          Points clés
                        </h3>
                        <ul className="space-y-3 mb-8">
                          {stepContent.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 text-white/70">
                              <ChevronRight className="w-5 h-5 text-[#00D1FF] shrink-0 mt-0.5" />
                              <span>
                                <strong className="text-white">{point.title}</strong>
                                {point.description && ` : ${point.description}`}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* Conseils */}
                    {stepContent?.tips && stepContent.tips.length > 0 && (
                      <div className="p-5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 mb-6">
                        <h4 className="font-semibold text-[#10B981] mb-3 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5" />
                          Conseils
                        </h4>
                        <ul className="space-y-2">
                          {stepContent.tips.map((tip, i) => (
                            <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Avertissements */}
                    {stepContent?.warnings && stepContent.warnings.length > 0 && (
                      <div className="p-5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                        <h4 className="font-semibold text-[#F59E0B] mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          À garder en tête
                        </h4>
                        <ul className="space-y-2">
                          {stepContent.warnings.map((warning, i) => (
                            <li key={i} className="text-sm text-white/70">
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Navigation étapes */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                    <button
                      onClick={() => goToStep(currentStepIndex - 1)}
                      disabled={currentStepIndex === 0}
                      className="flex items-center gap-2 text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Étape précédente
                    </button>
                    {currentStepIndex < guide.steps.length - 1 ? (
                      <button
                        onClick={() => goToStep(currentStepIndex + 1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D1FF] text-black font-semibold hover:bg-[#00D1FF]/90 transition-colors"
                      >
                        {currentStep.completed ? "Étape suivante" : "Marquer et continuer"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10B981] text-black font-semibold hover:bg-[#10B981]/90 transition-colors">
                        <Trophy className="w-4 h-4" />
                        Terminer le guide
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Liste des étapes */}
          <div className={`space-y-4 ${activeTab === "steps" ? "block" : "hidden lg:block"}`}>
            <Card glow glowColor="#00D1FF" className="p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#00D1FF]" />
                Programme du guide
              </h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {guide.steps.map((step, index) => {
                  const isCurrent = index === currentStepIndex;
                  return (
                    <button
                      key={step.id}
                      onClick={() => goToStep(index)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all text-left ${
                        isCurrent
                          ? "bg-[#00D1FF]/15 border border-[#00D1FF]/30"
                          : step.completed
                          ? "bg-white/5 hover:bg-white/10"
                          : "opacity-60 hover:opacity-80"
                      }`}
                    >
                      {/* Status */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          step.completed
                            ? "bg-[#10B981]/20 text-[#10B981]"
                            : isCurrent
                            ? "bg-[#00D1FF]/20 text-[#00D1FF]"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          getStepIcon(step.type)
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            isCurrent ? "text-[#00D1FF]" : ""
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-xs text-white/40">{step.duration}</p>
                      </div>

                      {/* Badge type */}
                      {isCurrent && (
                        <Badge variant="info" size="sm">
                          En cours
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Récompense */}
            <Card className="p-5 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/20 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-7 h-7 text-[#F59E0B]" />
              </div>
              <h4 className="font-semibold mb-1">Récompense</h4>
              <p className="text-sm text-white/50 mb-3">
                Terminez ce guide pour débloquer
              </p>
              <Badge variant="warning">
                +{guide.reward.xp} XP • Badge &quot;{guide.reward.badge}&quot;
              </Badge>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
