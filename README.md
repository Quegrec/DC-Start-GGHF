# GGHF - Gaming Growth & Happiness Framework

Le premier compagnon intelligent qui décode votre ADN de joueur pour une expérience gaming sur-mesure.

## 🎮 Fonctionnalités

- **Test d'Archétype** - Découvrez votre personnalité gaming (Medic, Sniper, Assassin, Stratège, Explorateur)
- **Guides personnalisés** - Progression par micro-étapes adaptées à votre niveau
- **Tableau de bord** - Suivi de progression avec graphique radar des traits
- **Communauté** - Échangez avec d'autres joueurs, rejoignez des groupes
- **Recommandations** - Jeux suggérés selon votre profil psychologique
- **Safe Space** - Environnement bienveillant sans toxicité

## 🛠️ Stack Technique

| Technologie | Version |
|-------------|---------|
| Next.js | 15 (App Router) |
| React | 19 |
| Tailwind CSS | v4 |
| TypeScript | 5.x |
| Recharts | Graphiques radar |
| Lucide React | Icônes |
| Radix UI | Composants primitifs |

## 📁 Structure du Projet

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Styles globaux
│   └── (app)/                      # Route group application
│       ├── layout.tsx              # Layout avec Navbar
│       └── app/
│           ├── page.tsx            # Dashboard principal
│           ├── profile/            # Profil utilisateur
│           ├── quiz/               # Test d'archétype
│           ├── guides/             # Liste des guides
│           │   └── [id]/           # Détail guide dynamique
│           └── community/          # Communauté
│
├── components/
│   ├── common/                     # Composants réutilisables
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── IconBox.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── StatCard.tsx
│   │   └── TraitItem.tsx
│   ├── dashboard/                  # Composants dashboard
│   ├── landing/                    # Composants landing page
│   ├── layout/                     # Navbar unifié
│   ├── profile/                    # Composants profil
│   └── ui/                         # Primitives shadcn/ui
│
├── data/                           # Couche données (API-ready)
│   ├── index.ts                    # Exports centralisés
│   ├── user.ts                     # Profil, stats, trophées
│   ├── guides.ts                   # Guides et étapes
│   ├── archetypes.ts               # Quiz et archétypes
│   ├── games.ts                    # Jeux et recommandations
│   └── community.ts                # Posts, membres, groupes
│
└── lib/
    └── utils.ts                    # Utilitaires (cn, etc.)
```

## 🚀 Démarrage

```bash
# Installation des dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build production
npm run build

# Lancer en production
npm start
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page avec présentation du produit |
| `/app` | Dashboard personnalisé avec traits d'archétype |
| `/app/profile` | Profil complet (trophées, ADN gaming, progression) |
| `/app/quiz` | Test d'archétype en 8 questions |
| `/app/guides` | Bibliothèque de guides par jeu/catégorie |
| `/app/guides/[id]` | Détail d'un guide avec navigation étapes |
| `/app/community` | Feed communautaire, top membres, groupes |

## 🎯 Archétypes

| Archétype | Traits | Couleur |
|-----------|--------|---------|
| 💚 Le Medic | Empathie, Esprit d'équipe | `#10B981` |
| 🎯 Le Sniper | Perfectionnisme, Calme | `#00D1FF` |
| ⚡ L'Assassin | Réactivité, Audace | `#8B5CF6` |
| 🧠 Le Stratège | Vision, Anticipation | `#F59E0B` |
| 🗺️ L'Explorateur | Curiosité, Adaptabilité | `#EC4899` |

## 📊 Architecture Data

Les données sont centralisées dans `/src/data/` avec des fonctions async simulant des appels API :

```typescript
// Exemple d'utilisation
import { getCurrentUser, getGuideById } from "@/data";

const user = await getCurrentUser();
const guide = await getGuideById(1);
```

Chaque fichier expose :
- **Fonctions async** : Pour les composants client avec `useEffect`
- **Fonctions sync** : Pour l'initialisation ou le SSR
- **Types TypeScript** : Interfaces exportées pour le typage

## 🔧 Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Vérification ESLint |

## 📝 TODO Production

- [ ] Connecter à une vraie base de données (Prisma/Supabase)
- [ ] Authentification utilisateur (NextAuth)
- [ ] API routes pour les mutations
- [ ] Tests unitaires et E2E
- [ ] Optimisation des images (next/image CDN)
- [ ] Analytics et monitoring

## 📜 Licence

MIT
