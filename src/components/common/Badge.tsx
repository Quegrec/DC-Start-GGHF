interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  default: "bg-white/10 text-white/70",
  success: "bg-[#10B981]/20 text-[#10B981]",
  warning: "bg-[#F59E0B]/20 text-[#F59E0B]",
  danger: "bg-[#EF4444]/20 text-[#EF4444]",
  info: "bg-[#00D1FF]/20 text-[#00D1FF]",
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
