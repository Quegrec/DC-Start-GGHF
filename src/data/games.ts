import { fetchDataset } from "./api-client";

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

// Données chargées dynamiquement via API (RAWG côté serveur)
export async function getAllGames(): Promise<Game[]> {
  return fetchDataset<Game[]>("games");
}

export async function getGameById(id: string): Promise<Game | undefined> {
  const allGames = await getAllGames();
  return allGames.find((g) => g.id === id);
}

export async function getPlayerGames(): Promise<PlayerGame[]> {
  return fetchDataset<PlayerGame[]>("player-games");
}

export async function getGameRecommendations(archetypeId: string): Promise<GameRecommendation[]> {
  const allGames = await getAllGames();

  const recommendations: GameRecommendation[] = allGames
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
  const allGames = await getAllGames();
  return allGames.filter((g) => g.isPopular);
}
