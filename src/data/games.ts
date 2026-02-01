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
  matchScore: number;
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

// Base de données des jeux - tous genres confondus
const games: Game[] = [
  // === EXPLORATION / AVENTURE ===
  {
    id: "zelda-totk",
    name: "Zelda: Tears of the Kingdom",
    logo: "🗡️",
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop",
    genre: "Action-Aventure",
    platform: ["Switch"],
    description: "Explorez un Hyrule transformé avec de nouvelles capacités de construction.",
    difficulty: "Moyen",
    teamSize: "Solo",
    matchDuration: "100+ heures",
    archetypeAffinity: { guardian: 60, explorer: 100, architect: 95, challenger: 70, storyteller: 85, socializer: 40 },
    features: ["Open World", "Puzzle", "Construction", "Exploration"],
    isPopular: true,
    playerCount: "20M+ ventes",
  },
  {
    id: "elden-ring",
    name: "Elden Ring",
    logo: "⚔️",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    genre: "Action-RPG",
    platform: ["PC", "PlayStation", "Xbox"],
    description: "Open world sombre et exigeant dans un univers créé par FromSoftware et George R.R. Martin.",
    difficulty: "Difficile",
    teamSize: "Solo / Coop",
    matchDuration: "80+ heures",
    archetypeAffinity: { guardian: 50, explorer: 95, architect: 60, challenger: 100, storyteller: 80, socializer: 55 },
    features: ["Souls-like", "Open World", "Boss épiques", "Lore riche"],
    isPopular: true,
    playerCount: "25M+ ventes",
  },
  {
    id: "horizon",
    name: "Horizon Forbidden West",
    logo: "🤖",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    genre: "Action-RPG",
    platform: ["PlayStation", "PC"],
    description: "Aventure post-apocalyptique avec des machines dinosaures dans un monde sublime.",
    difficulty: "Moyen",
    teamSize: "Solo",
    matchDuration: "60+ heures",
    archetypeAffinity: { guardian: 70, explorer: 95, architect: 55, challenger: 75, storyteller: 90, socializer: 35 },
    features: ["Open World", "Narrative", "Combat dynamique", "Exploration"],
    isPopular: true,
    playerCount: "8M+ ventes",
  },

  // === CONSTRUCTION / GESTION ===
  {
    id: "minecraft",
    name: "Minecraft",
    logo: "⛏️",
    coverImage: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=400&fit=crop",
    genre: "Sandbox",
    platform: ["PC", "Console", "Mobile"],
    description: "Le jeu de construction ultime avec des possibilités infinies.",
    difficulty: "Facile",
    teamSize: "Solo / Multijoueur",
    matchDuration: "Illimité",
    archetypeAffinity: { guardian: 75, explorer: 90, architect: 100, challenger: 50, storyteller: 60, socializer: 85 },
    features: ["Construction", "Survie", "Créatif", "Multijoueur"],
    isPopular: true,
    playerCount: "300M+ ventes",
  },
  {
    id: "stardew",
    name: "Stardew Valley",
    logo: "🌾",
    coverImage: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=400&fit=crop",
    genre: "Simulation agricole",
    platform: ["PC", "Console", "Mobile"],
    description: "Gérez votre ferme, tissez des liens avec les villageois et découvrez les secrets de la vallée.",
    difficulty: "Facile",
    teamSize: "Solo / Coop 4",
    matchDuration: "100+ heures",
    archetypeAffinity: { guardian: 85, explorer: 80, architect: 95, challenger: 40, storyteller: 75, socializer: 70 },
    features: ["Farming", "Social", "Relaxant", "Coop"],
    isPopular: true,
    playerCount: "30M+ ventes",
  },
  {
    id: "cities-skylines",
    name: "Cities: Skylines II",
    logo: "🏙️",
    coverImage: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=400&fit=crop",
    genre: "City Builder",
    platform: ["PC", "Console"],
    description: "Construisez et gérez la ville de vos rêves avec une simulation détaillée.",
    difficulty: "Moyen",
    teamSize: "Solo",
    matchDuration: "Illimité",
    archetypeAffinity: { guardian: 60, explorer: 50, architect: 100, challenger: 55, storyteller: 40, socializer: 30 },
    features: ["Gestion", "Construction", "Simulation", "Stratégie"],
    isPopular: true,
    playerCount: "12M+ ventes",
  },

  // === NARRATIF / RPG ===
  {
    id: "baldurs-gate",
    name: "Baldur's Gate 3",
    logo: "🐉",
    coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b0b0a?w=800&h=400&fit=crop",
    genre: "RPG",
    platform: ["PC", "PlayStation", "Xbox"],
    description: "RPG épique basé sur D&D avec des choix qui changent tout.",
    difficulty: "Moyen",
    teamSize: "Solo / Coop 4",
    matchDuration: "100+ heures",
    archetypeAffinity: { guardian: 80, explorer: 85, architect: 70, challenger: 65, storyteller: 100, socializer: 75 },
    features: ["Narratif", "Choix impactants", "D&D", "Coop"],
    isPopular: true,
    playerCount: "15M+ ventes",
  },
  {
    id: "persona5",
    name: "Persona 5 Royal",
    logo: "🎭",
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop",
    genre: "JRPG",
    platform: ["PC", "PlayStation", "Switch", "Xbox"],
    description: "JRPG stylé mêlant vie de lycéen et combats de Personas.",
    difficulty: "Moyen",
    teamSize: "Solo",
    matchDuration: "100+ heures",
    archetypeAffinity: { guardian: 70, explorer: 75, architect: 65, challenger: 60, storyteller: 100, socializer: 85 },
    features: ["JRPG", "Narratif", "Social Sim", "Style unique"],
    isPopular: true,
    playerCount: "8M+ ventes",
  },
  {
    id: "witcher3",
    name: "The Witcher 3",
    logo: "🐺",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    genre: "Action-RPG",
    platform: ["PC", "PlayStation", "Xbox", "Switch"],
    description: "Incarnez Geralt dans une quête épique à travers un monde ouvert riche.",
    difficulty: "Moyen",
    teamSize: "Solo",
    matchDuration: "150+ heures",
    archetypeAffinity: { guardian: 65, explorer: 90, architect: 50, challenger: 70, storyteller: 100, socializer: 40 },
    features: ["Open World", "Narratif", "Choix moraux", "Chasse aux monstres"],
    isPopular: true,
    playerCount: "50M+ ventes",
  },

  // === SOCIAL / COOP ===
  {
    id: "animal-crossing",
    name: "Animal Crossing: New Horizons",
    logo: "🏝️",
    coverImage: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=400&fit=crop",
    genre: "Simulation sociale",
    platform: ["Switch"],
    description: "Créez votre île paradisiaque et vivez au rythme des saisons.",
    difficulty: "Facile",
    teamSize: "Solo / Multi local",
    matchDuration: "Illimité",
    archetypeAffinity: { guardian: 90, explorer: 70, architect: 95, challenger: 30, storyteller: 60, socializer: 85 },
    features: ["Relaxant", "Décoration", "Social", "Saisonnier"],
    isPopular: true,
    playerCount: "43M+ ventes",
  },
  {
    id: "it-takes-two",
    name: "It Takes Two",
    logo: "💕",
    coverImage: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=400&fit=crop",
    genre: "Coop Aventure",
    platform: ["PC", "PlayStation", "Xbox", "Switch"],
    description: "Aventure coopérative obligatoire avec des mécaniques qui changent constamment.",
    difficulty: "Facile",
    teamSize: "Coop 2",
    matchDuration: "12-15 heures",
    archetypeAffinity: { guardian: 85, explorer: 70, architect: 60, challenger: 55, storyteller: 80, socializer: 100 },
    features: ["Coop obligatoire", "Variété", "Narratif", "Fun"],
    isPopular: true,
    playerCount: "16M+ ventes",
  },
  {
    id: "phasmophobia",
    name: "Phasmophobia",
    logo: "👻",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    genre: "Horreur Coop",
    platform: ["PC"],
    description: "Chassez les fantômes en équipe avec du vrai matériel de détection.",
    difficulty: "Moyen",
    teamSize: "Coop 1-4",
    matchDuration: "20-40 min",
    archetypeAffinity: { guardian: 70, explorer: 85, architect: 50, challenger: 65, storyteller: 55, socializer: 95 },
    features: ["Horreur", "Coop", "Investigation", "Communication"],
    isPopular: true,
    playerCount: "12M+ ventes",
  },

  // === COMPÉTITIF ===
  {
    id: "valorant",
    name: "Valorant",
    logo: "🎯",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    genre: "FPS Tactique",
    platform: ["PC"],
    description: "FPS tactique 5v5 combinant tir de précision et capacités uniques.",
    difficulty: "Difficile",
    teamSize: "5v5",
    matchDuration: "30-45 min",
    archetypeAffinity: { guardian: 70, explorer: 40, architect: 75, challenger: 95, storyteller: 35, socializer: 80 },
    features: ["Compétitif", "Équipe", "Tactique", "Précision"],
    isPopular: true,
    playerCount: "22M+ joueurs",
  },
  {
    id: "mario-kart",
    name: "Mario Kart 8 Deluxe",
    logo: "🏎️",
    coverImage: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=400&fit=crop",
    genre: "Course Arcade",
    platform: ["Switch"],
    description: "La course arcade ultime avec les personnages Nintendo.",
    difficulty: "Facile",
    teamSize: "Solo / Multi 12",
    matchDuration: "5-15 min",
    archetypeAffinity: { guardian: 50, explorer: 55, architect: 40, challenger: 85, storyteller: 30, socializer: 100 },
    features: ["Party Game", "Compétitif", "Fun", "Local & Online"],
    isPopular: true,
    playerCount: "62M+ ventes",
  },
];

