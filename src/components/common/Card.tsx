interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glowColor?: string;
}

export function Card({
  children,
  className = "",
  hover = false,
  glow = false,
  glowColor = "#00D1FF",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] 
        border border-white/10 backdrop-blur-xl relative overflow-hidden
        ${hover ? "hover:border-white/20 transition-all duration-300 cursor-pointer" : ""}
        ${className}
      `}
    >
      {glow && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
