# GGHF - Gaming Dashboard

A modern gaming dashboard application built with Next.js 15, React 19, and Tailwind CSS v4.

## Features

- 🎮 **Gaming Archetype Quiz** - Discover your gaming personality
- 📊 **Player Stats** - Visualize your archetype breakdown with radar charts
- 🎯 **Game Recommendations** - Personalized game suggestions based on your profile
- 👤 **Extended Profile** - Track your progress, trophies, and learning journey
- 🎨 **Modern UI** - Cyber-themed dark design with glassmorphism effects

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (dashboard)/          # Dashboard route group
│   │   ├── page.tsx          # Home/Dashboard page
│   │   ├── profile/          # Profile page
│   │   │   └── page.tsx
│   │   └── layout.tsx        # Dashboard layout with nav
│   ├── globals.css           # Global styles & Tailwind
│   └── layout.tsx            # Root layout
├── components/
│   ├── common/               # Shared components
│   │   └── ImageWithFallback.tsx
│   ├── dashboard/            # Dashboard-specific components
│   │   ├── QuizModule.tsx
│   │   ├── PlayerStats.tsx
│   │   └── GameRecommendations.tsx
│   ├── layout/               # Layout components
│   │   └── TopNavigation.tsx
│   ├── profile/              # Profile-specific components
│   │   ├── ProfileHeader.tsx
│   │   ├── TrophyRoom.tsx
│   │   ├── GamingDNA.tsx
│   │   ├── LearningTracker.tsx
│   │   └── PersonalityArchetype.tsx
│   └── ui/                   # UI primitives (shadcn/ui)
└── lib/
    └── utils.ts              # Utility functions
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pages

- `/` - Dashboard with Quiz, Stats, and Game Recommendations
- `/profile` - Extended user profile with trophies, gaming DNA, and personality archetype

## License

MIT
