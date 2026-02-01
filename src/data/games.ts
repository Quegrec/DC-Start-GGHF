// Données jeux et recommandations pour le prototype
// TODO: Remplacer par des appels API réels

export interface Game {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  genre: string;
  platform: string[];
  description: string;
  difficulty: "Facile" | "Moyen" | "Difficile";
  teamSize: string;
  matchDuration: string;
  archetypeAffinity: Record<string, number>; // Compatibilité avec chaque archétype (0-100)
  features: string[];
  isPopular: boolean;
  playerCount: string;
}

export interface GameRecommendation {
  game: Game;
  matchScore: number; // Score de compatibilité (0-100)
  reasons: string[];
  suggestedRoles: string[];
}

export interface PlayerGame {
  game: Game;
  hoursPlayed: number;
  lastPlayed: string;
  rank?: string;
  progress: number;
  achievements: number;
  totalAchievements: number;
}

// Base de données des jeux
const games: Game[] = [
  {
    id: "valorant",
    name: "Valorant",
    logo: "🎯",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    genre: "FPS Tactique",
    platform: ["PC"],
    description: "FPS tactique 5v5 combinant tir de précision et capacités uniques.",
    difficulty: "Moyen",
    teamSize: "5v5",
    matchDuration: "30-45 min",
    archetypeAffinity: { medic: 70, sniper: 95, assassin: 85, strategist: 80, explorer: 60 },
    features: ["Compétitif", "Équipe", "Tactique", "Précision"],
    isPopular: true,
    playerCount: "22M+ joueurs",
  },
  {
    id: "lol",
    name: "League of Legends",
    logo: "⚔️",
    coverImage: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=400&fit=crop",
    genre: "MOBA",
    platform: ["PC"],
    description: "MOBA stratégique avec plus de 160 champions et un gameplay profond.",
    difficulty: "Difficile",
    teamSize: "5v5",
    matchDuration: "25-45 min",
    archetypeAffinity: { medic: 85, sniper: 60, assassin: 75, strategist: 95, explorer: 90 },
    features: ["Compétitif", "Stratégie", "MOBA", "Champions variés"],
    isPopular: true,
    playerCount: "150M+ joueurs",
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    logo: "💣",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    genre: "FPS Tactique",
    platform: ["PC"],
    description: "Le FPS compétitif de référence, version modernisée avec Source 2.",
    difficulty: "Difficile",
    teamSize: "5v5",
    matchDuration: "30-50 min",
    archetypeAffinity: { medic: 50, sniper: 100, assassin: 70, strategist: 90, explorer: 40 },
    features: ["Compétitif", "Économie", "Tactique", "Précision"],
    isPopular: true,
    playerCount: "35M+ joueurs",
  },
  {
    id: "overwatch2",
    name: "Overwatch 2",
    logo: "🛡️",
    coverImage: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=400&fit=crop",
    genre: "Hero Shooter",
    platform: ["PC", "PlayStation", "Xbox", "Switch"],
    description: "Hero shooter coloré avec des héros aux capacités uniques.",
    difficulty: "Moyen",
    teamSize: "5v5",
    matchDuration: "15-25 min",
    archetypeAffinity: { medic: 95, sniper: 75, assassin: 80, strategist: 70, explorer: 85 },
    features: ["Casual friendly", "Héros", "Équipe", "Variété"],
    isPopular: true,
    playerCount: "25M+ joueurs",
  },
  {
    id: "apex",
    name: "Apex Legends",
    logo: "🔥",
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop",
    genre: "Battle Royale",
    platform: ["PC", "PlayStation", "Xbox", "Switch"],
    description: "Battle Royale dynamique avec système de légendes et ping révolutionnaire.",
    difficulty: "Moyen",
    teamSize: "3v3v...",
    matchDuration: "15-20 min",
    archetypeAffinity: { medic: 80, sniper: 70, assassin: 90, strategist: 65, explorer: 75 },
    features: ["Battle Royale", "Mobilité", "Légendes", "Communication"],
    isPopular: true,
    playerCount: "20M+ joueurs",
  },
  {
    id: "dota2",
    name: "Dota 2",
    logo: "🏰",
    coverImage: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=400&fit=crop",
    genre: "MOBA",
    platform: ["PC"],
    description: "MOBA complexe avec une profondeur stratégique inégalée.",
    difficulty: "Difficile",
    teamSize: "5v5",
    matchDuration: "40-60 min",
    archetypeAffinity: { medic: 75, sniper: 55, assassin: 65, strategist: 100, explorer: 80 },
    features: ["Compétitif", "Stratégie profonde", "MOBA", "Items"],
    isPopular: true,
    playerCount: "12M+ joueurs",
  },
  {
    id: "fortnite",
    name: "Fortnite",
    logo: "🏗️",
    coverImage: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=400&fit=crop",
    genre: "Battle Royale",
    platform: ["PC", "PlayStation", "Xbox", "Switch", "Mobile"],
    description: "Battle Royale avec construction et univers crossover.",
    difficulty: "Moyen",
    teamSize: "Solo/Duo/Squad",
    matchDuration: "15-25 min",
    archetypeAffinity: { medic: 55, sniper: 65, assassin: 85, strategist: 60, explorer: 95 },
    features: ["Construction", "Battle Royale", "Créatif", "Crossovers"],
    isPopular: true,
    playerCount: "250M+ joueurs",
  },
  {
    id: "rocketleague",
    name: "Rocket League",
    logo: "🚗",
    coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b0b0a?w=800&h=400&fit=crop",
    genre: "Sport/Arcade",
    platform: ["PC", "PlayStation", "Xbox", "Switch"],
    description: "Football avec des voitures, gameplay simple mais skill ceiling infini.",
    difficulty: "Facile",
    teamSize: "1v1/2v2/3v3",
    matchDuration: "5-7 min",
    archetypeAffinity: { medic: 70, sniper: 50, assassin: 80, strategist: 75, explorer: 60 },
    features: ["Quick games", "Skill-based", "Unique", "Compétitif"],
    isPopular: true,
    playerCount: "90M+ joueurs",
  },
];

