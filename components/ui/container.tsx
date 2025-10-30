interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "compact";
}

export default function Container({ children, className = "", variant = "default" }: ContainerProps) {
  const maxWidth = variant === "compact" ? "max-w-[1344px]" : "max-w-[1456px]";

  return (
    <div className={`mx-auto ${maxWidth} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
