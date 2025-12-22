import { Heart } from "lucide-react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "../ui/utils";

interface FavoriteButtonProps {
  active: boolean;
  onToggle: () => void;
  className?: string;
}

export function FavoriteButton({
  active,
  onToggle,
  className,
}: FavoriteButtonProps) {
  return (
    <Button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      variant="ghost"
      size="md"
      className={cn(
        //form from figma design
        "flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-purple-200/70 hover:bg-white/10 hover:border-purple-500/30 transition-all",

        // states
        active
          ? "btn-premium neon-glow border-transparent"
          : "bg-white/5 hover:bg-white/10",

        className
      )}
    >
      <Icon
        icon={Heart}
        size="md"
        state={active ? "active" : "muted"}
        interactive
        className={active ? "fill-current" : undefined}
      />
    </Button>
  );
}
