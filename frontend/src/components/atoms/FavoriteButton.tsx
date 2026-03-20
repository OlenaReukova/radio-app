import { Heart } from "lucide-react";
import { Button } from "../atoms/Button/Button";
import type { ButtonVariants } from "../atoms/Button/button.variants";
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
