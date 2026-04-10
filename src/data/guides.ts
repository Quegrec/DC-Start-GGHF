// Données statiques des guides pour fallback serveur et seed

export interface GuideStep {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  type: "video" | "text" | "practice";
  content?: {
    videoUrl?: string;
    imageUrl?: string;
    text: string;
    tips?: string[];
    warnings?: string[];
    keyPoints?: { title: string; description: string }[];
  };
}

export interface Guide {
  id: number;
  title: string;
  game: string;
  gameLogo: string;
  difficulty: "Débutant" | "Intermédiaire" | "Avancé";
  duration: string;
  progress: number;
  completedSteps: number;
  totalSteps: number;
  description: string;
  longDescription: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    level: number;
  };
  tags: string[];
  steps: GuideStep[];
  reward: {
    xp: number;
    badge: string;
  };
}

export const guidesData: Guide[] = [
  {
    id: 1,
    title: "Techniques de mouvement avancées",
    game: "Valorant",
    gameLogo: "🎯",
    difficulty: "Avancé",
    duration: "45 min",
    progress: 75,
    completedSteps: 9,
    totalSteps: 12,
    category: "Mécanique",
    description: "Maîtrisez le bunny hop, le strafe jump et les techniques de peek.",
    longDescription:
      "Maîtrisez les techniques de mouvement essentielles pour dominer vos adversaires. Ce guide couvre le bunny hop, le strafe jump, les techniques de peek et bien plus encore.",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
    author: {
      name: "ProGamer_X",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop",
      level: 67,
    },
    tags: ["Mécanique", "FPS", "Compétitif"],
    reward: { xp: 150, badge: "Mouvement Pro" },
    steps: [
      {
        id: 1,
        title: "Introduction au mouvement",
        duration: "3 min",
        completed: true,
        type: "video",
        content: {
          videoUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=675&fit=crop",
          text: "Dans cette introduction, nous allons découvrir pourquoi le mouvement est si important dans Valorant et comment il peut faire la différence entre gagner et perdre un duel.",
          keyPoints: [
            { title: "Le mouvement affecte la précision", description: "Vos tirs sont moins précis lorsque vous bougez" },
            { title: "L'unprévisibilité", description: "Un bon mouvement rend vos mouvements difficiles à anticiper" },
          ],
          tips: ["Commencez par maîtriser les bases avant les techniques avancées"],
        },
      },
      {
        id: 2,
        title: "Le counter-strafe",
        duration: "5 min",
        completed: true,
        type: "text",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=1200&h=675&fit=crop",
          text: "Le counter-strafe est LA technique fondamentale à maîtriser. Elle consiste à appuyer brièvement sur la touche opposée à votre direction de mouvement pour stopper instantanément votre personnage.",
          keyPoints: [
            { title: "Timing précis", description: "Appuyez sur la touche opposée une fraction de seconde avant de tirer" },
            { title: "Précision maximale", description: "Votre personnage s'arrête instantanément, permettant des tirs précis" },
          ],
          tips: [
            "Entraînez-vous sur le practice range",
            "Utilisez un métronome pour développer votre rythme",
          ],
        },
      },
      {
        id: 3,
        title: "Exercice : Counter-strafe",
        duration: "10 min",
        completed: true,
        type: "practice",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "Place à la pratique ! Suivez ces exercices pour ancrer le counter-strafe dans votre mémoire musculaire.",
          keyPoints: [
            { title: "Exercice 1", description: "Strafe gauche → Counter → Tir sur cible (répéter 20 fois)" },
            { title: "Exercice 2", description: "Strafe droite → Counter → Tir sur cible (répéter 20 fois)" },
            { title: "Exercice 3", description: "Alterner gauche/droite de façon aléatoire (5 minutes)" },
          ],
          tips: [
            "Ne vous découragez pas si c'est difficile au début",
            "La régularité est plus importante que la durée",
          ],
        },
      },
      {
        id: 4,
        title: "Le jiggle peek",
        duration: "4 min",
        completed: true,
        type: "video",
        content: {
          videoUrl: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=675&fit=crop",
          text: "Le jiggle peek consiste à sortir très brièvement d'un angle pour récupérer de l'information sans prendre de risque.",
          keyPoints: [
            { title: "Mouvement court", description: "Exposez-vous le moins longtemps possible" },
            { title: "Récupération d'info", description: "Utilisez-le pour repérer la position des ennemis" },
          ],
          tips: ["Utilisez le jiggle peek avant de vous engager dans un fight"],
          warnings: ["N'utilisez pas le jiggle peek contre un Operator, le risque est trop grand"],
        },
      },
      {
        id: 5,
        title: "Le wide peek",
        duration: "4 min",
        completed: true,
        type: "text",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=675&fit=crop",
          text: "À l'opposé du jiggle peek, le wide peek consiste à sortir large d'un angle pour surprendre l'adversaire et bénéficier de l'avantage du \"peeker's advantage\".",
          keyPoints: [
            { title: "Sortie large", description: "Sortez suffisamment loin pour déstabiliser la visée de l'ennemi" },
            { title: "Commitment total", description: "Une fois engagé, assumez le fight" },
          ],
          tips: [
            "Utilisez après un jiggle peek pour surprendre",
            "Efficace contre les joueurs qui tiennent des angles serrés",
          ],
        },
      },
      {
        id: 6,
        title: "Exercice : Techniques de peek",
        duration: "8 min",
        completed: true,
        type: "practice",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "Mettez en pratique les deux types de peek dans des situations variées.",
          keyPoints: [
            { title: "Drill 1", description: "Sur chaque angle, faites 3 jiggle peeks puis 1 wide peek" },
            { title: "Drill 2", description: "Demandez à un ami de tenir un angle et alternez les techniques" },
          ],
          tips: ["En match, observez les habitudes de vos adversaires pour choisir la bonne technique"],
        },
      },
      {
        id: 7,
        title: "Le bunny hop",
        duration: "5 min",
        completed: true,
        type: "video",
        content: {
          videoUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=675&fit=crop",
          text: "Le bunny hop permet de conserver votre vélocité en enchaînant des sauts. Moins puissant que dans CS:GO, il reste utile dans certaines situations.",
          keyPoints: [
            { title: "Timing des sauts", description: "Sautez dès que vous touchez le sol" },
            { title: "Air strafe", description: "Bougez la souris dans la direction du strafe en l'air" },
          ],
          warnings: ["Dans Valorant, le bhop perd de la vitesse après 2-3 sauts"],
        },
      },
      {
        id: 8,
        title: "Le strafe jump",
        duration: "4 min",
        completed: true,
        type: "text",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b0b0a?w=1200&h=675&fit=crop",
          text: "Le strafe jump vous permet d'atteindre des positions normalement inaccessibles en combinant saut et mouvement latéral.",
          keyPoints: [
            { title: "Technique de base", description: "Saut + strafe + mouvement de souris synchronisé" },
            { title: "Applications", description: "Atteindre des caisses élevées, traverser des gaps" },
          ],
          tips: ["Apprenez les spots spécifiques à chaque map"],
        },
      },
      {
        id: 9,
        title: "Exercice : Mouvement avancé",
        duration: "10 min",
        completed: true,
        type: "practice",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "Combinez toutes les techniques apprises dans un parcours d'entraînement.",
          keyPoints: [
            { title: "Parcours", description: "Créez un parcours sur le practice range avec différents obstacles" },
            { title: "Chrono", description: "Essayez de battre votre temps tout en maintenant la précision" },
          ],
          tips: ["Filmez-vous pour analyser vos erreurs"],
        },
      },
      {
        id: 10,
        title: "Combiner les techniques",
        duration: "6 min",
        completed: false,
        type: "video",
        content: {
          videoUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=675&fit=crop",
          text: "Dans cette leçon, nous allons apprendre à combiner toutes les techniques que vous avez apprises pour créer des mouvements fluides et imprévisibles.",
          keyPoints: [
            { title: "Enchaîner les peeks", description: "Alternez entre jiggle peek et wide peek selon la situation" },
            { title: "Timing du strafe", description: "Utilisez le counter-strafe pour rester précis après un mouvement rapide" },
            { title: "Lecture de l'adversaire", description: "Anticipez les réactions pour choisir la bonne technique" },
          ],
          tips: [
            "Ne vous précipitez pas, la fluidité vient avec la pratique",
            "Enregistrez vos sessions pour analyser vos erreurs",
            "Commencez lentement puis augmentez la vitesse progressivement",
          ],
          warnings: ["Le bunny hop est situationnel, ne l'utilisez pas systématiquement"],
        },
      },
      {
        id: 11,
        title: "Situations de match",
        duration: "5 min",
        completed: false,
        type: "text",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=675&fit=crop",
          text: "Appliquons maintenant ces techniques à des situations réelles de match compétitif.",
          keyPoints: [
            { title: "Entrée de site", description: "Utilisez le wide peek avec flash pour entrer sur un site" },
            { title: "Retake", description: "Jiggle peek pour info, puis push coordonné" },
            { title: "Clutch 1vX", description: "Maximisez les 1v1 avec des repositionnements imprévisibles" },
          ],
        },
      },
      {
        id: 12,
        title: "Examen final",
        duration: "15 min",
        completed: false,
        type: "practice",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "Testez vos compétences dans un examen complet couvrant toutes les techniques apprises.",
          keyPoints: [
            { title: "Partie 1", description: "Démontrez chaque technique individuellement" },
            { title: "Partie 2", description: "Enchaînez les techniques dans un parcours chronométré" },
            { title: "Partie 3", description: "Appliquez en duel contre un bot ou un ami" },
          ],
          tips: ["Prenez votre temps, la qualité prime sur la vitesse"],
        },
      },
    ],
  },
  {
    id: 2,
    title: "Conscience de la carte",
    game: "League of Legends",
    gameLogo: "⚔️",
    difficulty: "Intermédiaire",
    duration: "30 min",
    progress: 45,
    completedSteps: 4,
    totalSteps: 8,
    category: "Stratégie",
    description: "Apprenez à lire la minimap et anticiper les mouvements ennemis.",
    longDescription:
      "La conscience de la carte est ce qui sépare les bons joueurs des excellents. Apprenez à utiliser la minimap comme votre meilleure alliée pour anticiper les ganks et prendre les bonnes décisions.",
    coverImage:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=600&fit=crop",
    author: {
      name: "MapMaster",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      level: 54,
    },
    tags: ["Stratégie", "MOBA", "Macro"],
    reward: { xp: 120, badge: "Vision Pro" },
    steps: [
      {
        id: 1,
        title: "L'importance de la minimap",
        duration: "4 min",
        completed: true,
        type: "video",
        content: {
          videoUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=675&fit=crop",
          text: "La minimap contient 80% des informations dont vous avez besoin pour prendre de bonnes décisions. Apprenez à la consulter régulièrement.",
          keyPoints: [
            { title: "Règle des 3 secondes", description: "Regardez la minimap toutes les 3 secondes" },
            { title: "Position des ennemis", description: "Notez mentalement qui est visible et qui ne l'est pas" },
          ],
          tips: ["Agrandissez votre minimap dans les paramètres"],
        },
      },
      {
        id: 2,
        title: "Compter les ennemis",
        duration: "3 min",
        completed: true,
        type: "text",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=675&fit=crop",
          text: "Avant chaque action agressive, comptez les ennemis visibles sur la map. Si vous n'en voyez que 3, où sont les 2 autres ?",
          keyPoints: [
            { title: "5 visibles = Sécurité", description: "Vous pouvez jouer agressif" },
            { title: "Ennemis manquants = Danger", description: "Jouez défensif ou ayez une escape" },
          ],
        },
      },
      {
        id: 3,
        title: "Les timings de jungle",
        duration: "5 min",
        completed: true,
        type: "video",
        content: {
          videoUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=675&fit=crop",
          text: "Comprendre les patterns de jungle vous permet d'anticiper les ganks avec une grande précision.",
          keyPoints: [
            { title: "Premier gank", description: "Le jungler arrive généralement niveau 3, vers 3:00-3:30" },
            { title: "Côté de départ", description: "Observez quel buff est pris en premier pour prédire la route" },
          ],
          tips: ["Wardez l'entrée de la jungle adverse au début de la partie"],
        },
      },
      {
        id: 4,
        title: "Exercice : Tracking mental",
        duration: "4 min",
        completed: true,
        type: "practice",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "Entraînez votre tracking mental du jungler ennemi.",
          keyPoints: [
            { title: "À chaque apparition", description: "Notez l'heure et la position du jungler" },
            { title: "Prédiction", description: "Essayez de prédire sa prochaine position" },
          ],
        },
      },
      {
        id: 5,
        title: "Vision et contrôle de zone",
        duration: "4 min",
        completed: false,
        type: "text",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=675&fit=crop",
          text: "Les wards ne servent à rien si vous ne regardez pas la map. Apprenez à placer vos wards intelligemment.",
          keyPoints: [
            { title: "Wards défensifs", description: "Placez-les quand vous êtes poussé" },
            { title: "Wards offensifs", description: "Placez-les dans la jungle adverse quand vous avez la priorité" },
          ],
        },
      },
      {
        id: 6,
        title: "Wave management et map",
        duration: "4 min",
        completed: false,
        type: "video",
        content: {
          videoUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=675&fit=crop",
          text: "La position de vos vagues influence directement votre sécurité et vos options.",
          keyPoints: [
            { title: "Freeze = Safety", description: "Une vague gelée près de votre tour vous protège des ganks" },
            { title: "Push = Pression", description: "Poussez avant de roam pour créer de la pression" },
          ],
        },
      },
      {
        id: 7,
        title: "Communication et ping",
        duration: "3 min",
        completed: false,
        type: "text",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=675&fit=crop",
          text: "Partagez vos informations avec votre équipe grâce aux pings.",
          keyPoints: [
            { title: "Ping danger", description: "Prévenez vos alliés des rotations ennemies" },
            { title: "Ping objectif", description: "Coordonnez les prises d'objectifs" },
          ],
          tips: ["Un bon ping vaut mieux qu'un long message"],
        },
      },
      {
        id: 8,
        title: "Évaluation finale",
        duration: "5 min",
        completed: false,
        type: "practice",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "Testez votre conscience de la carte dans une partie réelle.",
          keyPoints: [
            { title: "Objectif", description: "Survivez à tous les ganks pendant 15 minutes" },
            { title: "Bonus", description: "Prédisez correctement 3 ganks du jungler adverse" },
          ],
        },
      },
    ],
  },
  {
    id: 3,
    title: "Communication d'équipe",
    game: "Overwatch 2",
    gameLogo: "🛡️",
    difficulty: "Débutant",
    duration: "20 min",
    progress: 100,
    completedSteps: 6,
    totalSteps: 6,
    category: "Social",
    description: "Les bases de la communication efficace en équipe.",
    longDescription:
      "Apprenez à communiquer efficacement avec votre équipe pour améliorer votre coordination et augmenter vos chances de victoire. Ce guide couvre les callouts, le timing des ults et la gestion des conflits.",
    coverImage:
      "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=600&fit=crop",
    author: {
      name: "TeamPlayer",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      level: 42,
    },
    tags: ["Social", "Équipe", "Communication"],
    reward: { xp: 80, badge: "Communicant" },
    steps: [
      {
        id: 1,
        title: "Pourquoi communiquer ?",
        duration: "3 min",
        completed: true,
        type: "video",
        content: {
          videoUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "La communication est l'arme secrète des meilleures équipes.",
          keyPoints: [
            { title: "Coordination", description: "Synchronisez vos ultimates et vos pushes" },
            { title: "Information", description: "Partagez les positions ennemies" },
          ],
        },
      },
      {
        id: 2,
        title: "Les callouts essentiels",
        duration: "4 min",
        completed: true,
        type: "text",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "Apprenez le vocabulaire de base pour des callouts clairs et efficaces.",
          keyPoints: [
            { title: "Positions", description: "Gauche, droite, derrière, high ground, low ground" },
            { title: "Status", description: "One shot, no cooldowns, ult ready" },
          ],
        },
      },
      {
        id: 3,
        title: "Gérer la toxicité",
        duration: "3 min",
        completed: true,
        type: "text",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "Restez positif même face à l'adversité.",
          keyPoints: [
            { title: "Ne pas répondre", description: "Ignorez les provocations" },
            { title: "Mute", description: "N'hésitez pas à mute les joueurs toxiques" },
          ],
          tips: ["Un environnement positif améliore les performances de toute l'équipe"],
        },
      },
      {
        id: 4,
        title: "Timing des ultimates",
        duration: "4 min",
        completed: true,
        type: "video",
        content: {
          videoUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "Coordonnez vos ultimates pour un impact maximal.",
          keyPoints: [
            { title: "Combo ults", description: "Combinez Zarya + Hanzo, Ana + Genji, etc." },
            { title: "Tracking", description: "Gardez en tête les ults adverses pour les contrer" },
          ],
        },
      },
      {
        id: 5,
        title: "Leadership positif",
        duration: "3 min",
        completed: true,
        type: "text",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "Devenez le leader dont votre équipe a besoin.",
          keyPoints: [
            { title: "Encourager", description: "Célébrez les bons plays" },
            { title: "Proposer", description: "Suggérez des changements sans critiquer" },
          ],
        },
      },
      {
        id: 6,
        title: "Mise en pratique",
        duration: "3 min",
        completed: true,
        type: "practice",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1200&h=675&fit=crop",
          text: "Appliquez ce que vous avez appris dans une vraie partie.",
          keyPoints: [
            { title: "Objectif", description: "Faites au moins 10 callouts utiles" },
            { title: "Bonus", description: "Coordonnez 2 combos d'ultimates" },
          ],
        },
      },
    ],
  },
  {
    id: 4,
    title: "Gestion de l'économie",
    game: "Counter-Strike 2",
    gameLogo: "💣",
    difficulty: "Intermédiaire",
    duration: "35 min",
    progress: 20,
    completedSteps: 2,
    totalSteps: 10,
    category: "Stratégie",
    description: "Optimisez vos achats et gérez l'économie de votre équipe.",
    longDescription:
      "L'économie est un aspect crucial de CS2 souvent négligé. Apprenez à gérer votre argent, synchroniser les achats d'équipe et exploiter l'économie adverse pour prendre l'avantage.",
    coverImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop",
    author: {
      name: "EcoMaster",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      level: 58,
    },
    tags: ["Stratégie", "FPS", "Économie"],
    reward: { xp: 130, badge: "Économiste" },
    steps: [
      {
        id: 1,
        title: "Les bases de l'économie",
        duration: "4 min",
        completed: true,
        type: "video",
        content: {
          videoUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=675&fit=crop",
          text: "Comprenez comment l'argent est gagné et perdu dans CS2.",
          keyPoints: [
            { title: "Victoire", description: "$3250 par round gagné" },
            { title: "Défaite", description: "Bonus progressif de $1400 à $3400" },
            { title: "Plant/Defuse", description: "+$300 bonus" },
          ],
        },
      },
      {
        id: 2,
        title: "Full buy vs Eco",
        duration: "3 min",
        completed: true,
        type: "text",
        content: {
          imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=675&fit=crop",
          text: "Savoir quand acheter et quand économiser est fondamental.",
          keyPoints: [
            { title: "Full buy", description: "Rifle + kevlar + utilitaires (~$4500-5000)" },
            { title: "Eco", description: "Économisez tout pour le round suivant" },
            { title: "Force buy", description: "Achat risqué pour casser l'économie adverse" },
          ],
        },
      },
      {
        id: 3,
        title: "Synchronisation d'équipe",
        duration: "4 min",
        completed: false,
        type: "video",
        content: {
          videoUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=675&fit=crop",
          text: "Toute l'équipe doit acheter ou économiser ensemble.",
          keyPoints: [
            { title: "Check eco", description: "Vérifiez l'argent de chaque coéquipier" },
            { title: "Drop", description: "Les joueurs riches peuvent acheter pour les autres" },
          ],
          tips: ["Communiquez votre argent en début de round"],
        },
      },
      { id: 4, title: "Le pistol round", duration: "3 min", completed: false, type: "text", content: { text: "Le pistol round définit l'économie des rounds suivants.", keyPoints: [] } },
      { id: 5, title: "Exercice : Calcul d'éco", duration: "5 min", completed: false, type: "practice", content: { text: "Pratiquez vos calculs d'économie.", keyPoints: [] } },
      { id: 6, title: "L'économie adverse", duration: "4 min", completed: false, type: "video", content: { text: "Apprenez à lire et exploiter l'économie ennemie.", keyPoints: [] } },
      { id: 7, title: "Les armes économiques", duration: "3 min", completed: false, type: "text", content: { text: "Certaines armes offrent un excellent rapport qualité-prix.", keyPoints: [] } },
      { id: 8, title: "Gestion des utilitaires", duration: "4 min", completed: false, type: "text", content: { text: "N'achetez pas toujours le même set d'utilitaires.", keyPoints: [] } },
      { id: 9, title: "Cas pratiques", duration: "5 min", completed: false, type: "video", content: { text: "Analysons des situations économiques réelles.", keyPoints: [] } },
      { id: 10, title: "Évaluation finale", duration: "4 min", completed: false, type: "practice", content: { text: "Testez vos connaissances économiques.", keyPoints: [] } },
    ],
  },
  {
    id: 5,
    title: "Fondamentaux du support",
    game: "League of Legends",
    gameLogo: "⚔️",
    difficulty: "Débutant",
    duration: "25 min",
    progress: 0,
    completedSteps: 0,
    totalSteps: 7,
    category: "Rôle",
    description: "Devenez un support efficace et apprécié de votre équipe.",
    longDescription:
      "Le rôle de support est souvent sous-estimé mais crucial pour la victoire. Apprenez à protéger votre ADC, créer de la vision et faire des roams impactants.",
    coverImage:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=600&fit=crop",
    author: {
      name: "SupportKing",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      level: 45,
    },
    tags: ["Rôle", "MOBA", "Support"],
    reward: { xp: 100, badge: "Protecteur" },
    steps: [
      { id: 1, title: "Le rôle du support", duration: "4 min", completed: false, type: "video", content: { text: "Comprenez ce qu'on attend de vous en tant que support.", keyPoints: [] } },
      { id: 2, title: "Types de supports", duration: "3 min", completed: false, type: "text", content: { text: "Enchanters, tanks, mages : trouvez votre style.", keyPoints: [] } },
      { id: 3, title: "La phase de lane", duration: "5 min", completed: false, type: "video", content: { text: "Comment dominer la bot lane.", keyPoints: [] } },
      { id: 4, title: "Ward et vision", duration: "4 min", completed: false, type: "text", content: { text: "Contrôlez la carte avec une vision intelligente.", keyPoints: [] } },
      { id: 5, title: "Roaming efficace", duration: "4 min", completed: false, type: "video", content: { text: "Aidez les autres lanes sans abandonner votre ADC.", keyPoints: [] } },
      { id: 6, title: "Teamfights", duration: "3 min", completed: false, type: "text", content: { text: "Votre positionnement en teamfight.", keyPoints: [] } },
      { id: 7, title: "Mise en pratique", duration: "4 min", completed: false, type: "practice", content: { text: "Appliquez ces concepts en partie.", keyPoints: [] } },
    ],
  },
  {
    id: 6,
    title: "Entraînement de la visée",
    game: "Apex Legends",
    gameLogo: "🔥",
    difficulty: "Débutant",
    duration: "40 min",
    progress: 60,
    completedSteps: 6,
    totalSteps: 10,
    category: "Mécanique",
    description: "Améliorez votre aim avec des exercices ciblés.",
    longDescription:
      "Une bonne visée est la base de tout joueur FPS. Ce guide vous propose une routine d'entraînement complète pour améliorer votre tracking, vos flicks et votre précision globale.",
    coverImage:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=600&fit=crop",
    author: {
      name: "AimGod",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop",
      level: 72,
    },
    tags: ["Mécanique", "FPS", "Aim"],
    reward: { xp: 140, badge: "Tireur d'élite" },
    steps: [
      { id: 1, title: "Configuration souris", duration: "3 min", completed: true, type: "text", content: { text: "Optimisez vos paramètres pour une visée précise.", keyPoints: [] } },
      { id: 2, title: "Sensibilité idéale", duration: "4 min", completed: true, type: "video", content: { text: "Trouvez la sensibilité qui vous convient.", keyPoints: [] } },
      { id: 3, title: "Exercice : Tracking", duration: "5 min", completed: true, type: "practice", content: { text: "Suivez des cibles en mouvement.", keyPoints: [] } },
      { id: 4, title: "Exercice : Flick shots", duration: "5 min", completed: true, type: "practice", content: { text: "Entraînez vos réflexes.", keyPoints: [] } },
      { id: 5, title: "Crosshair placement", duration: "4 min", completed: true, type: "video", content: { text: "Où placer votre viseur.", keyPoints: [] } },
      { id: 6, title: "Exercice : Target switching", duration: "5 min", completed: true, type: "practice", content: { text: "Passez rapidement d'une cible à l'autre.", keyPoints: [] } },
      { id: 7, title: "Spray control", duration: "5 min", completed: false, type: "video", content: { text: "Maîtrisez le recul de vos armes.", keyPoints: [] } },
      { id: 8, title: "Exercice : Spray patterns", duration: "5 min", completed: false, type: "practice", content: { text: "Pratiquez le contrôle du spray.", keyPoints: [] } },
      { id: 9, title: "Routine quotidienne", duration: "3 min", completed: false, type: "text", content: { text: "Une routine de 15 min pour s'échauffer.", keyPoints: [] } },
      { id: 10, title: "Évaluation finale", duration: "5 min", completed: false, type: "practice", content: { text: "Testez vos progrès.", keyPoints: [] } },
    ],
  },
];

// Fonction pour récupérer un guide par son ID
export async function getGuideById(id: number): Promise<Guide | undefined> {
  const res = await fetch(`/api/guides/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    return undefined;
  }

  return (await res.json()) as Guide;
}

// Fonction pour récupérer tous les guides (pour la liste)
export async function getAllGuides(): Promise<Guide[]> {
  const res = await fetch("/api/guides", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Impossible de charger les guides.");
  }

  return (await res.json()) as Guide[];
}

export async function updateGuideStepProgress(
  guideId: number,
  stepId: number,
  completed = true,
): Promise<Guide | null> {
  const res = await fetch(`/api/guides/${guideId}/progress`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stepId, completed }),
  });

  if (res.status === 401 || res.status === 403) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Impossible de sauvegarder la progression du guide.");
  }

  return (await res.json()) as Guide;
}