// Jeux du joueur (mockés)
const playerGames: PlayerGame[] = [
  {
    game: games.find((g) => g.id === "zelda-totk")!,
    hoursPlayed: 120,
    lastPlayed: "2024-04-25",
    progress: 75,
    achievements: 45,
    totalAchievements: 60,
  },
  {
    game: games.find((g) => g.id === "baldurs-gate")!,
    hoursPlayed: 85,
    lastPlayed: "2024-04-24",
    progress: 60,
    achievements: 28,
    totalAchievements: 54,
  },
  {
    game: games.find((g) => g.id === "stardew")!,
    hoursPlayed: 200,
    lastPlayed: "2024-04-20",
    progress: 90,
    achievements: 38,
    totalAchievements: 40,
  },
  {
    game: games.find((g) => g.id === "minecraft")!,
    hoursPlayed: 350,
    lastPlayed: "2024-04-22",
    progress: 100,
    achievements: 80,
    totalAchievements: 80,
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

  const recommendations: GameRecommendation[] = games
    .map((game) => {
      const matchScore = game.archetypeAffinity[archetypeId] || 50;
      const reasons: string[] = [];
      const suggestedRoles: string[] = [];

      if (matchScore >= 90) {
        reasons.push("Parfaitement adapté à votre style de jeu");
      } else if (matchScore >= 75) {
        reasons.push("Excellente compatibilité avec votre archétype");
      } else if (matchScore >= 60) {
        reasons.push("Bonne opportunité de développer vos compétences");
      }

      // Raisons spécifiques par archétype
      switch (archetypeId) {
        case "guardian":
          if (game.features.includes("Coop")) reasons.push("Mode coopératif pour aider les autres");
          suggestedRoles.push("Support", "Mentor", "Guide");
          break;
        case "explorer":
          if (game.features.includes("Open World")) reasons.push("Monde ouvert à explorer");
          suggestedRoles.push("Découvreur", "Collectionneur");
          break;
        case "architect":
          if (game.features.includes("Construction")) reasons.push("Possibilités de construction");
          suggestedRoles.push("Bâtisseur", "Optimiseur");
          break;
        case "challenger":
          if (game.features.includes("Compétitif")) reasons.push("Défis compétitifs");
          suggestedRoles.push("Compétiteur", "Speedrunner");
          break;
        case "storyteller":
          if (game.features.includes("Narratif")) reasons.push("Histoire riche et immersive");
          suggestedRoles.push("Roleplayer", "Lore Master");
          break;
        case "socializer":
          if (game.features.includes("Social") || game.features.includes("Coop"))
            reasons.push("Expérience sociale forte");
          suggestedRoles.push("Animateur", "Organisateur");
          break;
      }

      return { game, matchScore, reasons, suggestedRoles };
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
