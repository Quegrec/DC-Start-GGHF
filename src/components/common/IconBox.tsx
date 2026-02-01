import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBoxProps {
  icon?: LucideIcon;
  emoji?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 rounded-lg",
  md: "w-10 h-10 rounded-xl",
  lg: "w-12 h-12 rounded-xl",
};

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const emojiSizes = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
};

export function IconBox({
  icon: Icon,
  emoji,
  size = "md",
  color = "#00D1FF",
  className,
}: IconBoxProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0",
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: `${color}20`,
        border: `1px solid ${color}30`,
      }}
    >
      {Icon && <Icon className={iconSizes[size]} style={{ color }} />}
      {emoji && <span className={emojiSizes[size]}>{emoji}</span>}
    </div>
  );
}
