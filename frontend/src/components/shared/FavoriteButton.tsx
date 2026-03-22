import { Heart } from "lucide-react";
import { Button, type ButtonVariants } from "./Button";
import { Icon } from "./Icon";

interface FavoriteButtonProps {
  active: boolean;
  onToggle: () => void;
  size?: ButtonVariants["size"];
  className?: string;
}

export function FavoriteButton({ active, onToggle, size = "md" }: FavoriteButtonProps) {
  return (
    <Button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      variant={active ? "active" : "glass"}
      size={size}
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
