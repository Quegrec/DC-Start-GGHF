import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon?: LucideIcon;
  badge?: string;
  title: string;
  description?: string;
  color?: string;
  centered?: boolean;
}

export function SectionHeader({
  icon: Icon,
  badge,
  title,
  description,
  color = "#00D1FF",
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
            centered ? "mx-auto" : ""
          }`}
          style={{
            backgroundColor: `${color}15`,
            border: `1px solid ${color}30`,
          }}
        >
          {Icon && <Icon className="w-4 h-4" style={{ color }} />}
          <span className="text-sm" style={{ color }}>
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
      {description && (
        <p className="text-white/60 max-w-2xl">{description}</p>
      )}
    </div>
  );
}
