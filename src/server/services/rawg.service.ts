type RawgGenre = {
  name: string;
};

type RawgPlatform = {
  platform: {
    name: string;
  };
};

type RawgTag = {
  name: string;
};

type RawgGame = {
  id: number;
  slug: string;
  name: string;
  background_image: string | null;
  genres: RawgGenre[];
  platforms: RawgPlatform[];
  tags: RawgTag[];
  rating: number;
  ratings_count: number;
  metacritic: number | null;
};

type RawgListResponse = {
  results: RawgGame[];
};

type RawgNamedItem = {
  name: string;
};

type RawgNamedListResponse = {
  results: RawgNamedItem[];
};

export type AppGame = {
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
  archetypeAffinity: Record<string, number>;
  features: string[];
  isPopular: boolean;
  playerCount: string;
};

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop";

function clampAffinity(value: number): number {
  return Math.max(20, Math.min(100, value));
}

function normalizePlatforms(platforms: RawgPlatform[]): string[] {
  const mapped = platforms.map((p) => p.platform.name);
  const normalized = mapped.map((name) => {
    if (/playstation/i.test(name)) return "PlayStation";
    if (/xbox/i.test(name)) return "Xbox";
    if (/nintendo|switch/i.test(name)) return "Switch";
    if (/pc/i.test(name)) return "PC";
    if (/ios|android|mobile/i.test(name)) return "Mobile";
    return name;
  });
  return Array.from(new Set(normalized)).slice(0, 4);
}

function deriveFeatures(genres: string[], tags: string[]): string[] {
  const source = [...genres, ...tags].map((v) => v.toLowerCase());
  const features: string[] = [];

  if (source.some((v) => v.includes("open world"))) features.push("Open World");
  if (source.some((v) => v.includes("multiplayer"))) features.push("Multijoueur");
  if (source.some((v) => v.includes("co-op") || v.includes("coop"))) features.push("Coop");
  if (source.some((v) => v.includes("story rich") || v.includes("narrative"))) features.push("Narratif");
  if (source.some((v) => v.includes("competitive") || v.includes("esports"))) features.push("Compétitif");
  if (source.some((v) => v.includes("sandbox") || v.includes("building"))) features.push("Construction");
  if (source.some((v) => v.includes("exploration"))) features.push("Exploration");

  return features.length > 0 ? features : ["Action"];
}

function deriveDifficulty(rating: number, metacritic: number | null): "Facile" | "Moyen" | "Difficile" {
  const score = (rating * 20 + (metacritic ?? 70)) / 2;
  if (score >= 80) return "Difficile";
  if (score >= 60) return "Moyen";
  return "Facile";
}

function computeArchetypeAffinity(genres: string[], tags: string[]): Record<string, number> {
  const text = [...genres, ...tags].join(" ").toLowerCase();

  return {
    guardian: clampAffinity(55 + (text.includes("co-op") || text.includes("family") ? 30 : 0)),
    explorer: clampAffinity(50 + (text.includes("open world") || text.includes("exploration") ? 35 : 0)),
    architect: clampAffinity(45 + (text.includes("sandbox") || text.includes("building") ? 40 : 0)),
    challenger: clampAffinity(55 + (text.includes("souls") || text.includes("competitive") ? 35 : 0)),
    storyteller: clampAffinity(50 + (text.includes("rpg") || text.includes("story") ? 35 : 0)),
    socializer: clampAffinity(50 + (text.includes("multiplayer") || text.includes("mmo") ? 35 : 0)),
  };
}

function mapRawgGameToAppGame(raw: RawgGame): AppGame {
  const genres = raw.genres.map((g) => g.name);
  const tags = raw.tags.map((t) => t.name);
  const features = deriveFeatures(genres, tags);

  return {
    id: raw.slug || String(raw.id),
    name: raw.name,
    logo: "🎮",
    coverImage: raw.background_image || DEFAULT_COVER,
    genre: genres[0] || "Jeu vidéo",
    platform: normalizePlatforms(raw.platforms),
    description: `${raw.name} - titre récupéré via RAWG.`,
    difficulty: deriveDifficulty(raw.rating, raw.metacritic),
    teamSize: features.includes("Coop") || features.includes("Multijoueur") ? "Solo / Multijoueur" : "Solo",
    matchDuration: "Variable",
    archetypeAffinity: computeArchetypeAffinity(genres, tags),
    features,
    isPopular: raw.ratings_count >= 1000 || (raw.metacritic ?? 0) >= 75,
    playerCount: `${raw.ratings_count.toLocaleString("fr-FR")} avis`,
  };
}

function buildRawgUrl(pageSize: number): string {
  const key = process.env.RAWG_API_KEY;
  const params = new URLSearchParams({
    page_size: String(pageSize),
    ordering: "-rating",
  });

  if (key) {
    params.set("key", key);
  }

  return `https://api.rawg.io/api/games?${params.toString()}`;
}

function buildRawgResourceUrl(resource: "genres" | "platforms"): string {
  const key = process.env.RAWG_API_KEY;
  const params = new URLSearchParams({
    page_size: "40",
  });

  if (key) {
    params.set("key", key);
  }

  return `https://api.rawg.io/api/${resource}?${params.toString()}`;
}

export async function fetchRawgGames(): Promise<AppGame[]> {
  const pageSize = Number(process.env.RAWG_PAGE_SIZE || 20);
  const url = buildRawgUrl(Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 20);

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`RAWG request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as RawgListResponse;
  return payload.results.map(mapRawgGameToAppGame);
}

export async function searchRawgGames(query: string): Promise<AppGame[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const key = process.env.RAWG_API_KEY;
  const params = new URLSearchParams({
    page_size: "12",
    search: trimmed,
  });

  if (key) {
    params.set("key", key);
  }

  const response = await fetch(`https://api.rawg.io/api/games?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`RAWG search request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as RawgListResponse;
  return payload.results.map(mapRawgGameToAppGame);
}

export async function fetchRawgGenres(): Promise<string[]> {
  const response = await fetch(buildRawgResourceUrl("genres"), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`RAWG genres request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as RawgNamedListResponse;
  return payload.results.map((item) => item.name).filter(Boolean);
}

export async function fetchRawgPlatforms(): Promise<string[]> {
  const response = await fetch(buildRawgResourceUrl("platforms"), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`RAWG platforms request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as RawgNamedListResponse;
  const normalized = payload.results
    .map((item) => item.name)
    .filter(Boolean)
    .map((name) => {
      if (/playstation/i.test(name)) return "PlayStation";
      if (/xbox/i.test(name)) return "Xbox";
      if (/nintendo|switch/i.test(name)) return "Switch";
      if (/pc/i.test(name)) return "PC";
      if (/ios|android|mobile/i.test(name)) return "Mobile";
      return name;
    });

  return Array.from(new Set(normalized)).slice(0, 40);
}

export type AppPlayerGame = {
  game: AppGame;
  hoursPlayed: number;
  lastPlayed: string;
  rank?: string;
  progress: number;
  achievements: number;
  totalAchievements: number;
};

export function buildPlayerGamesFromCatalog(games: AppGame[]): AppPlayerGame[] {
  const today = new Date();
  return games.slice(0, 4).map((game, index) => {
    const totalAchievements = 40 + index * 10;
    const achievements = Math.max(1, Math.round(totalAchievements * (0.45 + index * 0.1)));
    return {
      game,
      hoursPlayed: 40 + index * 30,
      lastPlayed: new Date(today.getTime() - index * 86400000 * 2).toISOString().slice(0, 10),
      progress: Math.min(100, 45 + index * 15),
      achievements,
      totalAchievements,
    };
  });
}
