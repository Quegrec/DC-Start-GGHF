// Données archétypes et quiz pour le prototype
// TODO: Remplacer par des appels API réels

export interface Archetype {
  id: string;
  name: string;
  icon: string;
  color: string;
  trait: string;
  shortDescription: string;
  longDescription: string;
  strengths: string[];
  challenges: string[];
  recommendedRoles: string[];
  recommendedGenres: string[];
  famousCharacters: string[];
}

export interface QuizQuestion {
  id: number;
  text: string;
  context: string;
  image?: string;
  options: {
    id: string;
    text: string;
    traits: Record<string, number>;
  }[];
}

export interface QuizResult {
  primaryArchetype: Archetype;
  secondaryArchetype: Archetype | null;
  traitScores: Record<string, number>;
  recommendations: string[];
}

// Archétypes universels - tous types de jeux
const archetypes: Archetype[] = [
  {
    id: "guardian",
    name: "Le Gardien",
    icon: "🛡️",
    color: "#10B981",
    trait: "Protection & Altruisme",
    shortDescription: "Vous prenez soin des autres et créez des espaces sûrs pour votre communauté.",
    longDescription: "Que ce soit en soignant vos alliés, en construisant des abris ou en guidant les nouveaux joueurs, vous trouvez votre bonheur dans le bien-être des autres. Vous êtes le pilier sur lequel tout le monde peut compter.",
    strengths: [
      "Empathie naturelle envers les autres joueurs",
      "Patience face aux difficultés",
      "Excellente communication d'équipe",
      "Capacité à créer une atmosphère positive",
    ],
    challenges: [
      "Peut négliger ses propres objectifs",
      "Difficulté à dire non aux demandes d'aide",
      "Frustration quand les autres ne collaborent pas",
    ],
    recommendedRoles: ["Support", "Healer", "Guide", "Bâtisseur", "Mentor"],
    recommendedGenres: ["Coopératif", "MMO", "Survie", "Gestion", "Simulation"],
    famousCharacters: ["Mercy (Overwatch)", "Yuna (FFX)", "Villageois (Animal Crossing)"],
  },
  {
    id: "explorer",
    name: "L'Explorateur",
    icon: "🧭",
    color: "#8B5CF6",
    trait: "Curiosité & Découverte",
    shortDescription: "Chaque recoin inexploré est une invitation à l'aventure.",
    longDescription: "Vous êtes guidé par une soif insatiable de découverte. Que ce soit des secrets cachés, des easter eggs, ou simplement le plaisir de voir ce qu'il y a derrière la prochaine colline, vous vivez pour l'exploration et le mystère.",
    strengths: [
      "Connaissance approfondie des univers de jeu",
      "Capacité à trouver des solutions créatives",
      "Patience pour les quêtes longues",
      "Appréciation des détails et du lore",
    ],
    challenges: [
      "Peut se perdre dans les side-quests",
      "Difficulté à rester concentré sur l'objectif principal",
      "Parfois frustré par les jeux linéaires",
    ],
    recommendedRoles: ["Éclaireur", "Collectionneur", "Lore Master", "Cartographe"],
    recommendedGenres: ["Open World", "RPG", "Aventure", "Puzzle", "Metroidvania"],
    famousCharacters: ["Link (Zelda)", "Aloy (Horizon)", "Nathan Drake (Uncharted)"],
  },
  {
    id: "architect",
    name: "L'Architecte",
    icon: "🏗️",
    color: "#F59E0B",
    trait: "Création & Planification",
    shortDescription: "Vous transformez des idées en réalités, brique par brique.",
    longDescription: "Vous êtes un bâtisseur dans l'âme. Que vous construisiez des empires, des fermes automatisées ou des œuvres d'art, vous trouvez une satisfaction profonde dans la création et l'optimisation de systèmes.",
    strengths: [
      "Vision à long terme",
      "Sens de l'organisation exceptionnel",
      "Créativité dans la résolution de problèmes",
      "Persévérance sur les projets complexes",
    ],
    challenges: [
      "Perfectionnisme parfois paralysant",
      "Peut passer trop de temps en planification",
      "Difficulté à abandonner un projet qui ne fonctionne pas",
    ],
    recommendedRoles: ["Stratège", "Base Builder", "Crafter", "Designer"],
    recommendedGenres: ["Construction", "City Builder", "Sandbox", "Tycoon", "Stratégie"],
    famousCharacters: ["Steve (Minecraft)", "Maire (SimCity)", "Factorio Engineer"],
  },
  {
    id: "challenger",
    name: "Le Challenger",
    icon: "⚔️",
    color: "#EF4444",
    trait: "Compétition & Excellence",
    shortDescription: "Chaque défi est une opportunité de prouver votre valeur.",
    longDescription: "Vous êtes animé par le désir de vous améliorer et de vous mesurer aux autres. Que ce soit en PvP, en speedrun ou en difficultés extrêmes, vous cherchez constamment à repousser vos limites.",
    strengths: [
      "Détermination face à l'échec",
      "Réflexes et précision aiguisés",
      "Capacité d'analyse rapide",
      "Motivation par les objectifs difficiles",
    ],
    challenges: [
      "Peut être trop dur envers soi-même",
      "Frustration face aux défaites",
      "Parfois impatient avec les joueurs débutants",
    ],
    recommendedRoles: ["Carry", "Duelist", "Speedrunner", "Raid Leader"],
    recommendedGenres: ["Compétitif", "Souls-like", "Fighting", "Roguelike", "Speedrun"],
    famousCharacters: ["Sekiro", "Dante (DMC)", "Champion Pokémon"],
  },
  {
    id: "storyteller",
    name: "Le Conteur",
    icon: "📖",
    color: "#EC4899",
    trait: "Narration & Immersion",
    shortDescription: "Les jeux sont des histoires à vivre, pas seulement des mécaniques à maîtriser.",
    longDescription: "Pour vous, le jeu vidéo est avant tout un medium narratif. Vous vous investissez émotionnellement dans les personnages, créez vos propres histoires et cherchez des expériences qui vous touchent profondément.",
    strengths: [
      "Connexion émotionnelle forte aux personnages",
      "Créativité dans le roleplay",
      "Appréciation des nuances narratives",
      "Capacité à s'immerger totalement",
    ],
    challenges: [
      "Peut être déçu par les jeux sans histoire",
      "Sensibilité aux spoilers",
      "Parfois trop attaché à certains personnages",
    ],
    recommendedRoles: ["Roleplayer", "Narrateur", "Créateur de personnages"],
    recommendedGenres: ["RPG narratif", "Visual Novel", "Aventure narrative", "Walking Simulator"],
    famousCharacters: ["Geralt (Witcher)", "Lee (TWD)", "Commander Shepard (Mass Effect)"],
  },
  {
    id: "socializer",
    name: "Le Social",
    icon: "🎉",
    color: "#00D1FF",
    trait: "Connexion & Partage",
    shortDescription: "Le jeu est avant tout un moment de partage avec les autres.",
    longDescription: "Pour vous, jouer seul n'a pas le même charme. Vous brillez dans les interactions sociales, que ce soit en coop, en guilde ou simplement en discutant sur Discord. Les amitiés gaming sont de vraies amitiés.",
    strengths: [
      "Facilité à créer des liens",
      "Excellent pour animer un groupe",
      "Capacité à résoudre les conflits",
      "Enthousiasme contagieux",
    ],
    challenges: [
      "Peut s'ennuyer dans les jeux solo",
      "Dépendance au groupe pour jouer",
      "Parfois distrait par les conversations",
    ],
    recommendedRoles: ["Animateur", "Recruteur", "Diplomate", "Party Leader"],
    recommendedGenres: ["MMO", "Party Games", "Coop", "Battle Royale (en squad)", "Social Deduction"],
    famousCharacters: ["Joueur de Mario Party", "Héros de It Takes Two"],
  },
];

