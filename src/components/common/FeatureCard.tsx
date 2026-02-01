import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  ctaText: string;
  color?: string;
}

export function FeatureCard({
  href,
  icon: Icon,
  title,
  description,
  ctaText,
  color = "#00D1FF",
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group p-6 rounded-2xl border transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${color}10 0%, transparent 50%)`,
        borderColor: `${color}20`,
      }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>
      <h3
        className="text-xl font-semibold mb-2 transition-colors group-hover:text-current"
        style={{ "--hover-color": color } as React.CSSProperties}
      >
        <span className="group-hover:text-[var(--hover-color)]">{title}</span>
      </h3>
      <p className="text-white/50 text-sm mb-4">{description}</p>
      <span
        className="text-sm font-medium flex items-center gap-2"
        style={{ color }}
      >
        {ctaText}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}
