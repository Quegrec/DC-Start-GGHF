// Données communauté pour le prototype
// TODO: Remplacer par des appels API réels
import { fetchDataset } from "./api-client";

export interface CommunityPost {
  id: string;
  author: {
    id: string;
    username: string;
    avatar: string;
    level: number;
    archetype?: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
  isLiked: boolean;
}

export interface CommunityMember {
  id: string;
  username: string;
  avatar: string;
  level: number;
  archetype: string;
  archetypeColor: string;
  xpThisWeek: number;
  rank: number;
  isOnline: boolean;
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  membersCount: number;
  postsThisWeek: number;
  isJoined: boolean;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    username: string;
    avatar: string;
    level: number;
  };
  content: string;
  likes: number;
  createdAt: string;
  isLiked: boolean;
}

// Données mockées
const mockPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: {
      id: "user-2",
      username: "ProGamer_X",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop",
      level: 67,
      archetype: "Le Sniper",
    },
    content: "Je viens de terminer le guide sur les techniques de mouvement et ma winrate a augmenté de 15% ! 🚀 Le counter-strafe a vraiment changé ma façon de jouer. Merci GGHF !",
    likes: 47,
    comments: 12,
    createdAt: "2024-04-25T14:30:00Z",
    tags: ["Valorant", "Progression", "Témoignage"],
    isLiked: true,
  },
  {
    id: "post-2",
    author: {
      id: "user-3",
      username: "StrategyQueen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      level: 54,
      archetype: "Le Stratège",
    },
    content: "Quelqu'un a des conseils pour améliorer ma conscience de la carte sur LoL ? Je suis Gold 2 et je me fais gank constamment même avec des wards. 😅",
    likes: 23,
    comments: 31,
    createdAt: "2024-04-25T10:15:00Z",
    tags: ["League of Legends", "Question", "Stratégie"],
    isLiked: false,
  },
  {
    id: "post-3",
    author: {
      id: "user-4",
      username: "CasualFun",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      level: 28,
      archetype: "Le Medic",
    },
    content: "Premier jour sur GGHF et j'ai déjà découvert que je suis un Medic ! Ça explique pourquoi j'adore jouer support. 💚 Cette plateforme est vraiment différente des autres.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    likes: 89,
    comments: 8,
    createdAt: "2024-04-24T18:45:00Z",
    tags: ["Nouveau", "Archétype", "Support"],
    isLiked: true,
  },
  {
    id: "post-4",
    author: {
      id: "user-5",
      username: "CompetitiveEdge",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      level: 82,
      archetype: "L'Assassin",
    },
    content: "Astuce du jour : En CS2, le flash pop est bien plus efficace quand vous le combinez avec un step fake. L'ennemi réagit au son et se retourne pile au moment du flash. 💥",
    likes: 156,
    comments: 24,
    createdAt: "2024-04-24T09:00:00Z",
    tags: ["CS2", "Astuce", "Pro tip"],
    isLiked: false,
  },
  {
    id: "post-5",
    author: {
      id: "user-6",
      username: "TeamPlayer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      level: 42,
      archetype: "Le Medic",
    },
    content: "Qui veut former une équipe pour jouer en ranked ce weekend ? Je cherche des joueurs chill qui veulent progresser sans toxicité. DM moi ! 🎮",
    likes: 34,
    comments: 45,
    createdAt: "2024-04-23T20:30:00Z",
    tags: ["LFG", "Équipe", "Ranked"],
    isLiked: false,
  },
];

const mockTopMembers: CommunityMember[] = [
  {
    id: "user-10",
    username: "LegendaryPlayer",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop",
    level: 95,
    archetype: "Le Sniper",
    archetypeColor: "#34D399",
    xpThisWeek: 2450,
    rank: 1,
    isOnline: true,
  },
  {
    id: "user-11",
    username: "ProGamer_X",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop",
    level: 67,
    archetype: "Le Sniper",
    archetypeColor: "#34D399",
    xpThisWeek: 1890,
    rank: 2,
    isOnline: true,
  },
  {
    id: "user-12",
    username: "StrategyQueen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    level: 54,
    archetype: "Le Stratège",
    archetypeColor: "#8B5CF6",
    xpThisWeek: 1654,
    rank: 3,
    isOnline: false,
  },
  {
    id: "user-13",
    username: "CompetitiveEdge",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    level: 82,
    archetype: "L'Assassin",
    archetypeColor: "#8B5CF6",
    xpThisWeek: 1423,
    rank: 4,
    isOnline: true,
  },
  {
    id: "user-14",
    username: "HealerMain",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    level: 61,
    archetype: "Le Medic",
    archetypeColor: "#10B981",
    xpThisWeek: 1298,
    rank: 5,
    isOnline: false,
  },
];

