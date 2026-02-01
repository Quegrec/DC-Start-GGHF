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
  famousPlayers: string[];
}

export interface QuizQuestion {
  id: number;
  text: string;
  context: string;
  image?: string;
  options: {
    id: string;
    text: string;
    traits: Record<string, number>; // Points pour chaque trait
  }[];
}

export interface QuizResult {
  odominantArchetype: Archetype;
  secondaryArchetype: Archetype | null;
  traitScores: Record<string, number>;
  recommendations: string[];
}

// Archétypes disponibles
const archetypes: Archetype[] = [
  {
    id: "medic",
    name: "Le Medic",
    icon: "💚",
    color: "#10B981",
    trait: "Empathie & Esprit d'équipe",
    shortDescription: "Votre empathie et votre esprit d'équipe font de vous le pilier de la survie.",
    longDescription: "Vous êtes le cœur de l'équipe. Votre capacité à anticiper les besoins des autres et à réagir rapidement aux situations critiques fait de vous un allié indispensable. Vous trouvez plus de satisfaction à sauver un coéquipier qu'à éliminer un ennemi.",
    strengths: [
      "Excellente conscience de l'équipe",
      "Réactions rapides en situation de crise",
      "Communication naturelle",
      "Patience et persévérance",
    ],
    challenges: [
      "Peut négliger sa propre survie",
      "Frustration quand l'équipe ne suit pas",
      "Tendance à trop vouloir aider",
    ],
    recommendedRoles: ["Support", "Healer", "Tank protecteur", "Shotcaller"],
    famousPlayers: ["JJoNak (OW)", "Mikyx (LoL)", "FalleN (CS)"],
  },
  {
    id: "sniper",
    name: "Le Sniper",
    icon: "🎯",
    color: "#00D1FF",
    trait: "Perfectionnisme & Calme",
    shortDescription: "Votre perfectionnisme et votre calme olympien vous destinent à la précision absolue.",
    longDescription: "La patience est votre arme principale. Vous êtes capable de rester concentré pendant de longues périodes, attendant le moment parfait pour agir. Votre précision n'est pas un don, c'est le résultat d'heures de pratique méthodique.",
    strengths: [
      "Précision mécanique exceptionnelle",
      "Calme sous pression",
      "Approche méthodique",
      "Excellente gestion du temps",
    ],
    challenges: [
      "Peut être trop passif",
      "Difficulté à s'adapter aux situations chaotiques",
      "Perfectionnisme parfois paralysant",
    ],
    recommendedRoles: ["AWPer", "Carry", "DPS précision", "Sniper"],
    famousPlayers: ["s1mple (CS)", "Ruler (LoL)", "Carpe (OW)"],
  },
  {
    id: "assassin",
    name: "L'Assassin",
    icon: "⚡",
    color: "#8B5CF6",
    trait: "Réactivité & Audace",
    shortDescription: "Votre réactivité et votre audace font de vous un prédateur de l'ombre.",
    longDescription: "L'élément de surprise est votre meilleur allié. Vous excellez dans les situations à haut risque où une action décisive peut renverser le cours du jeu. Votre instinct vous guide là où d'autres hésiteraient.",
    strengths: [
      "Réflexes exceptionnels",
      "Prise de décision rapide",
      "Créativité dans l'approche",
      "Capacité à créer des opportunités",
    ],
    challenges: [
      "Peut être imprévisible pour les coéquipiers",
      "Tendance à prendre des risques excessifs",
      "Impatience dans les phases calmes",
    ],
    recommendedRoles: ["Flanker", "Entry fragger", "Assassin", "Duelist"],
    famousPlayers: ["TenZ (Valorant)", "Faker (LoL)", "NiKo (CS)"],
  },
  {
    id: "strategist",
    name: "Le Stratège",
    icon: "🧠",
    color: "#F59E0B",
    trait: "Vision & Anticipation",
    shortDescription: "Votre capacité d'analyse vous permet de toujours avoir un coup d'avance.",
    longDescription: "Vous voyez le jeu comme un échiquier géant. Pendant que d'autres réagissent, vous anticipez. Votre compréhension des mécaniques et des patterns vous permet de prédire les mouvements adverses et d'orchestrer des stratégies gagnantes.",
    strengths: [
      "Excellente lecture du jeu",
      "Planification stratégique",
      "Adaptabilité tactique",
      "Leadership naturel",
    ],
    challenges: [
      "Peut sur-analyser les situations",
      "Frustration face aux coéquipiers imprévisibles",
      "Parfois lent à réagir à l'inattendu",
    ],
    recommendedRoles: ["IGL", "Stratège", "Jungler", "Coach"],
    famousPlayers: ["FNS (Valorant)", "Caps (LoL)", "gla1ve (CS)"],
  },
  {
    id: "explorer",
    name: "L'Explorateur",
    icon: "🗺️",
    color: "#EC4899",
    trait: "Curiosité & Adaptabilité",
    shortDescription: "Votre curiosité vous pousse à découvrir et maîtriser tous les aspects du jeu.",
    longDescription: "Vous n'êtes pas satisfait de maîtriser un seul personnage ou une seule stratégie. Votre soif de découverte vous amène à explorer tous les recoins du jeu, ce qui vous rend imprévisible et polyvalent.",
    strengths: [
      "Grande polyvalence",
      "Connaissance approfondie du jeu",
      "Capacité d'adaptation rapide",
      "Créativité dans les builds/setups",
    ],
    challenges: [
      "Peut manquer de spécialisation",
      "Difficulté à se fixer sur un main",
      "Parfois distrait par les nouveautés",
    ],
    recommendedRoles: ["Flex player", "Fill", "Off-meta specialist"],
    famousPlayers: ["Bwipo (LoL)", "XANTARES (CS)", "Super (OW)"],
  },
];

