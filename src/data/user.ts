// Données utilisateur pour le prototype
// TODO: Remplacer par des appels API réels

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
    id: "strategist",
    name: "Le Stratège",
    icon: "🧠",
    color: "#F59E0B",
    description: "Vous excellez dans la planification et l'anticipation. Votre vision du jeu vous permet de toujours avoir un coup d'avance.",
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

// Fonctions d'accès aux données (simulent des appels API)
// TODO: Remplacer ces fonctions par de vrais appels API

export async function getCurrentUser(): Promise<UserProfile> {
  // Simule un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockUserProfile;
}

export async function getUserStats(): Promise<UserStats> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockUserStats;
}

export async function getUserTrophies(): Promise<Trophy[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockTrophies;
}

export async function getGamingDNA(): Promise<GamingDNAAttribute[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockGamingDNA;
}

export async function getLearningProgress(): Promise<LearningProgress[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockLearningProgress;
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
