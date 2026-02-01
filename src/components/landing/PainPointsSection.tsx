"use client";

import { XCircle, TrendingDown, Users, ShieldOff } from "lucide-react";

export function PainPointsSection() {
  const painPoints = [
    {
      icon: TrendingDown,
      title: "Courbe d'apprentissage abrupte",
      description:
        "Trop de mécaniques à maîtriser, pas assez de temps. Vous décrochez avant même de commencer.",
    },
    {
      icon: ShieldOff,
      title: "Sentiment d'être perdu",
      description:
        "Face à des systèmes complexes et des builds infinis, l'analyse paralysie vous guette.",
    },
    {
      icon: Users,
      title: "Toxicité non encadrée",
      description:
        "Les environnements compétitifs sans modération transforment le plaisir en stress.",
    },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400">Le problème</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Marre d&apos;abandonner après{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              2 heures
            </span>{" "}
            de jeu ?
          </h2>

          <p className="text-xl text-white/50 leading-relaxed">
            <span className="text-white/80 font-semibold">60%</span> des joueurs
            quittent un titre prématurément à cause d&apos;une difficulté mal dosée
            ou d&apos;une communauté toxique.{" "}
            <span className="text-white/70">
              Le &quot;Game Over&quot; ne devrait pas être définitif.
            </span>
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-red-500/20 transition-all duration-500"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                  <Icon className="w-7 h-7 text-red-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-white/90">
                  {point.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {point.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

        {/* Transition text */}
        <div className="mt-20 text-center">
          <p className="text-2xl font-semibold text-white/70">
            <span className="text-[#00D1FF]">GGHF</span> change la donne.
          </p>
        </div>
      </div>
    </section>
  );
}
