import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TraitItemProps {
  icon: LucideIcon;
  text: string;
  variant?: "positive" | "negative" | "neutral";
  className?: string;
}

const variantStyles = {
  positive: {
    bg: "bg-[#10B981]/10",
    border: "border-[#10B981]/20",
    iconColor: "#10B981",
  },
  negative: {
    bg: "bg-[#F59E0B]/10",
    border: "border-[#F59E0B]/20",
    iconColor: "#F59E0B",
  },
  neutral: {
    bg: "bg-white/5",
    border: "border-white/10",
    iconColor: "#ffffff80",
  },
};

export function TraitItem({
  icon: Icon,
  text,
  variant = "neutral",
  className,
}: TraitItemProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border",
        styles.bg,
        styles.border,
        className
      )}
    >
      <Icon className="w-4 h-4 shrink-0" style={{ color: styles.iconColor }} />
      <span className="text-sm text-white/80">{text}</span>
    </div>
  );
}
