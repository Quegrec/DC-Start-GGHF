"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Loader2,
  Trophy,
  Sparkles,
  Check,
} from "lucide-react";
import { Card, Badge, ProgressBar, SectionHeader } from "@/components/common";
import {
  getQuizQuestions,
  calculateQuizResult,
  type QuizQuestion,
  type Archetype,
} from "@/data/archetypes";
import { getGameRecommendations, type GameRecommendation } from "@/data/games";

type QuizState = "intro" | "quiz" | "calculating" | "result";

export default function QuizPage() {
  const [state, setState] = useState<QuizState>("intro");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{
    primaryArchetype: Archetype;
    secondaryArchetype: Archetype | null;
    scores: Record<string, number>;
  } | null>(null);
  const [recommendations, setRecommendations] = useState<GameRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await getQuizQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Erreur lors du chargement des questions:", error);
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, []);

  const handleAnswer = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentIndex].id]: optionId,
    }));
  };

  const goToNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calcul des résultats
      setState("calculating");
      try {
        const resultData = await calculateQuizResult(answers);
        setResult(resultData);
        
        // Charger les recommandations basées sur l'archétype
        const recs = await getGameRecommendations(resultData.primaryArchetype.id);
        setRecommendations(recs.slice(0, 4));
        
        setState("result");
      } catch (error) {
        console.error("Erreur lors du calcul:", error);
        setState("quiz");
      }
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setRecommendations([]);
    setState("intro");
  };

  const startQuiz = () => {
    setState("quiz");
  };

  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const currentQuestion = questions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;

  if (loading) {
    return (
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-[#00D1FF]" />
          </div>
        </div>
      </main>
    );
  }

  // --- ÉCRAN D'INTRODUCTION ---
  if (state === "intro") {
    return (
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card glow glowColor="#00D1FF" className="p-8 md:p-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00D1FF] to-[#8B5CF6] flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Découvrez votre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] to-[#8B5CF6]">
                Archétype de Joueur
              </span>
            </h1>

            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Ce test analyse votre personnalité gaming à travers {questions.length} mises 
              en situation. Répondez honnêtement pour obtenir un profil précis de votre 
              style de jeu.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-[#00D1FF]">{questions.length}</p>
                <p className="text-sm text-white/50">Questions</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-[#10B981]">5 min</p>
                <p className="text-sm text-white/50">Durée</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-[#8B5CF6]">6</p>
                <p className="text-sm text-white/50">Archétypes</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-[#F59E0B]">∞</p>
                <p className="text-sm text-white/50">Insights</p>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00D1FF] to-[#00D1FF]/80 text-black font-semibold text-lg hover:shadow-2xl hover:shadow-[#00D1FF]/30 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              Commencer le test
              <ArrowRight className="w-5 h-5" />
            </button>
          </Card>
        </div>
      </main>
    );
  }

  // --- CALCUL EN COURS ---
  if (state === "calculating") {
    return (
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Card glow glowColor="#00D1FF" className="p-12 text-center">
            <Loader2 className="w-16 h-16 animate-spin text-[#00D1FF] mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">Analyse en cours...</h2>
            <p className="text-white/60">
              Nous analysons vos réponses pour déterminer votre archétype
            </p>
          </Card>
        </div>
      </main>
    );
  }

  // --- RÉSULTAT ---
  if (state === "result" && result) {
    const { primaryArchetype, secondaryArchetype, scores } = result;
    const maxScore = Math.max(...Object.values(scores));

    return (
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {/* Résultat principal */}
          <Card glow glowColor={primaryArchetype.color} className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{
                  backgroundColor: `${primaryArchetype.color}20`,
                  border: `2px solid ${primaryArchetype.color}40`,
                }}
              >
                <span className="text-5xl">{primaryArchetype.icon}</span>
              </div>

              <Badge
                variant="success"
                className="mb-4"
              >
                <Trophy className="w-3 h-3 mr-1" />
                Votre archétype principal
              </Badge>

              <h1
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: primaryArchetype.color }}
              >
                {primaryArchetype.name}
              </h1>
              <p className="text-xl text-white/60 mb-4">{primaryArchetype.trait}</p>

              <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
                {primaryArchetype.longDescription}
              </p>
            </div>

            {/* Forces */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-3 text-[#10B981]">💪 Vos forces</h3>
                <ul className="space-y-2">
                  {primaryArchetype.strengths.map((strength) => (
                    <li key={strength} className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-[#10B981]" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h3 className="font-semibold mb-3 text-[#F59E0B]">⚠️ Vos défis</h3>
                <ul className="space-y-2">
                  {primaryArchetype.challenges.map((challenge) => (
                    <li key={challenge} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="w-4 h-4 text-center">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Archétype secondaire */}
            {secondaryArchetype && (
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-white/50 mb-1">Archétype secondaire</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{secondaryArchetype.icon}</span>
                  <div>
                    <p className="font-semibold" style={{ color: secondaryArchetype.color }}>
                      {secondaryArchetype.name}
                    </p>
                    <p className="text-sm text-white/50">{secondaryArchetype.trait}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Scores détaillés */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Répartition de vos traits</h3>
            <div className="space-y-3">
              {Object.entries(scores)
                .sort((a, b) => b[1] - a[1])
                .map(([trait, score]) => (
                  <div key={trait}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="capitalize">{trait}</span>
                      <span className="text-white/60">{Math.round((score / maxScore) * 100)}%</span>
                    </div>
                    <ProgressBar value={(score / maxScore) * 100} size="sm" />
                  </div>
                ))}
            </div>
          </Card>

          {/* Recommandations de jeux */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">🎮 Jeux recommandés pour vous</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.game.id}
                  className="relative rounded-xl overflow-hidden border border-white/10 hover:border-[#00D1FF]/50 transition-all group"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={rec.game.coverImage}
                      alt={rec.game.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="font-semibold text-sm truncate">{rec.game.name}</p>
                      <p className="text-xs text-white/60">{rec.game.genre}</p>
                      <Badge variant="success" size="sm" className="mt-2">
                        {rec.matchScore}% compatible
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Rôles recommandés */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">🎯 Rôles faits pour vous</h3>
            <div className="flex flex-wrap gap-2">
              {primaryArchetype.recommendedRoles.map((role) => (
                <Badge key={role} variant="info" size="md">
                  {role}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={restartQuiz}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Refaire le test
            </button>
            <Link
              href="/app/profile"
              className="px-6 py-3 rounded-xl bg-[#00D1FF] text-black font-semibold hover:bg-[#00D1FF]/90 transition-colors flex items-center gap-2"
            >
              Voir mon profil
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // --- QUIZ EN COURS ---
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Barre de progression */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/60">
              Question {currentIndex + 1} sur {questions.length}
            </span>
            <span className="text-[#00D1FF] font-medium">{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} size="lg" />
        </div>

        <Card glow glowColor="#00D1FF" className="overflow-hidden">
          {/* Image de contexte */}
          {currentQuestion?.image && (
            <div className="relative h-48 md:h-64">
              <Image
                src={currentQuestion.image}
                alt="Contexte de la question"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <Badge variant="info">{currentQuestion.context}</Badge>
              </div>
            </div>
          )}

          {/* Question */}
          <div className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6">{currentQuestion?.text}</h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion?.options.map((option) => {
                const isSelected = currentAnswer === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      isSelected
                        ? "bg-[#00D1FF]/20 border-2 border-[#00D1FF] shadow-lg shadow-[#00D1FF]/20"
                        : "bg-white/5 border-2 border-white/10 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "border-[#00D1FF] bg-[#00D1FF]"
                            : "border-white/30"
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-black" />}
                      </div>
                      <span className={isSelected ? "text-[#00D1FF]" : "text-white/80"}>
                        {option.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <button
                onClick={goToPrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </button>

              <button
                onClick={goToNext}
                disabled={!currentAnswer}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentAnswer
                    ? "bg-[#00D1FF] text-black hover:bg-[#00D1FF]/90"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                }`}
              >
                {currentIndex === questions.length - 1 ? "Voir mes résultats" : "Suivant"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