// Questions du quiz - universelles, tous types de joueurs
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: "Vous lancez un nouveau jeu pour la première fois. Quelle est votre priorité ?",
    context: "Découverte d'un nouveau jeu",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=400&fit=crop",
    options: [
      {
        id: "1a",
        text: "Explorer chaque recoin avant d'avancer dans l'histoire principale",
        traits: { explorer: 4 },
      },
      {
        id: "1b",
        text: "Comprendre les mécaniques pour optimiser ma progression",
        traits: { challenger: 2, architect: 2 },
      },
      {
        id: "1c",
        text: "M'immerger dans l'histoire et rencontrer les personnages",
        traits: { storyteller: 4 },
      },
      {
        id: "1d",
        text: "Inviter des amis pour découvrir le jeu ensemble",
        traits: { socializer: 3, guardian: 1 },
      },
    ],
  },
  {
    id: 2,
    text: "Dans un jeu multijoueur, quel rôle vous attire naturellement ?",
    context: "Dynamique de groupe",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    options: [
      {
        id: "2a",
        text: "Celui qui protège et soigne les autres",
        traits: { guardian: 4 },
      },
      {
        id: "2b",
        text: "Celui qui fait le plus de dégâts et mène l'assaut",
        traits: { challenger: 4 },
      },
      {
        id: "2c",
        text: "Celui qui organise la stratégie et les ressources",
        traits: { architect: 3, guardian: 1 },
      },
      {
        id: "2d",
        text: "Celui qui anime le groupe et maintient la bonne ambiance",
        traits: { socializer: 4 },
      },
    ],
  },
  {
    id: 3,
    text: "Vous êtes bloqué sur un puzzle ou un boss difficile. Que faites-vous ?",
    context: "Face à un défi",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b0b0a?w=800&h=400&fit=crop",
    options: [
      {
        id: "3a",
        text: "Je persévère jusqu'à réussir seul, la victoire n'a de valeur que si je la mérite",
        traits: { challenger: 4 },
      },
      {
        id: "3b",
        text: "Je cherche des indices dans l'environnement et le lore du jeu",
        traits: { explorer: 2, storyteller: 2 },
      },
      {
        id: "3c",
        text: "Je demande de l'aide à la communauté ou à des amis",
        traits: { socializer: 3, guardian: 1 },
      },
      {
        id: "3d",
        text: "J'analyse le problème méthodiquement et planifie une nouvelle approche",
        traits: { architect: 4 },
      },
    ],
  },
  {
    id: 4,
    text: "Quel type de contenu vous donne le plus envie de continuer un jeu ?",
    context: "Motivation à long terme",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    options: [
      {
        id: "4a",
        text: "Des zones secrètes, des collectibles cachés et des mystères à résoudre",
        traits: { explorer: 4 },
      },
      {
        id: "4b",
        text: "Des classements, des succès difficiles et des défis end-game",
        traits: { challenger: 4 },
      },
      {
        id: "4c",
        text: "Une histoire captivante et des personnages attachants",
        traits: { storyteller: 4 },
      },
      {
        id: "4d",
        text: "Des possibilités de construction et de personnalisation infinies",
        traits: { architect: 4 },
      },
    ],
  },
  {
    id: 5,
    text: "Un nouveau joueur rejoint votre partie et ne comprend pas les mécaniques. Votre réaction ?",
    context: "Intégration des nouveaux",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=400&fit=crop",
    options: [
      {
        id: "5a",
        text: "Je prends le temps de lui expliquer et de l'accompagner",
        traits: { guardian: 4 },
      },
      {
        id: "5b",
        text: "Je lui montre les bases puis le laisse apprendre par l'expérience",
        traits: { challenger: 2, architect: 1 },
      },
      {
        id: "5c",
        text: "Je l'invite sur Discord pour mieux échanger et l'intégrer au groupe",
        traits: { socializer: 4 },
      },
      {
        id: "5d",
        text: "Je lui partage mes guides et ressources pour qu'il progresse à son rythme",
        traits: { architect: 2, guardian: 2 },
      },
    ],
  },
  {
    id: 6,
    text: "Quel aspect d'un jeu open world vous attire le plus ?",
    context: "Préférences de gameplay",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop",
    options: [
      {
        id: "6a",
        text: "L'immensité du monde et tous les endroits à découvrir",
        traits: { explorer: 4 },
      },
      {
        id: "6b",
        text: "La liberté de construire et de créer ce que je veux",
        traits: { architect: 4 },
      },
      {
        id: "6c",
        text: "Les quêtes narratives et les histoires des PNJ",
        traits: { storyteller: 4 },
      },
      {
        id: "6d",
        text: "Les activités multijoueurs et les rencontres avec d'autres joueurs",
        traits: { socializer: 3, guardian: 1 },
      },
    ],
  },
  {
    id: 7,
    text: "Comment réagissez-vous après une défaite ou un échec en jeu ?",
    context: "Gestion de la frustration",
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=400&fit=crop",
    options: [
      {
        id: "7a",
        text: "J'analyse ce qui n'a pas marché et je retente immédiatement",
        traits: { challenger: 3, architect: 1 },
      },
      {
        id: "7b",
        text: "Je fais une pause et j'explore autre chose en attendant",
        traits: { explorer: 3, storyteller: 1 },
      },
      {
        id: "7c",
        text: "J'en parle avec des amis pour décompresser",
        traits: { socializer: 4 },
      },
      {
        id: "7d",
        text: "J'essaie de comprendre si je peux aider les autres à éviter cette erreur",
        traits: { guardian: 3, architect: 1 },
      },
    ],
  },
  {
    id: 8,
    text: "Si vous deviez choisir un seul type de jeu pour le reste de votre vie, ce serait ?",
    context: "Préférence fondamentale",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=400&fit=crop",
    options: [
      {
        id: "8a",
        text: "Un jeu d'aventure/exploration avec un monde immense",
        traits: { explorer: 4 },
      },
      {
        id: "8b",
        text: "Un jeu de construction/gestion avec des possibilités infinies",
        traits: { architect: 4 },
      },
      {
        id: "8c",
        text: "Un jeu narratif avec des choix qui impactent l'histoire",
        traits: { storyteller: 4 },
      },
      {
        id: "8d",
        text: "Un jeu multijoueur où je peux jouer avec mes amis",
        traits: { socializer: 3, guardian: 1 },
      },
    ],
  },
];

