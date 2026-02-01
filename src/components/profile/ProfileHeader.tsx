"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Settings, RotateCcw, Crown, Loader2 } from "lucide-react";
import { Card, ProgressBar } from "@/components/common";
import { getCurrentUser, type UserProfile } from "@/data/user";

export function ProfileHeader() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <Card glow glowColor="#00D1FF" className="p-8">
        <div className="flex items-center justify-center h-32">
          <Loader2 className="w-8 h-8 animate-spin text-[#00D1FF]" />
        </div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card glow glowColor="#00D1FF" className="p-8">
        <div className="text-center text-white/60">
          Impossible de charger le profil
        </div>
      </Card>
    );
  }

  const xpProgress = (user.xp / user.xpToNextLevel) * 100;

  return (
    <Card glow glowColor="#00D1FF" className="p-8">
      <div className="flex items-start gap-8">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#00D1FF]/30 shadow-lg shadow-[#00D1FF]/20 relative">
            <Image
              src={user.avatar}
              alt={`Avatar de ${user.username}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Badge de niveau */}
          <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D1FF] to-[#00D1FF]/60 flex items-center justify-center border-2 border-[#121212] shadow-lg shadow-[#00D1FF]/40">
            <div className="text-center">
              <Crown className="w-4 h-4 mx-auto mb-0.5" />
              <span className="text-xs font-bold">{user.level}</span>
            </div>
          </div>
        </div>

        {/* Informations utilisateur & Progression XP */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold mb-1">{user.username}</h1>
              <p className="text-white/60">
                {user.archetype ? (
                  <>
                    Archétype {user.archetype.icon} {user.archetype.name} • Membre depuis{" "}
                    {new Date(user.joinedAt).getFullYear()}
                  </>
                ) : (
                  <>Archétype non défini • Membre depuis {new Date(user.joinedAt).getFullYear()}</>
                )}
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center gap-3">
              <Link
                href="/app/quiz"
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#00D1FF]/20 to-[#00D1FF]/10 border border-[#00D1FF]/30 text-[#00D1FF] hover:from-[#00D1FF]/30 hover:to-[#00D1FF]/20 hover:shadow-lg hover:shadow-[#00D1FF]/20 transition-all duration-300 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Refaire le test</span>
              </Link>

              <button className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#00D1FF]/50 transition-all duration-300">
                <Settings className="w-5 h-5 text-white/60" />
              </button>
            </div>
          </div>

          {/* Barre de progression XP */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Progression niveau {user.level}</span>
              <span className="text-[#00D1FF] font-semibold">
                {user.xp.toLocaleString("fr-FR")} / {user.xpToNextLevel.toLocaleString("fr-FR")} XP
              </span>
            </div>

            <ProgressBar value={xpProgress} showLabel={false} size="lg" />

            <p className="text-xs text-white/50">
              {(user.xpToNextLevel - user.xp).toLocaleString("fr-FR")} XP pour atteindre le niveau{" "}
              {user.level + 1}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
