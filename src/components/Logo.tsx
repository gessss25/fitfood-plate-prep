import { Apple, Sparkles } from "lucide-react";

interface LogoProps {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
}

const Logo = ({ variant = "default", size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const isLight = variant === "light";
  
  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-white/20 animate-pulse" />
        <Apple className={`${iconSizes[size]} text-white relative z-10`} />
        <Sparkles className="w-3 h-3 text-accent-foreground/80 absolute top-1 right-1 animate-pulse" />
      </div>
      <div>
        <h1 className={`${textSizes[size]} font-bold ${isLight ? 'text-white' : 'text-primary'} leading-none`}>
          FitFood
        </h1>
        <p className={`text-xs ${isLight ? 'text-white/80' : 'text-muted-foreground'} font-medium tracking-wider`}>
          ONLINE
        </p>
      </div>
    </div>
  );
};

export default Logo;