// Questions du quiz
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: "Votre équipe est en difficulté lors d'un match crucial. Quelle est votre réaction instinctive ?",
    context: "Situation de jeu compétitif",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    options: [
      {
        id: "1a",
        text: "Je me concentre sur le soutien de mes coéquipiers, m'assurant que tout le monde reste en vie",
        traits: { medic: 3, strategist: 1 },
      },
      {
        id: "1b",
        text: "Je prends mon temps pour analyser la situation et proposer une nouvelle stratégie",
        traits: { strategist: 3, sniper: 1 },
      },
      {
        id: "1c",
        text: "Je tente un play agressif pour déstabiliser l'équipe adverse",
        traits: { assassin: 3, explorer: 1 },
      },
      {
        id: "1d",
        text: "Je me repositionne patiemment en attendant l'ouverture parfaite",
        traits: { sniper: 3, strategist: 1 },
      },
    ],
  },
  {
    id: 2,
    text: "Comment préférez-vous passer votre temps d'entraînement ?",
    context: "Préparation et amélioration",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop",
    options: [
      {
        id: "2a",
        text: "Pratiquer mon aim et mes réflexes jusqu'à la perfection",
        traits: { sniper: 3, assassin: 1 },
      },
      {
        id: "2b",
        text: "Regarder des VODs et analyser les stratégies pro",
        traits: { strategist: 3, explorer: 1 },
      },
      {
        id: "2c",
        text: "Jouer avec mon équipe pour améliorer notre coordination",
        traits: { medic: 3, strategist: 1 },
      },
      {
        id: "2d",
        text: "Essayer de nouveaux personnages/armes que je ne connais pas",
        traits: { explorer: 3, assassin: 1 },
      },
    ],
  },
  {
    id: 3,
    text: "Vous êtes le dernier survivant face à 3 adversaires. Que faites-vous ?",
    context: "Situation de clutch 1v3",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b0b0a?w=800&h=400&fit=crop",
    options: [
      {
        id: "3a",
        text: "J'essaie de les isoler et de les éliminer un par un méthodiquement",
        traits: { strategist: 2, sniper: 2 },
      },
      {
        id: "3b",
        text: "Je fonce dans le tas, c'est tout ou rien !",
        traits: { assassin: 4 },
      },
      {
        id: "3c",
        text: "Je joue le temps et cherche l'erreur de l'adversaire",
        traits: { sniper: 3, strategist: 1 },
      },
      {
        id: "3d",
        text: "J'utilise une stratégie inattendue pour les surprendre",
        traits: { explorer: 2, assassin: 2 },
      },
    ],
  },
  {
    id: 4,
    text: "Quel type de victoire vous procure le plus de satisfaction ?",
    context: "Motivation personnelle",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    options: [
      {
        id: "4a",
        text: "Quand j'ai réussi à garder toute mon équipe en vie",
        traits: { medic: 4 },
      },
      {
        id: "4b",
        text: "Quand ma stratégie s'est déroulée exactement comme prévu",
        traits: { strategist: 4 },
      },
      {
        id: "4c",
        text: "Quand j'ai réussi un headshot impossible ou un play mécanique parfait",
        traits: { sniper: 3, assassin: 1 },
      },
      {
        id: "4d",
        text: "Quand j'ai surpris tout le monde avec un move inattendu",
        traits: { assassin: 2, explorer: 2 },
      },
    ],
  },
  {
    id: 5,
    text: "Votre coéquipier fait une erreur coûteuse. Comment réagissez-vous ?",
    context: "Dynamique d'équipe",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=400&fit=crop",
    options: [
      {
        id: "5a",
        text: "Je le rassure et l'encourage pour le prochain round",
        traits: { medic: 4 },
      },
      {
        id: "5b",
        text: "J'analyse l'erreur et propose une solution pour éviter que ça se reproduise",
        traits: { strategist: 3, medic: 1 },
      },
      {
        id: "5c",
        text: "Je me concentre sur mon propre jeu, on verra après le match",
        traits: { sniper: 2, assassin: 2 },
      },
      {
        id: "5d",
        text: "J'improvise pour compenser l'erreur",
        traits: { explorer: 2, assassin: 2 },
      },
    ],
  },
  {
    id: 6,
    text: "Quel aspect d'un nouveau jeu vous attire en premier ?",
    context: "Découverte d'un nouveau titre",
    image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=400&fit=crop",
    options: [
      {
        id: "6a",
        text: "Les personnages de support et leurs mécaniques d'entraide",
        traits: { medic: 4 },
      },
      {
        id: "6b",
        text: "La profondeur stratégique et les possibilités tactiques",
        traits: { strategist: 4 },
      },
      {
        id: "6c",
        text: "La skill expression et le potentiel mécanique",
        traits: { sniper: 2, assassin: 2 },
      },
      {
        id: "6d",
        text: "La variété des options et les builds possibles",
        traits: { explorer: 4 },
      },
    ],
  },
  {
    id: 7,
    text: "Comment gérez-vous une série de défaites ?",
    context: "Gestion mentale",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=400&fit=crop",
    options: [
      {
        id: "7a",
        text: "Je reste positif et j'encourage mon équipe à continuer",
        traits: { medic: 3, strategist: 1 },
      },
      {
        id: "7b",
        text: "J'analyse mes replays pour comprendre mes erreurs",
        traits: { strategist: 3, sniper: 1 },
      },
      {
        id: "7c",
        text: "Je fais une pause puis je reviens plus motivé que jamais",
        traits: { sniper: 2, explorer: 2 },
      },
      {
        id: "7d",
        text: "Je change de personnage/rôle pour essayer quelque chose de différent",
        traits: { explorer: 3, assassin: 1 },
      },
    ],
  },
  {
    id: 8,
    text: "Dans une équipe idéale, quel rôle vous conviendrait le mieux ?",
    context: "Positionnement en équipe",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    options: [
      {
        id: "8a",
        text: "Le support qui maintient tout le monde en vie",
        traits: { medic: 4 },
      },
      {
        id: "8b",
        text: "Le leader stratégique qui appelle les plays",
        traits: { strategist: 4 },
      },
      {
        id: "8c",
        text: "Le carry silencieux qui délivre quand il le faut",
        traits: { sniper: 4 },
      },
      {
        id: "8d",
        text: "L'électron libre qui crée le chaos dans l'équipe adverse",
        traits: { assassin: 3, explorer: 1 },
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
    medic: 0,
    sniper: 0,
    assassin: 0,
    strategist: 0,
    explorer: 0,
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
  const secondaryArchetype = sortedScores[1][1] > 5 
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
