"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Brain,
  BookOpen,
  User,
  Trophy,
  TrendingUp,
  Sparkles,
  Check,
  AlertTriangle,
  ArrowRight,
  Loader2,
  Play,
  Target,
  Users,
  Star,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, StatCard, FeatureCard, SectionHeader, Badge, ProgressBar, TraitItem } from "@/components/common";
import { getCurrentUser, getUserStats, type UserProfile, type UserStats } from "@/data/user";
import { getArchetypeById, type Archetype } from "@/data/archetypes";
import { getAllGuides, type Guide } from "@/data/guides";
import { getGameRecommendations, type GameRecommendation } from "@/data/games";

const traitAffinities: Record<string, Record<string, number>> = {
  guardian: { "Empathie": 95, "Patience": 90, "Esprit d'équipe": 95, "Curiosité": 60, "Créativité": 70, "Compétition": 40 },
  explorer: { "Empathie": 65, "Patience": 85, "Esprit d'équipe": 55, "Curiosité": 100, "Créativité": 80, "Compétition": 45 },
  architect: { "Empathie": 55, "Patience": 95, "Esprit d'équipe": 60, "Curiosité": 75, "Créativité": 100, "Compétition": 50 },
  challenger: { "Empathie": 40, "Patience": 60, "Esprit d'équipe": 55, "Curiosité": 50, "Créativité": 45, "Compétition": 100 },
  storyteller: { "Empathie": 90, "Patience": 80, "Esprit d'équipe": 50, "Curiosité": 85, "Créativité": 90, "Compétition": 35 },
  socializer: { "Empathie": 85, "Patience": 65, "Esprit d'équipe": 100, "Curiosité": 70, "Créativité": 60, "Compétition": 55 },
};

// ─── Vue visiteur (non connecté) ────────────────────────────────────────────