// Fonctions d'accès aux données
export async function getArchetypes(): Promise<Archetype[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return archetypes;
}

export async function getArchetypeById(id: string): Promise<Archetype | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return archetypes.find((a) => a.id === id);
}

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return quizQuestions;
}

export async function calculateQuizResult(answers: Record<number, string>): Promise<{
  primaryArchetype: Archetype;
  secondaryArchetype: Archetype | null;
  scores: Record<string, number>;
}> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Calculer les scores
  const scores: Record<string, number> = {
    guardian: 0,
    explorer: 0,
    architect: 0,
    challenger: 0,
    storyteller: 0,
    socializer: 0,
  };

  for (const [questionId, answerId] of Object.entries(answers)) {
    const question = quizQuestions.find((q) => q.id === parseInt(questionId));
    if (question) {
      const option = question.options.find((o) => o.id === answerId);
      if (option) {
        for (const [trait, points] of Object.entries(option.traits)) {
          scores[trait] = (scores[trait] || 0) + points;
        }
      }
    }
  }

  // Trouver l'archétype dominant
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primaryArchetype = archetypes.find((a) => a.id === sortedScores[0][0])!;
  const secondaryArchetype =
    sortedScores[1][1] > 5
      ? archetypes.find((a) => a.id === sortedScores[1][0]) || null
      : null;

  return { primaryArchetype, secondaryArchetype, scores };
}

// Versions synchrones
export function getArchetypesSync(): Archetype[] {
  return archetypes;
}

export function getQuizQuestionsSync(): QuizQuestion[] {
  return quizQuestions;
}
