// Donnees utilisateur pour le prototype
// TODO: Remplacer les sections mockees restantes par des appels API reels

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  archetype: {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
  } | null;
  joinedAt: string;
  gamesPlayed: number;
  guidesCompleted: number;
  hoursPlayed: number;
}

export interface UserStats {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  guidesStarted: number;
  guidesCompleted: number;
  quizzesTaken: number;
  communityPosts: number;
  helpfulVotes: number;
  rank: number;
  percentile: number;
}

export interface Trophy {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string | null;
  progress?: number;
  maxProgress?: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface GamingDNAAttribute {
  name: string;
  value: number;
  color: string;
}

export interface LearningProgress {
  category: string;
  progress: number;
  color: string;
  totalLessons: number;
  completedLessons: number;
}

export interface UserPreferences {
  platforms: string[];
  genres: string[];
  favoriteGameIds: string[];
}

// Données mockées
const mockUserProfile: UserProfile = {
  id: "user-1",
  username: "NovaStar",
  email: "novastar@example.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  level: 24,
  xp: 2847,
  xpToNextLevel: 3500,
  archetype: {
    id: "architect",
    name: "L'Architecte",
    icon: "🏗️",
    color: "#F59E0B",
    description: "Vous êtes un bâtisseur dans l'âme. Vous transformez des idées en réalités et trouvez une satisfaction profonde dans la création et l'optimisation.",
  },
  joinedAt: "2024-03-15",
  gamesPlayed: 12,
  guidesCompleted: 8,
  hoursPlayed: 156,
};

const mockUserStats: UserStats = {
  totalXp: 12847,
  currentStreak: 7,
  longestStreak: 23,
  guidesStarted: 15,
  guidesCompleted: 8,
  quizzesTaken: 3,
  communityPosts: 24,
  helpfulVotes: 89,
  rank: 1247,
  percentile: 15,
};

const mockTrophies: Trophy[] = [
  {
    id: "trophy-1",
    name: "Premier Pas",
    description: "Compléter votre premier guide",
    icon: "🎯",
    color: "#10B981",
    earnedAt: "2024-03-20",
    rarity: "common",
  },
  {
    id: "trophy-2",
    name: "Érudit",
    description: "Compléter 5 guides",
    icon: "📚",
    color: "#00D1FF",
    earnedAt: "2024-04-05",
    rarity: "common",
  },
  {
    id: "trophy-3",
    name: "Découverte de soi",
    description: "Passer le test d'archétype",
    icon: "🧬",
    color: "#8B5CF6",
    earnedAt: "2024-03-16",
    rarity: "common",
  },
  {
    id: "trophy-4",
    name: "Semaine parfaite",
    description: "7 jours de connexion consécutifs",
    icon: "🔥",
    color: "#F59E0B",
    earnedAt: "2024-04-12",
    rarity: "rare",
  },
  {
    id: "trophy-5",
    name: "Entraide",
    description: "Aider 10 joueurs dans la communauté",
    icon: "🤝",
    color: "#EC4899",
    earnedAt: "2024-04-20",
    rarity: "rare",
  },
  {
    id: "trophy-6",
    name: "Maître Stratège",
    description: "Compléter tous les guides de stratégie",
    icon: "♟️",
    color: "#8B5CF6",
    earnedAt: null,
    progress: 3,
    maxProgress: 5,
    rarity: "epic",
  },
  {
    id: "trophy-7",
    name: "Légende",
    description: "Atteindre le niveau 50",
    icon: "👑",
    color: "#F59E0B",
    earnedAt: null,
    progress: 24,
    maxProgress: 50,
    rarity: "legendary",
  },
  {
    id: "trophy-8",
    name: "Mentor",
    description: "Recevoir 100 votes utiles",
    icon: "⭐",
    color: "#10B981",
    earnedAt: null,
    progress: 89,
    maxProgress: 100,
    rarity: "epic",
  },
];

const mockGamingDNA: GamingDNAAttribute[] = [
  { name: "Stratégie", value: 85, color: "#8B5CF6" },
  { name: "Réflexes", value: 70, color: "#00D1FF" },
  { name: "Coopération", value: 90, color: "#10B981" },
  { name: "Compétition", value: 65, color: "#F59E0B" },
  { name: "Exploration", value: 75, color: "#EC4899" },
  { name: "Créativité", value: 80, color: "#6366F1" },
];

const mockLearningProgress: LearningProgress[] = [
  { category: "Mécanique", progress: 75, color: "#00D1FF", totalLessons: 20, completedLessons: 15 },
  { category: "Stratégie", progress: 60, color: "#8B5CF6", totalLessons: 15, completedLessons: 9 },
  { category: "Communication", progress: 100, color: "#10B981", totalLessons: 8, completedLessons: 8 },
  { category: "Mental", progress: 40, color: "#F59E0B", totalLessons: 10, completedLessons: 4 },
];

// Fonctions d'accès aux données
// getCurrentUser / getUserStats utilisent désormais de vraies API liées à l'utilisateur connecté

export async function getCurrentUser(): Promise<UserProfile> {
  const res = await fetch("/api/profile/me");
  if (!res.ok) {
    throw new Error("Impossible de charger le profil utilisateur.");
  }
  return (await res.json()) as UserProfile;
}

export async function getUserStats(): Promise<UserStats> {
  const res = await fetch("/api/profile/stats");
  if (!res.ok) {
    throw new Error("Impossible de charger les statistiques utilisateur.");
  }
  return (await res.json()) as UserStats;
}

export async function getUserTrophies(): Promise<Trophy[]> {
  const res = await fetch("/api/profile/trophies");
  if (!res.ok) {
    throw new Error("Impossible de charger les trophees utilisateur.");
  }
  return (await res.json()) as Trophy[];
}

export async function getGamingDNA(): Promise<GamingDNAAttribute[]> {
  const res = await fetch("/api/profile/gaming-dna");
  if (!res.ok) {
    throw new Error("Impossible de charger l'ADN gaming.");
  }
  return (await res.json()) as GamingDNAAttribute[];
}

export async function getLearningProgress(): Promise<LearningProgress[]> {
  const res = await fetch("/api/profile/learning-progress");
  if (!res.ok) {
    throw new Error("Impossible de charger la progression d'apprentissage.");
  }
  return (await res.json()) as LearningProgress[];
}

export async function getUserPreferences(): Promise<UserPreferences> {
  const res = await fetch("/api/profile/preferences");
  if (!res.ok) {
    throw new Error("Impossible de charger les préférences utilisateur.");
  }
  return (await res.json()) as UserPreferences;
}

export async function updateUserPreferences(payload: UserPreferences): Promise<UserPreferences> {
  const res = await fetch("/api/profile/preferences", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Impossible de sauvegarder les préférences utilisateur.");
  }
  return (await res.json()) as UserPreferences;
}

export async function updateUserArchetype(archetypeId: string): Promise<void> {
  const res = await fetch("/api/profile/archetype", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ archetypeId }),
  });
  if (res.status === 401 || res.status === 403) {
    // L'utilisateur peut compléter le quiz sans être connecté.
    return;
  }
  if (!res.ok) {
    const payload = (await res.json().catch(() => null)) as { message?: string } | null;
    const reason = payload?.message ? ` (${payload.message})` : "";
    throw new Error(`Impossible de sauvegarder l'archétype utilisateur.${reason}`);
  }
}

// Versions synchrones pour l'initialisation (à éviter en production)
export function getCurrentUserSync(): UserProfile {
  return mockUserProfile;
}

export function getUserStatsSync(): UserStats {
  return mockUserStats;
}

export function getUserTrophiesSync(): Trophy[] {
  return mockTrophies;
}

export function getGamingDNASync(): GamingDNAAttribute[] {
  return mockGamingDNA;
}

export function getLearningProgressSync(): LearningProgress[] {
  return mockLearningProgress;
}