const mockGroups: CommunityGroup[] = [
  {
    id: "group-1",
    name: "FPS Masters",
    description: "Pour les passionnés de jeux de tir compétitifs",
    icon: "🎯",
    color: "#34D399",
    membersCount: 1247,
    postsThisWeek: 89,
    isJoined: true,
  },
  {
    id: "group-2",
    name: "MOBA Strategists",
    description: "Stratégies et analyses pour LoL, Dota 2, etc.",
    icon: "♟️",
    color: "#8B5CF6",
    membersCount: 892,
    postsThisWeek: 67,
    isJoined: true,
  },
  {
    id: "group-3",
    name: "Support Heroes",
    description: "Un espace pour tous les joueurs support",
    icon: "💚",
    color: "#10B981",
    membersCount: 634,
    postsThisWeek: 45,
    isJoined: false,
  },
  {
    id: "group-4",
    name: "Casual Gamers",
    description: "Jouer pour le fun, sans pression",
    icon: "🎮",
    color: "#F59E0B",
    membersCount: 2156,
    postsThisWeek: 123,
    isJoined: false,
  },
  {
    id: "group-5",
    name: "Mental & Bien-être",
    description: "Gérer le tilt, le stress et rester positif",
    icon: "🧘",
    color: "#EC4899",
    membersCount: 445,
    postsThisWeek: 34,
    isJoined: true,
  },
];

const mockComments: Record<string, Comment[]> = {
  "post-1": [
    {
      id: "comment-1",
      author: {
        id: "user-3",
        username: "StrategyQueen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        level: 54,
      },
      content: "Bravo ! Le counter-strafe c'est vraiment game changer 💪",
      likes: 12,
      createdAt: "2024-04-25T15:00:00Z",
      isLiked: false,
    },
    {
      id: "comment-2",
      author: {
        id: "user-4",
        username: "CasualFun",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        level: 28,
      },
      content: "Je commence ce guide demain, ça me motive !",
      likes: 5,
      createdAt: "2024-04-25T16:30:00Z",
      isLiked: true,
    },
  ],
};

// Fonctions d'accès aux données (simulent des appels API)
// TODO: Remplacer par de vrais appels API

export async function getCommunityPosts(filter?: string): Promise<CommunityPost[]> {
  const allPosts = await fetchDataset<CommunityPost[]>("community-posts");

  if (filter && filter !== "all") {
    return allPosts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
    );
  }

  return allPosts;
}

export async function getTopMembers(limit: number = 5): Promise<CommunityMember[]> {
  const members = await fetchDataset<CommunityMember[]>("community-top-members");
  return members.slice(0, limit);
}

export async function getCommunityGroups(): Promise<CommunityGroup[]> {
  return fetchDataset<CommunityGroup[]>("community-groups");
}

export async function getPostComments(postId: string): Promise<Comment[]> {
  const allComments = await fetchDataset<Record<string, Comment[]>>("community-comments");
  return allComments[postId] || [];
}

export async function togglePostLike(postId: string): Promise<{ success: boolean; newLikeCount: number }> {
  const response = await fetch(`/api/community/posts/${postId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    return { success: false, newLikeCount: 0 };
  }

  return (await response.json()) as { success: boolean; newLikeCount: number };
}

export async function joinGroup(groupId: string): Promise<{ success: boolean }> {
  const response = await fetch(`/api/community/groups/${groupId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    return { success: false };
  }

  return (await response.json()) as { success: boolean };
}

// Versions synchrones
export function getCommunityPostsSync(): CommunityPost[] {
  return mockPosts;
}

export function getTopMembersSync(limit: number = 5): CommunityMember[] {
  return mockTopMembers.slice(0, limit);
}

export function getCommunityGroupsSync(): CommunityGroup[] {
  return mockGroups;
}

export function getCommentsMapSync(): Record<string, Comment[]> {
  return mockComments;
}
