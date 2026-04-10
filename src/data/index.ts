// Point d'entrée centralisé pour toutes les données
// Facilite les imports et prépare la migration vers une vraie API

// ==================== GUIDES ====================
export {
  getGuideById,
  getAllGuides,
  type Guide,
  type GuideStep,
} from "./guides";

// ==================== USER ====================
export {
  getCurrentUser,
  getUserStats,
  getUserTrophies,
  getGamingDNA,
  getLearningProgress,
  // Types
  type UserProfile,
  type UserStats,
  type Trophy,
  type GamingDNAAttribute,
  type LearningProgress,
} from "./user";

// ==================== COMMUNITY ====================
export {
  getCommunityPosts,
  getTopMembers,
  getCommunityGroups,
  getPostComments,
  togglePostLike,
  joinGroup,
  // Types
  type CommunityPost,
  type CommunityMember,
  type CommunityGroup,
  type Comment,
} from "./community";

// ==================== ARCHETYPES & QUIZ ====================
export {
  getArchetypes,
  getArchetypeById,
  getQuizQuestions,
  calculateQuizResult,
  // Types
  type Archetype,
  type QuizQuestion,
  type QuizResult,
} from "./archetypes";

// ==================== GAMES ====================
export {
  getAllGames,
  getGameById,
  getPlayerGames,
  getGameRecommendations,
  getPopularGames,
  // Types
  type Game,
  type GameRecommendation,
  type PlayerGame,
} from "./games";

// ==================== CATALOG OPTIONS ====================
export { getCatalogOptions, type CatalogOptions } from "./catalog";

// ==================== API HELPERS ====================
// Ces helpers préparent la migration vers une vraie API

/**
 * Configuration future pour l'API
 * TODO: Configurer l'URL de base et les headers
 */
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Helper pour simuler un délai réseau
 * Utile pour tester les états de chargement
 */
export async function simulateNetworkDelay(ms: number = 100): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Helper pour gérer les erreurs API
 * TODO: Implémenter la gestion d'erreurs réelle
 */
export function handleApiError(error: unknown): never {
  console.error("API Error:", error);
  throw new Error("Une erreur est survenue lors de la récupération des données");
}