function GuestHomepage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 space-y-16">

        {/* Hero de bienvenue */}
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/20 text-[#00D1FF] text-sm font-medium mb-2">
            <Zap className="w-3.5 h-3.5" />
            Bienvenue sur GGHF
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Découvre ton{" "}
            <span className="text-[#00D1FF]">ADN de joueur</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Passe le test d&apos;archétype, accède à des guides adaptés à ton style de jeu
            et rejoins une communauté de joueurs passionnés.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/app/quiz"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00D1FF] text-black font-semibold hover:bg-[#00D1FF]/90 transition-colors"
            >
              <Brain className="w-5 h-5" />
              Passer le test gratuit
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-colors"
            >
              J&apos;ai déjà un compte
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Ce que tu peux faire */}
        <section className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            href="/app/quiz"
            icon={Brain}
            title="Test d'Archétype"
            description="Découvrez votre style de jeu unique en quelques minutes. Obtenez des recommandations personnalisées."
            ctaText="Commencer"
            color="#00D1FF"
          />
          <FeatureCard
            href="/app/guides"
            icon={BookOpen}
            title="Bibliothèque de guides"
            description="Des dizaines de guides pour progresser, tous les niveaux, tous les jeux."
            ctaText="Explorer"
            color="#10B981"
          />
          <FeatureCard
            href="/app/community"
            icon={Users}
            title="Communauté"
            description="Échangez avec d'autres joueurs, partagez vos astuces et trouvez des coéquipiers."
            ctaText="Rejoindre"
            color="#8B5CF6"
          />
        </section>

        {/* Pourquoi créer un compte */}
        <section>
          <SectionHeader
            icon={Star}
            badge="Compte gratuit"
            title="Créez votre profil joueur"
            description="Sauvegardez votre archétype, suivez votre progression et personnalisez votre expérience"
          />
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🧬", title: "Archétype sauvegardé", desc: "Retrouvez votre profil à chaque connexion" },
              { icon: "📈", title: "Progression trackée", desc: "Suivez vos guides et votre avancée" },
              { icon: "🏆", title: "Trophées et niveaux", desc: "Débloquez des récompenses en jouant" },
              { icon: "🤝", title: "Profil communautaire", desc: "Interagissez avec la communauté" },
            ].map((item) => (
              <Card key={item.title} className="p-5 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/app/quiz"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00D1FF] text-black font-semibold hover:bg-[#00D1FF]/90 transition-colors"
            >
              Commencer par le test
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

// ─── Vue connectée (dashboard personnalisé) ──────────────────────────────────

function AuthenticatedDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [archetype, setArchetype] = useState<Archetype | null>(null);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [recommendations, setRecommendations] = useState<GameRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const recommendationsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userData, statsData, guidesData] = await Promise.all([
          getCurrentUser(),
          getUserStats(),
          getAllGuides(),
        ]);

        setUser(userData);
        setStats(statsData);
        setGuides(guidesData);

        if (userData.archetype?.id) {
          const archetypeData = await getArchetypeById(userData.archetype.id);
          if (archetypeData) {
            setArchetype(archetypeData);
            const recs = await getGameRecommendations(archetypeData.id);
            setRecommendations(recs.slice(0, 10));
          }
        }
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
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-[#00D1FF]" />
          </div>
        </div>
      </main>
    );
  }

  const hasArchetype = !!archetype;
  const inProgressGuides = guides.filter((g) => g.progress > 0 && g.progress < 100).slice(0, 3);
  const scrollRecommendations = (direction: "left" | "right") => {
    if (!recommendationsRef.current) return;
    recommendationsRef.current.scrollBy({
      left: direction === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  const radarData = archetype
    ? Object.entries(traitAffinities[archetype.id] || {}).map(([trait, value]) => ({
        trait,
        value,
        fullMark: 100,
      }))
    : [];

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* En-tête personnalisé */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Bienvenue, <span className="text-[#00D1FF]">{user?.username || "Joueur"}</span> 👋
            </h1>
            <p className="text-white/60">
              {hasArchetype
                ? `Archétype ${archetype?.icon} ${archetype?.name} • Niveau ${user?.level}`
                : "Découvrez votre archétype pour personnaliser votre expérience"}
            </p>
          </div>
          {hasArchetype && (
            <div
              className="px-4 py-2 rounded-xl flex items-center gap-2"
              style={{
                backgroundColor: `${archetype?.color}20`,
                border: `1px solid ${archetype?.color}40`,
              }}
            >
              <span className="text-2xl">{archetype?.icon}</span>
              <span className="font-semibold" style={{ color: archetype?.color }}>
                {archetype?.name}
              </span>
            </div>
          )}
        </div>

        {/* Si pas d'archétype, CTA pour faire le test */}
        {!hasArchetype && (
          <Card glow glowColor="#00D1FF" className="p-8">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00D1FF] to-[#8B5CF6] flex items-center justify-center shrink-0">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Découvrez votre Archétype</h2>
                <p className="text-white/60 mb-4">
                  Passez le test pour obtenir des recommandations personnalisées et comprendre
                  votre style de jeu unique.
                </p>
                <Link
                  href="/app/quiz"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00D1FF] text-black font-semibold hover:bg-[#00D1FF]/90 transition-colors"
                >
                  Commencer le test
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Card>
        )}

        {/* Stats rapides */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={Brain}
            value={archetype?.name || "?"}
            label="Archétype"
            color={archetype?.color || "#00D1FF"}
          />
          <StatCard
            icon={BookOpen}
            value={`${stats?.guidesCompleted || 0}/${stats?.guidesStarted || 0}`}
            label="Guides terminés"
            color="#10B981"
          />
          <StatCard
            icon={Trophy}
            value={user?.level?.toString() || "1"}
            label="Niveau actuel"
            color="#F59E0B"
          />
          <StatCard
            icon={TrendingUp}
            value={`${stats?.currentStreak || 0}j`}
            label="Série en cours"
            color="#8B5CF6"
          />
        </section>

        {/* Section principale : Profil d'archétype */}
        {hasArchetype && archetype && (
          <Card glow glowColor={archetype.color} className="p-8">
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-semibold mb-2">Votre profil de joueur</h3>
                <p className="text-sm text-white/50 mb-6">
                  Traits caractéristiques de l&apos;archétype {archetype.name}
                </p>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} outerRadius="80%">
                      <PolarGrid stroke={`${archetype.color}30`} strokeWidth={1} />
                      <PolarAngleAxis
                        dataKey="trait"
                        tick={{ fill: "#ffffff90", fontSize: 12 }}
                        stroke={`${archetype.color}40`}
                      />
                      <Radar
                        name="Traits"
                        dataKey="value"
                        stroke={archetype.color}
                        fill={archetype.color}
                        fillOpacity={0.25}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-[#10B981]">
                    <Sparkles className="w-5 h-5" />
                    Vos points forts
                  </h4>
                  <div className="space-y-2">
                    {archetype.strengths.slice(0, 4).map((strength, i) => (
                      <TraitItem key={i} icon={Check} text={strength} variant="positive" />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-[#F59E0B]">
                    <AlertTriangle className="w-5 h-5" />
                    Points d&apos;amélioration
                  </h4>
                  <div className="space-y-2">
                    {archetype.challenges.map((challenge, i) => (
                      <TraitItem key={i} icon={Target} text={challenge} variant="negative" />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Rôles faits pour vous</h4>
                  <div className="flex flex-wrap gap-2">
                    {archetype.recommendedRoles.map((role) => (
                      <Badge key={role} variant="info" size="md">{role}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Guides en cours */}
        {inProgressGuides.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Continuez votre progression</h2>
                <p className="text-sm text-white/50">Reprenez là où vous vous êtes arrêté</p>
              </div>
              <Link
                href="/app/guides"
                className="text-sm text-[#00D1FF] hover:underline flex items-center gap-1"
              >
                Voir tous les guides
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {inProgressGuides.map((guide) => (
                <Link key={guide.id} href={`/app/guides/${guide.id}`}>
                  <Card hover className="p-5 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl shrink-0">
                        {guide.gameLogo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate">{guide.title}</h3>
                        <p className="text-xs text-white/50 mb-3">
                          {guide.game} • {guide.completedSteps}/{guide.totalSteps} étapes
                        </p>
                        <ProgressBar value={guide.progress} size="sm" />
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2.5 rounded-xl bg-[#00D1FF]/20 text-[#00D1FF] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#00D1FF]/30 transition-colors">
                      <Play className="w-4 h-4" />
                      Continuer
                    </button>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Recommandations de jeux */}
        {hasArchetype && recommendations.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Jeux pour votre profil</h2>
                <p className="text-sm text-white/50">
                  Sélectionnés pour l&apos;archétype {archetype?.name}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollRecommendations("left")}
                  className="w-9 h-9 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center"
                  aria-label="Défiler vers la gauche"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRecommendations("right")}
                  className="w-9 h-9 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center"
                  aria-label="Défiler vers la droite"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={recommendationsRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {recommendations.map((rec) => (
                <Card key={rec.game.id} hover className="overflow-hidden min-w-[260px] md:min-w-[320px] snap-start">
                  <div className="relative h-32">
                    <Image
                      src={rec.game.coverImage}
                      alt={rec.game.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                    <Badge variant="success" className="absolute top-3 right-3">
                      {rec.matchScore}% compatible
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{rec.game.logo}</span>
                      <h3 className="font-semibold">{rec.game.name}</h3>
                    </div>
                    <p className="text-xs text-white/50 mb-3">{rec.game.genre}</p>
                    <div className="flex flex-wrap gap-1">
                      {rec.suggestedRoles.slice(0, 2).map((role) => (
                        <Badge key={role} variant="default" size="sm">{role}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Actions rapides */}
        <section className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            href="/app/quiz"
            icon={Brain}
            title={hasArchetype ? "Refaire le test" : "Test d'Archétype"}
            description={
              hasArchetype
                ? "Votre profil a peut-être évolué. Refaites le test pour le vérifier."
                : "Découvrez votre style de jeu unique et recevez des recommandations."
            }
            ctaText={hasArchetype ? "Refaire" : "Commencer"}
            color="#00D1FF"
          />
          <FeatureCard
            href="/app/guides"
            icon={BookOpen}
            title="Explorer les guides"
            description="Trouvez de nouveaux guides adaptés à votre niveau et vos objectifs."
            ctaText="Parcourir"
            color="#10B981"
          />
          <FeatureCard
            href="/app/community"
            icon={User}
            title="Rejoindre la communauté"
            description="Échangez avec d'autres joueurs et trouvez des coéquipiers."
            ctaText="Découvrir"
            color="#8B5CF6"
          />
        </section>
      </div>
    </main>
  );
}

// ─── Page principale ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-[#00D1FF]" />
          </div>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return <GuestHomepage />;
  }

  return <AuthenticatedDashboard />;
}