// Jeux du joueur (mockés)
const playerGames: PlayerGame[] = [
  {
    game: games.find((g) => g.id === "valorant")!,
    hoursPlayed: 245,
    lastPlayed: "2024-04-25",
    rank: "Platine 2",
    progress: 68,
    achievements: 24,
    totalAchievements: 45,
  },
  {
    game: games.find((g) => g.id === "lol")!,
    hoursPlayed: 512,
    lastPlayed: "2024-04-24",
    rank: "Or 1",
    progress: 82,
    achievements: 89,
    totalAchievements: 120,
  },
  {
    game: games.find((g) => g.id === "overwatch2")!,
    hoursPlayed: 156,
    lastPlayed: "2024-04-20",
    rank: "Diamant 3",
    progress: 55,
    achievements: 45,
    totalAchievements: 85,
  },
  {
    game: games.find((g) => g.id === "apex")!,
    hoursPlayed: 89,
    lastPlayed: "2024-04-15",
    rank: "Platine 4",
    progress: 35,
    achievements: 18,
    totalAchievements: 60,
  },
];

// Fonctions d'accès aux données
export async function getAllGames(): Promise<Game[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return games;
}

export async function getGameById(id: string): Promise<Game | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return games.find((g) => g.id === id);
}

export async function getPlayerGames(): Promise<PlayerGame[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return playerGames;
}

export async function getGameRecommendations(archetypeId: string): Promise<GameRecommendation[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));

  // Calculer les recommandations basées sur l'archétype
  const recommendations: GameRecommendation[] = games
    .map((game) => {
      const matchScore = game.archetypeAffinity[archetypeId] || 50;
      const reasons: string[] = [];
      const suggestedRoles: string[] = [];

      // Générer des raisons basées sur le score
      if (matchScore >= 90) {
        reasons.push("Parfaitement adapté à votre style de jeu");
      } else if (matchScore >= 75) {
        reasons.push("Excellente compatibilité avec votre archétype");
      } else if (matchScore >= 60) {
        reasons.push("Bonne opportunité de développer vos compétences");
      }

      // Ajouter des raisons spécifiques par archétype
      switch (archetypeId) {
        case "medic":
          if (game.features.includes("Équipe")) reasons.push("Fort focus sur le jeu d'équipe");
          suggestedRoles.push("Support", "Healer");
          break;
        case "sniper":
          if (game.features.includes("Précision")) reasons.push("Récompense la précision mécanique");
          suggestedRoles.push("DPS précision", "AWPer");
          break;
        case "assassin":
          if (game.features.includes("Mobilité")) reasons.push("Gameplay rapide et dynamique");
          suggestedRoles.push("Flanker", "Duelist");
          break;
        case "strategist":
          if (game.features.includes("Stratégie")) reasons.push("Profondeur tactique importante");
          suggestedRoles.push("IGL", "Shotcaller");
          break;
        case "explorer":
          if (game.features.includes("Variété")) reasons.push("Grande diversité de gameplay");
          suggestedRoles.push("Flex", "All-rounder");
          break;
      }

      return {
        game,
        matchScore,
        reasons,
        suggestedRoles,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return recommendations;
}

export async function getPopularGames(): Promise<Game[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return games.filter((g) => g.isPopular);
}

// Versions synchrones
export function getAllGamesSync(): Game[] {
  return games;
}

export function getPlayerGamesSync(): PlayerGame[] {
  return playerGames;
}

export function getGameRecommendationsSync(archetypeId: string): GameRecommendation[] {
  return games
    .map((game) => ({
      game,
      matchScore: game.archetypeAffinity[archetypeId] || 50,
      reasons: ["Recommandé pour votre profil"],
      suggestedRoles: ["Flex"],
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}
