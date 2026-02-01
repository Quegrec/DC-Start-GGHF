interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color = "#00D1FF",
  showLabel = true,
  size = "md",
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const isComplete = percentage >= 100;
  const displayColor = isComplete ? "#10B981" : color;

  const heightClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/60">
            {isComplete ? "Terminé" : `${Math.round(100 - percentage)}% restant`}
          </span>
          <span className="font-semibold" style={{ color: displayColor }}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={`${heightClasses[size]} bg-white/10 rounded-full overflow-hidden`}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${displayColor}, ${displayColor}99)`,
            boxShadow: `0 0 12px ${displayColor}50`,
          }}
        />
      </div>
    </div>
  );
}
