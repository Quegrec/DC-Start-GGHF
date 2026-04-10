"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Check, Gamepad2, Loader2, Pencil, Plus, X, ChevronDown, Save, Undo2 } from "lucide-react";
import { Card, SectionHeader, Badge } from "@/components/common";
import { getGamingDNA, getUserPreferences, updateUserPreferences, type GamingDNAAttribute } from "@/data/user";
import { getAllGames, getPlayerGames, type Game, type PlayerGame } from "@/data/games";
import { getCatalogOptions } from "@/data/catalog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type ToggleItem = { name: string; icon?: string; active: boolean };

function platformIcon(name: string): string {
  if (name === "PC") return "💻";
  if (name === "PlayStation") return "🎮";
  if (name === "Xbox") return "🎯";
  if (name === "Switch") return "🕹️";
  if (name === "Mobile") return "📱";
  return "🎮";
}

export function GamingDNA() {
  const [dna, setDna] = useState<GamingDNAAttribute[]>([]);
  const [playerGames, setPlayerGames] = useState<PlayerGame[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [platformsState, setPlatformsState] = useState<ToggleItem[]>([]);
  const [genresState, setGenresState] = useState<ToggleItem[]>([]);
  const [favoriteGameIds, setFavoriteGameIds] = useState<string[]>([]);
  const initialSnapshotRef = useRef<{
    platformsState: ToggleItem[];
    genresState: ToggleItem[];
    favoriteGameIds: string[];
  } | null>(null);
  const [newPlatform, setNewPlatform] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newFavoriteGame, setNewFavoriteGame] = useState("");
  const [favoriteSearchResults, setFavoriteSearchResults] = useState<Game[]>([]);
  const [isFavoriteSearchLoading, setIsFavoriteSearchLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [catalogPlatforms, setCatalogPlatforms] = useState<string[]>([]);
  const [catalogGenres, setCatalogGenres] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dnaData, gamesData, catalog, preferences, catalogGames] = await Promise.all([
          getGamingDNA(),
          getPlayerGames(),
          getCatalogOptions(),
          getUserPreferences().catch(() => ({ platforms: [], genres: [], favoriteGameIds: [] })),
          getAllGames().catch(() => [] as Game[]),
        ]);
        setDna(dnaData);
        setPlayerGames(gamesData);
        setCatalogPlatforms(catalog.platforms || []);
        setCatalogGenres(catalog.genres || []);
        setAllGames(catalogGames);

        if (preferences.platforms.length > 0) {
          setPlatformsState(preferences.platforms.map((p) => ({ name: p, icon: platformIcon(p), active: true })));
        }
        if (preferences.genres.length > 0) {
          setGenresState(preferences.genres.map((g) => ({ name: g, active: true })));
        }
        if (preferences.favoriteGameIds.length > 0) {
          setFavoriteGameIds(preferences.favoriteGameIds);
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (playerGames.length === 0) return;

    const derivedPlatforms = Array.from(new Set(playerGames.flatMap((pg) => pg.game.platform))).map((p) => ({
      name: p,
      icon: platformIcon(p),
      active: true,
    }));

    const allGenres = playerGames.map((pg) => pg.game.genre);
    const genreCounts = allGenres.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const derivedGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name], i) => ({ name, active: i < 3 }));

    const top3 = [...playerGames].sort((a, b) => b.hoursPlayed - a.hoursPlayed).slice(0, 3);

    setPlatformsState((prev) => (prev.length > 0 ? prev : derivedPlatforms));
    setGenresState((prev) => (prev.length > 0 ? prev : derivedGenres));
    setFavoriteGameIds((prev) => (prev.length > 0 ? prev : top3.map((g) => g.game.id)));
  }, [playerGames]);

  useEffect(() => {
    const query = newFavoriteGame.trim();
    if (!editMode || query.length < 2) {
      setFavoriteSearchResults([]);
      setIsFavoriteSearchLoading(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setIsFavoriteSearchLoading(true);
        const res = await fetch(`/api/rawg/search?q=${encodeURIComponent(query)}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          setFavoriteSearchResults([]);
          return;
        }
        const data = (await res.json()) as Game[];
        setFavoriteSearchResults(data);
      } catch (error) {
        console.error("Erreur recherche RAWG:", error);
        setFavoriteSearchResults([]);
      } finally {
        setIsFavoriteSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [editMode, newFavoriteGame]);

  const activePlatforms = platformsState.filter((p) => p.active);
  const activeGenres = genresState.filter((g) => g.active);
  const existingPlatformNames = new Set(platformsState.map((p) => p.name.toLowerCase()));
  const existingGenreNames = new Set(genresState.map((g) => g.name.toLowerCase()));
  const availableCatalogPlatforms = catalogPlatforms.filter((name) => !existingPlatformNames.has(name.toLowerCase()));
  const availableCatalogGenres = catalogGenres.filter((name) => !existingGenreNames.has(name.toLowerCase()));
  const availablePlayerGames = playerGames.filter((pg) => !favoriteGameIds.includes(pg.game.id));

  const favoriteGames = useMemo(() => {
    const byId = new Map<string, PlayerGame>();
    for (const pg of playerGames) byId.set(pg.game.id, pg);

    const fromCatalog = new Map<string, Game>();
    for (const g of allGames) fromCatalog.set(g.id, g);

    const items = favoriteGameIds
      .map((id) => {
        const pg = byId.get(id);
        if (pg) return pg;

        const g = fromCatalog.get(id);
        if (!g) return null;
        return {
          game: g,
          hoursPlayed: 0,
          lastPlayed: "",
          progress: 0,
          achievements: 0,
          totalAchievements: 0,
        } satisfies PlayerGame;
      })
      .filter(Boolean) as PlayerGame[];

    return items.slice(0, 3);
  }, [allGames, favoriteGameIds, playerGames]);

  const togglePlatform = (name: string) => {
    setPlatformsState((prev) => prev.map((p) => (p.name === name ? { ...p, active: !p.active } : p)));
  };

  const toggleGenre = (name: string) => {
    setGenresState((prev) => prev.map((g) => (g.name === name ? { ...g, active: !g.active } : g)));
  };

  const removePlatform = (name: string) => {
    setPlatformsState((prev) => prev.filter((p) => p.name !== name));
  };

  const removeGenre = (name: string) => {
    setGenresState((prev) => prev.filter((g) => g.name !== name));
  };

  const addPlatform = () => {
    const value = newPlatform.trim();
    if (!value) return;
    setPlatformsState((prev) => {
      if (prev.some((p) => p.name.toLowerCase() === value.toLowerCase())) return prev;
      return [...prev, { name: value, icon: platformIcon(value), active: true }];
    });
    setNewPlatform("");
  };

  const addGenre = () => {
    const value = newGenre.trim();
    if (!value) return;
    setGenresState((prev) => {
      if (prev.some((g) => g.name.toLowerCase() === value.toLowerCase())) return prev;
      return [...prev, { name: value, active: true }];
    });
    setNewGenre("");
  };

  const addPlatformFromCatalog = (name: string) => {
    setPlatformsState((prev) => {
      if (prev.some((p) => p.name.toLowerCase() === name.toLowerCase())) return prev;
      return [...prev, { name, icon: platformIcon(name), active: true }];
    });
  };

  const addGenreFromCatalog = (name: string) => {
    setGenresState((prev) => {
      if (prev.some((g) => g.name.toLowerCase() === name.toLowerCase())) return prev;
      return [...prev, { name, active: true }];
    });
  };

  const toggleFavoriteGame = (gameId: string) => {
    setFavoriteGameIds((prev) => {
      if (prev.includes(gameId)) return prev.filter((id) => id !== gameId);
      return [...prev, gameId].slice(0, 6);
    });
  };

  const addFavoriteByGame = (game: Game) => {
    setFavoriteGameIds((prev) => (prev.includes(game.id) ? prev : [...prev, game.id]).slice(0, 20));
    setAllGames((prev) => (prev.some((g) => g.id === game.id) ? prev : [game, ...prev]));
    setNewFavoriteGame("");
    setFavoriteSearchResults([]);
  };

  const isDirty = useMemo(() => {
    const snap = initialSnapshotRef.current;
    if (!snap) return false;
    return (
      JSON.stringify(snap.platformsState) !== JSON.stringify(platformsState) ||
      JSON.stringify(snap.genresState) !== JSON.stringify(genresState) ||
      JSON.stringify(snap.favoriteGameIds) !== JSON.stringify(favoriteGameIds)
    );
  }, [favoriteGameIds, genresState, platformsState]);

  const startEdit = () => {
    initialSnapshotRef.current = {
      platformsState,
      genresState,
      favoriteGameIds,
    };
    setEditMode(true);
  };

  const cancelEdit = () => {
    const snap = initialSnapshotRef.current;
    if (!snap) {
      setEditMode(false);
      return;
    }
    setPlatformsState(snap.platformsState);
    setGenresState(snap.genresState);
    setFavoriteGameIds(snap.favoriteGameIds);
    setEditMode(false);
  };

  const savePreferences = async () => {
    try {
      setSaving(true);
      const payload = {
        platforms: platformsState.filter((p) => p.active).map((p) => p.name),
        genres: genresState.filter((g) => g.active).map((g) => g.name),
        favoriteGameIds,
      };
      const saved = await updateUserPreferences(payload);
      setPlatformsState(saved.platforms.map((p) => ({ name: p, icon: platformIcon(p), active: true })));
      setGenresState(saved.genres.map((g) => ({ name: g, active: true })));
      setFavoriteGameIds(saved.favoriteGameIds);
      initialSnapshotRef.current = null;
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card glow glowColor="#00D1FF" className="p-6">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-8 h-8 animate-spin text-[#00D1FF]" />
        </div>
      </Card>
    );
  }

  return (
    <Card glow glowColor="#00D1FF" className="p-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <SectionHeader title="ADN Gaming" />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => (editMode ? cancelEdit() : startEdit())}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
                editMode
                  ? "border-[#00D1FF]/40 bg-[#00D1FF]/15 hover:bg-[#00D1FF]/20"
                  : "border-white/15 bg-white/5 hover:bg-white/10"
              }`}
              aria-label={editMode ? "Quitter le mode édition" : "Modifier mes préférences ADN"}
            >
              <Pencil className="w-4 h-4" />
            </button>

            <CollapsibleTrigger
              type="button"
              className="w-9 h-9 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center"
              aria-label={isOpen ? "Réduire la section ADN" : "Déplier la section ADN"}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
          <div className="space-y-6 mt-6">
          {/* Traits de personnalité gaming */}
          <div>
            <h3 className="text-sm text-white/60 mb-3">Profil de joueur</h3>
            <div className="grid grid-cols-2 gap-3">
              {dna.slice(0, 4).map((trait) => (
                <div
                  key={trait.name}
                  className="p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{trait.name}</span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: trait.color }}
                    >
                      {trait.value}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${trait.value}%`,
                        backgroundColor: trait.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mes plateformes */}
          <div>
            <h3 className="text-sm text-white/60 mb-3 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              Mes plateformes
            </h3>
            <div className="flex flex-wrap gap-3">
              {(editMode ? platformsState : activePlatforms).map((platform) => (
                <button
                  key={platform.name}
                  type="button"
                  onClick={editMode ? () => togglePlatform(platform.name) : undefined}
                  className={`px-4 py-2 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                    platform.active
                      ? "bg-[#00D1FF]/10 border-[#00D1FF]/30 text-[#00D1FF]"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white/70"
                  } ${editMode ? "cursor-pointer" : "cursor-default"}`}
                >
                  <span>{platform.icon || platformIcon(platform.name)}</span>
                  <span className="font-medium">{platform.name}</span>
                  {editMode && (
                    <span className="ml-1 inline-flex items-center gap-1">
                      {platform.active ? <Check className="w-3.5 h-3.5" /> : null}
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removePlatform(platform.name);
                        }}
                        className="inline-flex items-center justify-center w-6 h-6 rounded-md hover:bg-white/10"
                        aria-label={`Supprimer ${platform.name}`}
                        role="button"
                      >
                        <X className="w-3.5 h-3.5" />
                      </span>
                    </span>
                  )}
                </button>
              ))}
            </div>

            {editMode && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    list="catalog-platforms"
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    placeholder="Ajouter une plateforme (liste uniforme)"
                    className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 px-3 text-sm outline-none focus:border-[#00D1FF]/40"
                  />
                  <datalist id="catalog-platforms">
                    {availableCatalogPlatforms.map((name) => (
                      <option key={name} value={name} />
                    ))}
                  </datalist>
                  <button
                    type="button"
                    onClick={addPlatform}
                    className="h-10 px-3 rounded-xl bg-[#00D1FF]/15 border border-[#00D1FF]/30 text-[#00D1FF] hover:bg-[#00D1FF]/20 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableCatalogPlatforms.slice(0, 10).map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => addPlatformFromCatalog(name)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 hover:border-[#00D1FF]/30"
                    >
                      + {name}
                    </button>
                  ))}
                  {availableCatalogPlatforms.length === 0 && (
                    <span className="text-xs text-white/40">
                      Toutes les plateformes suggérées sont déjà ajoutées.
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Genres favoris */}
          <div>
            <h3 className="text-sm text-white/60 mb-3">Genres favoris</h3>
            <div className="flex flex-wrap gap-2">
              {(editMode ? genresState : activeGenres).map((genre) => (
                <Badge
                  key={genre.name}
                  variant={genre.active ? "info" : "default"}
                  size="md"
                >
                  <span className="inline-flex items-center gap-2">
                    {editMode ? (
                      <button
                        type="button"
                        onClick={() => toggleGenre(genre.name)}
                        className="hover:underline"
                      >
                        {genre.name}
                      </button>
                    ) : (
                      genre.name
                    )}
                    {editMode && (
                      <button
                        type="button"
                        onClick={() => removeGenre(genre.name)}
                        className="inline-flex items-center justify-center w-5 h-5 rounded-md hover:bg-white/10"
                        aria-label={`Supprimer ${genre.name}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </span>
                </Badge>
              ))}
            </div>

            {editMode && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    list="catalog-genres"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Ajouter un genre (liste uniforme)"
                    className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 px-3 text-sm outline-none focus:border-[#00D1FF]/40"
                  />
                  <datalist id="catalog-genres">
                    {availableCatalogGenres.map((name) => (
                      <option key={name} value={name} />
                    ))}
                  </datalist>
                  <button
                    type="button"
                    onClick={addGenre}
                    className="h-10 px-3 rounded-xl bg-[#00D1FF]/15 border border-[#00D1FF]/30 text-[#00D1FF] hover:bg-[#00D1FF]/20 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableCatalogGenres.slice(0, 12).map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => addGenreFromCatalog(name)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 hover:border-[#00D1FF]/30"
                    >
                      + {name}
                    </button>
                  ))}
                  {availableCatalogGenres.length === 0 && (
                    <span className="text-xs text-white/40">
                      Tous les genres suggérés sont déjà ajoutés.
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Jeux favoris */}
          <div>
            <h3 className="text-sm text-white/60 mb-3">
              {editMode ? "Jeux favoris (sélection)" : "Top 3 des jeux"}
            </h3>

            {editMode && (
              <div className="mb-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    value={newFavoriteGame}
                    onChange={(e) => setNewFavoriteGame(e.target.value)}
                    placeholder="Ajouter un jeu favori (RAWG)"
                    className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 px-3 text-sm outline-none focus:border-[#00D1FF]/40"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const exact = favoriteSearchResults.find(
                        (g) => g.name.toLowerCase() === newFavoriteGame.trim().toLowerCase(),
                      );
                      if (exact) addFavoriteByGame(exact);
                    }}
                    className="h-10 px-3 rounded-xl bg-[#00D1FF]/15 border border-[#00D1FF]/30 text-[#00D1FF] hover:bg-[#00D1FF]/20 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>

                {newFavoriteGame.trim().length >= 2 && (
                  <div className="max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-[#0f0f0f]">
                    {isFavoriteSearchLoading ? (
                      <div className="px-3 py-2 text-xs text-white/50">Recherche en cours...</div>
                    ) : favoriteSearchResults.filter((game) => !favoriteGameIds.includes(game.id)).length === 0 ? (
                      <div className="px-3 py-2 text-xs text-white/50">Aucun jeu trouvé</div>
                    ) : (
                      favoriteSearchResults
                        .filter((game) => !favoriteGameIds.includes(game.id))
                        .map((game) => (
                        <button
                          key={game.id}
                          type="button"
                          onClick={() => addFavoriteByGame(game)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-white/5 border-b border-white/5 last:border-b-0 flex items-center justify-between gap-3"
                        >
                          <span className="truncate">{game.name}</span>
                          <span className="text-xs text-white/40 shrink-0">{game.genre}</span>
                        </button>
                        ))
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availablePlayerGames.map((pg) => {
                    const checked = favoriteGameIds.includes(pg.game.id);
                    return (
                      <button
                        key={pg.game.id}
                        type="button"
                        onClick={() => toggleFavoriteGame(pg.game.id)}
                        className={`px-3 py-2 rounded-xl border flex items-center justify-between gap-3 text-sm transition-colors ${
                          checked
                            ? "bg-[#00D1FF]/10 border-[#00D1FF]/30"
                            : "bg-white/5 border-white/10 hover:bg-white/8"
                        }`}
                      >
                        <span className="truncate">{pg.game.name}</span>
                        <span className={`text-xs ${checked ? "text-[#00D1FF]" : "text-white/40"}`}>
                          {checked ? "Favori" : "Ajouter"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {favoriteGameIds.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {favoriteGameIds.slice(0, 12).map((id) => {
                      const game =
                        allGames.find((g) => g.id === id) ?? playerGames.find((pg) => pg.game.id === id)?.game;
                      const label = game?.name ?? id;
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10"
                        >
                          <span className="max-w-[220px] truncate">{label}</span>
                          <button
                            type="button"
                            onClick={() => setFavoriteGameIds((prev) => prev.filter((x) => x !== id))}
                            className="inline-flex items-center justify-center w-5 h-5 rounded-md hover:bg-white/10"
                            aria-label={`Retirer ${label}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              {favoriteGames.map((pg, index) => (
                <div key={pg.game.id} className="group relative">
                  <div className="relative aspect-3/4 rounded-xl overflow-hidden border border-white/10 hover:border-[#00D1FF]/50 transition-all duration-300">
                    <Image
                      src={pg.game.coverImage}
                      alt={pg.game.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 33vw, 150px"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-transparent to-transparent" />

                    {/* Badge de rang */}
                    <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-[#00D1FF]/90 backdrop-blur-sm border border-[#00D1FF]/30 flex items-center justify-center">
                      <span className="font-bold text-sm">#{index + 1}</span>
                    </div>

                    {/* Heures jouées */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-xs font-semibold mb-1 truncate">
                        {pg.game.name}
                      </p>
                      <p className="text-xs text-white/60">{pg.hoursPlayed}h jouées</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {editMode && (
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={cancelEdit}
                className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-2 text-white/80"
              >
                <Undo2 className="w-4 h-4" />
                Annuler
              </button>

              <button
                type="button"
                onClick={savePreferences}
                disabled={!isDirty || saving}
                className={`h-10 px-4 rounded-xl flex items-center gap-2 font-semibold transition-colors ${
                  !isDirty || saving
                    ? "bg-white/10 text-white/40 cursor-not-allowed"
                    : "bg-[#00D1FF] text-black hover:bg-[#00D1FF]/90"
                }`}
              >
                <Save className="w-4 h-4" />
                {saving ? "Sauvegarde..." : "Enregistrer"}
              </button>
            </div>
          )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
